import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { clearUsers, searchUsersByUsernameThunk } from "../../store/userSearch";
import "./SearchBar.css";

const SearchBar = ({ closeSearch }) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const users = Object.values(useSelector((state) => state.userSearch));

  useEffect(() => {
    if (input) {
      dispatch(searchUsersByUsernameThunk(input));
    }

    return () => dispatch(clearUsers());
  }, [dispatch, input]);

  const onChangeInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <section
      className="search-bar-container"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="search-bar">
        <header className="search-bar-header">Search</header>
        <input
          className="search-bar-input"
          placeholder="Search"
          onChange={onChangeInput}
          value={input}
        />
      </div>
      <div className="search-list">
        {users.map((user) => {
          return (
            <NavLink
              className="search-user-link"
              to={`/${user.username}`}
              onClick={() => closeSearch()}
            >
              <img
                className="search-list-user-photo"
                src={user.profileImg}
                alt="profile pic"
              />
              <div className="search-list-user-text">
                <div className="search-user-username">{user.username}</div>
              </div>
            </NavLink>
          );
        })}
        {!input && (
          <div className="search-list-no-input">Search for friends.</div>
        )}
      </div>
    </section>
  );
};

export default SearchBar;
