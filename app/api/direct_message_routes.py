from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, DirectMessage, DirectMessageMember
from sqlalchemy import and_
from .message_routes import message_direct_routes


direct_message_routes = Blueprint('direct_messages', __name__)
direct_message_routes.register_blueprint(message_direct_routes, url_prefix="/" )


# GET ALL DIRECT MESSAGES OF USER AND CREATE DIRECT MESSAGe
@direct_message_routes.route("", methods=["GET", "POST"])
@login_required
def direct_messages():
  if request.method == "GET":
    direct_messages = DirectMessage.query.join(DirectMessageMember).filter(and_((DirectMessageMember.user_id == current_user.id), (DirectMessageMember.user_active == True)))
    return {direct_message.id: direct_message.to_dict() for direct_message in direct_messages}

  if request.method == "POST":
    direct_message = DirectMessage()
    db.session.add(direct_message)
    db.session.commit()
    direct_message_current_member = DirectMessageMember(
      user_id=current_user.id,
      user_active=True,
      direct_message_id=direct_message.id
    )
    users = request.json
    for user_id in users:
      direct_message_member = DirectMessageMember(
        user_id=user_id,
        direct_message_id=direct_message.id
      )
      db.session.add(direct_message_member)
    db.session.add(direct_message_current_member)
    db.session.commit()
    return direct_message.to_dict()



#DELETE DIRECT MESSAGE BY ID
@direct_message_routes.route("/<int:direct_message_id>", methods=["DELETE"])
@login_required
def edit_delete_comment(direct_message_id):
  direct_message_member = DirectMessageMember.query.filter(and_((DirectMessageMember.user_id == current_user.id), (DirectMessageMember.direct_message_id == direct_message_id))).first()
  direct_message_member.user_active = False
  db.session.commit()
  return {"message": "User is not inactive in specified direct message."}
