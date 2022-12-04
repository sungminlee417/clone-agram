import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import posts from "./posts";
import users from "./users";
import comments from "./comments";
import userSearch from "./userSearch";
import profileUserFollowers from "./profileUserFollowers";
import sessionUserFollowings from "./sessionUserFollowings";
import likes from "./likes";
import directMessages from "./directMessages";
import messages from "./messages";

const rootReducer = combineReducers({
  session,
  posts,
  users,
  comments,
  userSearch,
  profileUserFollowers,
  sessionUserFollowings,
  likes,
  directMessages,
  messages,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
