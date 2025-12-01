// src/minju/Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SUBJECTS = [
  { key: "korean", label: "국어", icon: "/korean.png" },
  { key: "math", label: "수학", icon: "/math.png" },
  { key: "society", label: "사회", icon: "/society.png" },
  { key: "science", label: "과학", icon: "/science.png" },
  { key: "english", label: "영어", icon: "/english.png" },
  { key: "history", label: "역사", icon: "/history.png" },
];

export default function Home() {
  const navigate = useNavigate();
  const [hover, setHover] = useState(null);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");

  const title =
    SUBJECTS.find((s) => s.key === (hover || selected))?.label ||
    "무엇이 궁금한가요?";

  const handleSubmit = () => {
    if (query.trim()) {
      navigate("/search", {
        state: { query: query.trim(), subject: selected },
      });
    }
  };

  return (
    <div
      className="w-full flex flex-col items-center font-miso"
      onClick={() => {
        setSelected(null);
        setHover(null);
      }}
    >
      <main className="pt-[200px] pb-[80px] flex flex-col items-center">
        <h1 className="text-[65px] md:text-[84px] font-bold tracking-tight bg-gradient-to-r from-[#60A5FA] to-[#027FFF] bg-clip-text text-transparent">
          {title}
        </h1>

        <div
          className="mt-6 flex items-center bg-white w-[820px] max-w-[820px] px-8 py-5 rounded-[999px] border-4 border-[#2F7DFF] shadow-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <img src="/clip.png" alt="클립" className="w-9 h-9" />
          <input
            type="text"
            placeholder="궁금한 것을 질문해 보세요"
            className="flex-grow border-0 outline-none text-[22px] mx-[8px] placeholder:text-gray-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          <button
            type="button"
            className="mr-3"
            onClick={(e) => e.stopPropagation()}
          >
            <img src="/mic.png" alt="음성입력" className="w-6 h-8" />
          </button>
          <button type="button" onClick={handleSubmit}>
            <img src="/search.png" alt="검색" className="w-9 h-9" />
          </button>
        </div>
      </main>

      <section className="flex flex-wrap justify-center gap-5 mt-[20px]">
        {SUBJECTS.map(({ key, label, icon }) => {
          const active = hover === key || selected === key;
          return (
            <button
              key={key}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelected(key);
              }}
              onMouseEnter={() => setHover(key)}
              onMouseLeave={() => setHover(null)}
              className={`rounded-[18px] w-[115px] h-[115px] flex flex-col justify-center items-center shadow-[0_8px_20px_rgba(0,0,0,0.06)] cursor-pointer transition-all duration-200 ${
                active ? "bg-[#60A5FA]" : "bg-white"
              }`}
            >
              <img src={icon} alt={label} className="w-10 h-10 mb-2" />
              <span
                className={`text-[16px] ${
                  active ? "text-white font-bold" : "text-gray-900"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </section>
    </div>
  );
}
