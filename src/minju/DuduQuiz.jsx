// src/minju/DuduQuiz.jsx
import React, { useState } from "react";

const QUIZ_TABS = ["속담", "사자성어", "맞춤법"];

export default function DuduQuiz() {
  const [selectedQuizType, setSelectedQuizType] = useState("속담");
  const [answer, setAnswer] = useState("");

  return (
    <div
      className="relative flex flex-col items-center min-h-screen 
                    bg-gradient-to-b from-[#E6F2FF] to-white font-sans"
    >
      {/* 헤더 fixed 때문에 여백 */}
      <main className="w-full max-w-[1200px] flex flex-col items-center pt-[140px]">
        <h1
          className="text-[64px] font-extrabold 
                       bg-gradient-to-r from-[#60A5FA] to-[#027FFF]
                       bg-clip-text text-transparent mb-10"
        >
          두두퀴즈
        </h1>

        <section
          className="w-full max-w-[1000px] bg-white rounded-[40px] 
                            shadow-[0_18px_40px_rgba(0,0,0,0.06)]
                            flex flex-col items-center pt-10 pb-12"
        >
          {/* 탭 */}
          <div className="w-full flex justify-center border-b border-[#E5EAF2] pb-4">
            <div className="flex gap-[80px]">
              {QUIZ_TABS.map((tab) => {
                const isActive = selectedQuizType === tab;

                return (
                  <button
                    key={tab}
                    onClick={() => setSelectedQuizType(tab)}
                    className={`pb-2 text-[22px]
                      ${
                        isActive
                          ? "font-extrabold text-black border-b-4 border-[#2F7DFF]"
                          : "font-medium text-gray-400 border-b-4 border-transparent"
                      }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 이미지 + 입력 */}
          <div className="flex flex-col items-center mt-10 px-10 w-full">
            <div className="w-[260px] h-[260px] rounded-[48px] overflow-hidden mb-8">
              <img
                src="/quiz_tiger.png"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-[24px] font-semibold text-gray-900 mb-10 text-center">
              이 그림이 뜻하는 {selectedQuizType}은 무엇일까요?
            </p>

            <div
              className="w-[80%] max-w-[700px] flex items-center bg-white 
                            rounded-[999px] border-4 border-[#2F7DFF]
                            px-8 py-4 shadow-sm"
            >
              <input
                type="text"
                placeholder="정답을 말하거나 입력해 보세요!"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="flex-grow border-0 outline-none text-[18px] placeholder:text-gray-400"
              />

              <button className="mr-2">
                <img src="/mic.png" className="w-6 h-8" />
              </button>

              <button>
                <img src="/search.png" className="w-[38px] h-[38px]" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
