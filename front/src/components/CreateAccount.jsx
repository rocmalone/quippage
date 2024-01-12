import styles from "./Login.module.css";
import { useState } from "react";

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const clickSignUp = (e) => {
    console.log("Signing up..");
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
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            id="usernameInput"
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
          Sign Up
        </button>
      </div>
    </>
  );
};

export default CreateAccount;
