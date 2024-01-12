import { ChangeEvent, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { apiUrl } from "../App";

import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
    const res = await axios.post(apiUrl + "/api/login", req);
    if (res.status === 200 && res.data.accessToken && res.data.refreshToken) {
      Cookies.set("accessToken", res.data.accessToken);
      Cookies.set("refreshToken", res.data.refreshToken);
      navigate("/");
    } else if (res.status === 401) {
      setErrorText("Invalid username or password.");
      return;
    }
  };

  const clickSignup = async () => {
    navigate("/login/new");
  };

  return (
    <>
      <div className="center">
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            id="usernameInput"
            autoComplete="off"
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
        <div style={{ marginTop: "16px" }}>
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
