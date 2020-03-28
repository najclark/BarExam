from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

app.config.from_object(Config)
db = SQLAlchemy(app)

from www import routes, models
