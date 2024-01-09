import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [pageState, setPageState] = useState("LANDING");

  const [errorText, setErrorText] = useState("test");

  const [name, setName] = useState("");
  const [uid, setUid] = useState("");

  const [roomCode, setRoomCode] = useState("");

  const navigate = useNavigate();

  const handleRoomCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRoomCode = e.target.value;

    // Validate no numbers
    const regex: RegExp = /\d/; // Return true if numbers exists
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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
  };

  const clickJoinRoom = (e: Event) => {};

  const clickCreateRoom = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isLoggedIn()) {
    }
  };

  const isLoggedIn = (): boolean => {
    return false;
  };

  const requestGuestUser = async () => {
    //
  };

  return (
    <>
      <div className="center">
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
        <button type="submit" id="joinRoomButton" className="btn btn-primary">
          Join
        </button>
        <button
          type="submit"
          id="createRoomButton"
          className="btn btn-primary"
          onClick={clickCreateRoom}
        >
          Create Room
        </button>
        <p>{errorText}</p>
      </div>
    </>
  );
};

export default Home;
