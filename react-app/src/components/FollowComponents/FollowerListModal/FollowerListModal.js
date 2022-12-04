import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../../context/Modal";
import FollowerList from "./FollowerList/FollowerList";
import "./FollowerListModal.css";

const FollowerListModal = ({ user }) => {
  const [showModal, setShowModal] = useState(false);
  const followers = useSelector((state) => state.profileUserFollowers);

  return (
    <>
      <button
        className="follower-list-button"
        onClick={() => setShowModal(true)}
      >
        <strong>{Object.values(followers).length}</strong> followers
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} showModal={showModal}>
          <FollowerList
            user={user}
            onClose={() => setShowModal(false)}
            followers={followers}
          />
        </Modal>
      )}
    </>
  );
};

export default FollowerListModal;
