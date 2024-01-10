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
  const navigate = useNavigate();

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
        <form className={styles.form}>
          <label htmlFor="usernameInput">Username</label>
          <input
            type="text"
            id="usernameInput"
            onChange={handleUsernameChange}
          ></input>
          <label htmlFor="passwordInput">Password</label>
          <input
            type="password"
            id="passwordInput"
            onChange={handlePasswordChange}
          ></input>
          <button type="button" onClick={clickLogin}>
            Login
          </button>
        </form>
        <div>Reset Password</div>
        <div>Don't have an account?</div>
        <button type="button" onClick={clickSignup}>
          Sign Up
        </button>
      </div>
    </>
  );
};

export default Login;
