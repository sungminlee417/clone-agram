import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPosts, loadFollowingPosts } from "../../../store/posts";
import { createPostLikeThunk, deletePostLikeThunk } from "../../../store/likes";
import { createCommentThunk } from "../../../store/comments";
import PostLikesModal from "../../PostsComponents/PostLikesModal";
import PostSettingsModal from "../../PostsComponents/PostSettingsModal";
import "./FollowingPosts.css";
import { NavLink } from "react-router-dom";
import PostModal from "../../PostsComponents/PostModal/PostModal";
import {
  clearFollowings,
  loadSessionUserFollowings,
} from "../../../store/sessionUserFollowings";

const FollowingPosts = () => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const currentUser = useSelector((state) => state.session.user);
  const posts = Object.values(useSelector((state) => state.posts));

  useEffect(() => {
    dispatch(loadFollowingPosts());
    dispatch(loadSessionUserFollowings());

    return () => {
      dispatch(clearPosts());
      dispatch(clearFollowings());
    };
  }, [dispatch]);

  useEffect(() => {
    const submitButton = document.querySelector(
      ".following-posts-create-comment-submit"
    );
    if (comment && submitButton) {
      submitButton.removeAttribute("disabled");
      submitButton.classList.add("typed");
    } else if (submitButton) {
      submitButton.setAttribute("disabled", "");
      submitButton.classList.remove("typed");
    }
  }, [comment]);

  const onLike = (postId) => {
    dispatch(createPostLikeThunk(postId)).then(() => {
      dispatch(loadFollowingPosts());
    });
  };

  const onUnlike = (post) => {
    dispatch(
      deletePostLikeThunk(currentUser.id, post.likes[currentUser.id].id)
    ).then(() => {
      dispatch(loadFollowingPosts());
    });
  };

  const updateComment = (e) => {
    setComment(e.target.value);
  };

  const onSubmit = async (e, post) => {
    e.preventDefault();
    const payload = { comment };
    await dispatch(createCommentThunk(post.id, payload)).then(() => {
      setComment("");
      dispatch(loadFollowingPosts());
    });
  };

  return (
    <section className="following-posts-section">
      <div className="following-posts-container">
        {posts.reverse().map((post, i) => {
          return (
            <div className="following-posts-post-container" key={i}>
              <header className="following-posts-post-header">
                <NavLink
                  to={`/${post.owner.username}`}
                  className="following-posts-post-user-link"
                >
                  <div className="following-posts-post-header-user-info">
                    <img
                      className="following-posts-post-header-profile-image"
                      src={post.owner.profileImg}
                      alt="follow profile"
                    />
                    <div>{post.owner.username}</div>
                  </div>
                </NavLink>
                {post.owner.id === currentUser.id && (
                  <PostSettingsModal post={post} />
                )}
              </header>
              <div className="following-posts-post-content-container">
                <img
                  className="following-posts-post-content"
                  src={post.contentUrl}
                  alt="follow content"
                />
              </div>
              <section className="following-posts-post-actions-container">
                <div className="following-posts-post-actions">
                  {!post.likes[currentUser.id] ? (
                    <button
                      className="following-posts-post-actions-like-button"
                      onClick={() => onLike(post.id)}
                    >
                      <i className="fa-regular fa-heart following-posts-post-actions-button"></i>
                    </button>
                  ) : (
                    <button
                      className="following-posts-post-actions-unlike-button"
                      onClick={() => onUnlike(post)}
                    >
                      <i className="fa-solid fa-heart following-posts-post-actions-button"></i>
                    </button>
                  )}
                  <PostModal post={post} type="following-posts-comment" />
                </div>
                <PostLikesModal likes={post.likes} />
              </section>
              {post.description && (
                <div className="following-posts-post-description">
                  <strong>
                    <NavLink
                      className="following-posts-post-user-link"
                      to={`/${post.owner.username}`}
                    >
                      {post.owner.username}
                    </NavLink>
                  </strong>
                  <div>{post.description}</div>
                </div>
              )}
              <PostModal post={post} type="following-posts" />
              <form
                className="following-posts-create-comment-form"
                onSubmit={(e) => onSubmit(e, post)}
              >
                <input
                  id="following-posts-create-comment-input"
                  className="following-posts-create-comment-input"
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={updateComment}
                />
                <button
                  className="following-posts-create-comment-submit"
                  disabled
                  type="submit"
                >
                  Post
                </button>
              </form>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FollowingPosts;
