import { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { apiUrl } from "../App";
import { LoggedInUserContext } from "../context";

import styles from "./Home.module.css";

const Home = () => {
  const [errorText, setErrorText] = useState("");

  const [username, setUsername] = useState(""); // Account name
  const [name, setName] = useState(""); // Nickname
  const nameMaxCharacters = 12;
  const [nameRemainingCharacters, setNameRemainingCharacters] =
    useState(nameMaxCharacters);
  const [uid, setUid] = useState("");

  const [roomCode, setRoomCode] = useState("");
  const roomMaxCharacters = 4;
  const [roomRemainingCharacters, setRoomRemainingCharacters] =
    useState(nameMaxCharacters);

  const [isJoinButtonLoading, setIsJoinButtonLoading] = useState(false);

  const loggedInUserContext = useContext(LoggedInUserContext);
  const loggedInUser = loggedInUserContext.user;

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      setUsername(loggedInUser.username);
    }
  }, [loggedInUser]);

  const handleRoomCodeChange = (e) => {
    const newRoomCode = e.target.value;

    // Validate no numbers
    const regex = /\d/; // Return true if numbers exists
    if (regex.test(newRoomCode)) {
      // Don't let the number enter the input
      e.target.value = roomCode;
      return;
    }

    // Validate no more than 4 characters
    if (newRoomCode.length > 4) {
      e.target.value = roomCode;
      return;
    }
    setRoomCode(newRoomCode);
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    if (newName.length > nameMaxCharacters) {
      e.target.value = name;
      return;
    }
    setName(newName);
    setNameRemainingCharacters(nameMaxCharacters - newName.length);
  };

  const clickJoinButton = async (e) => {
    setErrorText("");
    if (!name) {
      setErrorText("Error: Enter a nickname or log in to play.");
    }
    setIsJoinButtonLoading(true);
    setTimeout(() => {
      console.log("finished");
      setIsJoinButtonLoading(false);
    }, 3000);
  };

  const clickCreateRoomButton = async (e) => {
    setErrorText("");
    if (!name) {
      setErrorText("Error: Enter a nickname or log in to create a room.");
    }
  };

  const requestGuestUser = async () => {
    //
  };

  const clickLogout = async (e) => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    loggedInUserContext.refreshUser();
  };

  return (
    <>
      <div className="center">
        <h2>Play Quippage</h2>
        <div className={`form-group w-75 ${styles.formGroup}`}>
          {loggedInUser ? (
            <>
              <div className={styles.inputTitleContainer}>
                <div>
                  Logged in as: <a href="/profile">{username}</a>
                </div>
                <a href="" onClick={clickLogout}>
                  Logout
                </a>
              </div>
            </>
          ) : (
            <></>
          )}
          <div className={styles.inputTitleContainer}>
            <label htmlFor="inputName">Nickname</label>
            <div>{nameRemainingCharacters}</div>
          </div>
          <input
            type="text"
            className="form-control form-control-lg"
            id="inputName"
            onChange={handleNameChange}
            spellCheck="false"
            placeholder="Enter your name"
            defaultValue={username}
          ></input>
        </div>

        <div className={`form-group w-75 ${styles.formGroup}`}>
          <label htmlFor="inputRoomCode">Room Code</label>
          <input
            type="text"
            className="form-control form-control-lg"
            id="inputRoomCode"
            onChange={handleRoomCodeChange}
            spellCheck="false"
            placeholder="Enter 4-letter code"
          ></input>
        </div>
        <button
          type="submit"
          id="joinRoomButton"
          className={`btn btn-primary ${styles.joinRoomButton}`}
          onClick={clickJoinButton}
        >
          {isJoinButtonLoading ? (
            <div className="spinner-border text-light" role="status"></div>
          ) : (
            <span>Join Room</span>
          )}
        </button>

        <div className={styles.hLineContainer}>
          <div className={styles.hLine}></div>
          <div className={styles.hLineText}>OR</div>
          <div className={styles.hLine}></div>
        </div>
        <button
          type="submit"
          id="createRoomButton"
          className={`btn btn-primary ${styles.createRoomButton}`}
          onClick={clickCreateRoomButton}
        >
          Create New Room
        </button>
        <p className="error" style={{ marginTop: "6px", textAlign: "center" }}>
          {errorText}
        </p>

        <div className={styles.loginContainer}>
          {loggedInUser ? (
            <></>
          ) : (
            <>
              <div style={{ marginBottom: "4px" }}>
                Want to create your own trivia lists?
              </div>
              <a href="/login" className="">
                Login
              </a>
              <span> or </span>
              <a href="/login/create">Sign Up</a>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
