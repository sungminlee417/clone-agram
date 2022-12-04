import { useDispatch } from "react-redux";
import { loadFollowersByUserIdThunk } from "../../../store/profileUserFollowers";
import {
  deleteFollowingThunk,
  loadSessionUserFollowings,
} from "../../../store/sessionUserFollowings";
import { loadUserByUsernameThunk } from "../../../store/users";
import "./UnfollowButton.css";

const UnfollowButton = ({ profileUser, followUser }) => {
  const dispatch = useDispatch();

  const onUnfollow = () => {
    dispatch(deleteFollowingThunk(followUser.id)).then(() => {
      if (Object.values(profileUser).length) {
        dispatch(loadFollowersByUserIdThunk(profileUser.id));
        dispatch(loadUserByUsernameThunk(profileUser.username));
      }
      dispatch(loadSessionUserFollowings());
    });
  };

  return (
    <button className="unfollow-button" onClick={onUnfollow}>
      Following
    </button>
  );
};

export default UnfollowButton;
