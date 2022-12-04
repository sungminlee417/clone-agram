from .db import db

class Message(db.Model):
  __tablename__ = "messages"

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  message = db.Column(db.String, nullable=False)
  direct_message_id = db.Column(db.Integer, db.ForeignKey("direct_messages.id"), nullable=False)

  user = db.relationship("User", backref="messages")
  # direct_message = db.relationship("DirectMessage", back_populates="messages")

  def to_dict(self):
    return {
      'id': self.id,
      "user": self.user.to_dict(),
      "message": self.message,
      }
