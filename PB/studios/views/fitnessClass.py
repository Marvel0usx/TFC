from django.shortcuts import render
from rest_framework import generics, views
from django_filters import rest_framework as filters
from studios.serializers.fitnessClass import FitnessClassSerializer
from studios.models.studio import Studio
from studios.models.fitnessClass import FitnessClass
from django.shortcuts import get_object_or_404, get_list_or_404
from studios.filters import ClassFilter
from rest_framework import status
from rest_framework.response import Response
from django.utils import timezone
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

class ViewClass(generics.RetrieveAPIView):
    """
    path: studios/class/[class_id]/details
    Takes a GET request from any user to generate an information page.
    """
    serializer_class = FitnessClassSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(FitnessClass, id=self.kwargs['class_id'])

    
class CreateClass(generics.CreateAPIView):
    """
    path: studios/[studio_id]/class/create
    Takes a POST request from an admin to create a class for studio_id studio.
    """
    serializer_class = FitnessClassSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({'studio_id': self.kwargs['studio_id']})
        return context
    

class UpdateClass(generics.UpdateAPIView, generics.RetrieveAPIView):
    """
    path: studios/class/[class_id]/edit
    Takes a PUT/PATCH request from an admin to update class_id class.
    """
    serializer_class = FitnessClassSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(FitnessClass, id=self.kwargs['class_id'])



class CancelClass(generics.DestroyAPIView, generics.RetrieveAPIView):
    """
    path: studios/class/[class_id]/cancel/single
    Takes a DELETE request from an admin to delete a single class_id class.
    """
    serializer_class = FitnessClassSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return get_object_or_404(FitnessClass, id=self.kwargs['class_id'], startTime__gt=timezone.now())



class CancelRecurringClasses(generics.DestroyAPIView, generics.RetrieveAPIView):
    """
    path: studios/class/[class_id]/cancel/all
    Takes a DELETE request from an admin to delete all future recurring classes 
    associated with class_id.
    """
    serializer_class = FitnessClassSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return get_object_or_404(FitnessClass, id=self.kwargs['class_id'])
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        base = instance.baseClass
        if base is not None:
            # filter all the classes that have the same base class and have yet to begin
            allClasses = FitnessClass.objects.filter(baseClass=base, startTime__gt=timezone.now())
            for fclass in allClasses:
                self.perform_destroy(fclass)
        else:
            self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class ListClasses(generics.ListAPIView):
    """
    path: studios/[studio_id]/class/list
    Takes a GET request from any user to generate a list of classes
    taking place in studio_id studio.
    """
    serializer_class = FitnessClassSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return get_list_or_404(FitnessClass, studio=Studio.objects.get(id=self.kwargs['studio_id']))


# need to wait for user implementation
class EnrollClass(views.APIView):
    def get(self, request, args, kwargs):
        object = FitnessClass.objects.get(id=self.kwargs['class_id'])
        if object.capacity > object.enrolled:
            #enroll the user
            pass
        return Response('success')



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
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = FitnessClass.objects.all()
    filterset_class = ClassFilter
    filter_backends = (filters.DjangoFilterBackend,)