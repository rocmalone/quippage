import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Profile = () => {
  const [username, setUsername] = useState("default_username");
  const [password, setPassword] = useState("default_pw");

  useEffect(() => {
    // If valid tokens exist, log in the user and navigate home
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");
    if (!accessToken && !refreshToken) {
      // Navigate away from profile
    } else {
      getProfileData();
    }
  }, []);

  async function getProfileData() {
    const res = await axios.get("/api/user");
    if (res.data.username) {
      setUsername(res.data.username);
    }
    if (res.data.password) {
      setPassword(res.data.password);
    }
  }

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
