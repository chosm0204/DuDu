import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function register() {
  const navigate = useNavigate();

  const goUnder14 = () => navigate("/signup/under14");
  const goOver14 =  () => navigate("/signup/over14");

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#E6F2FF] to-white flex flex-col items-center pt-6">

      {/* ========== 상단 로고 ========== */}
      <header className="w-full flex items-center px-10 mb-6">
        <Link to="/">
          <img src="/logo.png" alt="두두 로고" className="w-9 h-9" />
        </Link>
      </header>

      <div className="w-[90%] max-w-[900px] bg-white rounded-3xl shadow-sm p-10 pt-12">

        {/* ========== 단계 표시 ========== */}
        <div className="flex justify-center gap-14 mb-8">
          <div className="text-[#2F7DFF] font-semibold text-[20px]">
            1. 회원 유형 선택
          </div>
          <div className="text-gray-400 font-semibold text-[20px]">
            2. 회원 정보 입력
          </div>
          <div className="text-gray-400 font-semibold text-[20px]">
            3. 회원 가입 완료
          </div>
        </div>

        <div className="w-full h-px bg-[#F0F2F7] mb-8" />

        {/* ========== 안내 문구 ========== */}
        <p className="text-gray-500 leading-relaxed mb-12 text-left ">
          위 유형 중 본인에게 해당하는 유형을 선택해 주세요.
          <br />
          유형마다 가입 절차가 다르니, 꼭 본인에게 맞는 유형으로 가입하시길 바랍니다.
        </p>

        {/* ========== 나이 선택 ========== */}
        <div className="flex justify-center gap-8 mb-12">

          <button
            onClick={goUnder14}
            className="w-[220px] h-[200px] rounded-2xl bg-[#60A5FA] text-white flex flex-col items-center justify-center shadow-md transition hover:opacity-90"
          >
            <img src="/person1.png" className="w-10 h-10 mb-3 opacity-95" alt="14세 미만 아이콘"/>
            <p className="text-[20px] font-bold leading-tight">14세 미만</p>
            <p className="text-[17px] opacity-90">회원 가입하기</p>
          </button>

          <button
            onClick={goOver14}
            className="w-[220px] h-[200px] rounded-2xl bg-[#BABABA] text-white flex flex-col items-center justify-center shadow-inner transition hover:bg-[#CFCFCF]"
          >
            <img src="/person2.png" className="w-16 h-10 mb-3 opacity-95" alt="14세 이상 아이콘"/>
            <p className="text-[20px] font-bold leading-tight">14세 이상</p>
            <p className="text-[17px] opacity-90">회원 가입하기</p>
          </button>
        </div>

        {/* ========== 필수 약관 ========== */}
        <div className="flex flex-col gap-4 items-start">
          <label className="flex items-center gap-3 cursor-pointer text-[15px]">
            <input
              type="checkbox"
              className="w-4 h-4 accent-[#2F7DFF]"
            />
            <span className="text-red-500 font-medium">(필수)</span>
            <span className="text-gray-700">개인정보 수집 및 이용 동의</span>
            <span className="text-gray-400">&gt;</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer text-[15px]">
            <input
              type="checkbox"
              className="w-4 h-4 accent-[#2F7DFF]"
            />
            <span className="text-red-500 font-medium">(필수)</span>
            <span className="text-gray-700">두두 이용 약관</span>
            <span className="text-gray-400">&gt;</span>
          </label>

        </div>
      </div>
    </div>
  );
}
