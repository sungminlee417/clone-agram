import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearLikes,
  createPostLikeThunk,
  deletePostLikeThunk,
  loadLikesByPostId,
} from "../../../store/likes";
import { loadPostsByUserId } from "../../../store/posts";
import PostLikesModal from "../PostLikesModal";
import "./PostActions.css";

const PostActions = ({ post, type }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const likes = useSelector((state) => state.likes);

  useEffect(() => {
    dispatch(loadLikesByPostId(post.id));

    return () => dispatch(clearLikes());
  }, [dispatch, post.id]);

  const onLike = async () => {
    await dispatch(createPostLikeThunk(post.id)).then(() => {
      if (type === "user-profile") dispatch(loadPostsByUserId(currentUser.id));
    });
  };

  const onUnlike = async () => {
    await dispatch(
      deletePostLikeThunk(currentUser.id, likes[currentUser.id].id)
    ).then(() => {
      if (type === "user-profile") dispatch(loadPostsByUserId(currentUser.id));
    });
  };

  return (
    <section className="post-actions-container">
      <div className="post-actions">
        {!likes[currentUser.id] ? (
          <button className="post-actions-like-button" onClick={onLike}>
            <i className="fa-regular fa-heart post-actions-button"></i>
          </button>
        ) : (
          <button className="post-actions-unlike-button" onClick={onUnlike}>
            <i className="fa-solid fa-heart post-actions-button"></i>
          </button>
        )}
        <label htmlFor="create-comment-input">
          <i className="fa-regular fa-comment post-actions-button"></i>
        </label>
      </div>
      <PostLikesModal likes={likes} />
    </section>
  );
};

export default PostActions;
