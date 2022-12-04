from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Following, Follower, User


following_routes = Blueprint('followings', __name__)


def not_already_following(user_id):
  if current_user.id == user_id:
    return False
  for following in current_user.followings:
    if following.following_user_id == user_id:
      return False
  return True


# GET ALL FOLLOWINGS OF A USER
@following_routes.route("", methods=["GET"])
@login_required
def followings():
  user = User.query.get(current_user.id)
  followings = user.followings
  return {following.following_user.id: following.following_user.to_dict() for following in followings}


# CREATE AND DELETE FOLLOWER BY ID
@following_routes.route("/<int:user_id>", methods=["POST", "DELETE"])
@login_required
def post_delete_following(user_id):
  if request.method == "POST":
    if not_already_following(user_id):
      following = Following(user_id=current_user.id, following_user_id=user_id)
      follower = Follower(user_id=user_id, follower_user_id=current_user.id)
      db.session.add(following)
      db.session.add(follower)
      db.session.commit()
      return follower.follower_user.to_dict()
    else:
      return {"error": "Already following user"}
  if request.method == "DELETE":
    if not not_already_following(user_id):
      following = Following.query.filter(Following.user_id == current_user.id).filter(Following.following_user_id == user_id).one()
      follower = Follower.query.filter(Follower.follower_user_id == current_user.id).filter(Follower.user_id == user_id).one()
      db.session.delete(following)
      db.session.delete(follower)
      db.session.commit()
      return {"message": f"Current user successfully unfollowed user with id {user_id}"}
    else:
      return {"error": f"Current user is already not following user with user id {user_id}"}
