import { ChangeEvent, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { apiUrl } from "../App";
import { LoggedInUserContext } from "../context";

import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const passwordRef = useRef();

  const loggedInUserContext = useContext(LoggedInUserContext);

  const navigate = useNavigate();

  const clickEyeball = (e) => {
    console.log("eyeball clicked");
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const clickLogin = async () => {
    setErrorText(""); // Clear login errors
    const req = {
      username: username,
      password: password,
    };
    try {
      const res = await axios.post(apiUrl + "/login", req);
      if (res.status === 200 && res.data.accessToken && res.data.refreshToken) {
        Cookies.set("accessToken", res.data.accessToken);
        Cookies.set("refreshToken", res.data.refreshToken);
        loggedInUserContext.refreshUser();
        navigate("/");
      }
    } catch (e) {
      if (e.response.status === 401) {
        setErrorText("Invalid username or password.");
        setPassword("");
        if (passwordRef) passwordRef.current.value = "";
        return;
      }
    }
  };

  const clickSignup = async () => {
    navigate("/login/create");
  };

  return (
    <>
      <div className="center">
        <h2>Login</h2>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            id="usernameInput"
            autoComplete="off"
            onChange={handleUsernameChange}
          ></input>
          <label htmlFor="usernameInput">Username or Email</label>
        </div>
        <div className="form-floating">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            placeholder="Password"
            id="passwordInput"
            autoComplete="off"
            onChange={handlePasswordChange}
            ref={passwordRef}
          ></input>
          <label htmlFor="passwordInput">Password</label>
          <div
            className={`${styles.eyeball} ${
              showPassword ? styles.eyeballActive : styles.eyeballInactive
            }`}
            onClick={clickEyeball}
          >
            👁️
          </div>
        </div>
        <div className="errorText">{errorText}</div>
        <button
          type="button"
          className={`btn btn-primary w-75 ${styles.loginButton}`}
          onClick={clickLogin}
          style={{ height: "50px", marginTop: "9px" }}
        >
          Login
        </button>
        <div style={{ marginTop: "16px", marginBottom: "6px" }}>
          Don't have an account?
        </div>
        <button
          type="button"
          className="btn btn-primary w-50"
          onClick={clickSignup}
        >
          Sign Up
        </button>
        <div style={{ marginTop: "50px" }}>
          <span>or </span>
          <a
            href="/login/reset"
            className="resetPassword"
            style={{ marginTop: "10px" }}
          >
            reset your password
          </a>
        </div>
      </div>
    </>
  );
};

export default Login;
