from data_import.import_processes.tvmaze_data_import import TVMazeImport
from data_import.models import TVMazeShow
import logging
from timeit import default_timer as timer

logger = logging.getLogger(__name__)


class TVMazeImportProcess:
    @staticmethod
    def import_data():
        logger.info("Starting TVMaze import process")

        start = timer()

        tv_show_import = TVMazeImport(TVMazeShow, use_pagination=True)
        tv_show_import.import_tv_maze_data_and_save_it_as_local_cache()

        end = timer()

        logger.info("TVMaze import process finished")
        logger.info(f"Time elapsed: {end - start} seconds")
