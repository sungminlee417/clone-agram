from .db import db

class Post(db.Model):
  __tablename__ = "posts"

  id = db.Column(db.Integer, primary_key=True)
  content_url = db.Column(db.String(255), nullable=False)
  description = db.Column(db.String())
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

  comments = db.relationship('Comment', back_populates='post', cascade="all, delete-orphan")
  likes = db.relationship('Like', back_populates='post', cascade="all, delete-orphan")



  def to_dict(self):
    return {
      'id': self.id,
      'contentUrl': self.content_url,
      'description': self.description,
      'owner': self.post_owner.to_dict(),
      'comments': {comment.id: comment.to_dict() for comment in self.comments},
      'likes': {like.user.id: like.to_dict() for like in self.likes}
      }
