const LOAD = "posts/LOAD";
const ADD = "posts/ADD";
const EDIT = "posts/EDIT";
const DELETE = "posts/DELETE";
const CLEAR_POSTS = "posts/CLEAR";

const load = (posts) => ({
  type: LOAD,
  posts,
});

const add = (post) => ({
  type: ADD,
  post,
});

const edit = (post) => ({
  type: EDIT,
  post,
});

const deletePost = (postId) => ({
  type: DELETE,
  postId,
});

export const clearPosts = () => ({
  type: CLEAR_POSTS,
});

export const loadAllPostsThunk = () => async (dispatch) => {
  const response = await fetch("/api/posts/");

  if (response.ok) {
    const data = await response.json();
    dispatch(load(data));
  }
};

export const loadPostsByUserId = (userId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${userId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(load(data));
  }
};

export const loadFollowingPosts = () => async (dispatch) => {
  const response = await fetch("/api/posts/following");

  if (response.ok) {
    const data = await response.json();
    dispatch(load(data));
  }
};

export const createPostThunk = (post) => async (dispatch) => {
  const response = await fetch("/api/posts/", {
    method: "POST",
    body: post,
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(add(data));
  }
};

export const editPostThunk = (postId, payload) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(edit(data));
  }
};

export const deletePostThunk = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deletePost(postId));
  }
};

const initialState = {};

export default function reducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case LOAD:
      return action.posts;
    case ADD:
      newState[action.post.id] = action.post;
      return newState;
    case EDIT:
      newState[action.post.id] = action.post;
      return newState;
    case DELETE:
      delete newState[action.postId];
      return newState;
    case CLEAR_POSTS:
      return {};
    default:
      return newState;
  }
}
