import { NavLink } from "react-router-dom";
import LogoutButton from "../../auth/LogoutButton";
import "./Settings.css";

const Settings = () => {
  return (
    <div className="settings-box" onClick={(e) => e.stopPropagation()}>
      <div className="settings-box-top">
        <NavLink to="/accounts/edit" className="settings-edit-link">
          <div>Settings</div>
          <i className="fa-solid fa-gear"></i>
        </NavLink>
      </div>
      <div className="settings-box-bottom">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Settings;
