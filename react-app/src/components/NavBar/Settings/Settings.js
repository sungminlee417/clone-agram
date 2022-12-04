import LogoutButton from "../../auth/LogoutButton";
import "./Settings.css";

const Settings = () => {
  return (
    <div className="settings-box" onClick={(e) => e.stopPropagation()}>
      <LogoutButton />
    </div>
  );
};

export default Settings;
