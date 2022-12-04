from .db import db, environment, SCHEMA, add_prefix_for_prod

class Comment(db.Model):
  __tablename__ = "comments"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  comment = db.Column(db.String(255), nullable=False)
  post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

  post = db.relationship('Post', back_populates='comments')
  likes = db.relationship("Like", back_populates='comment')

  def to_dict(self):
    return {
      'id': self.id,
      'comment': self.comment,
      'owner': self.comment_owner.to_dict(),
      'likes': {like.user.id: like.to_dict() for like in self.likes}
      }
