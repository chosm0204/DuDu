import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Report() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedView, setSelectedView] = useState(null);

  const resetReport = () => {
    setSelectedSubject(null);
    setSelectedUnit(null);
    setSelectedView(null);
  };

  const subjects = [
    { key: "korean", label: "국어", icon: "/korean.png" },
    { key: "math", label: "수학", icon: "/math.png" },
    { key: "society", label: "사회", icon: "/society.png" },
    { key: "science", label: "과학", icon: "/science.png" },
    { key: "english", label: "영어", icon: "/english.png" },
    { key: "history", label: "역사", icon: "/history.png" },
  ];

  // 과목별 단원
  const unitsBySubject = {
    korean: ["4-1, 3단원 - 이야기", "5-1, 2단원 - 설명문"],
    math: [
      "3-2, 3단원 - 원",
      "5-2, 5단원 - 직육면체",
      "6-2, 2단원 소수의 나눗셈",
      "6-3, 3단원",
    ],
    society: ["5-1, 1단원 - 우리 국토", "5-2, 3단원 - 경제생활"],
    science: ["4-2, 1단원 - 물의 상태변화", "5-1, 4단원 - 태양계"],
    english: ["5-1, 1단원 - Hello", "6-1, 3단원 - My Favorite"],
    history: ["6-1, 1단원 - 선사 시대", "6-2, 3단원 - 일제 강점기"],
  };

  const units = selectedSubject ? unitsBySubject[selectedSubject] || [] : [];

  const quizBySubject = {
    korean: ["가", "나", "다"],
    math: ["원", "지름", "컴퍼스"],
    society: ["아", "야", "어"],
    science: ["지구", "달", "별"],
    english: ["a", "b", "c"],
    history: ["이순신", "신사임당", "유관순"],
  };

  const currentQuizList = quizBySubject[selectedSubject] || [];

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-b from-[#e7efff] to-white font-sans">
      {/* ---------- HEADER ---------- */}
      <header className="w-full max-w-[1200px] flex items-center justify-between py-6 px-6">
        {/* 로고 */}
        <Link to="/">
          <img
            src="/logo.png"
            alt="두두 로고"
            className="w-[55px] h-[55px] cursor-pointer"
          />
        </Link>

        {/* 상단 메뉴 */}
        <nav className="flex gap-[140px]">
          <Link
            to="/duduquiz"
            className="text-[#2F7DFF] font-semibold text-[20px]"
          >
            두두퀴즈
          </Link>
          <Link
            to="/DuduNote"
            className="text-[#2F7DFF] font-semibold text-[20px]"
          >
            두두노트
          </Link>
          <Link
            to="/report"
            onClick={resetReport}
            className="text-[#2F7DFF] font-black text-[20px]"
          >
            리포트
          </Link>
        </nav>

        {/* 오른쪽: 로그인 + 햄버거 */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="rounded-[20px] px-5 py-2 border font-bold border-[#2F7DFF] bg-[#2F7DFF] text-white text-sm flex items-center justify-center"
          >
            로그인
          </Link>

          <button className="w-[48px] h-[48px] flex items-center justify-center text-[#2F7DFF]">
            <span className="text-3xl leading-none">☰</span>
          </button>
        </div>
      </header>

      {/* ---------- 메인 영역 ---------- */}
      <main className="w-full max-w-[1200px] flex flex-col items-center mt-4">
        {/* 제목 */}
        <h1 className="text-[64px] font-extrabold bg-gradient-to-r from-[#60A5FA] to-[#027FFF] bg-clip-text text-transparent mb-8">
          리포트{" "}
        </h1>

        {/* 과목 카드 */}
        <section className="flex flex-wrap justify-center gap-5 mb-10">
          {subjects.map(({ key, label, icon }) => {
            const isActive = selectedSubject === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setSelectedSubject(key);
                  setSelectedUnit(0);
                  setSelectedView(null);
                }}
                className={`
                  rounded-[18px] w-[115px] h-[115px] flex flex-col justify-center items-center shadow-[0_8px_20px_rgba(0,0,0,0.06)] cursor-pointer transition-all duration-200
                  ${isActive ? "bg-[#2F7DFF]" : "bg-white"}`}
              >
                <img
                  src={icon}
                  alt={`${label} 아이콘`}
                  className="w-10 h-10 mb-2"
                />
                <span
                  className={`text-[16px]
                    ${
                      isActive
                        ? "text-white font-bold"
                        : "text-gray-900 font-medium"
                    }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </section>

        {/* 단원 + 모아보기 영역 */}
        <section className="w-full max-w-[1100px] mx-auto flex justify-center gap-16 mt-4">
          {/* 단원 리스트 */}
          <div className="w-[320px] flex-shrink-0">
            <h2 className="text-[22px] font-extrabold mb-6">단원</h2>
            <div className="flex flex-col gap-4">
              {units.map((unitLabel, idx) => {
                const active = idx === selectedUnit;
                return (
                  <button
                    key={unitLabel}
                    type="button"
                    onClick={() => setSelectedUnit(idx)}
                    className={`w-[320px] text-left px-7 py-4 rounded-[999px] text-[23px] shadow-[0_8px_20px_rgba(0,0,0,0.04)] transition-all duration-200
                      ${
                        active
                          ? "bg-[#DDEBFF] text-[#1D4ED8] font-semibold"
                          : "bg-white text-gray-900"
                      }
                    `}
                  >
                    {unitLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 가운데 구분선 */}
          <div className="w-px bg-gray-300 flex-shrink-0" />

          {/* 모아보기 */}
          <div className="flex-1">
            <h2 className="text-[22px] font-extrabold mb-6">
              {selectedView === "quiz" ? "퀴즈" : "모아보기"}{" "}
            </h2>
            <div className="flex gap-6">
              {selectedView !== "quiz" && (
                <div className="flex gap-6">
                  {/* 카드뉴스 카드 */}
                  <button
                    type="button"
                    onClick={() => setSelectedView("cardnews")}
                    className="w-[220px] h-[260px] bg-white rounded-[24px] shadow-[0_12px_24px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center cursor-pointer"
                  >
                    <img
                      src="/cardnews.png"
                      alt="카드뉴스 아이콘"
                      className="w-[75px] h-[75px] mb-4"
                    />
                    <p className="text-[25px] font-extrabold">카드뉴스</p>
                  </button>
                  {/* 퀴즈 카드 */}
                  <button
                    type="button"
                    onClick={() => setSelectedView("quiz")}
                    className="w-[220px] h-[260px] bg-white rounded-[24px] shadow-[0_12px_24px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center cursor-pointer"
                  >
                    <img
                      src="/quiz.png"
                      alt="퀴즈 아이콘"
                      className="w-[65px] h-[75px] mb-4"
                    />
                    <p className="text-[25px] font-extrabold">퀴즈</p>
                  </button>
                </div>
              )}

              {/* 퀴즈 카드 클릭 후 화면 */}
              {selectedView === "quiz" && (
                <div className="w-[440px] bg-white rounded-[24px] shadow-[0_12px_24px_rgba(0,0,0,0.06)] px-10 py-8 space-y-4">
                  {currentQuizList.map((text, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between text-[20px] text-gray-800
                  ${
                    idx !== currentQuizList.length - 1
                      ? "border-b border-[#E5EAF2] pb-4"
                      : ""
                  }`}
                    >
                      <p>{text}</p>
                      <button className="px-5 py-2 rounded-full bg-[#2F7DFF] text-white text-sm font-semibold">
                        풀기
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
