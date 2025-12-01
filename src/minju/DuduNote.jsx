// src/minju/DuduNote.jsx
import React, { useState } from "react";

const SUBJECT_DATA = [
  { key: "korean", label: "국어", icon: "/korean.png" },
  { key: "math", label: "수학", icon: "/math.png" },
  { key: "society", label: "사회", icon: "/society.png" },
  { key: "science", label: "과학", icon: "/science.png" },
  { key: "english", label: "영어", icon: "/english.png" },
  { key: "history", label: "역사", icon: "/history.png" },
];

const QUESTION_COUNTS_LIST = [5, 10, 20];

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

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-b from-[#E6F2FF] to-white">
      {/* 헤더 fixed 때문에 여백 */}
      <main className="w-full max-w-[1200px] flex flex-col items-center pt-[140px]">
        <h1 className="text-[64px] font-bold bg-gradient-to-r from-[#60A5FA] to-[#027FFF] bg-clip-text text-transparent mb-10">
          두두노트
        </h1>

        <section className="w-full max-w-[1000px] bg-white rounded-[40px] shadow-[0_18px_40px_rgba(0,0,0,0.06)] px-16 py-12 flex flex-col gap-10">
          {/* 교과 */}
          <div>
            <h2 className="text-[28px] font-bold mb-6">교과 선택</h2>

            <div className="flex flex-wrap gap-5">
              {SUBJECT_DATA.map(({ key, label, icon }) => {
                const isActive = selectedSubject === key;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedSubject(key)}
                    className={`rounded-[18px] w-[115px] h-[115px] flex flex-col justify-center items-center
                      shadow-[0_8px_20px_rgba(0,0,0,0.06)] cursor-pointer transition-all duration-200
                      ${isActive ? "bg-[#60A5FA]" : "bg-white"}`}
                  >
                    <img src={icon} className="w-10 h-10 mb-2" />
                    <span
                      className={`text-[16px] ${
                        isActive
                          ? "text-white font-bold"
                          : "text-gray-900"
                      }`}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 문제 수 */}
          <div>
            <h2 className="text-[28px] font-bold mb-6">문제 수</h2>

            <div className="flex flex-wrap gap-5">
              {QUESTION_COUNTS_LIST.map((count) => {
                const isActive = selectedCount === count;

                return (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setSelectedCount(count)}
                    className={`min-w-[120px] px-6 py-3 rounded-[999px] text-[18px]
                      shadow-[0_8px_20px_rgba(0,0,0,0.04)] transition-all duration-200
                      ${
                        isActive
                          ? "bg-[#60A5FA] text-white font-bold"
                          : "bg-white text-gray-900"
                      }`}
                  >
                    {count}문제
                  </button>
                );
              })}
            </div>
          </div>

          {/* 생성 버튼 */}
          <div className="pt-4">
            <button
              type="button"
              onClick={handleGenerateNote}
              className="w-full h-[60px] rounded-[999px] bg-[#2F7DFF] text-white text-[20px] font-bold shadow-[0_12px_24px_rgba(47,125,255,0.4)]"
            >
              노트 생성
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
