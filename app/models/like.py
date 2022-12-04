from .db import db

class Like(db.Model):
  __tablename__ = "likes"

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=True)
  comment_id = db.Column(db.Integer, db.ForeignKey("comments.id"), nullable=True)

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
