import { useState } from "react";
import { Modal } from "../../../context/Modal";
import "./PostLikesModal.css";
import PostLikes from "./PostLikes/PostLikes";

const PostLikesModal = ({ likes }) => {
  const [showModal, setShowModal] = useState(false);

  const onClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        className="post-likes-modal-button"
        onClick={() => setShowModal(true)}
      >
        <strong>{Object.values(likes).length} likes</strong>
      </button>
      {showModal && (
        <Modal onClose={onClose} showModal={showModal}>
          <PostLikes likes={likes} onClose={onClose} />
        </Modal>
      )}
    </>
  );
};

export default PostLikesModal;
