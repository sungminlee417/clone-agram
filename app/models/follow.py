from .db import db

class Follower(db.Model):
  __tablename__ = "followers"

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  follower_user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

  follower_user = db.relationship("User", backref="follower_user", foreign_keys=[follower_user_id])

  def to_dict(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "followerUser": self.follower_user.to_resource()

    }

class Following(db.Model):
  __tablename__ = "followings"

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  following_user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

  following_user = db.relationship("User", backref="following_user", foreign_keys=[following_user_id])

  def to_dict(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "followingUser": self.following_user.to_resource()
    }
