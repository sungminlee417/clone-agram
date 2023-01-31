import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUserPasswordThunk } from "../../../store/session";
import "./ChangePassword.css";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentUser.id !== 1) {
      const submitButton = document.querySelector(".change-password-submit");
      if ((oldPassword, newPassword, confirmPassword)) {
        submitButton.classList.add("enabled");
      } else {
        submitButton.classList.remove("enabled");
      }
    }
  }, [oldPassword, newPassword, confirmPassword, currentUser.id]);

  const onSubmit = async () => {
    await dispatch(
      editUserPasswordThunk({
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      })
    ).then((errors) => {
      if (errors) {
        setErrors(errors);
      }
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    });
  };

  return (
    <div className="change-password-section">
      {currentUser.id === 1 ? (
        <div className="change-password-demo">
          Demo user's settings cannot be modified
        </div>
      ) : (
        <div className="change-password-container">
          <div className="change-password-header">
            <img
              className="change-password-photo"
              src={currentUser.profileImg}
              alt="user profile"
            />
            <div className="change-password-header-username">
              {currentUser.username}
            </div>
          </div>
          <div className="change-password-inputs-container">
            <div className="change-password-inputs-error-container">
              <div className="change-password-input-label-container">
                <label className="change-password-input-label">
                  Old password
                </label>
                <input
                  className="change-password-input"
                  onChange={(e) => setOldPassword(e.target.value)}
                  type="password"
                  value={oldPassword}
                />
              </div>
              {errors.old_password && (
                <div className="change-password-error">
                  {errors.old_password}
                </div>
              )}
            </div>

            <div className="change-password-inputs-error-container">
              <div className="change-password-input-label-container">
                <label className="change-password-input-label">
                  New password
                </label>
                <input
                  className="change-password-input"
                  onChange={(e) => setNewPassword(e.target.value)}
                  type="password"
                  value={newPassword}
                />
              </div>
              {errors.new_password && (
                <div className="change-password-error">
                  {errors.new_password}
                </div>
              )}
            </div>

            <div className="change-password-inputs-error-container">
              <div className="change-password-input-label-container">
                <label className="change-password-input-label">
                  Confirm new password
                </label>
                <input
                  className="change-password-input"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  value={confirmPassword}
                />
              </div>
              {errors.confirm_password && (
                <div className="change-password-error">
                  {errors.confirm_password}
                </div>
              )}
            </div>

            <div className="change-password-input-label-container">
              <div className="change-password-input-label"></div>
              <button className="change-password-submit" onClick={onSubmit}>
                Confirm password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
