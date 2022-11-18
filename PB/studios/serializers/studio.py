from rest_framework import serializers
from studios.models.studio import Studio

class StudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Studio
        fields = ['id', 'name', 'address', 'locationX', 'locationY', 'postalCode', 'phoneNumber', 'images']
        read_only_fields = ['id']

    def create(self, validated_data):
        return super().create(validated_data)