import { useState } from "react";
import { Modal } from "../../../../context/Modal";
import UnfollowConfirmation from "./UnfollowConfirmation/UnfollowConfirmation";
import "./UnfollowConfirmationModal.css";

const UnfollowConfirmationModal = ({ onUnfollow }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="unfollow-confirmation-modal-button"
        onClick={() => setShowModal(true)}
      >
        Following
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} showModal={showModal}>
          <UnfollowConfirmation
            onUnfollow={onUnfollow}
            onClose={() => setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default UnfollowConfirmationModal;
