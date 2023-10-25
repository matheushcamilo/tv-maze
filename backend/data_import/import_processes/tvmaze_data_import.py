from typing import Type

from data_import.models import ImportedDataMixin

import logging

import requests

BASE_URL = "https://api.tvmaze.com/"
SUB_URL_MAP = {
    "TVMazeShow": "shows",
}

logger = logging.getLogger(__name__)


class TVMazeImport:
    def __init__(self, model_class: Type[ImportedDataMixin], use_pagination=False):
        self.base_url = BASE_URL + SUB_URL_MAP[model_class.__name__]
        self.use_pagination = use_pagination
        self.model_class = model_class

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

    def __import_data(self):
        logger.info(f"Importing {self.model_class.__name__} data from TVMaze")
        return self.__get_tv_maze_data_as_json()

    def import_tv_maze_data_and_save_it_as_local_cache(self):
        data_from_tv_maze = self.__import_data()
        self.model_class.save_imported_data(data_from_tv_maze)
        logger.info(f"{self.model_class.__name__} data successfully imported from TVMaze")
