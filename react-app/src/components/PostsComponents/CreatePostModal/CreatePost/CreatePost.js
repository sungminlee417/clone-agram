import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { createPostThunk } from "../../../../store/posts";
import "./CreatePost.css";

const CreatePost = ({ onClose }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentUser = useSelector((state) => state.session.user);
  const [content, setContent] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [description, setDescription] = useState("");
  const [multipleButtonClicked, setMultipleButtonClicked] = useState(false);
  const [prevImage, setPrevImage] = useState(1);

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file)
      setContent((prevContent) => {
        return [...prevContent, file];
      });
  };

  const validLocation = () => {
    if (
      location.pathname === "/" ||
      location.pathname === "/explore" ||
      location.pathname === `/${currentUser.username}`
    )
      return true;
    return false;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const postData = new FormData();

    for (let i = 0; i < content.length; i++) {
      const contentItem = content[i];
      postData.append("content", contentItem);
    }
    postData.append("description", description);

    await dispatch(createPostThunk(postData, validLocation)).then(() => {
      onClose();
    });
  };

  const toggleMultipleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const multipleButton = document.querySelector(
      ".create-post-photo-multiple-button"
    );

    if (multipleButtonClicked) {
      setMultipleButtonClicked(false);
      multipleButton.classList.remove("clicked");
    } else {
      setMultipleButtonClicked(true);
      multipleButton.classList.add("clicked");
    }
  };

  const updateCurrentImage = (key) => {
    setPrevImage(currentImage);
    setCurrentImage(key);
  };

  const removeImage = (e, index) => {
    e.preventDefault();
    setContent((prevContent) => {
      const prevContentCopy = [...prevContent];
      prevContentCopy.splice(index, 1);
      return prevContentCopy;
    });
    if (index && currentImage) {
      setCurrentImage(index - 1);
      setPrevImage(currentImage);
    }
  };

  useEffect(() => {
    const image = document.querySelector(
      `.create-post-photo-preview-image-${currentImage}`
    );
    const previousImage = document.querySelector(
      `.create-post-photo-preview-image-${prevImage}`
    );

    if (image) {
      image.classList.add("selected");
    }
    if (prevImage !== currentImage && previousImage) {
      previousImage.classList.remove("selected");
    }
  }, [currentImage, prevImage]);

  useEffect(() => {
    if (!content.length) {
      setMultipleButtonClicked(false);
    }
  }, [content, multipleButtonClicked]);

  return (
    <section
      className="create-post-form-container"
      onClick={(e) => e.stopPropagation()}
    >
      <form className="create-post-form" onSubmit={onSubmit}>
        <header className="create-post-form-header">
          {content.length > 0 && (
            <>
              <button
                className="header-button back"
                onClick={() => setContent([])}
              >
                <i className="fa-solid fa-arrow-left-long"></i>
              </button>
              {(description.trim() || !description) && (
                <button className="header-button submit" type="submit">
                  Share
                </button>
              )}
            </>
          )}
          <div>Create new post</div>
        </header>
        <div className="create-post-input-container">
          <div className="create-post-image-input-container">
            {!content.length ? (
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
                  accept="image/pdf, image/png, image/jpg, image/jpeg, image/gif"
                  className="create-post-content-button"
                ></input>
              </div>
            ) : (
              <div className="create-post-photo-container">
                <img
                  className="create-post-photo"
                  src={URL.createObjectURL(content[currentImage])}
                  alt="post pic"
                />
                <button
                  className="create-post-photo-multiple-button"
                  onClick={toggleMultipleMenu}
                >
                  <i className="fa-regular fa-clone create-post-photo-multiple-button-icon"></i>
                </button>
                {multipleButtonClicked && (
                  <div className="create-post-photo-multiple-menu-container">
                    <div className="create-post-photo-preview-image-container">
                      {Object.values(content).map((image, i) => {
                        return (
                          <div
                            key={i}
                            className="create-post-photo-preview-image-remove-container"
                          >
                            <img
                              src={URL.createObjectURL(image)}
                              className={`create-post-photo-preview-image create-post-photo-preview-image-${i} ${
                                currentImage === i ? "selected" : null
                              }`}
                              onClick={() => updateCurrentImage(i)}
                              alt="preview"
                            />
                            <button
                              className="create-post-photo-preview-image-remove"
                              onClick={(e) => removeImage(e, i)}
                            >
                              <i className="fa-solid fa-xmark"></i>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                    <label
                      htmlFor="add-photo"
                      className="create-post-photo-add-photo-input-icon"
                    >
                      <i className="fa-solid fa-plus"></i>
                    </label>
                    <input
                      id="add-photo"
                      className="create-post-photo-add-photo-input"
                      onChange={updateFile}
                      type="file"
                      accept="image/pdf, image/png, image/jpg, image/jpeg, image/gif"
                    />
                  </div>
                )}
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
