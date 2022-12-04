from .db import db, environment, SCHEMA, add_prefix_for_prod

class Like(db.Model):
  __tablename__ = "likes"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
  post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")), nullable=True)
  comment_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("comments.id")), nullable=True)

  user = db.relationship('User', back_populates="likes")
  post = db.relationship('Post', back_populates="likes", foreign_keys=[post_id])
  comment = db.relationship('Comment', back_populates="likes", foreign_keys=[comment_id])

  def to_dict(self):
    response = {
      'id': self.id,
      'user': self.user.to_dict()
    }

    if self.post_id:
      response['postId']: self.post.to_dict()
    if self.comment_id:
      response['commentId']: self.comment.to_dict()

    return response
