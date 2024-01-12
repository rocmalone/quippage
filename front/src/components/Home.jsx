import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import styles from "./Home.module.css";

const Home = () => {
  const [pageState, setPageState] = useState("LANDING");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [errorText, setErrorText] = useState("test");

  const [name, setName] = useState("");
  const [uid, setUid] = useState("");

  const [roomCode, setRoomCode] = useState("");

  const navigate = useNavigate();

  const handleRoomCodeChange = (e) => {
    const newRoomCode = e.target.value;

    // Validate no numbers
    const regex = /\d/; // Return true if numbers exists
    if (regex.test(newRoomCode)) {
      // Don't let the number enter the input
      e.target.value = roomCode;
      setErrorText("Room code can only contain letters");
      return;
    }

    // Validate no more than 4 characters
    if (newRoomCode.length > 4) {
      e.target.value = roomCode;
      setErrorText("Room code is 4 characters");
      return;
    }
    setRoomCode(newRoomCode);
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
  };

  const clickJoinButton = (e) => {};

  const clickCreateRoomButton = async (e) => {
    if (!isLoggedIn()) {
    }
  };

  const requestGuestUser = async () => {
    //
  };

  console.log("accessToken:", Cookies.get("accessToken"));
  console.log("refreshToken:", Cookies.get("refreshToken"));

  return (
    <>
      <div className={styles.loginContainer}>
        {isLoggedIn ? (
          <a href="/profile" className="">
            My Account
          </a>
        ) : (
          <></>
        )}
      </div>
      <div className="center">
        <h2>Play Quippage</h2>
        <div className="form-group">
          <label htmlFor="inputName">Nickname</label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            onChange={handleNameChange}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="inputRoomCode">Room Code</label>
          <input
            type="text"
            className="form-control"
            id="inputRoomCode"
            onChange={handleRoomCodeChange}
          ></input>
        </div>
        <button
          type="submit"
          id="joinRoomButton"
          className="btn btn-primary"
          onClick={clickJoinButton}
        >
          Join
        </button>
        <button
          type="submit"
          id="createRoomButton"
          className="btn btn-primary"
          onClick={clickCreateRoomButton}
        >
          Create Room
        </button>
        <p className="error" style={{ marginTop: "6px" }}>
          {errorText}
        </p>
        <div className={styles.loginContainer}>
          {isLoggedIn ? (
            <a href="/profile" className="">
              My Account
            </a>
          ) : (
            <>
              <div>Want to make your own lists?</div>
              <a href="/login" className="">
                Login
              </a>
              <span> or </span>
              <a href="/login/new">Sign Up</a>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
