from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Comment
from ..forms.comment_form import CommentForm
from .like_routes import like_comment_routes


comment_routes = Blueprint('comments', __name__)
comment_post_routes = Blueprint('comment_posts', __name__)
comment_routes.register_blueprint(like_comment_routes, url_prefix="/")

def comment_owned_by_user(comment):
  if comment.user_id == current_user.id:
    return True
  return False


# GET ALL COMMENTS OF A POST AND POST COMMENT
@comment_post_routes.route("/<int:post_id>/comments", methods=["GET", "POST"])
@login_required
def comments(post_id):
  comments = Comment.query.filter(Comment.post_id == post_id)
  form = CommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    comment = Comment(
          comment=form.data["comment"],
          post_id=post_id,
          user_id=current_user.id
          )
    db.session.add(comment)
    db.session.commit()
    return comment.to_dict()
  return {comment.id: comment.to_dict() for comment in comments}


# EDIT AND DELETE COMMENT BY ID
@comment_routes.route("/<int:comment_id>", methods=["PUT", "DELETE"])
@login_required
def edit_delete_comment(comment_id):
  comment = Comment.query.get(comment_id)
  if request.method == "PUT":
    if comment_owned_by_user(comment):
      form = CommentForm()
      form['csrf_token'].data = request.cookies['csrf_token']
      if form.validate_on_submit():
        comment.comment = form.data["comment"]
        db.session.commit()
        return comment.to_dict()
    else:
      return {"error": "Unauthorized user"}
  if request.method == "DELETE":
    if comment_owned_by_user(comment):
      db.session.delete(comment)
      db.session.commit()
      return {"message": "Comment was successfully deleted"}
    else:
      return {"error": "Unauthorized"}
