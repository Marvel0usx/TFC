from django.shortcuts import render
from rest_framework.generics import RetrieveAPIView
from PB.studios.serializers.studio import StudioSerializer
from PB.studios.models.studio import Studio
from django.shortcuts import get_object_or_404

class StudioView(RetrieveAPIView):
    serializer_class = StudioSerializer

    def get_object(self):
        return get_object_or_404(Studio, id=self.kwargs['studio_id'])