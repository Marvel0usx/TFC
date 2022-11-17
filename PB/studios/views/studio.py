from django.shortcuts import render
from rest_framework import generics, filters, views, response
from django_filters import rest_framework as filters
from studios.serializers.studio import StudioSerializer
from studios.serializers.amenity import AmenitySerializer
from studios.models.amenity import Amenity
from studios.models.studio import Studio
from studios.models.fitnessClass import FitnessClass
from django.shortcuts import get_object_or_404, get_list_or_404
from django.utils import timezone
from studios.serializers.fitnessClass import FitnessClassSerializer
from studios.filters import StudioFilter
import math
from operator import itemgetter

# TODO: implement directions and such
class ViewStudio(generics.RetrieveAPIView):
    """
    path: studios/[studio_id]/view
    Takes a GET request from any user to generate an information page.
    """
    serializer_class = StudioSerializer

    def get_object(self):
        return get_object_or_404(Studio, id=self.kwargs['studio_id'])
    

class CreateStudio(generics.CreateAPIView):
    """
    path: studios/create
    Takes a POST request from an admin to create a new studio.
    """
    serializer_class = StudioSerializer


class UpdateStudio(generics.UpdateAPIView, generics.RetrieveAPIView):
    """
    path: studios/[studio_id]/edit
    Takes a PATCH/PUT request from an admin to update studio information.
    """
    serializer_class = StudioSerializer
    
    def get_object(self):
        return get_object_or_404(Studio, id=self.kwargs['studio_id'])



class CreateAmenity(generics.CreateAPIView):
    """
    path: studios/[studio_id]/amenities/create
    Takes a POST request from an admin to create a new amenity in 
    [studio_id] studio.
    """
    serializer_class = AmenitySerializer



class UpdateAmenities(generics.ListAPIView, generics.UpdateAPIView):
    """
    path: studios/[studio_id]/amenities/edit
    Takes a PATCH/PUT request from an admin to update amenity quantity.
    """
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
    """
    path: studios/create
    Takes a DELETE request from an admin to delete a studio.
    """
    serializer_class = StudioSerializer
    
    def get_object(self):
        return get_object_or_404(Studio, id=self.kwargs['studio_id'])
    


class SearchStudio(generics.ListAPIView):
    """
    User can search for desired studio through the URL.
    path: studios/search
    Usage: search/?=[name]=[query]&...
    -   takes partial matches
    -   supports name, fitnessclass, amenity, coach
    -   all fields are strings
    
    Example: search/?name=church&amenity=cross
    """
    serializer_class = StudioSerializer
    queryset = Studio.objects.all()
    filterset_class = StudioFilter
    filter_backends = (filters.DjangoFilterBackend,)



class StudioSchedule(generics.ListAPIView):
    """
    path: studios/[studio_id]/schedule
    Takes a GET request from any user to create a schedule of upcoming
    classes for that studio.
    """
    serializer_class = FitnessClassSerializer
    
    def get_queryset(self):
        # returns list of classes that have not yet started
        return get_list_or_404(
            FitnessClass,
            studio_id=self.kwargs['studio_id'],
            startTime__gt=timezone.now()
        )



class ListClosestStudios(views.APIView):
    """
    path: studios/list
    Takes a POST request from any user to generate studio list sorted by 
    closest to furthest from provided latitude (x) and longitude (y).
    """
    def get(self, request, *args, **kwargs):
        return response.Response('give me location in terms of x and y')
    
    def post(self, request, *args, **kwargs):
        studios = Studio.objects.all()
        x = request.data['x']
        y = request.data['y']
        pairs = []
        for studio in studios:
            print(studio)
            pairs.append((studio.distance(x, y), studio))
            
        pairs = sorted(pairs, key=itemgetter(0))
        studiosSorted = []
        for pair in pairs:
            studiosSorted.append(pair[1])
        
        serializer = StudioSerializer(studiosSorted, many=True)
        return response.Response({'studios by location': serializer.data})