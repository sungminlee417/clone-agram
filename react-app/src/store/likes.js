const LOAD = "likes/LOAD";
const ADD = "likes/ADD";
const DELETE = "likes/DELETE";
const CLEAR_LIKES = "likes/CLEAR";

const load = (likes) => ({
  type: LOAD,
  likes,
});

const add = (like) => ({
  type: ADD,
  like,
});

const deleteLike = (userId) => ({
  type: DELETE,
  userId,
});

export const clearLikes = () => ({
  type: CLEAR_LIKES,
});

export const loadLikesByPostId = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/likes`);

  if (response.ok) {
    const data = await response.json();
    dispatch(load(data));
  }
};

export const createPostLikeThunk = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/likes`, {
    method: "POST",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(add(data));
  }
};

export const deletePostLikeThunk = (userId, likeId) => async (dispatch) => {
  const response = await fetch(`/api/likes/${likeId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteLike(userId));
  }
};

export const createCommentLikeThunk = (commentId) => async (dispatch) => {
  await fetch(`/api/comments/${commentId}/likes`, {
    method: "POST",
  });
};

export const deleteCommentLikeThunk = (likeId) => async (dispatch) => {
  await fetch(`/api/likes/${likeId}`, {
    method: "DELETE",
  });
};

const initialState = {};

export default function reducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case LOAD:
      const likes = {};
      Object.values(action.likes).forEach((like) => {
        likes[like.user.id] = like;
      });
      return likes;
    case ADD:
      newState[action.like.user.id] = action.like;
      return newState;
    case DELETE:
      delete newState[action.userId];
      return newState;
    case CLEAR_LIKES:
      return {};
    default:
      return newState;
  }
}
