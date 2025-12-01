import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SOCIAL_LOGINS = [
  { key: "naver",  src: "/naver.png",  alt: "네이버 로그인" },
  { key: "google", src: "/google.png", alt: "구글 로그인" },
  { key: "kakao",  src: "/kakao.png",  alt: "카카오 로그인" },
];

export default function Login() {
  const navigate = useNavigate();

  const goToMemberType = () => {
    navigate("/register");
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#E6F2FF] to-white flex flex-col items-center pt-10">
      {/*========== 헤더 ==========*/}
      <header className="w-full flex items-center px-10">
        <Link to="/">
          <img src="/logo.png" alt="로고" className="w-12 h-12" />
        </Link>
      </header>

      {/*========== 로그인 부분 ==========*/}
      <main className="flex flex-col items-center mt-5">
        <img src="/logo.png" alt="로고" className="w-35 h-35 mb-6" />

        <p className="text-[#2F7DFF] text-[35px] text-center leading-snug mb-8">
          로그인하고
          <br />
          더 많은 두두를 즐겨보세요
        </p>

        <div className="w-[360px] flex flex-col gap-3">
          <div className="bg-white rounded-full px-5 py-3 shadow-sm flex items-center">
            <img src="/email.png" alt="이메일" className="w-6 h-6 mr-3 opacity-70"/>
            <input type="email" placeholder="이메일" className="flex-grow text-[16px] outline-none placeholder:text-gray-400"
            />
          </div>

          <div className="bg-white rounded-full px-5 py-3 shadow-sm flex items-center">
            <img src="/password.png" alt="비밀번호" className="w-6 h-6 mr-3 opacity-70"/>
            <input type="password" placeholder="비밀번호" className="flex-grow text-[16px] outline-none placeholder:text-gray-400"/>
          </div>

          <div className="flex justify-between items-center text-[14px] text-gray-500 px-1 mt-1">
            <label className="flex items-center gap-1 cursor-pointer">
              <input type="checkbox" className="w-4 h-4" />
              <span>자동 로그인</span>
            </label>
            <button className="text-[#2F7DFF]">
              비밀번호 찾기
            </button>
          </div>

          {/* ========== 로그인 + 회원가입 버튼========== */}
          <button
            className="mt-4 w-full rounded-full py-3 bg-gradient-to-r from-[#2E7BFF] to-[#3F8CFF] text-white text-[16px]"
            onClick={goToMemberType}
          >
            로그인
          </button>

          <div className="w-full h-px bg-[#E5EDF9] my-3" />

          <button
            className="mt-2 w-full rounded-full py-3 bg-gradient-to-r from-[#5FAAFF] to-[#7BB8FF] text-white text-[16px]"
            onClick={goToMemberType}
          >
            회원가입
          </button>

          <div className="flex justify-center gap-6 mt-6">
            {SOCIAL_LOGINS.map(({ key, src, alt }) => (
              <button key={key} type="button" className="w-10 h-10 rounded-full">
                <img src={src} alt={alt} className="w-10 h-10" />
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
