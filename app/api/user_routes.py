from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {user.id: user.to_dict() for user in users}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<string:username>')
@login_required
def find_user(username):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.filter(User.username == username).one()
    return user.to_dict()

@user_routes.route('/search/<string:username>')
@login_required
def search_users(username):
    """
    Query for a user by id and returns that user in a dictionary
    """
    users = User.query.filter(User.username.like(f'%{username}%')).filter(User.username != current_user.username)
    return {user.id: user.to_dict() for user in users}
