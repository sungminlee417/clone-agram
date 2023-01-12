import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import CreatePostModal from "../PostsComponents/CreatePostModal";
import SearchBar from "../SearchBar";
import "./NavBar.css";
import Settings from "./Settings";

const NavBar = () => {
  const [settings, setSettings] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const user = useSelector((state) => state.session.user);
  const location = useLocation();

  const closeSearch = () => {
    setSearchBar(false);
    const navBarLinks = document.getElementsByClassName("nav-bar-link");
    const navTexts = document.getElementsByClassName("nav-link-text");

    for (let i = 0; i < navTexts.length; i++) {
      navTexts[i].classList.remove("search");
    }

    for (let i = 0; i < navBarLinks.length; i++) {
      navBarLinks[i].classList.remove("search");
    }

    // const homePageLink = document.querySelector(".homepage-link");
    const navBar = document.querySelector(".nav-bar");
    // homePageLink.classList.remove("search");
    navBar.classList.remove("search");
  };

  const onClickSearch = () => {
    setSearchBar(true);
    const navBarLinks = document.getElementsByClassName("nav-bar-link");
    const navTexts = document.getElementsByClassName("nav-link-text");

    for (let i = 0; i < navTexts.length; i++) {
      navTexts[i].classList.add("search");
    }

    for (let i = 0; i < navBarLinks.length; i++) {
      navBarLinks[i].classList.add("search");
    }
    // const homePageLink = document.querySelector(".homepage-link");
    const navBar = document.querySelector(".nav-bar");
    // homePageLink.classList.add("search");
    navBar.classList.add("search");
  };

  const onClickSettings = (e) => {
    const moreSettings = document.querySelector(".nav-bar-more");
    const settingsContainer = document.querySelector(".settings-box");
    if (settings) {
      e.stopPropagation();
      setSettings(false);
      moreSettings.classList.remove("active");
      settingsContainer.classList.remove("visible");
    } else {
      e.stopPropagation();
      setSettings(true);
      moreSettings.classList.add("active");
      settingsContainer.classList.add("visible");
    }
  };

  useEffect(() => {
    if (!settings) return;

    const closeSettings = () => {
      if (searchBar) {
        return;
      }
      setSettings(false);
      const moreSettings = document.querySelector(".nav-bar-more");
      const settingsContainer = document.querySelector(".settings-box");
      moreSettings.classList.remove("active");
      settingsContainer.classList.remove("visible");
    };
    document.addEventListener("click", closeSettings);

    return () => {
      document.removeEventListener("click", closeSettings);
    };
  }, [settings, searchBar]);

  useEffect(() => {
    if (!searchBar) return;

    document.addEventListener("click", closeSearch);

    return () => {
      document.removeEventListener("click", closeSearch);
    };
  }, [searchBar]);

  return (
    <section className="nav-bar-section">
      <nav className="nav-bar">
        <div className="nav-links-container">
          {/* <NavLink
            className="homepage-link"
            to="/"
            exact={true}
            activeClassName="active"
          >
            <div
              className="homepage-link-logo"
              style={
                !searchBar
                  ? {
                      backgroundImage: `url("https://cloneagram.s3.us-west-1.amazonaws.com/landing-page-logo.png")`,
                    }
                  : {
                      backgroundImage: `url("https://cloneagram.s3.us-west-1.amazonaws.com/5ecec78673e4440004f09e77.png")`,
                      backgroundPosition: "50%",
                      backgroundSize: "2.4rem",
                      width: "4rem",
                    }
              }
            />
          </NavLink> */}
          <NavLink
            className="nav-bar-link"
            to="/"
            exact={true}
            activeClassName="active"
          >
            <i className="fa-solid fa-house nav-bar-icon"></i>
            <div className="nav-link-text">Home</div>
          </NavLink>
          <div className="nav-bar-search nav-bar-link" onClick={onClickSearch}>
            <i className="fa-solid fa-magnifying-glass nav-bar-icon"></i>
            <div className="nav-link-text">Search</div>
          </div>
          <NavLink
            className="nav-bar-link"
            to="/explore"
            activeClassName="active"
          >
            <i className="fa-solid fa-compass nav-bar-icon"></i>
            <div className="nav-link-text">Explore</div>
          </NavLink>
          <NavLink
            className="nav-bar-link"
            to="/direct/inbox"
            activeClassName="active"
            isActive={() => location.pathname.includes("/direct")}
          >
            <i className="fa-brands fa-facebook-messenger nav-bar-icon"></i>
            <div className="nav-link-text">Messages</div>
          </NavLink>
          <CreatePostModal />
          <NavLink
            className="nav-bar-link"
            to={`/${user.username}`}
            exact={true}
            activeClassName="active"
          >
            <img
              src={user.profileImg}
              className="nav-bar-icon profile-image"
              alt="user profile pic"
            />

            <div className="nav-link-text">Profile</div>
          </NavLink>
        </div>
        <div className="nav-bar-more nav-bar-link" onClick={onClickSettings}>
          <i className="fa-solid fa-bars nav-bar-icon"></i>
          <div className="nav-link-text">More</div>
        </div>
      </nav>
      <Settings />
      {searchBar && <SearchBar closeSearch={closeSearch} />}
    </section>
  );
};

export default NavBar;
