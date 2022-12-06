import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import {
  clearMessages,
  deleteMessageThunk,
  loadMessages,
} from "../../../store/messages";
import CreateMessage from "../CreateMessage";
import "./DisplayMessages.css";
import { io } from "socket.io-client";
import { loadDirectMessages } from "../../../store/directMessages";
import DeleteChannelModal from "../DeleteChannelModal/DeleteChannelModal";

let socket;

const DisplayMessages = () => {
  const dispatch = useDispatch();
  const directMessages = useSelector((state) => state.directMessages);
  const currentUser = useSelector((state) => state.session.user);
  const { directMessageId } = useParams();
  const [prevRoom, setPrevRoom] = useState(`directMessage-${directMessageId}`);
  const [currentRoom, setCurrentRoom] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [prevSettings, setPrevSettings] = useState(0);
  const [openDirectMessageSettings, setOpenDirectMessageSettings] =
    useState(false);

  const scrollTo = () => {
    const messageBottom = document.querySelector(".display-message-bottom");
    messageBottom.scrollIntoView();
  };

  useEffect(() => {
    setOpenDirectMessageSettings(false);

    setCurrentRoom(`directMessage-${directMessageId}`);

    socket = io();

    socket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);
      scrollTo();
    });

    dispatch(loadDirectMessages());
    dispatch(loadMessages(directMessageId)).then((res) => {
      setMessages(Object.values(res));
      scrollTo();
    });

    return () => {
      dispatch(clearMessages());
      socket.disconnect();
    };
  }, [dispatch, directMessageId]);

  useEffect(() => {
    const joinRoom = (room) => {
      socket.emit("join_room", { room: currentRoom });
    };

    const leaveRoom = (room) => {
      socket.emit("leave_room", { room: prevRoom });
    };
    if (isLoaded) {
      leaveRoom(prevRoom);
      joinRoom(currentRoom);
      setPrevRoom(currentRoom);
    }

    setIsLoaded(true);

    return () => setIsLoaded(false);
  }, [prevRoom, currentRoom, isLoaded]);

  const directMessageSettings = () => {
    if (openDirectMessageSettings) {
      setOpenDirectMessageSettings(false);
    } else {
      setOpenDirectMessageSettings(true);
    }
  };

  const onMessageSettings = (e, i) => {
    e.stopPropagation();
    const settingsContainer = document.querySelector(
      `.display-message-container-current-user-settings-container-${i}`
    );
    const prevSettingsContainer = document.querySelector(
      `.display-message-container-current-user-settings-container-${prevSettings}`
    );

    const settingsButtonContainer = document.querySelector(
      `.display-message-current-user-settings-button-container-${i}`
    );

    const prevSettingsButtonContainer = document.querySelector(
      `.display-message-current-user-settings-button-container-${prevSettings}`
    );

    if (prevSettingsContainer && prevSettingsButtonContainer) {
      if (
        prevSettings > -1 &&
        prevSettingsContainer.classList.contains("visible") &&
        prevSettingsButtonContainer.classList.contains("visible")
      ) {
        prevSettingsContainer.classList.remove("visible");
        prevSettingsButtonContainer.classList.remove("visible");
      }
    }

    settingsContainer.classList.add("visible");
    settingsButtonContainer.classList.add("visible");
    setPrevSettings(i);
    document.addEventListener("click", () => {
      settingsContainer.classList.remove("visible");
      settingsButtonContainer.classList.remove("visible");
    });
  };

  const onDeleteMessage = (messageId) => {
    dispatch(deleteMessageThunk(messageId));
    const message = messages.find((message) => message.id === messageId);
    const messagesArr = [...messages];
    messagesArr.splice(messagesArr.indexOf(message), 1);
    setMessages(messagesArr);
  };

  const header = () => {
    let directMessage = directMessages[directMessageId];

    if (Object.values(directMessages).length) {
      delete directMessage.members[currentUser.id];
      return (
        <header className="display-message-header">
          {Object.values(directMessage.members).length > 1 ? (
            <div className="display-message-link-user-profile-two">
              <img
                className="display-message-link-user-profile-two-one"
                src={Object.values(directMessage.members)[0].user.profileImg}
                alt="user one profile"
              />
              <img
                className="display-message-link-user-profile-two-two"
                src={Object.values(directMessage.members)[1].user.profileImg}
                alt="user two profile"
              />
            </div>
          ) : (
            <div className="display-message-link-user-profile-one">
              <img
                className="display-message-link-user-profile-image"
                src={Object.values(directMessage.members)[0].user.profileImg}
                alt="user profile"
              />
            </div>
          )}
          <div className="display-message-header-user-name-container">
            {Object.values(directMessage.members).map((member, i) => {
              if (member.user.id !== currentUser.id) {
                return (
                  <div className="display-message-user-container" key={i}>
                    <div className="display-message-user-name">
                      {i === 0 && `${member.user.name}`}
                      {Object.values(directMessage.members).length - 1 === i &&
                        i !== 0 &&
                        `and ${member.user.name}`}
                      {i < Object.values(directMessage.members).length - i &&
                        i > 0 &&
                        `, ${member.user.name}`}
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
          <button
            onClick={directMessageSettings}
            className="display-message-header-info-button"
          >
            <i className="fa-solid fa-circle-info display-message-header-info-button-icon"></i>
          </button>
        </header>
      );
    }
  };

  return (
    <section className="display-messages-section">
      {!openDirectMessageSettings ? (
        <>
          {header()}
          <div className="display-messages-container">
            <div className="display-messages-all-messages">
              {Object.values(messages).map((message, i) => {
                if (message.user) {
                  if (message.user.id === currentUser.id) {
                    return (
                      <div
                        className="display-message-container-current-user"
                        key={i}
                      >
                        <div
                          className={`display-message-container-current-user-settings-container display-message-container-current-user-settings-container-${i}`}
                        >
                          <div
                            onClick={() => onDeleteMessage(message.id)}
                            className="display-message-container-current-user-unsend"
                          >
                            Unsend
                          </div>
                          <div className="display-message-container-current-user-settings-container-tail"></div>
                        </div>
                        <button
                          onClick={(e) => {
                            onMessageSettings(e, i);
                          }}
                          className={`display-message-current-user-settings-button-container display-message-current-user-settings-button-container-${i}`}
                        >
                          <i
                            className={`fa-solid fa-ellipsis display-message-current-user-settings-button`}
                          ></i>
                        </button>
                        <div className="display-message-current-user">
                          {message.message}
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        className="display-message-container-other-user"
                        key={i}
                      >
                        <NavLink to={`/${message.user.id}`}>
                          <img
                            src={message.user.profileImg}
                            alt="user profile"
                            className={
                              messages[i].user.id !==
                              (messages[i + 1] ? messages[i + 1].user.id : null)
                                ? "display-message-other-user-profile"
                                : "display-message-other-user-profile-hidden"
                            }
                          />
                        </NavLink>
                        <div className="display-message-other-user-message">
                          {message.message}
                        </div>
                      </div>
                    );
                  }
                } else {
                  return null;
                }
              })}
              <div className="display-message-bottom"></div>
            </div>
          </div>
          <CreateMessage
            directMessageId={directMessageId}
            socket={socket}
            currentRoom={currentRoom}
          />
        </>
      ) : (
        <>
          <header className="display-message-details-header">
            <div>Details</div>
            <button
              onClick={directMessageSettings}
              className="display-message-header-info-button"
            >
              <i className="fa-solid fa-circle-info display-message-details-button-icon"></i>
            </button>
          </header>
          <div className="display-message-details-members-container">
            <div className="display-message-details-members-header">
              Members
            </div>
            <div className="display-message-details-members-list">
              {Object.values(directMessages[directMessageId].members).length >
                1 && (
                <NavLink
                  className="display-message-details-member"
                  to={`/${currentUser.username}`}
                >
                  <img
                    className="display-message-details-member-profile"
                    alt="user profile"
                    src={currentUser.profileImg}
                  />
                  <div>
                    <div className="display-message-details-member-username">
                      {currentUser.username}
                    </div>
                    <div className="display-message-details-member-name">
                      {currentUser.name}
                    </div>
                  </div>
                </NavLink>
              )}
              {Object.values(directMessages[directMessageId].members).map(
                (member) => {
                  return (
                    <NavLink
                      className="display-message-details-member"
                      to={`/${member.user.username}`}
                    >
                      <img
                        className="display-message-details-member-profile"
                        alt="user profile"
                        src={member.user.profileImg}
                      />
                      <div>
                        <div className="display-message-details-member-username">
                          {member.user.username}
                        </div>
                        <div className="display-message-details-member-name">
                          {member.user.name}
                        </div>
                      </div>
                    </NavLink>
                  );
                }
              )}
            </div>
          </div>
          <DeleteChannelModal directMessageId={directMessageId} />
        </>
      )}
    </section>
  );
};

export default DisplayMessages;
