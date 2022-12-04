import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentThunk } from "../../../../store/comments";
import "./CommentSettings.css";
import EditComment from "./EditComment";

const CommentSettings = ({ comment, onClose }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const [showEditComponent, setShowEditComponent] = useState(false);

  const onDelete = () => {
    dispatch(deleteCommentThunk(comment.id)).then(() => {
      onClose();
    });
  };

  return (
    <>
      {!showEditComponent && (
        <section
          className="comment-settings-container"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="comment-settings-button delete" onClick={onDelete}>
            <strong>Delete</strong>
          </button>
          {comment.owner.id === currentUser.id && (
            <>
              <div className="comment-settings-divider"></div>
              <button
                className="comment-settings-button"
                onClick={() => setShowEditComponent(true)}
              >
                Edit
              </button>
            </>
          )}
        </section>
      )}
      {showEditComponent && <EditComment comment={comment} onClose={onClose} />}
    </>
  );
};

export default CommentSettings;
