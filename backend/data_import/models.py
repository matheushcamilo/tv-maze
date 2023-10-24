from django.db import models

import logging

logger = logging.getLogger(__name__)


class ImportedDataMixin(models.Model):
    tv_maze_id = models.PositiveIntegerField(unique=True)

    class Meta:
        abstract = True

    @classmethod
    def save_imported_data(cls, imported_data: list):
        try:
            data_to_create = []
            tv_maze_ids_in_db = cls.objects.values_list("tv_maze_id", flat=True)
            for data in imported_data:
                tv_maze_id = data.get("id")
                data["tv_maze_id"] = tv_maze_id
                del data["id"]
                if tv_maze_id in tv_maze_ids_in_db:
                    cls.objects.filter(tv_maze_id=tv_maze_id).update(**data)
                else:
                    data_to_create.append(cls(**data))

            cls.objects.bulk_create(data_to_create)
        except Exception as e:
            logger.error(f"Exception occurred when saving data for {cls.__class__}: {e}")


class TVMazeShow(ImportedDataMixin):
    url = models.URLField(null=True)
    name = models.CharField(max_length=255, null=True)
    type = models.CharField(max_length=255, null=True)
    language = models.CharField(max_length=255, null=True)
    genres = models.JSONField(null=True)
    status = models.CharField(max_length=255, null=True)
    runtime = models.PositiveIntegerField(null=True)
    averageRuntime = models.PositiveIntegerField(null=True)
    premiered = models.DateField(null=True)
    ended = models.DateField(null=True)
    officialSite = models.URLField(null=True)

    schedule = models.JSONField(null=True)

    rating = models.JSONField(null=True)
    weight = models.PositiveIntegerField(null=True)

    network = models.JSONField(null=True)

    webChannel = models.JSONField(null=True)
    dvdCountry = models.CharField(max_length=255, null=True)

    externals = models.JSONField(null=True)

    image = models.JSONField(null=True)

    summary = models.TextField(null=True)
    updated = models.CharField(max_length=255, null=True)

    _links = models.JSONField(null=True)

    def __str__(self):
        return self.name
