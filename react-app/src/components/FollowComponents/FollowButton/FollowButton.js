import { useDispatch } from "react-redux";
import { loadFollowersByUserIdThunk } from "../../../store/profileUserFollowers";
import {
  loadSessionUserFollowings,
  createFollowingThunk,
} from "../../../store/sessionUserFollowings";
import { loadUserByUsernameThunk } from "../../../store/users";
import "./FollowButton.css";

const FollowButton = ({ profileUser, followUser }) => {
  const dispatch = useDispatch();

  const onFollow = (e) => {
    e.preventDefault();
    dispatch(createFollowingThunk(followUser.id)).then(() => {
      if (Object.values(profileUser).length) {
        dispatch(loadFollowersByUserIdThunk(profileUser.id));
        dispatch(loadUserByUsernameThunk(profileUser.username));
      }
      dispatch(loadSessionUserFollowings());
    });
  };

  return (
    <button className="follow-button" onClick={onFollow}>
      Follow
    </button>
  );
};

export default FollowButton;
