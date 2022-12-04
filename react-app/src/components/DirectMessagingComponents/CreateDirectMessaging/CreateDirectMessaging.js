import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createDirectMessageThunk } from "../../../store/directMessages";
import {
  searchUsersByUsernameThunk,
  clearUsers,
} from "../../../store/userSearch";
import "./CreateDirectMessaging.css";

const CreateDirectMessaging = ({ onClose }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [userList, setUserList] = useState({});
  const users = Object.values(useSelector((state) => state.userSearch));

  const selectFriend = (user) => {
    if (userList[user.id]) {
      const friendButton = document.querySelector(
        `.create-direct-messaging-search-friend-button-container-${user.id}`
      );
      const checkmark = document.querySelector(
        `.create-direct-messaging-search-friend-check-${user.id}`
      );
      if (friendButton && checkmark) {
        friendButton.classList.remove("selected");
        checkmark.classList.remove("selected");
      }
      setUserList((prev) => {
        delete prev[user.id];
        return { ...prev };
      });
    } else {
      setInput("");
      setUserList((prev) => {
        prev[user.id] = user;
        return { ...prev };
      });
    }
  };

  const onChangeInput = (e) => {
    setInput(e.target.value);
  };

  const onSubmit = () => {
    dispatch(createDirectMessageThunk(userList)).then((res) => {
      history.push(`/direct/${res.id}`);
      onClose();
    });
  };

  useEffect(() => {
    if (input) dispatch(searchUsersByUsernameThunk(input));

    if (!input) dispatch(clearUsers());

    return () => dispatch(clearUsers());
  }, [dispatch, input]);

  useEffect(() => {
    const submitButton = document.querySelector(
      ".create-direct-messaging-submit"
    );
    if (Object.values(userList).length) {
      submitButton.disabled = false;
      submitButton.classList.add("ready");
      Object.values(userList).forEach((user) => {
        const friendButton = document.querySelector(
          `.create-direct-messaging-search-friend-button-container-${user.id}`
        );
        const checkmark = document.querySelector(
          `.create-direct-messaging-search-friend-check-${user.id}`
        );
        if (friendButton && checkmark) {
          friendButton.classList.add("selected");
          checkmark.classList.add("selected");
        }
      });
    } else {
      submitButton.disabled = true;
      submitButton.classList.remove("ready");
    }
  }, [userList, users]);

  return (
    <section
      className="create-direct-messaging-section"
      onClick={(e) => e.stopPropagation()}
    >
      <header>
        <button className="create-direct-messaging-cancel" onClick={onClose}>
          <i className="fa-solid fa-x"></i>
        </button>
        <div>New Message</div>
        <button
          className="create-direct-messaging-submit"
          type="submit"
          onClick={onSubmit}
        >
          Next
        </button>
      </header>
      <div className="create-direct-messaging-search-friends-container">
        <div className="create-direct-messaging-search-friends-container-header">
          To:
        </div>
        <div className="create-direct-messaging-selected-search-container">
          <div className="create-direct-messaging-selected-friends">
            {Object.values(userList).map((user, i) => {
              return (
                <div
                  className="create-direct-messaging-selected-friend"
                  key={i}
                >
                  <div>{user.username}</div>
                  <button onClick={() => selectFriend(user)}>
                    <i className="fa-solid fa-xmark create-direct-messaging-deselect-friend"></i>
                  </button>
                </div>
              );
            })}
            <div className="create-direct-messaging-search-friends-container-search">
              <input
                className="create-direct-messaging-search-friends-input"
                placeholder="Search..."
                onChange={onChangeInput}
                value={input}
              ></input>
            </div>
          </div>
        </div>
      </div>
      <div className="create-direct-messaging-search-friends-list">
        {users.map((user, i) => {
          return (
            <button
              className="create-direct-messaging-search-friend-button"
              onClick={() => selectFriend(user)}
              key={i}
            >
              <div className="create-direct-messaging-search-friend-info">
                <img
                  className="create-direct-messaging-search-friend-photo"
                  src={user.profileImg}
                  alt="profile pic"
                />
                <div className="create-direct-messaging-search-friend-user-text">
                  <div className="create-direct-messaging-search-friend-username">
                    {user.username}
                  </div>
                </div>
              </div>
              <div
                className={`create-direct-messaging-search-friend-button-container create-direct-messaging-search-friend-button-container-${user.id}`}
              >
                <i
                  className={`fa-solid fa-check create-direct-messaging-search-friend-check create-direct-messaging-search-friend-check-${user.id}`}
                ></i>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CreateDirectMessaging;
