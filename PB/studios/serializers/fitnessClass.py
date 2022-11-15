from rest_framework import serializers
from studios.models.fitnessClass import FitnessClass

class FitnessClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = FitnessClass
        fields = ['name', 'description', 'coach', 'keywords', 'capacity', 'startTime', 'endTime', 'studio']
