from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError


def password_matches(form, field):
    old_password = field.data
    if not current_user.check_password(old_password):
        raise ValidationError('Old password is incorrect.')


def passwords_match(form, field):
    confirm_password = field.data
    new_password = form.data["new_password"]
    if new_password != confirm_password:
        raise ValidationError('Passwords must match.')


class EditUserPasswordForm(FlaskForm):
  old_password = StringField("old_password", validators=[DataRequired("Old password required."), password_matches])
  new_password = StringField("new_password", validators=[DataRequired("New password required.")])
  confirm_password = StringField("confirm_password", validators=[DataRequired("Password confirmation required."), passwords_match])
