from rest_framework import serializers
from studios.models.studio import Studio

class StudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Studio
        fields = ['name', 'address', 'location', 'postalCode', 'phoneNumber', 'images']
