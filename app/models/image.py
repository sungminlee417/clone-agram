from .db import db

class Image(db.Model):
  __tablename__ = "images"

  id = db.Column(db.Integer, primary_key=True)
  image_url = db.Column(db.String(255), nullable=False)
  post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)

  post = db.relationship('Post', back_populates='images', cascade="all, delete-orphan")



  def to_dict(self):
    return {
      'id': self.id,
      'imageUrl': self.image_url
      }
