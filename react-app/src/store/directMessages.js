import DeleteChannel from "../components/DirectMessagingComponents/DeleteChannelModal/DeleteChannel/DeleteChannel";

const LOAD = "directMessages/LOAD";
const ADD = "directMessages/ADD";
const DELETE = "directMessages/DELETE";
const CLEAR_DIRECT_MESSAGES = "directMessages/CLEAR";

const load = (directMessages) => ({
  type: LOAD,
  directMessages,
});

const add = (directMessage) => ({
  type: ADD,
  directMessage,
});

const deleteDirectMessage = (directMessageId) => ({
  type: DeleteChannel,
  directMessageId,
});

export const clearDirectMessages = () => ({
  type: CLEAR_DIRECT_MESSAGES,
});

export const loadDirectMessages = () => async (dispatch) => {
  const response = await fetch("/api/direct-messages");

  if (response.ok) {
    const data = await response.json();
    dispatch(load(data));
    return data;
  }
};

export const createDirectMessageThunk = (users) => async (dispatch) => {
  const response = await fetch("/api/direct-messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(users),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(add(data));
    return data;
  }
};

export const deleteDirectMessageThunk =
  (directMessageId) => async (dispatch) => {
    const response = await fetch(`/api/direct-messages/${directMessageId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      dispatch(deleteDirectMessage(directMessageId));
    }
  };

const initialState = {};

export default function reducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case LOAD:
      return action.directMessages;
    case ADD:
      newState[action.directMessage.id] = action.directMessage;
      return newState;
    case DELETE:
      delete newState[action.directMessageId];
      return newState;
    case CLEAR_DIRECT_MESSAGES:
      return {};
    default:
      return newState;
  }
}
