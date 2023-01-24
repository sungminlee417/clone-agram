import "./LandingPage.css";
import LoginForm from "../auth/LoginForm";
import { NavLink, Route, Switch } from "react-router-dom";
import SignUpForm from "../auth/SignUpForm";
import { useEffect, useState } from "react";

const LandingPage = () => {
  const images = document.getElementsByClassName("landing-page-side-slideshow");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const photoSlideShow = setInterval(() => {
      setCurrentIndex((prev) => ++prev % images.length);
    }, 5000);

    return () => clearInterval(photoSlideShow);
  }, [images.length]);

  useEffect(() => {
    images[
      currentIndex - 1 === -1 ? images.length - 1 : currentIndex - 1
    ].classList.remove("visible");
    images[currentIndex].classList.add("visible");
  }, [currentIndex, images]);

  return (
    <section className="landing-page-section">
      <div className="landing-page-content-container">
        <div className="landing-page-side-image-container">
          <img
            className="landing-page-side-slideshow visible"
            src="https://cloneagram.s3.us-west-1.amazonaws.com/landing-page-side-image-1.png"
            alt="landing page pic"
          />
          <img
            className="landing-page-side-slideshow"
            src="https://cloneagram.s3.us-west-1.amazonaws.com/landing-page-side-image-2.png"
            alt="landing page pic"
          />
          <img
            className="landing-page-side-slideshow"
            src="https://cloneagram.s3.us-west-1.amazonaws.com/landing-page-side-image-3.png"
            alt="landing page pic"
          />
          <img
            className="landing-page-side-slideshow"
            src="https://cloneagram.s3.us-west-1.amazonaws.com/landing-page-side-image-4.png"
            alt="landing page pic"
          />
        </div>
        <div className="landing-page-forms">
          <Switch>
            <Route exact path="/">
              <LoginForm />
              <div className="login-signup-container">
                Don't have an account?
                <NavLink to="/signup">Sign up</NavLink>
              </div>
            </Route>
            <Route exact path="/signup">
              <SignUpForm />
              <div className="login-signup-container">
                Have an account? <NavLink to="/">Log in</NavLink>
              </div>
            </Route>
          </Switch>
        </div>
      </div>
      <a
        href="https://github.com/sungminlee417/instagram-clone.git"
        className="landing-page-github"
        target="_blank"
        rel="noreferrer"
      >
        <i className="fa-brands fa-github"></i>
      </a>
      <a
        href="https://www.linkedin.com/in/sungmin-lee-288801214/"
        className="landing-page-linkedin"
        target="_blank"
        rel="noreferrer"
      >
        <i className="fa-brands fa-linkedin"></i>
      </a>
      <a
        href="https://sungminlee.com"
        className="landing-page-portfolio"
        target="_blank"
        rel="noreferrer"
      >
        <i className="fa-solid fa-user"></i>
      </a>
    </section>
  );
};

export default LandingPage;
