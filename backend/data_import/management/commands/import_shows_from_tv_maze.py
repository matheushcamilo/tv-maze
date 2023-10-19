from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Import all available shows from TV Maze API"

    def handle(self, *args, **kwargs):
        from data_import.import_processes.tvmaze_import_process import TVMazeImportProcess
        try:
            TVMazeImportProcess.import_data()
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f"Error importing shows from TV Maze API: {e}")
            )
