from .db import db, environment, SCHEMA, add_prefix_for_prod

class Follower(db.Model):
  __tablename__ = "followers"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
  follower_user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

  follower_user = db.relationship("User", backref="follower_user", foreign_keys=[follower_user_id])

  def to_dict(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "followerUser": self.follower_user.to_resource()

    }

class Following(db.Model):
  __tablename__ = "followings"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
  following_user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

  following_user = db.relationship("User", backref="following_user", foreign_keys=[following_user_id])

  def to_dict(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "followingUser": self.following_user.to_resource()
    }
