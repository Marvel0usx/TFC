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
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from studios.pagination import StudioPaginator
from accounts.models import UserAccount

class ViewClass(generics.RetrieveAPIView):
    """
    path: studios/class/[class_id]/details
    Takes a GET request from anyone to generate an information page.
    """
    permission_classes = (AllowAny,)
    serializer_class = FitnessClassSerializer

    def get_object(self):
        return get_object_or_404(FitnessClass, id=self.kwargs['class_id'])


class ListClasses(generics.ListAPIView):
    """
    path: studios/[studio_id]/class/list
    Takes a GET request from any user to generate a list of classes
    taking place in studio_id studio.
    """
    serializer_class = FitnessClassSerializer
    pagination_class = StudioPaginator
    
    def get_queryset(self):
        return get_list_or_404(FitnessClass, studio=Studio.objects.get(id=self.kwargs['studio_id']))


# need to wait for user implementation
class EnrollClass(views.APIView):
    """
    path: studios/class/[class_id]/enroll_[mode]
    Enroll in one or all recurring instances of a class
    enroll_one or enroll_all
    """
    def get(self, request, mode, class_id):
        try:
            searchClass = FitnessClass.objects.get(id=class_id)
        except FitnessClass.DoesNotExist:
            return Response({'ERROR': 'Class does not exist.'}, status=404)

        user = self.request.user
        if not searchClass.enrolled < searchClass.capacity:
            return Response({'ERROR': 'Class is at max capacity.'})
                
        try:
            if user.fitness_class.get(id=class_id):
                return Response({'ERROR': 'You have already enrolled in this class.'})
        except FitnessClass.DoesNotExist:
            user.fitness_class.add(searchClass)
            user.save()
            searchClass.enrolled += 1
            searchClass.save()
        
        if mode == 'one':
            successMessage = f'You have enrolled in class {searchClass.id}'
            return Response({'Success': successMessage})
        elif mode == 'all':
            recurringClasses = FitnessClass.objects.filter(
                baseClass = searchClass.baseClass,
                startTime__gt = timezone.now()
            )
            for recurringClass in recurringClasses:
                if recurringClass.enrolled < recurringClass.capacity:
                    try:
                        user.fitness_class.get(id=class_id)
                    except FitnessClass.DoesNotExist:
                        user.fitness_class.add(recurringClass)
                        user.save
                        recurringClass.enrolled += 1
                        recurringClass.save()
            successMessage = f'You have enrolled in class {searchClass.id} and recurring open sessions.'
            return Response({'Success': successMessage})
        else:
            return Response({'ERROR': 'Mode options: [one, all]'}, status=404)



class DropClass(views.APIView):
    """
    path: studios/class/[class_id]/drop_[mode]
    Drop one or all recurring instances of a class
    drop_one or drop_all
    """
    def get(self, request, class_id, mode):
        user = self.request.user
        
        try:
            searchClass = user.fitness_class.get(id=class_id)
        except FitnessClass.DoesNotExist:
            return Response({'ERROR': 'You\'re not enrolled in this class'}, status=404)
        
        user.fitness_class.remove(searchClass)
        user.save()
        searchClass.enrolled -= 1
        searchClass.save()
        if mode == 'one':
            successMessage = f'You have dropped class {searchClass.id}'
            return Response({'Success': successMessage})
        elif mode== 'all':
            recurringClasses = user.fitness_class.filter(
                baseClass = searchClass.baseClass,
                startTime__gt = timezone.now()
            )
            for recurringClass in recurringClasses:
                    user.fitness_class.remove(recurringClass)
                    user.save()
                    recurringClass.enrolled -= 1
                    recurringClass.save()
                    pass
            successMessage = f'You have dropped class {searchClass.id} and recurring sessions.'
            return Response({'Success': successMessage})
        else:
            return Response({'ERROR': 'Mode options: [one, all]'}, status=404)



class ViewSchedule(generics.ListAPIView):
    """
    path: studios/class/schedule
    Get a list of upcoming classes
    """
    serializer_class = FitnessClassSerializer
    pagination_class = StudioPaginator
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        classes = user.fitness_class.filter(startTime__gt=timezone.now())
        return get_list_or_404(classes)



class ViewHistory(generics.ListAPIView):
    """
    path: studios/class/schedule
    Get a list of past classes
    """
    serializer_class = FitnessClassSerializer
    pagination_class = StudioPaginator
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        classes = user.fitness_class.filter(startTime__lt=timezone.now())
        return classes



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
    pagination_class = StudioPaginator
    filterset_class = ClassFilter
    filter_backends = (filters.DjangoFilterBackend,)
    
    
    
    
    
    
    
    
""" 
useless Admin API    
class CreateClass(generics.CreateAPIView):
    
    path: studios/[studio_id]/class/create
    Takes a POST request from an admin to create a class for studio_id studio.
    
    serializer_class = FitnessClassSerializer
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({'studio_id': self.kwargs['studio_id']})
        return context
    

class UpdateClass(generics.UpdateAPIView, generics.RetrieveAPIView):
    
    path: studios/class/[class_id]/edit
    Takes a PUT/PATCH request from an admin to update class_id class.
    
    serializer_class = FitnessClassSerializer

    def get_object(self):
        return get_object_or_404(FitnessClass, id=self.kwargs['class_id'])



class CancelClass(generics.DestroyAPIView, generics.RetrieveAPIView):

    path: studios/class/[class_id]/cancel/single
    Takes a DELETE request from an admin to delete a single class_id class.
    serializer_class = FitnessClassSerializer
    
    def get_object(self):
        return get_object_or_404(FitnessClass, id=self.kwargs['class_id'], startTime__gt=timezone.now())



class CancelRecurringClasses(generics.DestroyAPIView, generics.RetrieveAPIView):

    path: studios/class/[class_id]/cancel/all
    Takes a DELETE request from an admin to delete all future recurring classes 
    associated with class_id.
    serializer_class = FitnessClassSerializer
    
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
        return Response(status=status.HTTP_204_NO_CONTENT)"""
