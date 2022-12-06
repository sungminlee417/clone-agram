from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField, FileField
from wtforms.validators import DataRequired, ValidationError, Email
from app.models import User
from sqlalchemy import and_


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(and_((User.email == email), (User.email != current_user.email))).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(and_((User.username == username), (User.username != current_user.username))).first()
    if user:
        raise ValidationError('Username is already in use.')


class EditUserForm(FlaskForm):
    profile_image = FileField('profile_image')
    username = StringField(
        'username', validators=[DataRequired("Username required."), username_exists])
    name = StringField("name", validators=[DataRequired("Full name required.")])
    email = StringField('email', validators=[DataRequired("Valid email required."), user_exists, Email()])
