from rest_framework import serializers
from PB.studios.models.fitnessClass import FitnessClass

class FitnessClassSerializer(serializers.Serializer):
    class Meta:
        model = FitnessClass
        fields = ['name', 'description', 'coach', 'keywords', 'capacity', 'startTime', 'endTime', 'studio']