import { useState } from "react";
import Post from "./Post/Post";
import { Modal } from "../../../context/Modal";
import "./PostModal.css";

const PostModal = ({ post, type }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {type === "all-posts" && (
        <div className="post-container" onClick={() => setShowModal(true)}>
          <img className="post-content" src={post.contentUrl} alt="post pic" />
          <div className="post-comment-like-count like">
            <i className="fa-solid fa-heart"></i>
            <div>{Object.values(post.likes).length}</div>
          </div>
          <div className="post-comment-like-count comment">
            <i className="fa-solid fa-comment "></i>
            <div>{Object.values(post.comments).length}</div>
          </div>
        </div>
      )}
      {type === "following-posts" && (
        <div
          className="following-posts-comments-modal-button"
          onClick={() => setShowModal(true)}
        >
          View all {Object.values(post.comments).length} comments
        </div>
      )}
      {type === "following-posts-comment" && (
        <i
          className="fa-regular fa-comment post-actions-button"
          onClick={() => setShowModal(true)}
        ></i>
      )}
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          showModal={showModal}
          type="post"
        >
          <Post onClose={() => setShowModal(false)} post={post} />
        </Modal>
      )}
    </>
  );
};

export default PostModal;
