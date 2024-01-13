import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import "./App.css";

import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import CreateAccount from "./components/CreateAccount";
import { LoggedInUserContext } from "./context";

export const apiUrl = "http://localhost:3000/api";

export async function tryToLogin() {
  // If valid tokens exist, log in the user and navigate home
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  if (accessToken) {
    try {
      const res = await axios.get(apiUrl + "/user");
      console.log("Logged in as: ", res.data);
      return res.data;
    } catch {
      console.log("Failed to log in user");
      return false;
    }
  }
  return false;
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(false);

  useEffect(() => {
    refreshUser();
  }, []);

  // Try to change the user in the backend, then re-login
  async function setUser() {
    console.log("Trying to change the user at the backend ...");
  }

  async function refreshUser() {
    console.log("App.js:  Refreshing user");
    try {
      const user = await tryToLogin();
      setLoggedInUser(user);
    } catch (e) {
      console.error(e);
      setLoggedInUser(false);
    }
  }

  return (
    <>
      <div className="header">
        <a className="title" href="/">
          quippage.xyz
        </a>
      </div>
      <div className="main">
        <LoggedInUserContext.Provider
          value={{
            user: loggedInUser,
            setUser: setUser,
            refreshUser: refreshUser,
          }}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/login/create" element={<CreateAccount />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </BrowserRouter>
        </LoggedInUserContext.Provider>
      </div>
      <div className="footer">quippage</div>
    </>
  );
};

export default App;
