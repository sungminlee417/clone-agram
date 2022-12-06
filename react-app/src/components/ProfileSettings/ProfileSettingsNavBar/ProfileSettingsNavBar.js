import "./ProfileSettingsNavBar.css";

import { NavLink } from "react-router-dom";

const ProfileSettingsNavBar = () => {
  return (
    <nav className="profile-settings-nav-bar">
      <div className="profile-settings-nav-bar-container">
        <NavLink to="/accounts/edit" className="profile-settings-nav-bar-link">
          Edit profile
        </NavLink>
        <NavLink
          to="/accounts/password/change"
          className="profile-settings-nav-bar-link"
        >
          Privacy and security
        </NavLink>
      </div>
    </nav>
  );
};

export default ProfileSettingsNavBar;
