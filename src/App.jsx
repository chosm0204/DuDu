import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./minju/Home";
import DuduQuiz from "./minju/DuduQuiz";
import DuduNote from "./minju/DuduNote";
import Report from "./minju/Report";
import Login from "./minju/Login";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/duduquiz" element={<DuduQuiz />} />
      <Route path="/dudunote" element={<DuduNote />} />
      <Route path="/report" element={<Report />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
