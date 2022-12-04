from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Following, Follower, User


follower_routes = Blueprint('followers', __name__)


def following_current_user(follower_id):
  if current_user.id == follower_id:
    return False
  for follower in current_user.followers:
    if follower.follower_user_id == follower_id:
      return True
  return False


# GET ALL FOLLOWERS OF A USER
@follower_routes.route("/<int:user_id>", methods=["GET"])
@login_required
def followers(user_id):
  user = User.query.get(user_id)
  followers = user.followers
  return {follower.follower_user.id: follower.follower_user.to_dict() for follower in followers}

# REMOVE SESSION USER FOLLOWER
@follower_routes.route("/<int:follower_id>", methods=["DELETE"])
@login_required
def delete_follower(follower_id):
  if following_current_user(follower_id):
    follower = Follower.query.filter(Follower.user_id == current_user.id).filter(Follower.follower_user_id == follower_id).first()
    following = Following.query.filter(Following.user_id == follower_id).filter(Following.following_user_id == current_user.id).first()
    db.session.delete(following)
    db.session.delete(follower)
    db.session.commit()
    return {"message": "Follower was successfully removed"}
  else:
    return {"error": "This user does not follow you currently."}
