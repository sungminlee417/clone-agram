const LOAD_USER = "users/LOAD_USER";
const CLEAR_USER = "users/CLEAR_USER";

const loadUser = (user) => ({
  type: LOAD_USER,
  user,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});

export const loadUserByUsernameThunk = (username) => async (dispatch) => {
  const response = await fetch(`/api/users/${username}`);

  if (response.ok) {
    const user = await response.json();
    dispatch(loadUser(user));
    return user;
  }
};

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER:
      return action.user;
    case CLEAR_USER:
      return {};
    default:
      return state;
  }
}
