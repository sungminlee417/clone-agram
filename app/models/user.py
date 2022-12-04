from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profile_img = db.Column(db.String(255), nullable=False, default="https://cloneagram.s3.us-west-1.amazonaws.com/Default_pfp.jpg")
    hashed_password = db.Column(db.String(255), nullable=False)

    posts = db.relationship('Post', backref='post_owner', cascade="all, delete-orphan")
    comments = db.relationship('Comment', backref='comment_owner', cascade="all, delete-orphan")
    followings = db.relationship('Following', backref="user", foreign_keys='Following.user_id', cascade="all, delete-orphan")
    followers = db.relationship('Follower', backref="user", foreign_keys='Follower.user_id', cascade="all, delete-orphan")
    likes = db.relationship('Like', back_populates="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_resource(self):
        return {
            'id': self.id,
            'name': self.name,
            'username': self.username,
            'email': self.email,
            'profileImg': self.profile_img,
        }

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'username': self.username,
            'email': self.email,
            'profileImg': self.profile_img,
            'followings': {following.id: following.to_dict() for following in self.followings},
            'followers': {follower.id: follower.to_dict() for follower in self.followers}
        }
