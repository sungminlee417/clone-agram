from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from app.forms import EditUserForm
from app.forms import EditUserPasswordForm
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy import or_
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    error_messages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            error_messages[field] = error
    return error_messages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        credential = form.data["credential"]
        user = User.query.filter(or_((User.email == credential), (User.username == credential))).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            name=form.data['name']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route("/edit", methods=["PUT"])
@login_required
def edit_user():
    form = EditUserForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        url = None
        if "profile_image" in request.files:
            profile_img = request.files['profile_image']
            if not allowed_file(profile_img.filename):
                return {"image": "File type is not permitted"}
            profile_img.filename = get_unique_filename(profile_img.filename)
            upload = upload_file_to_s3(profile_img)

            if "url" not in upload:
                return upload, 400

            url = upload["url"]
        if url:
            current_user.profile_img = url
        else:
            current_user.profile_img = "https://cloneagram.s3.us-west-1.amazonaws.com/Default_pfp.jpg"
        current_user.username = request.form["username"]
        current_user.name = request.form["name"]
        current_user.email = request.form["email"]
        db.session.commit()
        return current_user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route("/edit-password", methods=["PUT"])
@login_required
def edit_user_password():
    form = EditUserPasswordForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        current_user.password = form.data["new_password"]
        db.session.commit()
        return current_user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
