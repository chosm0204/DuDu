import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const clipIcon = "/clip.png";
const micIcon = "/mic.png";
// public/dudu.png 파일이 있다고 가정합니다.
const aiAvatar = "/dudu.png"; 

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
  // ✅ 기본값은 'general'로 설정 (과목 미선택 상태)
  const [selected, setSelected] = useState("general"); 
  const [query, setQuery] = useState("");

  // ✅ 추천 질문 상태 추가
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ 컴포넌트 마운트 시와 selected 변경 시 추천 질문 가져오기
  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        // ✅ API 호출 시 selected Subject 쿼리 파라미터로 전달
        const subjectParam = selected !== "general" ? selected : "";
        const response = await fetch(`http://localhost:5001/recommendations?subject=${subjectParam}`);

        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
 
        setRecommendations(data || []);
      } catch (error) {
        console.error("추천 질문 로딩 실패:", error);
        setRecommendations(["두두에게 물어봐! 🤖", "궁금한 게 뭐야?"]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [selected]); // selected 상태가 변경될 때마다 실행

  const getSubjectLabel = (key) =>
    SUBJECTS.find((s) => s.key === key)?.label;

  const title =
    (hover && getSubjectLabel(hover)) ||
    (selected !== "general" && getSubjectLabel(selected)) ||
    "무엇이 궁금한가요?";

  const handleSubmit = (searchText = query) => {
    if (searchText.trim()) {
      navigate("/search", {
        state: { query: searchText.trim(), subject: selected },
      });
    }
  };

  // ✅ 칩 클릭 핸들러 (이모지 제거 후 검색)
  const handleChipClick = (chipText) => {
    // 이모지 및 뒤따르는 공백 제거 정규식
    const cleanQuery = chipText.replace(/^[\p{Emoji}\uFE0F]+\s*/u, "");
    handleSubmit(cleanQuery);
  };
  
  // ✅ 과목 버튼 클릭 핸들러: 선택/선택 해제 토글
  const handleSubjectClick = (key) => {
    // 이미 선택된 과목을 다시 누르면 'general' (선택 해제)로 돌아가고, 아니면 해당 키로 설정
    setSelected(prevKey => prevKey === key ? "general" : key);
    // 버튼을 누를 때마다 텍스트 필드를 비워줌
    setQuery(""); 
  };


  return (
    <div
      className="w-full flex flex-col items-center min-h-screen"
      // ✅ 배경 클릭 시 selectedSubject를 'general'로 초기화 (선택 해제)
      onClick={() => {
        setSelected("general");
        setHover(null);
      }}
    >
      <main className="pt-[180px] pb-[40px] flex flex-col items-center w-full px-4">
        <h1 className="text-[65px] md:text-[84px] font-extrabold tracking-tight bg-gradient-to-r from-[#60A5FA] to-[#027FFF] bg-clip-text text-transparent text-center leading-tight">
          {title}
        </h1>

        {/* 검색창 */}
        <div
          className="mt-8 flex items-center bg-white w-[820px] max-w-full px-8 py-5 rounded-[999px] border-4 border-[#2F7DFF] shadow-sm cursor-text focus:outline-none" // 포커스 아웃라인 제거
          onClick={(e) => e.stopPropagation()}
        >
          <img src={clipIcon} alt="클립" className="w-9 h-9" />
          <input
            type="text"
            // ✅ 선택된 과목에 따라 플레이스홀더 변경
            placeholder={selected === "general" ? "궁금한 것을 질문해 보세요" : `${getSubjectLabel(selected)} 관련 질문을 해 보세요`}
            className="flex-grow border-0 outline-none text-[22px] mx-[8px] placeholder:text-gray-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          <button
            type="button"
            className="mr-3 focus:outline-none" // 포커스 아웃라인 제거
            onClick={(e) => e.stopPropagation()}
          >
            <img src={micIcon} alt="음성입력" className="w-6 h-8 opacity-50 hover:opacity-100" />
         </button>
          <button type="button" onClick={() => handleSubmit()} className="focus:outline-none"> // 포커스 아웃라인 제거
           <img src="/search.png" alt="검색" className="w-9 h-9" />
          </button>
        </div>

        {/* ✅ [수정됨] 추천 질문 칩 영역 - 데이터 없을 때 안내 메시지 표시 */}
        <div className="flex flex-wrap justify-center gap-3 w-full max-w-[820px] mt-6 min-h-[50px]">
          {loading ? (
            <div className="text-gray-400 animate-pulse mt-2">
              두두가 질문을 생각하고 있어요... 🤔
            </div>
          ) : recommendations.length > 0 ? (
            recommendations.map((chip, idx) => (
              <button
                key={idx}
                type="button"
               onClick={(e) => {
                  e.stopPropagation();
                  handleChipClick(chip);
                }}
                className="px-5 py-3 bg-white border-2 border-[#e7efff] text-gray-600 rounded-full text-lg font-medium shadow-sm hover:border-[#2F7DFF] hover:text-[#2F7DFF] hover:bg-[#e7efff]/30 transition-all transform hover:-translate-y-1 focus:outline-none" // 포커스 아웃라인 제거
              >
               {chip}
             </button>
            ))
          ) : (
            <div className="text-gray-400 mt-2 font-medium">
              추천 질문이 없어요. 궁금한 점을 직접 물어보세요! 👋
            </div>
          )}
        </div>
      </main>

      {/* 과목 아이콘 섹션 */}
      <section className="flex flex-wrap justify-center gap-5 mt-[20px] pb-20">
        {SUBJECTS.map(({ key, label, icon }) => (
          <button
            key={key}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleSubjectClick(key); // ✅ 수정된 클릭 핸들러 사용
            }}
            onMouseEnter={() => setHover(key)}
            onMouseLeave={() => setHover(null)}
            // 🔥 [수정] focus:outline-none 추가 및 스타일 유지
            className={`rounded-[18px] w-[115px] h-[115px] flex flex-col justify-center items-center shadow-[0_8px_20px_rgba(0,0,0,0.06)] cursor-pointer transition-all duration-200 focus:outline-none ${
              hover === key || selected === key
                ? "bg-[#60A5FA] text-white scale-105" // 파란색 배경, 흰색 텍스트 유지
                : "bg-white text-gray-900"
            }`}
           >
            <img
              src={icon}
              alt={label}
              // 이미지 반전 클래스 제거된 상태 유지
             className={`w-10 h-10 mb-2 transition-filter duration-200`}
             />
             <span
             className={`font-semibold text-[16px] ${
               hover === key || selected === key
                  ? "text-white"
                  : "text-gray-900"
             }`}
            >
              {label}
            </span>
         </button>
       ))}
      </section>
    </div>
  );
}