import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearFollowers,
  loadFollowersByUserIdThunk,
} from "../../store/profileUserFollowers";
import {
  clearFollowings,
  loadSessionUserFollowings,
} from "../../store/sessionUserFollowings";
import { clearPosts, loadPostsByUserId } from "../../store/posts";
import { clearUser, loadUserByUsernameThunk } from "../../store/users";
import FollowButton from "../FollowComponents/FollowButton/FollowButton";
import FollowerListModal from "../FollowComponents/FollowerListModal";
import FollowingListModal from "../FollowComponents/FollowingListModal";
import UnfollowButton from "../FollowComponents/UnfollowButton";
import PostModal from "../PostsComponents/PostModal";
import "./UserProfile.css";

const UserProfile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.users);
  const posts = Object.values(useSelector((state) => state.posts));
  const followers = useSelector((state) => state.profileUserFollowers);
  const { username } = useParams();

  useEffect(() => {
    dispatch(loadUserByUsernameThunk(username)).then((user) => {
      if (user) {
        dispatch(loadPostsByUserId(user.id));
        dispatch(loadFollowersByUserIdThunk(user.id));
      }
      dispatch(loadSessionUserFollowings());
    });

    return () => {
      dispatch(clearUser());
      dispatch(clearPosts());
      dispatch(clearFollowers());
      dispatch(clearFollowings());
    };
  }, [dispatch, username]);

  return (
    <section className="all-user-posts-section">
      <div className="all-user-posts-section-container">
        <div className="profile-information-container">
          <div className="profile-picture-container">
            <img
              className="profile-picture"
              src={user?.profileImg}
              alt="profile pic"
            />
          </div>
          <div className="profile-info">
            <div className="profile-header">
              <div className="profile-username">{user?.username}</div>
              {user.id !== currentUser.id &&
                (currentUser.id in followers ? (
                  <UnfollowButton profileUser={user} followUser={user} />
                ) : (
                  <FollowButton profileUser={user} followUser={user} />
                ))}
            </div>
            <div className="post-follower-following-info">
              <div>
                <strong>{posts.length}</strong> posts
              </div>
              <FollowerListModal user={user} />
              <FollowingListModal user={user} />
            </div>
          </div>
        </div>
        <div>
          <div className="all-user-post-types">
            <div className="post-type">
              <i className="fa-solid fa-table-cells"></i> <strong>POSTS</strong>
            </div>
          </div>
          <div className="all-user-posts-container">
            {posts.reverse().map((post) => {
              return <PostModal post={post} type="all-posts" key={post.id} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
