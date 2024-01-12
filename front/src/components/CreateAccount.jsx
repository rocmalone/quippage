import axios from "axios";
import styles from "./Login.module.css";
import { useState } from "react";
import { apiUrl } from "../App";

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isSignupButtonLoading, setIsSignupButtonLoading] = useState(false);

  const clickSignUp = async (e) => {
    console.log("Signing up..");
    setIsSignupButtonLoading(true);
    const req = {
      username: username,
      email: email,
      password: password,
    };
    const res = axios.post(apiUrl + "/register", req);
  };

  const clickEyeball = (e) => {
    console.log("eyeball clicked");
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const handleUsernameChange = (e) => {
    // Validate username
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    // Validate email
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    // Validate password
    setPassword(e.target.value);
  };

  return (
    <>
      <div className="center">
        <h2>Create Account</h2>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            id="usernameInput"
            autoComplete="off"
            onChange={handleUsernameChange}
          ></input>
          <label htmlFor="usernameInput">Username</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="Email address"
            id="emailInput"
            autoComplete="off"
            onChange={handleEmailChange}
          ></input>
          <label htmlFor="emailInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            placeholder="Password"
            id="passwordInput"
            autoComplete="new-password"
            onChange={handlePasswordChange}
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
          className="btn btn-primary w-75"
          onClick={clickSignUp}
          style={{ marginTop: "12px" }}
        >
          {isSignupButtonLoading ? (
            <div className="spinner-border text-light" role="status"></div>
          ) : (
            <span>Sign Up</span>
          )}
        </button>
      </div>
    </>
  );
};

export default CreateAccount;
