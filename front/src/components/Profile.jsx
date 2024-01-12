import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Profile = () => {
  const [username, setUsername] = useState("default_username");
  const [password, setPassword] = useState("default_pw");

  return (
    <>
      <div className="center">
        <h2>Profile</h2>
        <p className="username">{username}</p>
        <p className="password">{password}</p>
      </div>
    </>
  );
};

export default Profile;
