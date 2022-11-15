from rest_framework import serializers
from PB.studios.models.studio import Studio

class StudioSerializer(serializers.Serializer):
    class Meta:
        model = Studio
        fields = ['name', 'address', 'location', 'postalCode', 'phoneNumber', 'images']
