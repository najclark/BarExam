from . import secret
import requests
import json

class Genius:
    base_url = "http://api.genius.com"
    auth = 'Bearer ' + secret.access_token


    def search(self, search_term):
        headers = {'Authorization': self.auth}
        search_url = self.base_url + "/search"
        params = {'q': search_term}
        
        return requests.get(search_url, params=params, headers=headers).json()

# genius = Genius()
# img_url = genius.search("Bhad Bhabie")['response']['hits'][0]['result']['primary_artist']['image_url']
# print(img_url)
