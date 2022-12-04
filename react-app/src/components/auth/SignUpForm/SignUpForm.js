import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../../store/session";
import "./SignUpForm.css";

const SignUpForm = () => {
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    const data = await dispatch(
      signUp(username, name, email, password, repeatPassword)
    );
    if (data) {
      setErrors(data);
    } else {
      history.push("/");
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <section className="signup-form-container">
      <form className="signup-form" onSubmit={onSignUp}>
        <img
          className="login-form-logo"
          src="https://cloneagram.s3.us-west-1.amazonaws.com/landing-page-logo.png"
          alt="instagram logo"
        />
        <div className="signup-form-input-fields">
          <div className="signup-form-input-field-container">
            <input
              className="signup-form-input-field"
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
              placeholder="Email"
            ></input>
            {errors.email && (
              <div className="signup-form-errors">{errors.email}</div>
            )}
          </div>
          <div className="signup-form-input-field-container">
            <input
              className="signup-form-input-field"
              type="text"
              name="fullname"
              onChange={updateName}
              value={name}
              placeholder="Full Name"
            ></input>
            {errors.name && (
              <div className="signup-form-errors">{errors.name}</div>
            )}
          </div>
          <div className="signup-form-input-field-container">
            <input
              className="signup-form-input-field"
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
              placeholder="Username"
            ></input>
            {errors.username && (
              <div className="signup-form-errors">{errors.username}</div>
            )}
          </div>
          <div className="signup-form-input-field-container">
            <input
              className="signup-form-input-field"
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
              placeholder="Password"
            ></input>
            {errors.password && (
              <div className="signup-form-errors">{errors.password}</div>
            )}
          </div>
          <div className="signup-form-input-field-container">
            <input
              className="signup-form-input-field"
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              placeholder="Confirm Password"
            ></input>
            {errors.confirmPassword && (
              <div className="signup-form-errors">{errors.confirmPassword}</div>
            )}
          </div>
        </div>
        <button className="signup-form-button" type="submit">
          Sign Up
        </button>
      </form>
    </section>
  );
};

export default SignUpForm;
