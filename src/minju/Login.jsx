import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#e7f2ff] to-white flex flex-col items-center">
      {/* 상단 왼쪽 작은 로고 */}
      <header className="w-full flex items-center px-10 pt-5">
        <Link to="/">
          <img src="/logo.png" alt="두두 로고" className="w-10 h-10" />
        </Link>
      </header>

      {/* 가운데 메인 로그인 박스 */}
      <main className="flex flex-col items-center mt-8">
        {/* 큰 로고 */}
        <img src="/logo.png" alt="두두 로고" className="w-40 h-40 mb-6" />

        {/* 문구 */}
        <p className="text-[#2F7DFF] text-xl font-bold text-center leading-snug mb-8">
          로그인하고
          <br />더 많은 두두를 즐겨보세요
        </p>

        {/* 입력 + 버튼 영역 */}
        <div className="w-[360px] flex flex-col gap-3">
          {/* 이메일 */}
          <div className="bg-white rounded-full px-5 py-3 shadow-sm flex items-center">
            <span className="text-gray-400 text-lg mr-3">✉️</span>
            <input
              type="email"
              placeholder="이메일"
              className="flex-grow text-sm outline-none border-none placeholder:text-gray-400"
            />
          </div>

          {/* 비밀번호 */}
          <div className="bg-white rounded-full px-5 py-3 shadow-sm flex items-center">
            <span className="text-gray-400 text-lg mr-3">🔒</span>
            <input
              type="password"
              placeholder="비밀번호"
              className="flex-grow text-sm outline-none border-none placeholder:text-gray-400"
            />
          </div>

          {/* 자동 로그인 / 비밀번호 찾기 */}
          <div className="flex justify-between items-center text-xs text-gray-500 px-1 mt-1">
            <label className="flex items-center gap-1 cursor-pointer">
              <input type="checkbox" className="w-3 h-3" />
              <span>자동 로그인</span>
            </label>
            <button className="text-[#2F7DFF] font-medium">
              비밀번호 찾기
            </button>
          </div>

          {/* 로그인 버튼 */}
          <button className="mt-4 w-full rounded-full py-3 bg-gradient-to-r from-[#2E7BFF] to-[#3F8CFF] text-white font-semibold text-sm">
            로그인
          </button>

          {/* 구분선 */}
          <div className="w-full h-px bg-[#E5EDF9] my-3" />

          {/* 회원가입 버튼 */}
          <button className="mt-2 w-full rounded-full py-3 bg-gradient-to-r from-[#5FAAFF] to-[#7BB8FF] text-white font-semibold text-sm">
            회원가입
          </button>

          {/* 소셜 로그인 */}
          <div className="flex justify-center gap-6 mt-6">
            <button className="w-10 h-10 rounded-full bg-[#03C75A] flex items-center justify-center text-white font-bold text-lg">
              N
            </button>
            <button className="w-10 h-10 rounded-full bg-white border flex items-center justify-center text-[#4285F4] font-bold text-lg">
              G
            </button>
            <button className="w-10 h-10 rounded-full bg-[#FEE500] flex items-center justify-center text-[#3A1D1D] font-bold text-lg">
              K
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
