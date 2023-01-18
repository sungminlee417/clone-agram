import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "../../../../general.css";
import FollowButton from "../../../FollowComponents/FollowButton/FollowButton";
import UnfollowButton from "../../../FollowComponents/UnfollowButton";

const PostLikes = ({ likes, onClose }) => {
  const currentUser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.users);
  const followings = useSelector((state) => state.sessionUserFollowings);

  return (
    <section
      className="user-list-container"
      onClick={(e) => e.stopPropagation()}
    >
      <header className="user-list-header">
        <div>Likes</div>
        <button className="user-list-escape" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </header>
      <div className="user-list">
        {Object.values(likes).map((like, i) => {
          return (
            <div key={i} className="user-list-link-container">
              <NavLink
                className="user-list-link"
                to={`/${like.user.username}`}
                onClick={onClose}
              >
                <img
                  className="user-list-user-photo"
                  src={like.user.profileImg}
                  alt="profile pic"
                />
                <div className="user-list-user-text">
                  <div className="user-list-user-username">
                    {like.user.username}
                  </div>
                </div>
              </NavLink>
              {like.user.id !== currentUser.id &&
                (!(like.user.id in followings) ? (
                  <FollowButton
                    profileUser={user}
                    followUser={like.user}
                    type="homepage"
                  />
                ) : (
                  <UnfollowButton
                    profileUser={user}
                    followUser={like.user}
                    type="homepage"
                  />
                ))}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PostLikes;
