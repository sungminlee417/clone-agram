const LOAD = "messages/LOAD";
const ADD = "messages/ADD";
const DELETE = "messages/DELETE";
const CLEAR_MESSAGES = "messages/CLEAR";

const load = (messages) => ({
  type: LOAD,
  messages,
});

const add = (message) => ({
  type: ADD,
  message,
});

const deleteMessage = (messageId) => ({
  type: DELETE,
  messageId,
});

export const clearMessages = () => ({
  type: CLEAR_MESSAGES,
});

export const loadMessages = (directMessageId) => async (dispatch) => {
  const response = await fetch(
    `/api/direct-messages/${directMessageId}/messages`
  );
  if (response.ok) {
    const data = await response.json();
    dispatch(load(data));
    return data;
  }
};

export const createMessageThunk =
  (directMessageId, payload) => async (dispatch) => {
    const response = await fetch(
      `/api/direct-messages/${directMessageId}/messages`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (response.ok) {
      const data = await response.json();
      dispatch(add(data));
      return data;
    }
  };

export const deleteMessageThunk = (messageId) => async (dispatch) => {
  const response = await fetch(`/api/messages/${messageId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteMessage(messageId));
  }
};

const initialState = {};

export default function reducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case LOAD:
      return action.messages;
    case ADD:
      newState[action.message.id] = action.message;
      return newState;
    case DELETE:
      delete newState[action.messageId];
      return newState;
    case CLEAR_MESSAGES:
      return {};
    default:
      return newState;
  }
}
