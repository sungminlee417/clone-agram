const LOAD = "followings/LOAD";
const ADD = "followings/ADD";
const DELETE = "followings/DELETE";
const CLEAR_FOLLOWINGS = "followings/CLEAR";

const load = (followings) => ({
  type: LOAD,
  followings,
});

const add = (following) => ({
  type: ADD,
  following,
});

const deleteFollowing = (followingId) => ({
  type: DELETE,
  followingId,
});

export const clearFollowings = () => ({
  type: CLEAR_FOLLOWINGS,
});

export const loadSessionUserFollowings = () => async (dispatch) => {
  const response = await fetch(`/api/followings`);

  if (response.ok) {
    const data = await response.json();
    dispatch(load(data));
  }
};

export const createFollowingThunk = (userId) => async (dispatch) => {
  const response = await fetch(`/api/followings/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(add(data));
    dispatch(add);
    return data;
  }
};
export const deleteFollowingThunk = (userId) => async (dispatch) => {
  const response = await fetch(`/api/followings/${userId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteFollowing(userId));
  }
};

const initialState = {};

export default function reducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case LOAD:
      return action.followings;
    case ADD:
      newState[action.following.id] = action.following;
      return newState;
    case CLEAR_FOLLOWINGS:
      return {};
    case DELETE:
      delete newState[action.followingId];
      return newState;
    default:
      return newState;
  }
}
