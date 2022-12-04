import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../../store/session";
import "./LoginForm.css";

const LoginForm = () => {
  const [errors, setErrors] = useState({});
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(credential, password));
    if (data) {
      setErrors(data);
    }
  };

  const onDemoLogin = async () => {
    dispatch(login("demo@aa.io", "password"));
  };

  const updateCredential = (e) => {
    setCredential(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <section className="login-form-container">
      <form className="login-form" onSubmit={onLogin}>
        <img
          className="login-form-logo"
          src="https://cloneagram.s3.us-west-1.amazonaws.com/landing-page-logo.png"
          alt="instagram logo"
        />
        <div className="login-form-input-fields">
          <div className="login-form-input-field-container">
            <input
              className="login-form-input-field"
              name="credential"
              type="text"
              placeholder="Username or email"
              value={credential}
              onChange={updateCredential}
            />
            {errors.credential && (
              <div className="login-form-errors">{errors.credential}</div>
            )}
          </div>
          <div className="login-form-input-field-container">
            <input
              className="login-form-input-field"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
            {errors.password && (
              <div className="login-form-errors">{errors.password}</div>
            )}
          </div>
        </div>
        <button className="login-form-button" type="submit">
          Log in
        </button>
      </form>
      <button className="demo-login-button" onClick={onDemoLogin}>
        Demo Login
      </button>
    </section>
  );
};

export default LoginForm;
