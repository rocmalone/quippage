import { ChangeEvent, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../types";

import axios from "axios";

const Home: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { apiUrl } = useContext(ApiContext);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    console.log(username, password, apiUrl);
    axios.post("");
  };

  return (
    <>
      <div className="center">
        <form>
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
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Home;
