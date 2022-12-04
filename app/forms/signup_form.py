from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Email
from wtforms.fields.html5 import EmailField
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def passwords_match(form, field):
    # Checking if user exists
    confirm_password = field.data
    password = form.data["password"]
    if password != confirm_password:
        raise ValidationError('Passwords must match.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired("Username required."), username_exists])
    name = StringField("name", validators=[DataRequired("Full name required.")])
    email = StringField('email', validators=[DataRequired('Email required.'), user_exists, Email()])
    password = StringField('password', validators=[DataRequired("Password required.")])
    confirmPassword = StringField('confirmPassword', validators=[DataRequired("Password confirmation required."), passwords_match])
