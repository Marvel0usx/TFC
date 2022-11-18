import django_filters
from studios.models.fitnessClass import FitnessClass
from studios.models.studio import Studio
from datetime import datetime


class ClassFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(field_name='name', lookup_expr='icontains')
    coach = django_filters.CharFilter(field_name='coach', lookup_expr='icontains')
    date = django_filters.DateFilter(field_name='startTime', lookup_expr='date')
    time_range = django_filters.CharFilter(method='timeRangeFilter')
    
    class Meta:
        model = FitnessClass
        fields = ['name', 'coach', 'date', 'time_range']
    
    def timeRangeFilter(self, queryset, name, value):
        range = value.split('-')
        range[0] = datetime.strptime(range[0], '%H:%M')
        range[1] = datetime.strptime(range[1], '%H:%M')
        return queryset.filter(**{
            'startTime__time':range[0], 
            'endTime__time':range[1]
        })
        
        
        
        
class StudioFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(field_name='name', lookup_expr='icontains')
    fitnessclass = django_filters.CharFilter(field_name='fitnessclass__name', lookup_expr='icontains')
    amenity = django_filters.CharFilter(method='amenityFilter')
    coach = django_filters.CharFilter(field_name='fitnessclass__coach', lookup_expr='icontains')
    
    class Meta:
        model = Studio
        fields = ['name', 'fitnessclass', 'amenity', 'coach']
    
    
    def amenityFilter(self, queryset, name, value):
        print(value)
        return queryset.filter(**{
            'amenity__type': value,
            'amenity__quantity__gt': 0,
        })
        