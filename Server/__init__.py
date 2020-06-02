from flask import Flask
import os
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin

os.environ['ACCESS_TOKEN'] = "rkZdZBfrb4uz-CN1oxgcZrzSPp3MA8DDiQxwP_-_uZYOGfGm30Fb2GHEtEetx3JU"

app = Flask(__name__)
CORS(app)

# app.config.from_object(config)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
db = SQLAlchemy(app)

import routes, models
