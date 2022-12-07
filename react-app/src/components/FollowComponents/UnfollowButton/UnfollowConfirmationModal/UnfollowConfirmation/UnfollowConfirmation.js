import "./UnfollowConfirmation.css";

const UnfollowConfirmation = ({ onUnfollow, onClose }) => {
  return (
    <section className="unfollow-confirmation-container">
      <header className="unfollow-confirmation-header">
        <div className="unfollow-confirmation-header-one">Unfollow user?</div>
        <div className="unfollow-confirmation-header-two">
          Are you sure you want to unfollow this user?
        </div>
      </header>
      <button
        className="unfollow-confirmation-button delete"
        onClick={onUnfollow}
      >
        <strong>Unfollow</strong>
      </button>
      <button
        className="unfollow-confirmation-button cancel"
        onClick={() => onClose()}
      >
        Cancel
      </button>
    </section>
  );
};

export default UnfollowConfirmation;
