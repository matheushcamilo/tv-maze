from rest_framework import generics, status
from rest_framework.response import Response

from data_import.import_processes.tvmaze_data_import import TVMazeImport
from data_import.models import TVMazeShow
from data_import.serializers import TVMazeShowSerializer, TVMazeSeasonSerializer, TVMazeEpisodesSerializer

from helpers.pagination import BasePagination


class TVMazeShowListApiView(generics.ListAPIView):
    serializer_class = TVMazeShowSerializer
    pagination_class = BasePagination
    queryset = TVMazeShow.objects.available_shows()


class TVMazeSeasonsByShowApiView(generics.GenericAPIView):
    lookup_url_kwarg = "id"
    serializer_class = TVMazeSeasonSerializer
    queryset = TVMazeShow.objects.available_shows()

    def get(self, request, *args, **kwargs):
        try:
            show = self.get_object()
            seasons_import = TVMazeImport.create_tv_maze_direct_import(
                kwarg_params=["shows", str(show.tv_maze_id)],
                url_complement="seasons"
            )
            data = seasons_import.import_tv_maze_data()
            serializer = self.get_serializer(data, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class TVMazeSeasonEpisodesApiView(generics.GenericAPIView):
    serializer_class = TVMazeEpisodesSerializer
    queryset = []

    def get(self, request, *args, **kwargs):
        try:
            season_id = self.kwargs.get("id")
            episodes_import = TVMazeImport.create_tv_maze_direct_import(
                kwarg_params=["seasons", str(season_id)],
                url_complement="episodes"
            )
            data = episodes_import.import_tv_maze_data()
            serializer = self.get_serializer(data, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
