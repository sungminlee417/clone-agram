import { useState } from "react";
import { useDispatch } from "react-redux";
import { editPostThunk } from "../../../../../store/posts";
import "./EditPost.css";

const EditPost = ({ post, onClosePost }) => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState(post.description);

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = { description };
    await dispatch(editPostThunk(post.id, payload)).then(() => {
      onClosePost();
    });
  };

  return (
    <form
      className="edit-post-form"
      onSubmit={onSubmit}
      onClick={(e) => e.stopPropagation()}
    >
      <header className="edit-post-form-header">
        <button className="edit-post-form-cancel" onClick={() => onClosePost()}>
          Cancel
        </button>
        <div className="edit-post-description-label">
          <strong>Edit info</strong>
        </div>
        <button type="submit" className="edit-post-form-submit">
          Done
        </button>
      </header>
      <div className="edit-post-form-divider"></div>
      <textarea
        className="edit-post-description-input"
        onChange={updateDescription}
        placeholder="Write a caption..."
        value={description}
      />
    </form>
  );
};

export default EditPost;
