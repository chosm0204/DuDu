// src/minju/Report.jsx
import React, { useState } from "react";

const SUBJECTS = [
  { key: "korean", label: "국어", icon: "/korean.png" },
  { key: "math", label: "수학", icon: "/math.png" },
  { key: "society", label: "사회", icon: "/society.png" },
  { key: "science", label: "과학", icon: "/science.png" },
  { key: "english", label: "영어", icon: "/english.png" },
  { key: "history", label: "역사", icon: "/history.png" },
];

const UNITS_BY_SUBJECT = {
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

const QUIZ_BY_SUBJECT = {
  korean: ["가", "나", "다"],
  math: ["원", "지름", "원주율"],
  society: ["아", "야", "어"],
  science: ["지구", "달", "별"],
  english: ["a", "b", "c"],
  history: ["이순신", "신사임당", "유관순"],
};

export default function Report() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedView, setSelectedView] = useState(null);

  const units = selectedSubject ? UNITS_BY_SUBJECT[selectedSubject] : [];
  const currentQuizList = selectedSubject
    ? QUIZ_BY_SUBJECT[selectedSubject]
    : [];

  const resetReport = () => {
    setSelectedSubject(null);
    setSelectedUnit(null);
    setSelectedView(null);
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-b from-[#E6F2FF] to-white">
      {/* 헤더 높이만큼 패딩 */}
      <main className="w-full max-w-[1200px] flex flex-col items-center pt-[140px] pb-20">
        <h1
          className="text-[64px] font-bold bg-gradient-to-r from-[#60A5FA] to-[#027FFF] 
                      bg-clip-text text-transparent mb-8"
        >
          리포트
        </h1>

        {/* -------------------- 과목 선택 -------------------- */}
        <section className="flex flex-wrap justify-center gap-5 mb-10">
          {SUBJECTS.map(({ key, label, icon }) => {
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
                className={`rounded-[18px] w-[115px] h-[115px] flex flex-col justify-center items-center 
                  shadow-[0_8px_20px_rgba(0,0,0,0.06)] cursor-pointer transition-all duration-200
                  ${isActive ? "bg-[#2F7DFF]" : "bg-white"}`}
              >
                <img src={icon} alt={label} className="w-10 h-10 mb-2" />
                <span
                  className={`text-[16px] ${
                    isActive ? "text-white font-bold" : "text-gray-900"
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </section>

        {/* -------------------- 단원 + 보기 선택 영역 -------------------- */}
        <section className="w-full max-w-[1100px] mx-auto flex justify-center gap-16 mt-4">
          {/* 단원 리스트 */}
          <div className="w-[320px] flex-shrink-0">
            <h2 className="text-[22px] font-bold mb-6">단원</h2>
            <div className="flex flex-col gap-4">
              {units.map((unitLabel, idx) => {
                const active = idx === selectedUnit;
                return (
                  <button
                    key={unitLabel}
                    type="button"
                    onClick={() => setSelectedUnit(idx)}
                    className={`w-[320px] text-left px-7 py-4 rounded-[999px] text-[23px]
                      shadow-[0_8px_20px_rgba(0,0,0,0.04)]
                      transition-all duration-200
                      ${
                        active
                          ? "bg-[#DDEBFF] text-[#1D4ED8] font-bold"
                          : "bg-white text-gray-900"
                      }`}
                  >
                    {unitLabel}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="w-px bg-gray-300 flex-shrink-0" />

          {/* 오른쪽 영역 */}
          <div className="flex-1">
            <h2 className="text-[22px] font-bold mb-6">
              {selectedView === "quiz" ? "퀴즈" : "모아보기"}
            </h2>

            <div className="flex gap-6">
              {/* 카드뉴스 / 퀴즈 선택 UI */}
              {selectedView !== "quiz" && (
                <div className="flex gap-6">
                  <button
                    type="button"
                    onClick={() => setSelectedView("cardnews")}
                    className="w-[220px] h-[260px] bg-white rounded-[24px]
                      shadow-[0_12px_24px_rgba(0,0,0,0.06)]
                      flex flex-col items-center justify-center cursor-pointer"
                  >
                    <img
                      src="/cardnews.png"
                      alt="카드뉴스"
                      className="w-[75px] h-[75px] mb-4"
                    />
                    <p className="text-[25px] font-bold">카드뉴스</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedView("quiz")}
                    className="w-[220px] h-[260px] bg-white rounded-[24px]
                      shadow-[0_12px_24px_rgba(0,0,0,0.06)]
                      flex flex-col items-center justify-center cursor-pointer"
                  >
                    <img
                      src="/quiz.png"
                      alt="퀴즈"
                      className="w-[65px] h-[75px] mb-4"
                    />
                    <p className="text-[25px] font-bold">퀴즈</p>
                  </button>
                </div>
              )}

              {/* 퀴즈 리스트 */}
              {selectedView === "quiz" && (
                <div
                  className="w-[440px] bg-white rounded-[24px] shadow-[0_12px_24px_rgba(0,0,0,0.06)]
                             px-10 py-8 space-y-4"
                >
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
                      <button className="px-5 py-2 rounded-full bg-[#2F7DFF] text-white text-sm font-bold">
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
