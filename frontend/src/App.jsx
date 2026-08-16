import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./landing/Landing";
import Register from "./auth/Register";
import Login from "./auth/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
