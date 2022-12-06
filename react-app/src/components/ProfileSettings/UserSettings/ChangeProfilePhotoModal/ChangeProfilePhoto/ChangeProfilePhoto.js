import "./ChangeProfilePhoto.css";

const ChangeProfilePhoto = ({ setProfileImage, onClose, setChanged }) => {
  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(file);
    setChanged(true);
    onClose();
  };

  return (
    <section
      className="change-profile-photo-container"
      onClick={(e) => e.stopPropagation()}
    >
      <header className="change-profile-photo-header">
        <div className="change-profile-photo-header-text">
          Change Profile Photo
        </div>
      </header>
      <label htmlFor="file" className="change-profile-photo-header-text-button">
        Upload Photo
      </label>
      <input
        className="change-profile-photo-header-text-button upload"
        id="file"
        type="file"
        onChange={updateFile}
        accept="image/*"
      />
      <button
        className="change-profile-photo-header-text-button cancel"
        onClick={() => onClose()}
      >
        Cancel
      </button>
    </section>
  );
};

export default ChangeProfilePhoto;
