from django.contrib import admin
from .models.studio import Studio
from .models.fitnessClass import FitnessClass
from .models.amenity import Amenity
from django import forms
import datetime
from django.utils import timezone
# Register your models here.

class FitnessClassForm(forms.ModelForm):
    choices = [(1, 'none'), (2,'daily'), (3, 'weekly')]
    endDate = forms.DateField(help_text='YYYY-MM-DD', required=False)
    recurrence = forms.ChoiceField(choices=choices, required=False)
    capacity = forms.IntegerField(initial=1, min_value=0)
    enrolled = forms.IntegerField(initial=0, min_value=0)
    class Meta:
        model = FitnessClass
        fields = ['name', 'description', 'keywords', 'studio', 'coach', 'startTime', 'endTime', 'capacity', 'enrolled', 'endDate', 'recurrence']
    
    
class StudioAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'phoneNumber', 'address']
    
    
    
@admin.action(description='Delete recurring instances of selected classes')
def delete_recurring(modeladmin, request, queryset):
    for selectedClass in queryset:
        obj = selectedClass.baseClass
        if obj is not None:
            # filter all the classes that have the same obj class and have yet to begin
            recurring = FitnessClass.objects.filter(baseClass=obj, startTime__gt=timezone.now())
            for fclass in recurring:
                fclass.delete()
        else:
            selectedClass.delete()

class ClassAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'studio', 'coach', 'startTime', 'endTime', 'capacity', 'enrolled', 'baseClass']
    form = FitnessClassForm
    actions = [delete_recurring]
    
    def save_model(self, request, obj, form, change) -> None:
        super().save_model(request, obj, form, change)
        print(form.data)
        if form.data['recurrence'] == '1':
            # create one class and return
            return obj
        
        obj.baseClass = obj.id
        obj.save()
        curr = datetime.datetime.strptime(
            form.data['startTime_0'] + ' ' + form.data['startTime_1'],
            '%Y-%m-%d %H:%M:%S'
        )
        end = datetime.datetime.strptime(
            form.data['endDate'],
            '%Y-%m-%d'
        )
        end = end.date()
        classStart = curr
        classEnd = datetime.datetime.strptime(
            form.data['endTime_0'] + ' ' + form.data['endTime_1'],
            '%Y-%m-%d %H:%M:%S'
        )
        if form.data['recurrence'] == '2':
            increment = 1   # determine if the recurrence is everyday or every 7 days
        else:
            increment = 7
            
        baseClass = obj.id
        classStart += datetime.timedelta(days=increment)
        classEnd += datetime.timedelta(days=increment)
        curr += datetime.timedelta(days=increment)
        
        
        while curr.date() <= end:
            new = FitnessClass(
                name=form.data['name'],
                description=form.data['description'],
                coach=form.data['coach'],
                keywords=form.data['keywords'],
                capacity=form.data['capacity'],
                enrolled=form.data['enrolled'],
                startTime=classStart,
                endTime=classEnd,
                baseClass=baseClass,
                studio=Studio.objects.get(id=obj.studio.id)
            )
            new.save()
            classStart += datetime.timedelta(days=increment)
            classEnd += datetime.timedelta(days=increment)
            curr += datetime.timedelta(days=increment)
        return new
    
    
    
        
class AmenityAdmin(admin.ModelAdmin):
    list_display = ['id', 'studio', 'type', 'quantity']

    
admin.site.register(Studio, StudioAdmin)
admin.site.register(FitnessClass, ClassAdmin)
admin.site.register(Amenity, AmenityAdmin)