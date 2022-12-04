import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { loadSessionUserFollowings } from "../../../../store/sessionUserFollowings";
import FollowButton from "../../FollowButton";
import UnfollowButton from "../../UnfollowButton";
import "../../../../general.css";
import RemoveFollower from "../../RemoveFollower";

const FollowerList = ({ user, followers, onClose }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const followings = useSelector((state) => state.sessionUserFollowings);

  useEffect(() => {
    dispatch(loadSessionUserFollowings());
  }, [dispatch]);

  return (
    <section
      className="user-list-container"
      onClick={(e) => e.stopPropagation()}
    >
      <header className="user-list-header">
        <div>Followers</div>
        <button className="user-list-escape" onClick={onClose}>
          <i className="fa-solid fa-x"></i>
        </button>
      </header>
      <div className="user-list">
        {Object.values(followers).map((followerUser, i) => {
          return (
            <div key={i} className="user-list-link-container">
              <NavLink
                className="user-list-link"
                to={`/${followerUser.username}`}
                onClick={onClose}
              >
                <img
                  className="user-list-user-photo"
                  src={followerUser.profileImg}
                  alt="profile pic"
                />
                <div className="user-list-user-text">
                  <div className="user-list-user-username">
                    {followerUser.username}
                  </div>
                </div>
              </NavLink>
              {currentUser.id !== user.id ? (
                followerUser.id !== currentUser.id &&
                (!(followerUser.id in followings) ? (
                  <FollowButton profileUser={user} followUser={followerUser} />
                ) : (
                  <UnfollowButton
                    profileUser={user}
                    followUser={followerUser}
                  />
                ))
              ) : (
                <RemoveFollower followerUser={followerUser} />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FollowerList;
