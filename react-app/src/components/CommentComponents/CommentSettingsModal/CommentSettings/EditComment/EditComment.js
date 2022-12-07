import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editCommentThunk } from "../../../../../store/comments";
import "./EditComment.css";

const EditComment = ({ comment, onClose }) => {
  const dispatch = useDispatch();
  const [commentData, setCommentData] = useState(comment.comment);

  useEffect(() => {
    const submitButton = document.querySelector(".edit-comment-form-submit");
    if (commentData && commentData.trim()) {
      submitButton.removeAttribute("disabled");
      submitButton.classList.add("typed");
    } else {
      submitButton.setAttribute("disabled", "");
      submitButton.classList.remove("typed");
    }
  }, [commentData]);

  const updateComment = (e) => {
    setCommentData(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = { commentData };
    await dispatch(editCommentThunk(comment.id, payload)).then(() => {
      onClose();
    });
  };

  return (
    <form
      className="edit-comment-form"
      onSubmit={onSubmit}
      onClick={(e) => e.stopPropagation()}
    >
      <header className="edit-comment-form-header">
        <button className="edit-comment-form-cancel" onClick={() => onClose()}>
          Cancel
        </button>
        <div className="edit-comment-content-label">
          <strong>Edit comment</strong>
        </div>
        <button type="submit" className="edit-comment-form-submit">
          Done
        </button>
      </header>
      <div className="edit-comment-form-divider"></div>
      <textarea
        className="edit-comment-content-input"
        onChange={updateComment}
        placeholder="Write a comment..."
        value={commentData}
      />
    </form>
  );
};

export default EditComment;
