import React, { useState } from "react";
import { Link } from "react-router-dom";

const SUBJECTS = [
  { key: "korean", label: "국어", icon: "/korean.png" },
  { key: "math", label: "수학", icon: "/math.png" },
  { key: "society", label: "사회", icon: "/society.png" },
  { key: "science", label: "과학", icon: "/science.png" },
  { key: "english", label: "영어", icon: "/english.png" },
  { key: "history", label: "역사", icon: "/history.png" },
];

const QUESTION_COUNTS = [5, 10, 20];

export default function DuduNote() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedCount, setSelectedCount] = useState(null);

  const handleGenerateNote = () => {
    if (!selectedSubject || !selectedCount) {
      alert("교과와 문제 수를 모두 선택해 주세요.");
      return;
    }
    console.log("노트 생성:", { selectedSubject, selectedCount });
  };

  const resetNote = () => {
    setSelectedSubject(null);
    setSelectedCount(null);
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-b from-[#E6F2FF] to-white font-sans">
      {/*========== 헤더 ==========*/}
      <header className="w-full max-w-[1200px] flex items-center justify-between py-6 px-6">
        <Link to="/">
          <img src="/logo.png" alt="로고" className="w-[55px] h-[55px] cursor-pointer"/>
        </Link>

        <nav className="flex gap-[140px]">
          <Link to="/duduquiz" className="text-[#2F7DFF] font-semibold text-[20px]">
            두두퀴즈
          </Link>

          <Link to="/dudunote" onClick={resetNote} className="text-[#2F7DFF] font-black text-[20px]">
            두두노트
          </Link>

          <Link to="/report" className="text-[#2F7DFF] font-semibold text-[20px]">
            리포트
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/login" className="rounded-[20px] px-5 py-2 border font-bold border-[#2F7DFF] bg-[#2F7DFF] text-white text-sm flex items-center justify-center">
            로그인
          </Link>

          <button className="w-[48px] h-[48px] flex items-center justify-center text-[#2F7DFF]">
            <span className="text-3xl leading-none">☰</span>
          </button>
        </div>
      </header>

      {/*========== 두두노트 ==========*/}
      <main className="w-full max-w-[1200px] flex flex-col items-center mt-4">
        <h1 className="text-[64px] font-extrabold bg-gradient-to-r from-[#60A5FA] to-[#027FFF] bg-clip-text text-transparent mb-10">
          두두노트
        </h1>

        <section className="w-full max-w-[1000px] bg-white rounded-[40px] shadow-[0_18px_40px_rgba(0,0,0,0.06)] px-16 py-12 flex flex-col gap-10">
          {/*========== 노트부분 ==========*/}
          <div>
            <h2 className="text-[28px] font-extrabold mb-6">교과 선택</h2>
            <div className="flex flex-wrap gap-5">
              {SUBJECTS.map(({ key, label, icon }) => {
                const isActive = selectedSubject === key;
                return (
                  <button key={key} type="button"
                    onClick={() => setSelectedSubject(key)}
                    className={`rounded-[18px] w-[115px] h-[115px] flex flex-col justify-center items-center shadow-[0_8px_20px_rgba(0,0,0,0.06)] cursor-pointer transition-all duration-200
                      ${isActive ? "bg-[#60A5FA]" : "bg-white"}`}>
                    <img src={icon} alt={`${label} 아이콘`} className="w-10 h-10 mb-2" />
                    <span className={`text-[16px] ${
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
            </div>
          </div>

          <div>
            <h2 className="text-[28px] font-extrabold mb-6">문제 수</h2>
            <div className="flex flex-wrap gap-5">
              {QUESTION_COUNTS.map((count) => {
                const isActive = selectedCount === count;
                return (
                  <button key={count} type="button"
                    onClick={() => setSelectedCount(count)}
                    className={`min-w-[120px] px-6 py-3 rounded-[999px] text-[18px] shadow-[0_8px_20px_rgba(0,0,0,0.04)] transition-all duration-200
                      ${
                        isActive
                          ? "bg-[#60A5FA] text-white font-semibold"
                          : "bg-white text-gray-900"
                      }`}
                  >
                    {count}문제
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4">
            <button type="button" onClick={handleGenerateNote}
              className="w-full h-[60px] rounded-[999px] bg-[#2F7DFF] text-white text-[20px] font-bold shadow-[0_12px_24px_rgba(47,125,255,0.4)]">
              노트 생성
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
