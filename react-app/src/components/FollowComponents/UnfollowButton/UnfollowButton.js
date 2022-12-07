import { useDispatch } from "react-redux";
import { loadFollowersByUserIdThunk } from "../../../store/profileUserFollowers";
import {
  deleteFollowingThunk,
  loadSessionUserFollowings,
} from "../../../store/sessionUserFollowings";
import { loadUserByUsernameThunk } from "../../../store/users";
import "./UnfollowButton.css";
import UnfollowConfirmationModal from "./UnfollowConfirmationModal";

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

  return <UnfollowConfirmationModal onUnfollow={onUnfollow} />;
};

export default UnfollowButton;
