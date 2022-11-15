from django.shortcuts import render
from rest_framework.generics import RetrieveAPIView, ListAPIView, RetrieveUpdateAPIView, DestroyAPIView
from studios.serializers.fitnessClass import FitnessClassSerializer
from studios.models.fitnessClass import FitnessClass
from django.shortcuts import get_object_or_404

class ViewClass(RetrieveAPIView):
    serializer_class = FitnessClassSerializer

    def get_object(self):
        return get_object_or_404(FitnessClass, id=self.kwargs['class_id'])
    
    

class EditClass():
    pass



class CancelClass():
    pass


  
class ListClasses(ListAPIView):
    pass



class EnrollClass():
    pass



class SearchClass():
    pass