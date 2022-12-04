from .db import db

class Comment(db.Model):
  __tablename__ = "comments"


  id = db.Column(db.Integer, primary_key=True)
  comment = db.Column(db.String(255), nullable=False)
  post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

  post = db.relationship('Post', back_populates='comments')
  likes = db.relationship("Like", back_populates='comment')

  def to_dict(self):
    return {
      'id': self.id,
      'comment': self.comment,
      'owner': self.comment_owner.to_dict(),
      'likes': {like.user.id: like.to_dict() for like in self.likes}
      }
