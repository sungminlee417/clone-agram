import { useEffect, useState } from "react";
import { Modal } from "../../../context/Modal";
import CommentSettings from "./CommentSettings/CommentSettings";
import "./CommentSettingsModal.css";

const CommentSettingsModal = ({ comment }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    return () => setShowModal(false);
  }, []);
  return (
    <>
      <button
        className="comment-more-options"
        onClick={() => setShowModal(true)}
      >
        <i className="fa-solid fa-ellipsis comment-ellipsis"></i>
      </button>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          showModal={showModal}
          type="edit-comment"
        >
          <CommentSettings
            comment={comment}
            onClose={() => setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default CommentSettingsModal;
