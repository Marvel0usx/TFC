from django.shortcuts import render
from rest_framework import generics, filters
from studios.serializers.studio import StudioSerializer
from studios.serializers.amenity import AmenitySerializer
from studios.models.amenity import Amenity
from studios.models.studio import Studio
from studios.models.fitnessClass import FitnessClass
from django.shortcuts import get_object_or_404, get_list_or_404
from django.utils import timezone
from studios.serializers.fitnessClass import FitnessClassSerializer


class ViewStudio(generics.RetrieveAPIView):
    serializer_class = StudioSerializer

    def get_object(self):
        return get_object_or_404(Studio, id=self.kwargs['studio_id'])
    

class CreateStudio(generics.CreateAPIView):
    serializer_class = StudioSerializer


class UpdateStudio(generics.UpdateAPIView, generics.RetrieveAPIView):
    serializer_class = StudioSerializer
    
    def get_object(self):
        return get_object_or_404(Studio, id=self.kwargs['studio_id'])



class CreateAmenity(generics.CreateAPIView):
    serializer_class = AmenitySerializer



class UpdateAmenities(generics.ListAPIView, generics.UpdateAPIView):
    serializer_class = AmenitySerializer
    
    def get_queryset(self):
        return get_list_or_404(Amenity, studio=Studio.objects.get(id=self.kwargs['studio_id']))

    def get_object(self):
        return get_object_or_404(
            Amenity,
            studio=Studio.objects.get(id=self.kwargs['studio_id']),
            type=self.request.data['type']
        )
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({'studio_id': self.kwargs['studio_id']})
        return context



class DeleteStudio(generics.DestroyAPIView, generics.RetrieveAPIView):
    serializer_class = StudioSerializer
    
    def get_object(self):
        return get_object_or_404(Studio, id=self.kwargs['studio_id'])
    


class SearchStudio(generics.ListAPIView):
    """
    Usage: search/?search=[query]
    -   takes partial matches
    -   separate arguments separated by comma
    -   searches every field for the queries
    """
    serializer_class = StudioSerializer
    queryset = Studio.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'fitnessclass__name', 'amenity__type', 'fitnessclass__coach']


# to be tested
class StudioSchedule(generics.ListAPIView):
    serializer_class = FitnessClassSerializer
    
    def get_queryset(self):
        # returns list of classes that have not yet started
        return get_list_or_404(
            FitnessClass,
            studio_id=self.kwargs['studio_id'],
            startTime__gt=timezone.now()
        )



class ListClosestStudios():
    pass