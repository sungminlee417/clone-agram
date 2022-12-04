from .db import db

class DirectMessage(db.Model):
  __tablename__ = "direct_messages"

  id = db.Column(db.Integer, primary_key=True)

  members = db.relationship('DirectMessageMember', back_populates='direct_message')
  # messages = db.relationship("Message", back_populates="direct_message")

  def to_dict(self):
    return {
      'id': self.id,
      "members": {member.user.id: member.to_dict() for member in self.members}
      }


class DirectMessageMember(db.Model):
    __tablename__ = 'direct_message_members'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user_active = db.Column(db.Boolean, default=False, nullable=False)
    direct_message_id = db.Column(db.Integer, db.ForeignKey("direct_messages.id"), nullable=True)

    user = db.relationship("User", backref="direct_message_member")
    direct_message = db.relationship("DirectMessage", back_populates="members")

    def to_dict(self):
        return {
          "user": self.user.to_dict(),
          "userActive": self.user_active
        }
