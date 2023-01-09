from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Post, Image
from ..forms.post_form import PostForm
from .comment_routes import comment_post_routes
from .like_routes import like_post_routes
from sqlalchemy import or_
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)

post_routes = Blueprint('posts', __name__)
post_routes.register_blueprint(comment_post_routes, url_prefix='/')
post_routes.register_blueprint(like_post_routes, url_prefix='/')


def post_owned_by_user(post):
  if post.user_id == current_user.id:
    return True
  return False

# GET ALL POSTS AND CREATE A POST
@post_routes.route("/", methods=["GET", "POST"])
@login_required
def posts():
  posts = Post.query.all()
  form = PostForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    post = Post(
            description=form.data["description"],
            user_id=current_user.id
            )
    db.session.add(post)
    db.session.commit()

    for content in request.files.getlist('content'):
      url = None
      if not allowed_file(content.filename):
        return {"image": "File type is not permitted"}
      content.filename = get_unique_filename(content.filename)
      upload = upload_file_to_s3(content)

      if "url" not in upload:
        return upload, 400

      url = upload["url"]

      image = Image(image_url=url, post_id=post.id)
      db.session.add(image)
      db.session.commit()

    return post.to_dict()
  return {post.id: post.to_dict() for post in posts}


@post_routes.route("/following", methods=["GET"])
@login_required
def following_posts():
  followings = {following.following_user_id: following.to_dict() for following in current_user.followings}
  posts = Post.query.filter(or_((Post.user_id.in_(followings)), (Post.user_id == current_user.id)))
  return {post.id: post.to_dict() for post in posts}


# GET POSTS BY USER ID
@post_routes.route("/<int:user_id>", methods=["GET"])
@login_required
def user_posts(user_id):
  posts = Post.query.filter(Post.user_id == user_id)
  return {post.id: post.to_dict() for post in posts}


# EDIT AND DELETE POST BY ID
@post_routes.route("/<int:post_id>", methods=["PUT", "DELETE"])
@login_required
def edit_delete_post(post_id):
  if request.method == "PUT":
    post = Post.query.get(post_id)
    if post_owned_by_user(post):
      form = PostForm()
      form['csrf_token'].data = request.cookies['csrf_token']
      if form.validate_on_submit():
        post.description = form.data["description"]
        db.session.commit()
        return post.to_dict()
    else:
      return {"error": "Unauthorized user"}
  elif request.method == "DELETE":
    post = Post.query.get(post_id)
    if post_owned_by_user(post):
      db.session.delete(post)
      db.session.commit()
      return {"message": "Post was successfully deleted"}
    else:
      return {"error": "Unauthorized"}
