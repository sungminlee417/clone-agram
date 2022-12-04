const LOAD = "comments/LOAD";
const ADD = "comments/ADD";
const EDIT = "comments/EDIT";
const DELETE = "comments/DELETE";
const CLEAR = "comments/CLEAR";

const load = (comments) => ({
  type: LOAD,
  comments,
});

const add = (comment) => ({
  type: ADD,
  comment,
});

const edit = (comment) => ({
  type: EDIT,
  comment,
});

const deleteComment = (commentId) => ({
  type: DELETE,
  commentId,
});

export const clear = () => ({
  type: CLEAR,
});

export const loadCommentsByPostId = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/comments`);
  if (response.ok) {
    const data = await response.json();
    dispatch(load(data));
  }
};

export const createCommentThunk = (postId, payload) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(add(data));
  }
};

export const editCommentThunk = (commentId, payload) => async (dispatch) => {
  const payloadData = { comment: payload.commentData };
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payloadData),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(edit(data));
  }
};

export const deleteCommentThunk = (commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteComment(commentId));
  }
};

const initialState = {};

export default function reducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case LOAD:
      return action.comments;
    case ADD:
      newState[action.comment.id] = action.comment;
      return newState;
    case EDIT:
      newState[action.comment.id] = action.comment;
      return newState;
    case DELETE:
      delete newState[action.commentId];
      return newState;
    case CLEAR:
      return {};
    default:
      return newState;
  }
}
