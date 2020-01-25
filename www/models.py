from www import db

class Artist(db.Model):
    ArtistID = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(64))
    Image = db.Column(db.String(64))
    Songs = db.relationship('Song', backref='artist', lazy='dynamic')

    def __repr__(self):
        return '<Artist {}'.format(self.ArtistID)

class Song(db.Model):
    SongID = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(64))
    ArtistID = db.Column(db.Integer, db.ForeignKey('artist.ArtistID'))
    Bars = db.relationship('Bar', backref='song', lazy='dynamic')

class Bar(db.Model):
    BarID = db.Column(db.Integer, primary_key=True)
    Line = db.Column(db.String(128), index=True, unique=True)
    CorrectArtist = db.Column(db.Integer, db.ForeignKey('artist.ArtistID'))
    IncorrectArtist1 = db.Column(db.Integer, db.ForeignKey('artist.ArtistID'))
    IncorrectArtist2 = db.Column(db.Integer, db.ForeignKey('artist.ArtistID'))
    IncorrectArtist3 = db.Column(db.Integer, db.ForeignKey('artist.ArtistID'))
    SongID = db.Column(db.Integer, db.ForeignKey('song.SongID'))

    def __repr__(self):
        return '<Bar {}'.format(self.BarID)
