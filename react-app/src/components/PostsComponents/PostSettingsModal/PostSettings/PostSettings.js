import { useState } from "react";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost/EditPost";
import "./PostSettings.css";

const PostSettings = ({ post, onClose, onClosePost }) => {
  const [showEditComponent, setShowEditComponent] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);

  return (
    <>
      {!showDeleteComponent && !showEditComponent && (
        <section
          className="post-settings-container"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="post-settings-button delete"
            onClick={() => setShowDeleteComponent(true)}
          >
            <strong>Delete</strong>
          </button>
          <div className="post-settings-divider"></div>
          <button
            className="post-settings-button"
            onClick={() => setShowEditComponent(true)}
          >
            Edit
          </button>
        </section>
      )}
      {showEditComponent && (
        <EditPost post={post} onClose={onClose} onClosePost={onClosePost} />
      )}
      {showDeleteComponent && (
        <DeletePost post={post} onClose={onClose} onClosePost={onClosePost} />
      )}
    </>
  );
};

export default PostSettings;
