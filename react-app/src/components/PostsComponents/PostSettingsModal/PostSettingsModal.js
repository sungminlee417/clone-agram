import { useEffect, useState } from "react";
import { Modal } from "../../../context/Modal";
import PostSettings from "./PostSettings/PostSettings";
import "./PostSettingsModal.css";

const PostSettingsModal = ({ post, onClose }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    return () => setShowModal(false);
  }, []);

  return (
    <>
      <button
        className="post-settings-modal"
        onClick={() => setShowModal(true)}
      >
        <i className="fa-solid fa-ellipsis post-settings-ellipsis"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} showModal={showModal}>
          <PostSettings
            post={post}
            onClose={onClose}
            onClosePost={() => setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default PostSettingsModal;
