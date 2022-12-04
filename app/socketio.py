from flask_socketio import SocketIO, emit, join_room, leave_room
import os

socketio = SocketIO()

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://clone-agram.herokuapp.com",
        "https://clone-agram.herokuapp.com"
    ]
else:
    origins = "*"

socketio = SocketIO(cors_allowed_origins=origins, logger=True, engineio_logger=True)

@socketio.on("message")
def handle_message(data):
    emit("message", data, room=data['room'])

@socketio.on("join_room")
def on_join(data):
    room = data['room']
    join_room(room)
    emit("join_room", data, broadcast=True)

@socketio.on("leave_room")
def on_leave(data):
    leave_room(data["room"])
