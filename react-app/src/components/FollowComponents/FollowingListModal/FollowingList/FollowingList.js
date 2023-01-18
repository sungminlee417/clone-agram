import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { loadSessionUserFollowings } from "../../../../store/sessionUserFollowings";
import FollowButton from "../../FollowButton";
import UnfollowButton from "../../UnfollowButton";
import "./FollowingList.css";

const FollowingList = ({ user, onClose }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const followings = useSelector((state) => state.sessionUserFollowings);

  useEffect(() => {
    dispatch(loadSessionUserFollowings());
  }, [dispatch]);

  return (
    <section
      className="follow-list-container"
      onClick={(e) => e.stopPropagation()}
    >
      <header className="follow-list-header">
        <div>Following</div>
        <button className="follow-list-escape" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </header>
      <div className="follow-list">
        {Object.values(
          currentUser.id === user.id ? followings : user.followings
        ).map((following, i) => {
          return (
            <div key={i} className="follow-list-link-container">
              <NavLink
                className="follow-list-link"
                to={`/${
                  currentUser.id === user.id
                    ? following.username
                    : following.followingUser.username
                }`}
                onClick={onClose}
              >
                <img
                  className="follow-list-user-photo"
                  src={
                    currentUser.id === user.id
                      ? following.profileImg
                      : following.followingUser.profileImg
                  }
                  alt="profile pic"
                />
                <div className="follow-list-user-text">
                  <div className="follow-list-user-username">
                    {currentUser.id === user.id
                      ? following.username
                      : following.followingUser.username}
                  </div>
                </div>
              </NavLink>
              {(currentUser.id === user.id
                ? following.id
                : following.followingUser.id) !== currentUser.id &&
                (!(
                  (currentUser.id === user.id
                    ? following.id
                    : following.followingUser.id) in followings
                ) ? (
                  <FollowButton
                    profileUser={user}
                    followUser={
                      currentUser.id === user.id
                        ? following
                        : following.followingUser
                    }
                  />
                ) : (
                  <UnfollowButton
                    profileUser={user}
                    followUser={
                      currentUser.id === user.id
                        ? following
                        : following.followingUser
                    }
                  />
                ))}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FollowingList;
