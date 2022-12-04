import { useState } from "react";
import { Modal } from "../../../context/Modal";
import FollowingList from "./FollowingList/FollowingList";
import "./FollowingListModal.css";

const FollowingListModal = ({ user }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="following-list-button"
        onClick={() => setShowModal(true)}
      >
        <strong>
          {!user.followings ? 0 : Object.values(user.followings).length}{" "}
        </strong>
        following
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} showModal={showModal}>
          <FollowingList onClose={() => setShowModal(false)} user={user} />
        </Modal>
      )}
    </>
  );
};

export default FollowingListModal;
