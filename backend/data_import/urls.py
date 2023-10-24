from django.urls import path

from data_import.apis import TVMazeShowListView

urlpatterns = [
    path(
        "shows/",
        TVMazeShowListView.as_view(),
        name="tvmaze-show-list",
    )
]
