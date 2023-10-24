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
