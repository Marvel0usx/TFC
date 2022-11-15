from django.shortcuts import render
from rest_framework.generics import RetrieveAPIView
from PB.studios.serializers.fitnessClass import FitnessClassSerializer
from PB.studios.models.fitnessClass import FitnessClass
from django.shortcuts import get_object_or_404

class StudioView(RetrieveAPIView):
    serializer_class = FitnessClassSerializer

    def get_object(self):
        return get_object_or_404(FitnessClass, id=self.kwargs['class_id'])