import { useState } from "react";
import { Modal } from "../../../../context/Modal";
import ChangeProfilePhoto from "./ChangeProfilePhoto/ChangeProfilePhoto";
import "./ChangeProfilePhotoModal.css";

const ChangeProfilePhotoModal = ({
  type,
  currentUser,
  profileImage,
  setProfileImage,
  setChanged,
}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {type === "photo" &&
        (!profileImage ? (
          <img
            className="change-profile-photo-modal-photo"
            onClick={() => setShowModal(true)}
            src={currentUser.profileImg}
            alt="user profile"
          />
        ) : (
          <img
            className="change-profile-photo-modal-photo"
            onClick={() => setShowModal(true)}
            src={URL.createObjectURL(profileImage)}
            alt="user profile"
          ></img>
        ))}
      {type === "button" && (
        <button
          className="user-settings-header-change-photo-button"
          onClick={() => setShowModal(true)}
        >
          Change profile photo
        </button>
      )}
      {showModal && (
        <Modal onClose={() => setShowModal(false)} showModal={showModal}>
          <ChangeProfilePhoto
            setProfileImage={setProfileImage}
            onClose={() => setShowModal(false)}
            setChanged={setChanged}
          />
        </Modal>
      )}
    </>
  );
};

export default ChangeProfilePhotoModal;
