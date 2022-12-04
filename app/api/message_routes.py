from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Message, DirectMessage
from sqlalchemy import and_
from app.forms import MessageForm


message_direct_routes = Blueprint('messages_direct', __name__)
message_routes = Blueprint("messages", __name__)


# GET ALL MESSAGES OF DIRECT MESSAGE AND CREATE MESSAGE
@message_direct_routes.route("/<int:direct_message_id>/messages", methods=["GET", "POST"])
@login_required
def messages(direct_message_id):
  direct_message = DirectMessage.query.get(direct_message_id)
  messages = Message.query.filter(Message.direct_message_id == direct_message_id)
  form = MessageForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    message = Message(
      user_id=current_user.id,
      message=form.data["message"],
      direct_message_id=direct_message_id
    )
    for member in direct_message.members:
      member.user_active = True
      db.session.commit()
    db.session.add(message)
    db.session.commit()
    return message.to_dict()
  return {message.id: message.to_dict() for message in messages}


# DELETE MESSAGE BY ID
@message_routes.route("/<int:message_id>", methods=["DELETE"])
@login_required
def delete_message(message_id):
  message = Message.query.get(message_id)
  if message.user_id == current_user.id:
    db.session.delete(message)
    db.session.commit()
    return {"message": "Message was successfully deleted"}
  else:
    return {"error": "Unauthorized"}
