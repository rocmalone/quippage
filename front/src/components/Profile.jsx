import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { LoggedInUserContext } from "../context";
import styles from "./Profile.module.css";
import { apiUrl } from "../App";
import axios from "axios";

const Profile = () => {
  const [username, setUsername] = useState("default_username");
  const [password, setPassword] = useState("default_pw");
  const [email, setEmail] = useState("default_email");
  const [newEmail, setNewEmail] = useState("");

  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);

  const emailRef = useRef();

  const loggedInUserContext = useContext(LoggedInUserContext);
  const loggedInUser = loggedInUserContext.user;

  // loggedInUserContext.refreshUser();

  useEffect(() => {
    if (loggedInUser) {
      setUsername(loggedInUser.username);
      setPassword(loggedInUser.password);
      setEmail(loggedInUser.email);
    }
  }, [loggedInUser]);

  const clickUpdateEmail = async (e) => {
    e.preventDefault();
    // If hitting 'save'
    if (isUpdatingEmail === true) {
      // Only save if the email passes validation
      // TODO: Instead of checking newEmail, use a function that validates email and returns t/f
      if (newEmail) {
        const newUser = { ...loggedInUser, email: newEmail };
        loggedInUserContext.setUser(newUser);
      }

      return setIsUpdatingEmail(false);
    }
    return setIsUpdatingEmail(true);
  };

  const handleEmailChange = (e) => {
    if (!isUpdatingEmail) return;
    setNewEmail(e.target.value);
  };

  if (!loggedInUser) {
    return (
      <>
        <div>You are not logged in.</div>
      </>
    );
  }
  return (
    <>
      <div className="center">
        <h2>Profile</h2>
        <p className="username">{username}</p>
        <div>
          {isUpdatingEmail ? (
            <>
              {" "}
              <input
                type="text"
                className={styles.email}
                ref={emailRef}
                defaultValue={email}
                disabled={false}
                onChange={handleEmailChange}
              ></input>
            </>
          ) : (
            <input
              type="text"
              className={styles.email}
              ref={emailRef}
              value={email}
              disabled={true}
              onChange={handleEmailChange}
            ></input>
          )}

          <button
            className="btn btn-primary btn-sm"
            type="button"
            onClick={clickUpdateEmail}
          >
            {isUpdatingEmail ? "Save" : "Edit"}
          </button>
        </div>

        <p className="password">{password}</p>
      </div>
    </>
  );
};

export default Profile;
