import { useEffect, useState } from "react";
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

  useEffect(() => {
    const submitButton = document.querySelector(".edit-post-form-submit");
    const submitButtonContainer = document.querySelector(
      ".edit-post-form-submit-container"
    );

    if (description.trim() || !description) {
      submitButton.classList.add("enabled");
      submitButtonContainer.classList.add("enabled");
    } else {
      submitButton.classList.remove("enabled");
      submitButtonContainer.classList.remove("enabled");
    }
  }, [description]);

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
        <div className="edit-post-form-submit-container">
          <button type="submit" className="edit-post-form-submit">
            Done
          </button>
        </div>
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
