import { useState } from "react";
import CreatePost from "./CreatePost/CreatePost";
import { Modal } from "../../../context/Modal";

const CreatePostModal = () => {
  const [showModal, setShowModal] = useState(false);

  const onClick = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };

  return (
    <>
      <button className="nav-bar-link create" onClick={onClick}>
        <i className="fa-solid fa-circle-plus nav-bar-icon"></i>
        <div className="nav-link-text">Create</div>
      </button>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          showModal={showModal}
          type="create-post"
        >
          <CreatePost onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default CreatePostModal;
