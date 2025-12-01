// src/minju/Homes/HomeAll.jsx
import React from "react";
import Home from "./Home";
import Home1 from "./Home1";
import Home2 from "./Home2";
import Home3 from "./Home3";
import Home4 from "./Home4";
import Home5 from "./Home5";
import Home6 from "./Home6";

export default function HomeAll() {
  return (
    <div
      className="relative flex flex-col items-center min-h-screen
                    bg-[linear-gradient(to_bottom,#E6F2FF_0%,#FFFFFF_20%,#E6F2FF_30%,#FFFFFF_50%,#E6F2FF_140%)]"
    >
      {/* 메인 검색 영역 */}
      <Home />
      <div className="h-[250px]"></div>
      <Home1 />
      <Home2 />
      <Home3 />
      <Home4 />
      <Home5 />
      <Home6 />
    </div>
  );
}
