// src/Header.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const logo = "/logo.png";

export default function Header({ onMenuClick }) {
  // ✅ onLogoClick 제거 (불필요)
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#E6F2FF]">
      <div className="w-full max-w-[1200px] mx-auto flex items-center justify-between py-6 px-6">
        <img
          src={logo}
          alt="로고"
          className="w-[55px] h-[55px] cursor-pointer hover:opacity-80 transition-opacity" // ✅ hover 효과 추가
          onClick={() => navigate("/")} // ✅ 단순화
        />

        <nav className="flex gap-[140px]">
          <Link
            to="/duduquiz"
            className="text-[#2F7DFF] text-[20px] hover:opacity-80 transition-opacity" // ✅ hover 추가
          >
            두두퀴즈
          </Link>
          <Link
            to="/dudunote"
            className="text-[#2F7DFF] text-[20px] hover:opacity-80 transition-opacity"
          >
            두두노트
          </Link>
          <Link
            to="/report"
            className="text-[#2F7DFF] text-[20px] hover:opacity-80 transition-opacity"
          >
            리포트
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="rounded-[20px] px-5 py-2 border font-bold border-[#2F7DFF] bg-[#2F7DFF] text-white text-sm hover:bg-[#2567E0] transition-colors" // ✅ hover 추가
          >
            로그인
          </Link>
          <button
            onClick={onMenuClick}
            className="w-[48px] h-[48px] flex items-center justify-center text-[#2F7DFF] cursor-pointer hover:bg-white/50 rounded-lg transition-colors" // ✅ hover 추가
            aria-label="메뉴 열기" // ✅ 접근성 개선
          >
            <span className="text-3xl leading-none">☰</span>
          </button>
        </div>
      </div>
    </header>
  );
}
