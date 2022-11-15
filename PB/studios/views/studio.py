from django.shortcuts import render
from rest_framework.generics import RetrieveAPIView, ListAPIView, RetrieveUpdateAPIView, DestroyAPIView, CreateAPIView
from studios.serializers.studio import StudioSerializer
from studios.models.studio import Studio
from studios.models.amenity import Amenity
from studios.models.fitnessClass import FitnessClass
from django.shortcuts import get_object_or_404, get_list_or_404
from django.utils import timezone

class ViewStudio(RetrieveAPIView):
    serializer_class = StudioSerializer

    def get_object(self):
        return get_object_or_404(Studio, id=self.kwargs['studio_id'])



class CreateStudio(CreateAPIView):
    serializer_class = StudioSerializer
    



class UpdateStudio():
    serializer_class = StudioSerializer
    pass



class UpdateAmenities():
    pass



class DeleteStudio():
    serializer_class = StudioSerializer
    pass



class SearchStudio():
    serializer_class = StudioSerializer
    pass



class StudioSchedule(ListAPIView):
    serializer_class = StudioSerializer
    
    def get_object(self):
        # returns list of classes that have not yet started
        return get_list_or_404(
            FitnessClass,
            studio_id=self.kwargs['studio_id'],studio=self.id,
            startTime__gt=timezone.now()
        )



class ListClosestStudios():
    pass