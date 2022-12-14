import { useState } from "react";
import Post from "./Post/Post";
import { Modal } from "../../../context/Modal";
import "./PostModal.css";

const PostModal = ({ post, type }) => {
  const [showModal, setShowModal] = useState(false);

  console.log(Object.values(post));

  return (
    <>
      {type === "all-posts" && (
        <div className="post-container" onClick={() => setShowModal(true)}>
          <img
            className="post-content"
            src={Object.values(post.images)[0].imageUrl}
            alt="post pic"
          />
          <div className="post-comment-like-count like">
            <i className="fa-solid fa-heart"></i>
            <div>{Object.values(post.likes).length}</div>
          </div>
          <div className="post-comment-like-count comment">
            <i className="fa-solid fa-comment "></i>
            <div>{Object.values(post.comments).length}</div>
          </div>
          {Object.values(post.images).length > 1 && (
            <i className="fa-regular fa-clone post-multiple-icon"></i>
          )}
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
