const LOAD = "followers/LOAD";
const DELETE = "followers/DELETE";
const CLEAR_FOLLOWERS = "followers/CLEAR";

const load = (followers) => ({
  type: LOAD,
  followers,
});

const deleteFollower = (followerId) => ({
  type: DELETE,
  followerId,
});

export const clearFollowers = () => ({
  type: CLEAR_FOLLOWERS,
});

export const loadFollowersByUserIdThunk = (userId) => async (dispatch) => {
  const response = await fetch(`/api/followers/${userId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(load(data));
    return data;
  }
};

export const deleteFollowerThunk = (followerId) => async (dispatch) => {
  const response = await fetch(`/api/followers/${followerId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(followerId),
  });

  if (response.ok) {
    dispatch(deleteFollower(followerId));
  }
};

const initialState = {};

export default function reducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case LOAD:
      return action.followers;
    case DELETE:
      delete newState[action.followerId];
      return newState;
    case CLEAR_FOLLOWERS:
      return {};
    default:
      return newState;
  }
}
