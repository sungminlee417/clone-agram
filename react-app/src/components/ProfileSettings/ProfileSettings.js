import { Route } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import "./ProfileSettings.css";
import ProfileSettingsNavBar from "./ProfileSettingsNavBar";
import UserSettings from "./UserSettings";

const ProfileSettings = () => {
  return (
    <section className="profile-settings-section">
      <div className="profile-settings-container">
        <ProfileSettingsNavBar />
        <Route path="/accounts/edit">
          <UserSettings />
        </Route>
        <Route path="/accounts/password/change">
          <ChangePassword />
        </Route>
      </div>
    </section>
  );
};

export default ProfileSettings;
