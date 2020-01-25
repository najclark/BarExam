from flask import render_template, request, redirect
from www import app, db
from www.models import *

from random import shuffle

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

#TODO: Upload Images...
@app.route('/addartist', methods = ['POST', 'GET'])
def addartist():
    if request.method == 'POST':
        artist_name = request.form['artist_name']
        artist_image = request.form['artist_image']
        db.session.add(Artist(Name=artist_name, Image=artist_image))
        db.session.commit()
        return render_template('addartist.html')
    elif request.method == "GET":
        return render_template('addartist.html')

@app.route('/addsong', methods = ['POST', 'GET'])
def addsong():
    if request.method == 'POST':
        song_name = request.form['song_name']
        artist = Artist.query.filter_by(Name=request.form['artist']).first()
        db.session.add(Song(Name=song_name, ArtistID=artist.ArtistID))
        db.session.commit()
        return render_template('addsong.html', artists=Artist.query.all())
    elif request.method == "GET":
        return render_template('addsong.html', artists=Artist.query.all())

#TODO: ADD data verification, ensure everything is there...
@app.route('/addbar', methods = ['POST', 'GET'])
def addbar():
    if request.method == 'POST':
        # line = request.form['line']
        # correct_artist = Artist.query.filter_by(Name=request.form['correct_artist']).first()
        # artists = Artist.query.filter(Artist.Name != correct_artist.Name).all()
        # shuffle(artists) #works inplace, returns None

        title = request.form['song']
        print(title)
        # s = Song.query.filter_by(Name=title).first()
        # if(s == None):
        #     s = Song(Name=title, artist=correct_artist)
        #     db.session.add(s)
        #     db.session.commit()
        #
        # db.session.add(Bar(Line=line, CorrectArtist=correct_artist.ArtistID,
        #                    IncorrectArtist1=artists[0].ArtistID,
        #                    IncorrectArtist2=artists[1].ArtistID,
        #                    IncorrectArtist3=artists[2].ArtistID, song=s))
        # db.session.commit()
        return render_template('addbar.html', artists=Artist.query.all(), songs=Song.query.all())
    else:
        return render_template('addbar.html', artists=Artist.query.all(), songs=Song.query.all())

@app.route('/play', methods = ['POST', 'GET'])
def play():
    if request.method == 'POST':
        bar = Bar.query.get(request.form['BarID'])
        pick = request.form['pick']
        if(str(pick) != str(bar.CorrectArtist)):
            return redirect('/')

    bars = list(db.session.query(Bar).all())
    shuffle(bars)
    options = []
    options.append(Artist.query.get(bars[0].CorrectArtist))
    options.append(Artist.query.get(bars[0].IncorrectArtist1))
    options.append(Artist.query.get(bars[0].IncorrectArtist2))
    options.append(Artist.query.get(bars[0].IncorrectArtist3))
    shuffle(options)
    return render_template('play.html', bar=bars[0], options=options)
