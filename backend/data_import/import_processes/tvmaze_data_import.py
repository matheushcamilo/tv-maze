from typing import Type

from data_import.models import ImportedDataMixin


import requests

BASE_URL = "https://api.tvmaze.com/"
SUB_URL_MAP = {
    "TVMazeShow": "shows",
}


class TVMazeImport:
    def __init__(self, model_class: Type[ImportedDataMixin], use_pagination=False):
        self.base_url = BASE_URL + SUB_URL_MAP[model_class.__name__]
        self.use_pagination = use_pagination
        self.model_class = model_class

    def __get_data_from_url(self, params=None, supress_error=False):
        response = requests.get(self.base_url, params=params)
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

    def __import_data_as_json(self):
        try:
            if self.use_pagination:
                imported_data = self.__get_data_from_paginated_url()
            else:
                imported_data, _ = self.__get_data_from_url()
            return imported_data
        except Exception as e:
            print(f"Exception occurred: {e}")

    def import_data(self):
        imported_data = self.__import_data_as_json()
        self.model_class.save_imported_data(imported_data)
