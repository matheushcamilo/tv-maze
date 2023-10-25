from django.urls import path

from data_import.apis import TVMazeShowListView, TVMazeSeasonsByShowView

urlpatterns = [
    path(
        "shows/",
        TVMazeShowListView.as_view(),
        name="tvmaze-show-list",
    ),
    path(
        "shows/<int:id>/seasons/",
        TVMazeSeasonsByShowView.as_view(),
        name="tvmaze-seasons-by-show",
    )
]
