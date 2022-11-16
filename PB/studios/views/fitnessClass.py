from django.shortcuts import render
from rest_framework import generics, filters
from studios.serializers.fitnessClass import FitnessClassSerializer
from studios.models.studio import Studio
from studios.models.fitnessClass import FitnessClass
from django.shortcuts import get_object_or_404, get_list_or_404

class ViewClass(generics.RetrieveAPIView):
    serializer_class = FitnessClassSerializer

    def get_object(self):
        return get_object_or_404(FitnessClass, id=self.kwargs['class_id'])
    
    
class CreateClass(generics.CreateAPIView):
    serializer_class = FitnessClassSerializer
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({'studio_id': self.kwargs['studio_id']})
        return context
    

class UpdateClass(generics.UpdateAPIView, generics.RetrieveAPIView):
    serializer_class = FitnessClassSerializer

    def get_object(self):
        return get_object_or_404(FitnessClass, id=self.kwargs['class_id'])


# can currently only cancel 1 class, not recurring classes
class CancelClass(generics.DestroyAPIView, generics.RetrieveAPIView):
    serializer_class = FitnessClassSerializer
    
    def get_object(self):
        return get_object_or_404(FitnessClass, id=self.kwargs['class_id'])



class ListClasses(generics.ListAPIView):
    serializer_class = FitnessClassSerializer
    
    def get_queryset(self):
        return get_list_or_404(FitnessClass, studio=Studio.objects.get(id=self.kwargs['studio_id']))


# need to wait for user implementation
class EnrollClass():
    pass


# yet to implement time range, but date works
class SearchClass(generics.ListAPIView):
    """
    Usage: search/?search=[query]
    -   takes partial matches
    -   separate arguments separated by comma ,
    """
    serializer_class = FitnessClassSerializer
    queryset = FitnessClass.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'coach', 'startTime']