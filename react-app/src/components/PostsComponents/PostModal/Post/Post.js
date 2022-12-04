import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CreateComment from "../../../CommentComponents/CreateComment";
import PostModalComments from "../../../CommentComponents/PostModalComments";
import PostActions from "../../PostActions/PostActions";
import PostSettingsModal from "../../PostSettingsModal";
import "./Post.css";

const Post = ({ post, onClose }) => {
  const currentUser = useSelector((state) => state.session.user);

  return (
    <section
      className="single-post-container"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="single-post-content-container">
        <img
          className="single-post-content"
          src={post.contentUrl}
          alt="content pic"
        />
      </div>
      <div className="single-post-description-container">
        <div className="single-post-description-header">
          <NavLink
            className="single-post-owner-link"
            to={`/${post.owner.username}`}
            onClick={onClose}
          >
            <div className="single-post-description-header-user">
              <img
                className="single-post-description-header-user-profile"
                src={post.owner.profileImg}
                alt="profile pic"
              />
              <div>
                <strong>{post.owner.username}</strong>
              </div>
            </div>
          </NavLink>
          {currentUser.id === post.owner.id && (
            <PostSettingsModal onClose={onClose} post={post} />
          )}
        </div>
        <div className="single-post-description-comments-container">
          {post?.description && (
            <div className="single-post-description">
              <img
                className="single-post-description-user-profile"
                src={post.owner.profileImg}
                alt="profile pic"
              />
              <div className="single-post-description-text">
                <strong>{post.owner.username} </strong>
                <div>{post.description}</div>
              </div>
            </div>
          )}
          <PostModalComments post={post} />
        </div>
        <PostActions post={post} />
        <CreateComment post={post} />
      </div>
    </section>
  );
};

export default Post;
