from django.shortcuts import render
from rest_framework import generics, filters, views, response
from django_filters import rest_framework as filters
from studios.serializers.studio import StudioSerializer
from studios.serializers.amenity import AmenitySerializer, AmenityUpdateSerializer
from studios.models.amenity import Amenity
from studios.models.studio import Studio
from studios.models.fitnessClass import FitnessClass
from django.shortcuts import get_object_or_404, get_list_or_404
from django.utils import timezone
from studios.serializers.fitnessClass import FitnessClassSerializer
from studios.filters import StudioFilter
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from operator import itemgetter
from studios.pagination import StudioPaginator

# TODO: implement directions and such
class ViewStudio(generics.RetrieveAPIView):
    """
    path: studios/[studio_id]/view
    Takes a GET request from anyone to generate an information page.
    """
    serializer_class = StudioSerializer

    def get_object(self):
        return get_object_or_404(Studio, id=self.kwargs['studio_id'])
    
    def finalize_response(self, request, response, *args, **kwargs):
        response = super().finalize_response(request, response, *args, **kwargs)
        try:
            if self.kwargs['x'] is not None:
                x = self.kwargs['x']
                y = self.kwargs['y']
                studio = self.get_object()
                directions = f'https://www.google.com/maps/dir/?api=1&origin=\
{y},{x}&destination={studio.locationY},{studio.locationX}'
                response.data['link to directions'] = directions
            return response
        except KeyError:
            response.data['message'] = 'To get directions, append /mylocation=[longitude],[latitude] to the URL.'
            return response
        
        

class CreateStudio(generics.CreateAPIView):
    """
    path: studios/create
    Takes a POST request from an admin to create a new studio.
    """
    serializer_class = StudioSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class UpdateStudio(generics.UpdateAPIView, generics.RetrieveAPIView):
    """
    path: studios/[studio_id]/edit
    Takes a PATCH/PUT request from an admin to update studio information.
    """
    serializer_class = StudioSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return get_object_or_404(Studio, id=self.kwargs['studio_id'])



class CreateAmenity(generics.CreateAPIView):
    """
    path: studios/[studio_id]/amenities/create
    Takes a POST request from an admin to create a new amenity in 
    [studio_id] studio.
    """
    serializer_class = AmenitySerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]



class AmenitiesList(generics.ListAPIView):
    """
    path: studios/[studio_id]/amenities/edit
    Generates a list of amenities belonging to studio_id studio.
    Go to studios/amenities/edit/[amenity_id] to edit the quantity of a 
    specific amenity.
    """
    serializer_class = AmenitySerializer
    pagination_class = StudioPaginator
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return get_list_or_404(Amenity, studio=Studio.objects.get(id=self.kwargs['studio_id']))


class UpdateAmenity(generics.UpdateAPIView):
    """
    path: studios/amenities/edit/[amenity_id]
    Takes a PATCH/PUT request from an admin to update amenity quantity.
    """
    serializer_class = AmenityUpdateSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get_object(self):
        return get_object_or_404(Amenity, id=self.kwargs['amenity_id'])



class DeleteStudio(generics.DestroyAPIView, generics.RetrieveAPIView):
    """
    path: studios/create
    Takes a DELETE request from an admin to delete a studio.
    """
    serializer_class = StudioSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return get_object_or_404(Studio, id=self.kwargs['studio_id'])
    


class SearchStudio(generics.ListAPIView):
    """
    Anyone can search for desired studio through the URL.
    path: studios/search
    Usage: search/?=[name]=[query]&...
    -   takes partial matches
    -   supports name, fitnessclass, amenity, coach
    -   all fields are strings
    
    Example: search/?name=church&amenity=cross
    """
    serializer_class = StudioSerializer
    pagination_class = StudioPaginator
    queryset = Studio.objects.all()
    filterset_class = StudioFilter
    filter_backends = (filters.DjangoFilterBackend,)



class StudioSchedule(generics.ListAPIView):
    """
    path: studios/[studio_id]/schedule
    Takes a GET request from anyone to create a schedule of upcoming
    classes for that studio.
    """
    serializer_class = FitnessClassSerializer
    pagination_class = StudioPaginator
    
    def get_queryset(self):
        # returns list of classes that have not yet started
        return get_list_or_404(
            FitnessClass,
            studio_id=self.kwargs['studio_id'],
            startTime__gt=timezone.now()
        )


class ListClosestStudios(generics.ListAPIView):
    """
    path: studios/list
    Takes a POST request from any user to generate studio list sorted by 
    closest to furthest from provided latitude (x) and longitude (y).
    """
    serializer_class = StudioSerializer
    pagination_class = StudioPaginator
    
    def get_queryset(self):
        studios = Studio.objects.all()
        x = float(self.kwargs['x'])
        y = float(self.kwargs['y'])
        pairs = []
        for studio in studios:
            pairs.append((studio.distance(x, y), studio))
            
        pairs = sorted(pairs, key=itemgetter(0))
        studiosSorted = []
        for pair in pairs:
            studiosSorted.append(pair[1])
        
        serializer = self.serializer_class(studiosSorted, many=True)
        return serializer.data