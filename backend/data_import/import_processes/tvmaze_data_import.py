from typing import Type

import functools

from data_import.models import ImportedDataMixin

import logging

import requests

BASE_URL = "https://api.tvmaze.com/"
SUB_URL_MAP = {
    "TVMazeShow": "shows",
}

logger = logging.getLogger(__name__)


class TVMazeImport:
    def __init__(
            self,
            local_tv_maze_class: Type[ImportedDataMixin] = None,
            use_pagination=False
    ):
        self.base_url = (BASE_URL + SUB_URL_MAP.get(local_tv_maze_class.__name__)) if local_tv_maze_class else ""
        self.use_pagination = use_pagination
        self.local_tv_maze_class = local_tv_maze_class

    @classmethod
    def create_tv_maze_direct_import(cls, kwarg_params: list, url_complement: str = ""):
        """
        Creates an instance of TVMazeImport that will be used for direct imports only. This means that the data will
        not be saved in the local cache.
        """
        instance = cls(local_tv_maze_class=None, use_pagination=False)
        instance.base_url = BASE_URL + functools.reduce(lambda x, y: x + "/" + y, kwarg_params) + "/" + url_complement
        return instance

    def __get_data_from_url(self, params=None, supress_error=False, **kwargs):
        response = requests.get(self.base_url, params=params, **kwargs)
        if not supress_error and response.status_code != 200:
            raise Exception(f"Error getting data from {self.base_url}. Status code: {response.status_code}")
        return response.json(), response.status_code

    def __get_data_from_paginated_url(self):
        imported_data = []
        page_number = 0
        status_code = 200
        while status_code == 200:
            json_response, status_code = self.__get_data_from_url(supress_error=True, params={"page": page_number})
            imported_data.extend(json_response)
            page_number += 1

        if not imported_data:
            raise Exception(f"Error getting data from {self.base_url}. Status code: {status_code}")

        return imported_data

    def __get_tv_maze_data_as_json(self):
        try:
            if self.use_pagination:
                imported_data = self.__get_data_from_paginated_url()
            else:
                imported_data, _ = self.__get_data_from_url()
            return imported_data
        except Exception as e:
            logger.error(f"Exception occurred when importing data from {self.base_url}: {e}")
            raise e

    def import_tv_maze_data_and_save_it_as_local_cache(self):
        try:
            data_from_tv_maze = self.import_tv_maze_data()
            logger.info(f"Saving {self.local_tv_maze_class.__name__} data as local cache.")
            self.local_tv_maze_class.save_imported_data(data_from_tv_maze)
            logger.info(f"{self.local_tv_maze_class.__name__} data successfully saved in local cache.")
        except Exception:
            logger.error(f"Error while importing data from TVMaze.")
            logger.info("Process ended.")

    def import_tv_maze_data(self):
        logger.info("Importing data from TVMaze")
        imported_data = self.__get_tv_maze_data_as_json()
        logger.info("Data successfully imported from TVMaze")
        return imported_data
