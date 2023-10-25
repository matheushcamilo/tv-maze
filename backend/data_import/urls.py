from django.urls import path

from data_import.apis import TVMazeShowListApiView, TVMazeSeasonsByShowApiView, TVMazeSeasonEpisodesApiView

urlpatterns = [
    path(
        "shows/",
        TVMazeShowListApiView.as_view(),
        name="tvmaze-show-list",
    ),
    path(
        "shows/<int:id>/seasons/",
        TVMazeSeasonsByShowApiView.as_view(),
        name="tvmaze-seasons-by-show",
    ),
    path(
        "seasons/<int:id>/episodes/",
        TVMazeSeasonEpisodesApiView.as_view(),
        name="tvmaze-episodes-by-season",
    )
]
