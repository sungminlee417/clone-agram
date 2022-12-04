import { useDispatch } from "react-redux";
import { deleteFollowerThunk } from "../../../store/profileUserFollowers";
import "./RemoveFollower.css";

const RemoveFollower = ({ followerUser }) => {
  const dispatch = useDispatch();

  const removeFollower = () => {
    dispatch(deleteFollowerThunk(followerUser.id));
  };

  return (
    <button className="remove-button" onClick={removeFollower}>
      Remove
    </button>
  );
};

export default RemoveFollower;
