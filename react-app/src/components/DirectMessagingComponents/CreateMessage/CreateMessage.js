import { useState } from "react";
import { useDispatch } from "react-redux";
import { createMessageThunk } from "../../../store/messages";
import "./CreateMessage.css";

const CreateMessage = ({ directMessageId, socket, currentRoom }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    dispatch(createMessageThunk(directMessageId, { message: message })).then(
      (message) => {
        socket.send({ message, room: currentRoom });
      }
    );
  };

  return (
    <div>
      <div className="create-message-input-container">
        <form onSubmit={onSubmit}>
          <input
            className="create-message-input"
            placeholder="Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" />
        </form>
      </div>
    </div>
  );
};

export default CreateMessage;
