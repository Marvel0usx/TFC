from rest_framework import serializers
from studios.models.fitnessClass import FitnessClass
from studios.models.studio import Studio
import datetime


class FitnessClassSerializer(serializers.ModelSerializer):
    studio = serializers.CharField(source='studio.name', read_only=True)
    RECURRENCE_CHOICES = ['none', 'daily', 'weekly']
    recurrence = serializers.ChoiceField(choices=RECURRENCE_CHOICES, write_only=True)
    endDate = serializers.DateField(write_only=True)
    
    class Meta:
        model = FitnessClass
        fields = ['id', 'name', 'description', 'coach', 
                  'keywords', 'capacity', 'enrolled', 
                  'startTime', 'endTime', 'studio',
                  'endDate', 'recurrence',]
        read_only_fields = ['id']
        
        
    def create(self, validated_data):
        """
        Creates classes. 
        -   If recurrence is none, create one class and return.
        
        -   If recurrence is daily or monthly, create as many sessions as
            it takes up until endDate and returns ONLY THE LAST CLASS.
            
        -   If the class is recurring, set the baseClass of every class
            created to the id of the first class.
        """
        studio_id = self.context['studio_id']
        if validated_data['recurrence'] == 'none':
            # create one class and return
            return FitnessClass(
                name=validated_data['name'],
                description=validated_data['description'],
                coach=validated_data['coach'],
                keywords=validated_data['keywords'],
                capacity=validated_data['capacity'],
                enrolled=validated_data['enrolled'],
                startTime=validated_data['startTime'],
                endTime=validated_data['endTime'],
                studio=Studio.objects.get(id=studio_id)
            )
        
        curr = validated_data['startTime']
        end = validated_data['endDate']
        
        if validated_data['recurrence'] == 'daily':
            increment = 1   # determine if the recurrence is everyday or every 7 days
        else:
            increment = 7
            
        new = FitnessClass(
                name=validated_data['name'],
                description=validated_data['description'],
                coach=validated_data['coach'],
                keywords=validated_data['keywords'],
                capacity=validated_data['capacity'],
                enrolled=validated_data['enrolled'],
                startTime=validated_data['startTime'],
                endTime=validated_data['endTime'],
                studio=Studio.objects.get(id=studio_id)
            )
        new.save()
        new.baseClass = new.id
        new.save()
        baseClass = new.id
        validated_data['startTime'] += datetime.timedelta(days=increment)
        validated_data['endTime'] += datetime.timedelta(days=increment)
        curr += datetime.timedelta(days=increment)
        
        
        while curr.date() <= end:
            new = FitnessClass(
                name=validated_data['name'],
                description=validated_data['description'],
                coach=validated_data['coach'],
                keywords=validated_data['keywords'],
                capacity=validated_data['capacity'],
                enrolled=validated_data['enrolled'],
                startTime=validated_data['startTime'],
                endTime=validated_data['endTime'],
                baseClass=baseClass,
                studio=Studio.objects.get(id=studio_id)
            )
            new.save()
            validated_data['startTime'] += datetime.timedelta(days=increment)
            validated_data['endTime'] += datetime.timedelta(days=increment)
            curr += datetime.timedelta(days=increment)
        
        return new