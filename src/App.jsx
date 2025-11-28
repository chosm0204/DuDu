// src/App.jsx
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import HomeAll from "./minju/Homes/HomeAll";
import DuduQuiz from "./minju/DuduQuiz";
import DuduNote from "./minju/DuduNote";
import Report from "./minju/Report";
import Login from "./minju/Login";
import Search from "./cho/Search";
import Register from "./minju/Register";
import Header from "./Header";
import SideBar from "./SideBar";
import RegisterUnder14 from "./minju/RegisterUnder14";

export default function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <>
      <Header onMenuClick={() => setIsSideBarOpen(true)} />

      <Routes>
        <Route path="/" element={<HomeAll />} />
        <Route path="/search" element={<Search />} />
        <Route path="/duduquiz" element={<DuduQuiz />} />
        <Route path="/dudunote" element={<DuduNote />} />
        <Route path="/report" element={<Report />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/under14" element={<RegisterUnder14 />} />
      </Routes>

      <SideBar isOpen={isSideBarOpen} onClose={() => setIsSideBarOpen(false)} />
    </>
  );
}
