import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, NavLink, Switch } from "react-router-dom";
import { Modal } from "../../../context/Modal";
import {
  clearDirectMessages,
  loadDirectMessages,
} from "../../../store/directMessages";
import CreateDirectMessaging from "../CreateDirectMessaging";
import DisplayMessages from "../DisplayMessages";
import "./DirectMessagingPage.css";

const DirectMessagingPage = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const directMessages = useSelector((state) => state.directMessages);
  const directMessagesArray = Object.values(directMessages);
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(loadDirectMessages());

    return () => dispatch(clearDirectMessages());
  }, [dispatch]);

  return (
    <section className="direct-messaging-page-section">
      <div className="direct-messaging-page-container">
        <div className="direct-messaging-page-left">
          <header>
            <div>{currentUser.username}</div>
            <button
              className="direct-messaging-page-left-write"
              onClick={() => setShowModal(true)}
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </button>
          </header>
          <div className="direct-messaging-messages">
            {directMessagesArray.map((directMessage) => {
              delete directMessage.members[currentUser.id];
              return (
                <NavLink
                  className="direct-messaging-message-link"
                  key={directMessage.id}
                  to={`/direct/${directMessage.id}`}
                >
                  {Object.values(directMessage.members).length > 1 ? (
                    <div className="direct-messaging-message-link-user-profile-two">
                      <img
                        className="direct-messaging-message-link-user-profile-two-one"
                        src={
                          Object.values(directMessage.members)[0].user
                            .profileImg
                        }
                        alt="user one profile"
                      />
                      <img
                        className="direct-messaging-message-link-user-profile-two-two"
                        src={
                          Object.values(directMessage.members)[1].user
                            .profileImg
                        }
                        alt="user two profile"
                      />
                    </div>
                  ) : (
                    <div className="direct-messaging-message-link-user-profile-one">
                      <img
                        className="direct-messaging-message-link-user-profile-image"
                        src={
                          Object.values(directMessage.members)[0].user
                            .profileImg
                        }
                        alt="user profile"
                      />
                    </div>
                  )}
                  <div className="direct-messaging-message-user-name-container">
                    {Object.values(directMessage.members).map((member) => {
                      if (member.user.id !== currentUser.id) {
                        return (
                          <div
                            className="direct-messaging-message-user-container"
                            key={member.id}
                          >
                            <div className="direct-messaging-message-user-name">
                              {i === 0 && `${member.user.name}`}
                              {Object.values(directMessage.members).length -
                                1 ===
                                i &&
                                i !== 0 &&
                                `and ${member.user.name}`}
                              {i <
                                Object.values(directMessage.members).length -
                                  i &&
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
                </NavLink>
              );
            })}
          </div>
        </div>
        <div className="direct-messaging-page-right">
          <Switch>
            <Route exact path="/direct/inbox">
              <div className="direct-messaging-direct-inbox-default">
                <img
                  src="https://cloneagram.s3.us-west-1.amazonaws.com/svgexport-11.svg"
                  alt="create message"
                />
                <header>Your Messages</header>
                <div>
                  Send private photos and messages to a friend or group.
                </div>
                <button
                  className="direct-messaging-direct-inbox-default-button"
                  onClick={() => setShowModal(true)}
                >
                  Send Message
                </button>
              </div>
            </Route>
            <Route exact path="/direct/:directMessageId">
              <DisplayMessages />
            </Route>
          </Switch>
        </div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} showModal={showModal}>
          <CreateDirectMessaging onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </section>
  );
};

export default DirectMessagingPage;
