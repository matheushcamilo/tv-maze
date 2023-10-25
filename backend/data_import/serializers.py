from rest_framework import serializers

from data_import.models import TVMazeShow
from helpers.html_formatting import remove_html_tags


class TVMazeShowSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source="name")
    rating = serializers.SerializerMethodField()
    genres = serializers.SerializerMethodField()
    schedule = serializers.SerializerMethodField()
    summary = serializers.SerializerMethodField()

    @staticmethod
    def get_rating(obj):
        return obj.rating.get("average")

    @staticmethod
    def get_genres(obj):
        return ", ".join(obj.genres) if obj.genres else ""

    @staticmethod
    def get_schedule(obj):
        time = obj.schedule.get("time", None)
        days = obj.schedule.get("days", None)

        if not (time or days):
            return "No schedule available"

        days = [day[:3] for day in days] if len(days) > 1 else days

        return (
            f"{time if time else 'No time available'} | "
            f"{', '.join(days) if days else 'No days available'}"
        )

    @staticmethod
    def get_summary(obj):
        return remove_html_tags(obj.summary) if obj.summary else ""

    class Meta:
        model = TVMazeShow
        fields = [
            "id",
            "title",
            "rating",
            "status",
            "genres",
            "language",
            "image",
            "schedule",
            "genres",
            "summary",
        ]


class TVMazeSeasonSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    number = serializers.IntegerField()
    name = serializers.CharField()
    episodeOrder = serializers.IntegerField()
    premiereDate = serializers.DateField()
    endDate = serializers.DateField()
    network = serializers.SerializerMethodField()
    webChannel = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    summary = serializers.SerializerMethodField()

    @staticmethod
    def get_network(obj):
        return obj.get("network", None)

    @staticmethod
    def get_webChannel(obj):
        return obj.get("webChannel", None)

    @staticmethod
    def get_image(obj):
        return obj.get("image", None)

    @staticmethod
    def get_summary(obj):
        summary = obj.get("summary", None)
        return remove_html_tags(summary) if summary else ""
