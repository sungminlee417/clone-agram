import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPostThunk } from "../../../../store/posts";
import "./CreatePost.css";

const CreatePost = ({ onClose }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setContent(file);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const postData = new FormData();

    postData.append("content", content);
    postData.append("description", description);

    await dispatch(createPostThunk(postData)).then(() => {
      // history.push(`/${match.url}`);
      onClose();
    });
  };

  return (
    <section
      className="create-post-form-container"
      onClick={(e) => e.stopPropagation()}
    >
      <form className="create-post-form" onSubmit={onSubmit}>
        <header className="create-post-form-header">
          {content && (
            <>
              <button
                className="header-button back"
                onClick={() => setContent("")}
              >
                <i className="fa-solid fa-arrow-left-long"></i>
              </button>
              <button className="header-button submit" type="submit">
                Share
              </button>
            </>
          )}
          <div>Create new post</div>
        </header>
        <div className="create-post-input-container">
          <div className="create-post-image-input-container">
            {!content ? (
              <div className="create-post-image-input">
                <img
                  className="create-post-image-input-photo"
                  src="https://cloneagram.s3.us-west-1.amazonaws.com/svgexport-24.svg"
                  alt="create post pic"
                />
                <label
                  className="create-post-content-button-label"
                  htmlFor="content-file"
                >
                  Select from computer
                </label>
                <input
                  id="content-file"
                  onChange={updateFile}
                  type="file"
                  className="create-post-content-button"
                ></input>
              </div>
            ) : (
              <div className="create-post-photo-container">
                <img
                  className="create-post-photo"
                  src={URL.createObjectURL(content)}
                  alt="post pic"
                />
              </div>
            )}
          </div>
          <div className="create-post-description-input-container">
            <textarea
              className="create-post-description-input"
              onChange={updateDescription}
              placeholder="Write a caption..."
              value={description}
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
