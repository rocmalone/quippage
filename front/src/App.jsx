import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext } from "react";

import "./App.css";

import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import CreateAccount from "./components/CreateAccount";

export const apiUrl = "http://localhost:3000";

const App = () => (
  <>
    <div className="header">
      <a className="title" href="/">
        quippage.xyz
      </a>
    </div>
    <div className="main">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/create" element={<CreateAccount />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
    <div className="footer">quippage</div>
  </>
);

export default App;
