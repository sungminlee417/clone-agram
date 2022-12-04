from flask_wtf import FlaskForm
from wtforms import FileField, StringField

class PostForm(FlaskForm):
  content = FileField('Post Image')
  description = StringField("Description")
