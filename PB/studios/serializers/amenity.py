from rest_framework import serializers
from studios.models.amenity import Amenity

class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields = '__all__'

    def create(self, validated_data):
        return super().create(validated_data)
        
class AmenityUpdateSerializer(AmenitySerializer):
    
    class Meta:
        model = Amenity
        fields=['quantity']