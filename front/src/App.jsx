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

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(false);

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  async function checkIfLoggedIn() {
    // If valid tokens exist, log in the user and navigate home
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");
    console.log(accessToken);
    if (!accessToken && !refreshToken) {
      setLoggedInUser(false);
    }
    if (!isLoggedIn && accessToken) {
      try {
        const res = await axios.get(apiUrl + "/user", {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });
        console.log(res);
        setLoggedInUser(res.data);
      } catch {
        setIsLoggedIn(false);
      }
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
        <LoggedInUserContext.Provider value={loggedInUser}>
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
