from flask_wtf import FlaskForm
from wtforms import StringField, MultipleFileField

class PostForm(FlaskForm):
  content = MultipleFileField('Post Images')
  description = StringField("Description")
