import React, { useState } from "react";
import { Link } from "react-router-dom";
import Home1 from "./Homes/Home1";
import Home2 from "./Homes/Home2";
import Home3 from "./Homes/Home3";
import Home4 from "./Homes/Home4";
import Home5 from "./Homes/Home5";
import Home6 from "./Homes/Home6";

const logo = "/logo.png";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoverSubject, setHoverSubject] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [query, setQuery] = useState("");
  const [isResult, setIsResult] = useState(false);

  const getSubjectLabel = (key) =>
    subjectsData.find((s) => s.key === key)?.label;

  const titleText =
    (hoverSubject && getSubjectLabel(hoverSubject)) ||
    (selectedSubject && getSubjectLabel(selectedSubject)) ||
    "무엇이 궁금한가요?";

  const resetHome = () => {
    setIsResult(false);
    setQuery("");
    setHoverSubject(null);
    setSelectedSubject(null);
  };

  const handleSubmit = () => {
    if (!query.trim()) return;
    setIsResult(true);
  };

  const SearchBar = (
    <div
      className="flex items-center bg-white w-[820px] max-w-[820px] px-8 py-5 rounded-[999px] border-4 border-[#2F7DFF] shadow-sm"
      onClick={(e) => e.stopPropagation()}
    >
      <img src={clipIcon} alt="클립" className="w-9 h-9" />

      <input
        type="text"
        placeholder="궁금한 것을 질문해 보세요"
        className="flex-grow border-0 outline-none text-[22px] mx-[8px] placeholder:text-gray-400"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button type="button" className="mr-3" onClick={(e) => e.stopPropagation()}>
        <img src={micIcon} alt="음성입력" className="w-6 h-8" />
      </button>

      <button className="flex items-center justify-center" onClick={handleSubmit}>
        <img src="/search.png" alt="검색" className="w-9 h-9" />
      </button>
    </div>
  );

  return (
    <div className="relative flex flex-col items-center font-sans min-h-screen bg-[linear-gradient(to_bottom,#E6F2FF_0%,#FFFFFF_20%,#E6F2FF_30%,#FFFFFF_50%,#E6F2FF_140%)]">

      {/*========== 헤더 ==========*/}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#E6F2FF]">
        <div className="w-full max-w-[1200px] mx-auto flex items-center justify-between py-6 px-6">
          <img src={logo} alt="로고" className="w-[55px] h-[55px] cursor-pointer" onClick={resetHome}/>

          <nav className="flex gap-[140px]">
            <Link to="/duduquiz" className="text-[#2F7DFF] font-semibold text-[20px]">
              두두퀴즈
            </Link>
            <Link to="/dudunote" className="text-[#2F7DFF] font-semibold text-[20px]">
              두두노트
            </Link>
            <Link to="/report" className="text-[#2F7DFF] font-semibold text-[20px]">
              리포트
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/login"
              className="rounded-[20px] px-5 py-2 border font-bold border-[#2F7DFF] bg-[#2F7DFF] text-white text-sm flex items-center justify-center"
            >
              로그인
            </Link>
            <button onClick={() => setIsMenuOpen(true)}
              className="w-[48px] h-[48px] flex items-center justify-center text-[#2F7DFF]"
            >
              <span className="text-3xl leading-none">☰</span>
            </button>
          </div>
        </div>
      </header>

      {/*========== 메인 화면 ==========*/}
      {!isResult && (
        <>
          <div className="w-full flex flex-col items-center"
            onClick={() => {
              setSelectedSubject(null);
              setHoverSubject(null);
            }}
          >
            <main className="pt-[200px] pb-[80px] flex flex-col items-center">
              <h1 className="text-[65px] md:text-[84px] font-extrabold tracking-tight bg-gradient-to-r from-[#60A5FA] to-[#027FFF] bg-clip-text text-transparent">
                {titleText}
              </h1>

              <div className="mt-6">{SearchBar}</div>
            </main>

            <section className="flex flex-wrap justify-center gap-5 mt-[20px]">
              {subjectsData.map(({ key, label, icon }) => {
                const isHover = hoverSubject === key;
                const isSelected = selectedSubject === key;

                return (
                  <button key={key}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSubject(key);
                    }}
                    onMouseEnter={() => setHoverSubject(key)}
                    onMouseLeave={() => setHoverSubject(null)}
                    className={`rounded-[18px] w-[115px] h-[115px] flex flex-col justify-center items-center shadow-[0_8px_20px_rgba(0,0,0,0.06)] cursor-pointer transition-all duration-200 ${
                      isHover || isSelected ? "bg-[#60A5FA]" : "bg-white"
                    }`}
                  >
                    <img src={icon} alt="" className="w-10 h-10 mb-2" />
                    <span className="font-semibold text-[16px] text-gray-900">{label}</span>
                  </button>
                );
              })}
            </section>
          </div>

          <div className="h-[250px]"></div>

          {/*========== 홈 컴포넌트 ==========*/}
          <Home1 />
          <Home2 />
          <Home3 />
          <Home4 />
          <Home5 />
          <Home6 />
        </>
      )}

      {/*========== 검색 화면 ==========*/}
      {isResult && (
        <>
          <section className="flex-1 w-full max-w-[1200px] flex flex-col items-center justify-center">
            <div className="bg-white px-8 py-3 rounded-full shadow-md text-gray-700 text-lg mb-4">
              카드뉴스 생성 중...
            </div>

            {query.trim() && (
              <div className="bg-[#2F7DFF] text-white px-8 py-3 rounded-full text-lg mb-8">
                {query}
              </div>
            )}
          </section>

          <div className="w-full flex justify-center mb-12">{SearchBar}</div>
        </>
      )}

      {/*========== 사이드 메뉴 ==========*/}
      {isMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setIsMenuOpen(false)} />

          <aside className="fixed top-0 right-0 h-full w-[320px] bg-white z-50 shadow-2xl flex flex-col">
            <div className="flex flex-col items-center pt-10 pb-6 border-b border-gray-100">
              <div className="w-16 h-16 rounded-full bg-[#2F7DFF] flex items-center justify-center text-white text-2xl mb-3">
                😊
              </div>
              <p className="text-[20px] text-gray-500">5학년 2학기</p>
              <p className="text-[25px] font-bold mt-1 leading-tight">손채영</p>
              <p className="text-[20px] text-gray-700 leading-tight mb-2">학생</p>
              <button className="mt-4 px-6 py-1.5 rounded-full bg-[#2F7DFF] text-white text-[15px] font-semibold">
                정보 수정
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-10 py-6 text-left">
              <div className="mb-8">
                <p className="text-[#2F7DFF] font-bold text-[22px] mb-4">알림마당</p>
                <ul className="space-y-3 text-[20px] text-gray-900 leading-tight">
                  <li>시간표</li>
                  <li>학사 일정</li>
                  <li>가정통신문</li>
                  <li>급식 메뉴</li>
                </ul>
              </div>

              <div className="h-px bg-gray-200 my-6" />

              <div className="mb-8">
                <p className="text-[#2F7DFF] font-bold text-[22px] mb-4">학습마당</p>
                <ul className="space-y-3 text-[20px] text-gray-900 leading-tight">
                  <li>알림장</li>
                  <li>독서록</li>
                  <li>진로</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-[#E5EAF2] px-6 py-4 flex gap-4 justify-center">
              <button className="min-w-[120px] h-[40px] rounded-full bg-[#2F7DFF] text-white text-sm font-semibold shadow-[0_4px_10px_rgba(47,125,255,0.25)]">
                고객센터
              </button>
              <button className="min-w-[120px] h-[40px] rounded-full bg-[#2F7DFF] text-white text-sm font-semibold shadow-[0_4px_10px_rgba(47,125,255,0.25)]">
                회원탈퇴
              </button>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}
