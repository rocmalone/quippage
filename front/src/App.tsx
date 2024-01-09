import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext } from "react";
import { ApiContext } from "./types";

import Home from "./components/Home";
import Login from "./components/Login";

const App: React.FC = () => (
  <>
    <ApiContext.Provider value={{ apiUrl: "http://localhost:3000" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  </>
);

export default App;
