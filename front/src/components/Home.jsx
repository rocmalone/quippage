import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Home = () => {
  const [pageState, setPageState] = useState("LANDING");

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

  const clickLoginButton = () => {
    navigate("/login");
  };

  const clickProfileButton = () => {
    navigate("/profile");
  };

  const isLoggedIn = () => {};

  const requestGuestUser = async () => {
    //
  };

  console.log("accessToken:", Cookies.get("accessToken"));
  console.log("refreshToken:", Cookies.get("refreshToken"));

  return (
    <>
      <div className="center">
        <button type="button" onClick={clickLoginButton}>
          Login
        </button>
        <button type="button" onClick={clickProfileButton}>
          Profile
        </button>
        <div className="form-group">
          <label htmlFor="inputName">Name</label>
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
        <p>{errorText}</p>
      </div>
    </>
  );
};

export default Home;