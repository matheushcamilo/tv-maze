from rest_framework import generics

from data_import.models import TVMazeShow
from data_import.serializers import TVMazeShowSerializer

from helpers.pagination import BasePagination


class TVMazeShowListView(generics.ListAPIView):
    serializer_class = TVMazeShowSerializer
    pagination_class = BasePagination
    queryset = TVMazeShow.objects.filter(
        name__isnull=False,
        image__isnull=False,
    )
