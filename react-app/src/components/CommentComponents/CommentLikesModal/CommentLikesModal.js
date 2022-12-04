import { useEffect, useState } from "react";
import { Modal } from "../../../context/Modal";
import CommentLikes from "./CommentLikes/CommentLikes";
import "./CommentLikesModal.css";

const CommentLikesModal = ({ comment }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    return () => setShowModal(false);
  }, []);

  return (
    <>
      <button
        className="comment-likes-modal-button"
        onClick={() => setShowModal(true)}
      >
        <div>{Object.values(comment.likes).length} likes</div>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} showModal={showModal}>
          <CommentLikes
            likes={comment.likes}
            onClose={() => setShowModal(false)}
            showModal={showModal}
          />
        </Modal>
      )}
    </>
  );
};

export default CommentLikesModal;
