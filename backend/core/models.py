from django.db import models


class Show(models.Model):
    url = models.URLField()
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    language = models.CharField(max_length=255)
    status = models.ManyToManyField('ShowStatus', related_name='shows')
    runtime = models.PositiveIntegerField(null=True)
    averageRuntime = models.PositiveIntegerField(null=True)
    premiered = models.DateField(null=True)
    ended = models.DateField(null=True)
    officialSite = models.URLField(null=True)
    schedule_time = models.TimeField(null=True)
    schedule_days = models.JSONField(null=True)
    rating = models.FloatField(null=True)
    weight = models.PositiveIntegerField(null=True)
    network = models.ForeignKey('Network', on_delete=models.CASCADE, blank=True, null=True, related_name='shows')
    webChannel = models.JSONField(null=True)
    dvdCountry = models.CharField(max_length=255, null=True)
    externals = models.JSONField(null=True)
    image = models.JSONField(null=True)
    summary = models.TextField(null=True)

    class Meta:
        verbose_name = 'Show'
        verbose_name_plural = 'Shows'


class Genre(models.Model):
    name = models.CharField(max_length=255)
    show = models.ForeignKey(Show, on_delete=models.CASCADE, related_name='genres')

    class Meta:
        verbose_name = 'Genre'
        verbose_name_plural = 'Genres'


class ShowStatus(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        verbose_name = 'ShowStatus'
        verbose_name_plural = 'ShowStatuses'


class Network(models.Model):
    name = models.CharField(max_length=255)
    official_site = models.URLField(null=True)
    country = models.ForeignKey('Country', on_delete=models.CASCADE, blank=True, null=True, related_name='networks')

    class Meta:
        verbose_name = 'Network'
        verbose_name_plural = 'Networks'


class Country(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=255)
    timezone = models.CharField(max_length=255)

    class Meta:
        verbose_name = 'Country'
        verbose_name_plural = 'Countries'
