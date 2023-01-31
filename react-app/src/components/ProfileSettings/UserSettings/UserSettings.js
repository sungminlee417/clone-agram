import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUserThunk } from "../../../store/session";
import ChangeProfilePhotoModal from "./ChangeProfilePhotoModal";
import "./UserSettings.css";

const UserSettings = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const [profileImage, setProfileImage] = useState("");
  const [name, setName] = useState(currentUser ? currentUser.name : "");
  const [username, setUsername] = useState(
    currentUser ? currentUser.username : ""
  );
  const [changed, setChanged] = useState(false);
  const [email, setEmail] = useState(currentUser ? currentUser.email : "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentUser.id !== 1) {
      const submitButton = document.querySelector(".user-settings-submit");
      if (changed && submitButton) {
        submitButton.classList.add("enabled");
      }
    }
  }, [changed, currentUser.id]);

  const onSubmit = async () => {
    const postData = new FormData();

    postData.append("profile_image", profileImage);
    postData.append("name", name);
    postData.append("username", username);
    postData.append("email", email);

    await dispatch(editUserThunk(postData)).then((errors) => {
      if (errors) {
        setErrors(errors);
      }
    });
  };

  return (
    <div className="user-settings-section">
      {currentUser.id === 1 ? (
        <div className="user-settings-demo">
          Demo user's settings cannot be modified
        </div>
      ) : (
        <div className="user-settings-container">
          <div className="user-settings-header">
            <ChangeProfilePhotoModal
              type="photo"
              currentUser={currentUser}
              profileImage={profileImage}
              setProfileImage={setProfileImage}
              setChanged={setChanged}
            />
            <div className="user-settings-header-user-info">
              <div className="user-settings-header-username">
                {currentUser.username}
              </div>
              <ChangeProfilePhotoModal
                type="button"
                currentUser={currentUser}
                setProfileImage={setProfileImage}
                setChanged={setChanged}
              />
            </div>
          </div>
          <div className="user-settings-container">
            <div className="user-settings-input-error-container">
              <div className="user-settings-input-label-container">
                <label className="user-settings-input-label">Name</label>
                <input
                  className="user-settings-input"
                  onChange={(e) => {
                    setName(e.target.value);
                    setChanged(true);
                  }}
                  placeholder="Name"
                  value={name}
                />
              </div>
              {errors.name && (
                <div className="user-settings-error">{errors.name}</div>
              )}
            </div>
            <div className="user-settings-input-error-container">
              <div className="user-settings-input-label-container">
                <label className="user-settings-input-label">Username</label>
                <input
                  className="user-settings-input"
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setChanged(true);
                  }}
                  placeholder="Username"
                  value={username}
                />
              </div>
              {errors.username && (
                <div className="user-settings-error">{errors.username}</div>
              )}
            </div>
            <div className="user-settings-input-error-container">
              <div className="user-settings-input-label-container">
                <label className="user-settings-input-label">Email</label>
                <input
                  className="user-settings-input"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setChanged(true);
                  }}
                  placeholder="Email"
                  value={email}
                />
              </div>
              {errors.email && (
                <div className="user-settings-error">{errors.email}</div>
              )}
            </div>
            <div className="user-settings-input-label-container">
              <div className="user-settings-input-label"></div>
              <button className="user-settings-submit" onClick={onSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSettings;
