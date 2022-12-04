const LOAD_USERS = "users/LOAD_USERS";
const CLEAR_USERS = "users/CLEAR_USERS";

const loadUsers = (users) => ({
  type: LOAD_USERS,
  users,
});

export const clearUsers = () => ({
  type: CLEAR_USERS,
});

export const searchUsersByUsernameThunk = (username) => async (dispatch) => {
  const response = await fetch(`/api/users/search/${username}`);

  if (response.ok) {
    const users = await response.json();
    dispatch(loadUsers(users));
    return users;
  }
};

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USERS:
      return action.users;
    case CLEAR_USERS:
      return {};
    default:
      return state;
  }
}
