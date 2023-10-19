from data_import.import_processes.tvmaze_data_import import TVMazeImport
from data_import.models import TVMazeShow


class TVMazeImportProcess:
    @staticmethod
    def import_data():
        tv_show_import = TVMazeImport(TVMazeShow, use_pagination=True)
        tv_show_import.import_data()
