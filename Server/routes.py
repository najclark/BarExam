from flask import render_template, request, redirect, jsonify
from __init__ import app, db
import apimanager
import models
from random import shuffle


@app.route('/getbars')
def getbars():
    num = int(request.args.get('batch_size'))

    bars = list(db.session.query(models.Bar).all())
    shuffle(bars) #works inplace
    batch = []
    i = 0
    while i < num and i < len(bars):
        options = []
        correct_artist = models.Artist.query.get(bars[i].CorrectArtist)
        # Get list of artists other than the correct_artist
        wrong_artists = models.Artist.query.filter(models.Artist.Name != correct_artist.Name).all()
        shuffle(wrong_artists)  # works inplace, returns None
        options.append(correct_artist.toJSON())
        options.append(wrong_artists[0].toJSON())
        options.append(wrong_artists[1].toJSON())
        options.append(wrong_artists[2].toJSON())
        shuffle(options)

        batch.append({'bar': bars[i].toJSON(), 'options': options})
        i = i + 1

    return jsonify(batch)


@app.route('/verifyanswer')
def verifyanswer():
    request_data = request.args

    bar = models.Bar.query.get(request_data.get('BarID'))
    pick = request_data.get('pick')
    if(str(pick) == str(bar.CorrectArtist)):
        return jsonify({'response': 'Correct'})

    return jsonify({'response': 'Incorrect'})


@app.route('/searchsong')
def searchsong():
    search_term = request.args.get('search_term')

    genius = apimanager.Genius()
    raw_hits = genius.search(search_term)['response']['hits']
    hits = []
    for hit in raw_hits:
        hit_data = {}
        if(hit['type'] == 'song'):
            hit_data['title'] = hit['result']['title']
            hit_data['full_title'] = hit['result']['full_title']
            hit_data['song_art_image_url'] = hit['result']['song_art_image_url']
            hit_data['song_id'] = hit['result']['id']
            hit_data['artist'] = hit['result']['primary_artist']['name']
            hits.append(hit_data)

    return jsonify(hits)

@app.route('/getlyrics')
def getlyrics():
    song_id = request.args.get("song_id");

    genius = apimanager.Genius()
    res = genius.lyrics_from_song_id(song_id)

    song_title = res['song_title']
    s = models.Song.query.filter_by(Name=song_title).first()
    bars = []
    if(s != None):
        raw_bars = list(models.Bar.query.filter_by(SongID=s.SongID).all())
        for bar in raw_bars:
            bars.append(bar.toJSON())

    lyrics = res['lyrics']
    return jsonify({'lyrics': lyrics, 'bars': bars})


@app.route('/addbar', methods=['POST'])
def addbar():
    # TODO: ADD data verification, ensure everything is there...
    request_data = request.args

    line = request_data.get('line')
    artist_name = request_data.get('correct_artist')
    title = request_data.get('song')

    # Create artist if not in the database
    correct_artist = models.Artist.query.filter_by(Name=artist_name).first()
    if(correct_artist == None):
        genius = apimanager.Genius()
        img_url = genius.search(artist_name)[
            'response']['hits'][0]['result']['primary_artist']['image_url']
        correct_artist = models.Artist(Name=artist_name, Image=img_url)
        db.session.add(correct_artist)
        db.session.commit()  # may not be necessary to commit new artist here

    # Create song if not in the database
    s = models.Song.query.filter_by(Name=title).first()
    if(s == None):
        genius = apimanager.Genius()
        img_url = genius.search(title + ", " + correct_artist.Name)[
            'response']['hits'][0]['result']['song_art_image_url']
        s = models.Song(Name=title, artist=correct_artist, Image=img_url)
        db.session.add(s)
        db.session.commit()  # may not be necessary to commit new song here

    db.session.add(models.Bar(Line=line, CorrectArtist=correct_artist.ArtistID, song=s))
    db.session.commit()
    return jsonify({'response': 'Success'})
