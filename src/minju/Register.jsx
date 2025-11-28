import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [selectedType, setSelectedType] = useState("under14"); // 기본값: 14세 미만
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const canSubmit = selectedType && agreePrivacy && agreeTerms;

  const handleSubmit = () => {
    if (!canSubmit) return;

    if (selectedType === "under14") {
      navigate("/register/under14");
    } else {
      navigate("/register/over14");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#E6F2FF] to-white flex flex-col items-center pt-10">
      {/* ========== 헤더 ========== */}
      <header className="w-full flex items-center px-10 mb-6">
        <Link to="/">
          <img src="/logo.png" alt="두두 로고" className="w-12 h-12" />
        </Link>
      </header>

      {/* ========== 카드 영역 ========== */}
      <div className="w-[90%] max-w-[900px] bg-white rounded-3xl shadow-md p-10 pt-12 pb-30">
        <div className="flex justify-center gap-14 mb-6">
          <div className="text-black font-semibold text-[23px]">
            1. 회원 유형 선택
          </div>
          <div className="text-gray-400 font-semibold text-[23px]">
            2. 회원 정보 입력
          </div>
          <div className="text-gray-400 font-semibold text-[23px]">
            3. 회원 가입 완료
          </div>
        </div>

        <div className="w-full h-px bg-[#F0F2F7] mb-7" />

        <p className="text-gray-500 leading-relaxed mb-12 text-center">
          위 유형 중 본인에게 해당하는 유형을 선택해 주세요.
          <br />
          유형마다 가입 절차가 다르니, 꼭 본인에게 맞는 유형으로 가입하시길 바랍니다.
        </p>

        {/* ========== 회원 유형 카드 ========= */}
        <div className="flex justify-center gap-8 mb-6">
          <button
            type="button"
            onClick={() => setSelectedType("under14")}
            className={`w-[230px] h-[210px] rounded-3xl flex flex-col items-center justify-center shadow-md cursor-pointer transition-transform duration-150 hover:-translate-y-1 ${
              selectedType === "under14"
                ? "bg-[#60A5FA] text-white"
                : "bg-[#D2D6DE] text-white"
            }`}
          >
            <img src="/person1.png" alt="14세 미만 아이콘" className="w-10 h-10 mb-4 opacity-95"/>
            <p className="text-[20px] font-bold mb-1">14세 미만</p>
            <p className="text-[16px]">회원 가입하기</p>
          </button>

          <button
            type="button"
            onClick={() => setSelectedType("over14")}
            className={`w-[230px] h-[210px] rounded-3xl flex flex-col items-center justify-center shadow-md cursor-pointer transition-transform duration-150 hover:-translate-y-1 ${
              selectedType === "over14"
                ? "bg-[#60A5FA] text-white"
                : "bg-[#D2D6DE] text-white"
            }`}
          >
            <img src="/person2.png" alt="14세 이상 아이콘" className="w-15 h-10 mb-4 opacity-95"/>
            <p className="text-[20px] font-bold mb-1">14세 이상</p>
            <p className="text-[16px]">회원 가입하기</p>
          </button>
        </div>

        {/* ========== 필수 약관 ========== */}
        <div className="flex flex-col gap-3 items-start mb-6">
          <button
            type="button"
            onClick={() => setAgreePrivacy(!agreePrivacy)}
            className="flex items-center gap-2 text-[14px]"
          >
            <span
              className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                agreePrivacy ? "border-[#2F7DFF]" : "border-gray-300"
              }`}
            >
              {agreePrivacy && <span>✓</span>}
            </span>
            <span className="text-red-500 font-medium">(필수)</span>
            <span className="text-gray-700">
              개인정보 수집 및 이용 동의
            </span>
            <span className="text-gray-400">&gt;</span>
          </button>

          <button
            type="button"
            onClick={() => setAgreeTerms(!agreeTerms)}
            className="flex items-center gap-2 text-[14px]"
          >
            <span
              className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                agreeTerms ? "border-[#2F7DFF]" : "border-gray-300"
              }`}
            >
              {agreeTerms && <span>✓</span>}
            </span>
            <span className="text-red-500 font-medium">(필수)</span>
            <span className="text-gray-700">두두 이용 약관</span>
            <span className="text-gray-400">&gt;</span>
          </button>
        </div>

        {/* ========== 회원가입 버튼 ========== */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`w-full h-[56px] rounded-full text-white font-semibold text-[18px] mt-2 transition ${
            canSubmit
              ? "bg-[#2F7DFF] hover:bg-[#1F5EDB]"
              : "bg-[#AFCBFF] cursor-not-allowed"
          }`}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
