import React, { useState } from "react";
import { Link } from "react-router-dom";

const QUIZ_TABS = ["속담", "사자성어", "맞춤법"];

export default function DuduQuiz() {
  const [selectedQuizType, setSelectedQuizType] = useState("속담");
  const [answer, setAnswer] = useState("");

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-b from-[#E6F2FF] to-white font-sans">
      {/*========== 헤더 ==========*/}
      <header className="w-full max-w-[1200px] flex items-center justify-between py-6 px-6">
        <Link to="/">
          <img src="/logo.png" alt="로고" className="w-[55px] h-[55px] cursor-pointer"/>
        </Link>

        <nav className="flex gap-[140px]">
          <span className="text-[#2F7DFF] font-black text-[20px]">
            두두퀴즈
          </span>

          <Link to="/dudunote" className="text-[#2F7DFF] font-semibold text-[20px]">
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

      {/*========== 두두퀴즈 ==========*/}
      <main className="w-full max-w-[1200px] flex flex-col items-center mt-4">
        <h1 className="text-[64px] font-extrabold bg-gradient-to-r from-[#60A5FA] to-[#027FFF] bg-clip-text text-transparent mb-10">
          두두퀴즈
        </h1>

        <section className="w-full max-w-[1000px] bg-white rounded-[40px] shadow-[0_18px_40px_rgba(0,0,0,0.06)] flex flex-col items-center pt-10 pb-12">
          {/*========== 퀴즈 선택 ==========*/}
          <div className="w-full flex justify-center border-b border-[#E5EAF2] pb-4">
            <div className="flex gap-[80px]">
              {QUIZ_TABS.map((tab) => {
                const isActive = selectedQuizType === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setSelectedQuizType(tab)}
                    className={`pb-2 text-[22px] ${
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

          {/*========== 이미지 + 입력 ==========*/}
          <div className="flex flex-col items-center mt-10 px-10 w-full">
            <div className="w-[260px] h-[260px] rounded-[48px] overflow-hidden mb-8">
              <img src="/quiz_tiger.png" alt="퀴즈 그림" className="w-full h-full object-cover"/>
            </div>

            <p className="text-[24px] font-semibold text-gray-900 mb-10 text-center">
              이 그림이 뜻하는 {selectedQuizType}
              {selectedQuizType === "맞춤법" ? "은" : "은"} 무엇일까요?
            </p>

            <div className="w-[80%] max-w-[700px] flex items-center bg-white rounded-[999px] border-4 border-[#2F7DFF] px-8 py-4 shadow-sm">
              <input
                type="text"
                placeholder="정답을 말하거나 입력해 보세요!"
                className="flex-grow border-0 outline-none text-[18px] placeholder:text-gray-400"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />

              <button type="button" className="mr-2"
                onClick={() => console.log("음성 입력 버튼 클릭")}
              >
                <img src="/mic.png" alt="음성 입력" className="w-6 h-8" />
              </button>

              <button type="button" onClick={() => console.log("정답 제출:", answer)}
                className="w-10 h-10 flex items-center justify-center">
                <img src="/search.png" alt="검색" className="w-[38px] h-[38px] cursor-pointer"/>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
