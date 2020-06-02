from bs4 import BeautifulSoup
import requests
import json
import os


class Genius:
    base_url = "http://api.genius.com"
    auth = 'Bearer ' + os.environ.get('ACCESS_TOKEN')

    def search(self, search_term):
        headers = {'Authorization': self.auth}
        search_url = self.base_url + "/search"
        params = {'q': search_term}

        return requests.get(search_url, params=params, headers=headers).json()

    def lyrics_from_song_id(self, song_id):
        #https://bigishdata.com/2016/09/27/getting-song-lyrics-from-geniuss-api-scraping/
        song_url = "http://api.genius.com/songs/" + song_id
        headers = {'Authorization': self.auth}
        response = requests.get(song_url, headers=headers)
        json = response.json()
        path = json["response"]["song"]["path"]
        song_title = json["response"]["song"]["title"]
        #gotta go regular html scraping... come on Genius
        page_url = "http://genius.com" + path
        page = requests.get(page_url)
        html = BeautifulSoup(page.text, "html.parser")
        #remove script tags that they put in the middle of the lyrics
        [h.extract() for h in html('script')]
        #at least Genius is nice and has a tag called 'lyrics'!
        lyrics = html.find("div", class_="lyrics").get_text() #updated css where the lyrics are based in HTML
        return {'song_title': song_title, 'lyrics': lyrics.strip()}
