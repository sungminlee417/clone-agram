import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { loadCommentsByPostId } from "../../../store/comments";
import { clear } from "../../../store/comments";
import {
  createCommentLikeThunk,
  deleteCommentLikeThunk,
} from "../../../store/likes";
import CommentLikesModal from "../CommentLikesModal";
import CommentSettingsModal from "../CommentSettingsModal/CommentSettingsModal";
import "./PostModalComments.css";

const PostModalComments = ({ post }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const comments = Object.values(useSelector((state) => state.comments));

  useEffect(() => {
    dispatch(loadCommentsByPostId(post.id));
    return () => dispatch(clear());
  }, [dispatch, post.id]);

  const likeComment = (commentId) => {
    dispatch(createCommentLikeThunk(commentId)).then(
      dispatch(loadCommentsByPostId(post.id))
    );
  };

  const unlikeComment = (likeId) => {
    dispatch(deleteCommentLikeThunk(likeId)).then(
      dispatch(loadCommentsByPostId(post.id))
    );
  };

  return (
    <section className="post-modal-comments-section">
      {comments.map((comment, i) => {
        return (
          <div className="post-modal-comment-container" key={i}>
            <div className="post-modal-comment-content-container">
              <NavLink to={`/${comment.owner.username}`}>
                <img
                  className="post-modal-comment-user-profile"
                  src={comment.owner.profileImg}
                  alt="profile pic"
                />
              </NavLink>
              <div className="post-modal-comment-content">
                <div className="post-modal-comment-text">
                  <NavLink
                    to={`/${comment.owner.username}`}
                    className="post-modal-comment-text-link"
                  >
                    <strong>{comment.owner.username} </strong>
                  </NavLink>

                  {comment.comment}
                </div>
                <div className="post-modal-comment-more-details-container">
                  <CommentLikesModal comment={comment} />
                  {(comment.owner.id === currentUser.id ||
                    post.owner.id === currentUser.id) && (
                    <div className="post-modal-comment-more-details">
                      <CommentSettingsModal comment={comment} />
                    </div>
                  )}
                </div>
              </div>
              {comment.likes[currentUser.id] ? (
                <button
                  className="post-modal-comment-like-button-filled"
                  onClick={() =>
                    unlikeComment(comment.likes[currentUser.id].id)
                  }
                >
                  <i className="fa-solid fa-heart post-modal-comment-like-button-icon-filled"></i>
                </button>
              ) : (
                <button
                  className="post-modal-comment-like-button"
                  onClick={() => likeComment(comment.id)}
                >
                  <i className="fa-regular fa-heart post-modal-comment-like-button-icon"></i>
                </button>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default PostModalComments;
