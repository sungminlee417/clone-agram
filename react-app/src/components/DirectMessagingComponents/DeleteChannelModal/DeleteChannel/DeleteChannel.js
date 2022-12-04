import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  deleteDirectMessageThunk,
  loadDirectMessages,
} from "../../../../store/directMessages";
import "./DeleteChannel.css";

const DeleteChannel = ({ onClose, directMessageId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onDelete = async () => {
    await dispatch(deleteDirectMessageThunk(directMessageId)).then(() => {
      history.push("/direct/inbox");
      dispatch(loadDirectMessages());
    });
  };

  return (
    <section
      className="delete-channel-container"
      onClick={(e) => e.stopPropagation()}
    >
      <header className="delete-channel-header">
        <div className="delete-channel-header-one">Delete chat?</div>
        <div className="delete-channel-header-two">
          Deleting removes the chat from your inbox, but no one else's inbox.
        </div>
      </header>
      <button className="delete-channel-button delete" onClick={onDelete}>
        <strong>Delete</strong>
      </button>
      <button
        className="delete-channel-button cancel"
        onClick={() => onClose()}
      >
        Cancel
      </button>
    </section>
  );
};

export default DeleteChannel;
