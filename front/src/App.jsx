import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext } from "react";

import "./App.css";

import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import CreateAccount from "./components/CreateAccount";

const App = () => (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/new" element={<CreateAccount />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </>
);

export default App;
