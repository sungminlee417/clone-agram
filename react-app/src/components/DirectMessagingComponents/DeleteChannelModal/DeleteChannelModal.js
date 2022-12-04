import { useState } from "react";
import { Modal } from "../../../context/Modal";
import DeleteChannel from "./DeleteChannel/DeleteChannel";
import "./DeleteChannelModal.css";

const DeleteChannelModal = ({ directMessageId }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="display-message-details-delete-chat-button"
        onClick={() => setShowModal(true)}
      >
        Delete Chat
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} showModal={showModal}>
          <DeleteChannel
            onClose={() => setShowModal(false)}
            directMessageId={directMessageId}
          />
        </Modal>
      )}
    </>
  );
};

export default DeleteChannelModal;
