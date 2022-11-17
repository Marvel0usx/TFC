from django.shortcuts import render
from rest_framework import generics
from django_filters import rest_framework as filters
from studios.serializers.fitnessClass import FitnessClassSerializer
from studios.models.studio import Studio
from studios.models.fitnessClass import FitnessClass
from django.shortcuts import get_object_or_404, get_list_or_404
from studios.filters import ClassFilter

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



class SearchClass(generics.ListAPIView):
    """
    Usage: search/?=[name]=[query]&...
    -   takes partial matches (amenity type must be exact)
    -   supports name, coach, date, and time_range
    -   name and coach are strings
    -   date follows the format YYYY-MM-DD
    -   time_range (24 hour time) follows the format (start)HH:MM-(end)HH:MM
    
    Example: search/?name=church&coach=jesus&date=2022-12-15&time_range=7:00-19:00
    """
    serializer_class = FitnessClassSerializer
    queryset = FitnessClass.objects.all()
    filterset_class = ClassFilter
    filter_backends = (filters.DjangoFilterBackend,)