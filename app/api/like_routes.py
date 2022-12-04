from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Like

like_routes = Blueprint('likes', __name__)
like_post_routes = Blueprint('likes', __name__)
like_comment_routes = Blueprint('likes', __name__)

def post_not_already_liked(post_id):
  like = Like.query.filter(Like.post_id == post_id).filter(Like.user_id == current_user.id).first() is not None
  if like:
    return False
  return True

def comment_not_already_liked(comment_id):
  like = Like.query.filter(Like.comment_id == comment_id).filter(Like.user_id == current_user.id).first() is not None
  if like:
    return False
  return True

def like_owned_by_user(like):
  if like.user_id == current_user.id:
    return True
  return False

# GET ALL COMMENTS OF A POST AND POST COMMENT
@like_post_routes.route("/<int:post_id>/likes", methods=["GET", "POST"])
@login_required
def likes_post(post_id):
  if request.method == "GET":
    likes = Like.query.filter(Like.post_id == post_id)
    return {like.id: like.to_dict() for like in likes}
  if request.method == "POST":
    if post_not_already_liked(post_id):
      like = Like(
            user_id=current_user.id,
            post_id=post_id,
            )
      db.session.add(like)
      db.session.commit()
      return like.to_dict()
    else:
      return {"error": "You have already liked this post."}


@like_comment_routes.route("/<int:comment_id>/likes", methods=["GET", "POST"])
@login_required
def likes_comment(comment_id):
  if request.method == "GET":
    likes = Like.query.filter(Like.post_id == comment_id)
    return {like.id: like.to_dict() for like in likes}
  if request.method == "POST":
    if comment_not_already_liked(comment_id):
      like = Like(
            user_id=current_user.id,
            comment_id=comment_id,
            )
      db.session.add(like)
      db.session.commit()
      return like.to_dict()
    else:
      return {"error": "You have already liked this post."}


# DELETE LIKE BY ID
@like_routes.route("/<int:like_id>", methods=["DELETE"])
@login_required
def delete_like(like_id):
  like = Like.query.get(like_id)
  if like_owned_by_user(like):
    db.session.delete(like)
    db.session.commit()
    return {"message": "Like was successfully deleted"}
  else:
    return {"error": "Unauthorized"}
