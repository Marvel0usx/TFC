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
        fields = ['name', 'description', 'coach', 
                  'keywords', 'capacity', 'enrolled', 
                  'startTime', 'endTime', 'studio',
                  'endDate', 'recurrence',]

    def create(self, validated_data):
        """
        Creates classes. 
        -   If reccurence is none, create one class and return.
        -   If reccurence is daily or monthly, create as many sessions as
            it takes up until endDate and returns ONLY THE LAST CLASS.
        """
        studio_id = self.context['studio_id']
        if validated_data['recurrence'] == 'none':
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
        
        classesCreated = []
        curr = validated_data['startTime']
        end = validated_data['endDate']
        
        if validated_data['recurrence'] == 'daily':
            increment = 1
        else:
            increment = 7
        
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
                studio=Studio.objects.get(id=studio_id)
            )
            new.save()
            classesCreated.append(new)
            validated_data['startTime'] += datetime.timedelta(days=increment)
            validated_data['endTime'] += datetime.timedelta(days=increment)
            curr += datetime.timedelta(days=increment)
        
        return classesCreated[len(classesCreated) - 1]