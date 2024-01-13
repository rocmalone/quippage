import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { LoggedInUserContext } from "../context";
import styles from "./Profile.module.css";

const Profile = () => {
  const [username, setUsername] = useState("default_username");
  const [password, setPassword] = useState("default_pw");
  const [email, setEmail] = useState("default_email");

  const loggedInUser = useContext(LoggedInUserContext);

  useEffect(() => {
    if (loggedInUser) {
      setUsername(loggedInUser.username);
      setPassword(loggedInUser.password);
      setEmail(loggedInUser.email);
    }
  }, [loggedInUser]);

  return (
    <>
      <div className="center">
        <h2>Profile</h2>
        <p className="username">{username}</p>
        <p className={styles.email}>{email}</p>
        <p className="password">{password}</p>
      </div>
    </>
  );
};

export default Profile;
