// src/minju/Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const clipIcon = "/clip.png";
const micIcon = "/mic.png";

const subjectsData = [
  { key: "korean", label: "국어", icon: "/korean.png" },
  { key: "math", label: "수학", icon: "/math.png" },
  { key: "society", label: "사회", icon: "/society.png" },
  { key: "science", label: "과학", icon: "/science.png" },
  { key: "english", label: "영어", icon: "/english.png" },
  { key: "history", label: "역사", icon: "/history.png" },
];

export default function Home() {
  const navigate = useNavigate();

  const [hoverSubject, setHoverSubject] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [query, setQuery] = useState("");

  const getSubjectLabel = (key) =>
    subjectsData.find((s) => s.key === key)?.label;

  const titleText =
    (hoverSubject && getSubjectLabel(hoverSubject)) ||
    (selectedSubject && getSubjectLabel(selectedSubject)) ||
    "무엇이 궁금한가요?";

  const handleSubmit = () => {
    if (!query.trim()) return;

    navigate("/search", {
      state: {
        query: query.trim(),
        subject: selectedSubject,
      },
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  // 검색창 UI 컴포넌트
  const SearchBar = (
    <div
      className="flex items-center bg-white w-[820px] max-w-[820px]
                 px-8 py-5 rounded-[999px] border-4 border-[#2F7DFF] shadow-sm"
      onClick={(e) => e.stopPropagation()}
    >
      <img src={clipIcon} alt="클립" className="w-9 h-9" />

      <input
        type="text"
        placeholder="궁금한 것을 질문해 보세요"
        className="flex-grow border-0 outline-none text-[22px] mx-[8px] placeholder:text-gray-400"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button
        type="button"
        className="mr-3"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={micIcon} alt="음성입력" className="w-6 h-8" />
      </button>

      <button
        className="flex items-center justify-center"
        onClick={handleSubmit}
      >
        <img src="/search.png" alt="검색" className="w-9 h-9" />
      </button>
    </div>
  );

  return (
    <div
      className="w-full flex flex-col items-center"
      onClick={() => {
        setSelectedSubject(null);
        setHoverSubject(null);
      }}
    >
      <main className="pt-[200px] pb-[80px] flex flex-col items-center">
        <h1
          className="text-[65px] md:text-[84px] font-extrabold tracking-tight
                       bg-gradient-to-r from-[#60A5FA] to-[#027FFF]
                       bg-clip-text text-transparent"
        >
          {titleText}
        </h1>

        <div className="mt-6">{SearchBar}</div>
      </main>

      {/* 과목카드 */}
      <section className="flex flex-wrap justify-center gap-5 mt-[20px]">
        {subjectsData.map(({ key, label, icon }) => {
          const isHover = hoverSubject === key;
          const isSelected = selectedSubject === key;

          return (
            <button
              key={key}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSubject(key);
              }}
              onMouseEnter={() => setHoverSubject(key)}
              onMouseLeave={() => setHoverSubject(null)}
              className={`rounded-[18px] w-[115px] h-[115px] 
                          flex flex-col justify-center items-center
                          shadow-[0_8px_20px_rgba(0,0,0,0.06)]
                          cursor-pointer transition-all duration-200 ${
                            isHover || isSelected ? "bg-[#60A5FA]" : "bg-white"
                          }`}
            >
              <img src={icon} alt={label} className="w-10 h-10 mb-2" />
              <span className="font-semibold text-[16px] text-gray-900">
                {label}
              </span>
            </button>
          );
        })}
      </section>
    </div>
  );
}
