import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// 아이콘 경로
const clipIcon = "/clip.png";
const micIcon = "/mic.png";

// ✅ 로딩 중 보여줄 메시지 목록
const loadingMessages = [
  "두두가 열심히 책을 찾고 있어요! 📚",
  "두두가 알맞은 그림을 그리고 있어요! 🎨",
  "잠시만 기다려줘! 두두가 생각 중이야... 🤔",
  "두두가 데이터를 뒤적거리는 중! 🗂️",
  "💡 깨알 상식: 문어의 심장은 3개래요!",
  "💡 깨알 상식: 타조의 눈은 뇌보다 크답니다!",
  "💡 깨알 상식: 꿀은 절대로 상하지 않아요!",
  "💡 깨알 상식: 고양이는 단맛을 느끼지 못해요!",
];

// ==========================================
// 📖 단어 사전 툴팁 컴포넌트
// ==========================================
const TextWithTooltip = ({ text, dictionary }) => {
  if (!dictionary || dictionary.length === 0) return <>{text}</>;

  // 사전의 단어들을 찾기 위한 정규식 생성 (대소문자 무시)
  // 예: (광합성|중력|공전)
  const regex = new RegExp(
    `(${dictionary.map((d) => d.word).join("|")})`,
    "gi"
  );

  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) => {
        // 현재 텍스트 조각이 사전에 있는 단어인지 확인
        const definition = dictionary.find(
          (d) => d.word.toLowerCase() === part.toLowerCase()
        );

        if (definition) {
          return (
            <span
              key={index}
              className="relative group cursor-help inline-block mx-1"
            >
              {/* 단어 (파란색 + 밑줄 효과) */}
              <span className="text-[#2F7DFF] font-bold border-b-2 border-[#2F7DFF]/30 group-hover:border-[#2F7DFF] transition-colors">
                {part}
              </span>

              {/* 툴팁 (마우스 올리면 나타남) */}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 bg-gray-800 text-white text-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-xl leading-normal text-center break-keep">
                <span className="block font-bold text-yellow-300 mb-1 border-b border-gray-600 pb-1">
                  💡 {definition.word}
                </span>
                {definition.meaning}
                {/* 말풍선 꼬리 */}
                <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-800"></span>
              </span>
            </span>
          );
        }
        return part;
      })}
    </span>
  );
};

// ==========================================
// 🎠 카드 뉴스 슬라이더 (와이드 버전 + 툴팁 적용)
// ==========================================
const CardSlider = ({ cards, dictionary }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const currentCard = cards[currentIndex];
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [currentIndex, cards]);

  return (
    <div className="flex flex-col items-center w-full">
      {/* 카드 메인 영역 */}
      <div className="relative w-full bg-white rounded-3xl shadow-lg border border-gray-200 overflow-visible flex flex-col">
        {/* 1. 이미지 영역 (16:9 와이드 비율) */}
        {currentCard.image_url ? (
          <div className="w-full aspect-video bg-gray-100 relative overflow-hidden group rounded-t-3xl">
            {!imgError ? (
              <img
                src={currentCard.image_url}
                alt={currentCard.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-[#e7efff] text-[#2F7DFF] p-4 text-center">
                <div className="w-14 h-14 mb-2 rounded-full bg-white border border-[#2F7DFF] flex items-center justify-center shadow-sm">
                  <img
                    src="/Dudu.png"
                    alt="두두"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <span className="text-sm font-bold">
                  이미지를 불러오는 중...
                </span>
              </div>
            )}

            {/* 카드 번호 */}
            <div className="absolute top-4 right-4 bg-black/60 text-white text-sm px-3 py-1.5 rounded-full font-medium z-10">
              {currentIndex + 1} / {cards.length}
            </div>

            {/* 화살표 버튼 */}
            <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <button
                onClick={prevCard}
                  disabled={currentIndex === 0}
                    className={`w-12 h-12 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:scale-110 transition-all pointer-events-auto ${
                      currentIndex === 0 ? "invisible" : "visible"
                    }`}
              >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-8 h-8 text-[#2F7DFF]"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
          <path
            d="M15 19L8 12L15 5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
            </svg>
            </button>

            <button
              onClick={nextCard}
                disabled={currentIndex === cards.length - 1}
                  className={`w-12 h-12 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:scale-110 transition-all pointer-events-auto ${
                    currentIndex === cards.length - 1 ? "invisible" : "visible"
                }`}
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-8 h-8 text-[#2F7DFF]"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
          <path
            d="M9 5L16 12L9 19"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          </svg>
          </button>

            </div>
          </div>
        ) : null}

        {/* 2. 텍스트 내용 (툴팁 컴포넌트 적용) */}
        <div className="p-8 flex-1 flex flex-col justify-center min-h-[150px]">
          <h3 className="text-2xl font-bold text-[#2F7DFF] mb-4 leading-snug">
            {currentCard.title}
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
            {/* ✅ 일반 텍스트 대신 툴팁 기능이 있는 컴포넌트로 렌더링 */}
            <TextWithTooltip text={currentCard.content} dictionary={dictionary} />
          </p>
        </div>
      </div>

      {/* 3. 하단 인디케이터 */}
      {cards.length > 1 && (
        <div className="flex gap-3 mt-5">
          {cards.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "bg-[#2F7DFF] w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ==========================================
// 💬 메인 Search 컴포넌트
// ==========================================
export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [sessionId, setSessionId] = useState("");

  const processedQuery = useRef("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const newSessionId = Math.random().toString(36).substring(2, 15);
    setSessionId(newSessionId);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const fetchFromBackend = async (text) => {
    try {
      const response = await fetch(
        `http://localhost:5001/search?query=${encodeURIComponent(
          text
        )}&session_id=${sessionId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) throw new Error("Server Error");
      return await response.json();
    } catch (error) {
      console.error("통신 에러:", error);
      return null;
    }
  };

  const sendMessage = async (text) => {
    if (!text.trim() || isLoading) return;

    const userMessage = { id: Date.now(), role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // 로딩 메시지 랜덤 선택
    const randomMessage =
      loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
    setLoadingMessage(randomMessage);
    setIsLoading(true);

    const data = await fetchFromBackend(text.trim());

    if (data && data.answer) {
      const aiMessage = {
        id: Date.now() + 1,
        role: "assistant",
        cards: data.answer,
        dictionary: data.dictionary, // ✅ 백엔드에서 받은 단어장 데이터
        followUp: data.follow_up_questions,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } else {
      const errorMessage = {
        id: Date.now() + 1,
        role: "assistant",
        isError: true,
        text: "서버랑 연결이 안 돼요. 잠시 후에 다시 시도해 주세요! 😭",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
    setIsLoading(false);
  };

  const initialQuery = location.state?.query || "";
  useEffect(() => {
    if (initialQuery && initialQuery !== processedQuery.current && sessionId) {
      processedQuery.current = initialQuery;
      sendMessage(initialQuery);
    }
  }, [initialQuery, sessionId]);

  const renderFollowUp = (questions) => (
    <div className="flex flex-wrap gap-2 mt-3">
      {questions.map((q, idx) => (
        <button
          key={idx}
          onClick={() => sendMessage(q)}
          className="px-4 py-2 bg-[#e7efff] text-[#2F7DFF] text-sm font-medium rounded-full hover:bg-[#2F7DFF] hover:text-white transition-colors"
        >
          {q}
        </button>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#e7efff] to-white font-sans">
      <main className="flex-1 w-full max-w-[1000px] mx-auto px-4 overflow-y-auto pt-30 pb-10 scrollbar-hide">
        {messages.length === 0 && !isLoading && (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <div className="w-20 h-20 mb-4 rounded-full bg-white border-2 border-[#2F7DFF] flex items-center justify-center shadow-sm">
              <img
                src="/Dudu.png"
                alt="두두"
                className="w-12 h-12 object-contain"
              />
            </div>
            <p className="text-xl text-gray-500">
              두두에게 무엇이든 물어보세요!
            </p>
          </div>
        )}

        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`w-full flex mb-8 ${
                isUser ? "justify-end" : "justify-start"
              }`}
            >
              {!isUser && (
                <div className="w-10 h-10 rounded-full bg-white border border-[#2F7DFF] flex items-center justify-center mr-3 mt-1 shadow-sm shrink-0">
                  <img
                    src="/Dudu.png"
                    alt="두두"
                    className="w-7 h-7 object-contain"
                  />
                </div>
              )}
              <div className={`max-w-[90%] ${isUser ? "" : "w-full"}`}>
                {isUser && (
                  <div className="bg-[#2F7DFF] text-white px-6 py-3 rounded-2xl rounded-tr-none text-lg shadow-md inline-block">
                    {msg.text}
                  </div>
                )}

                {!isUser && !msg.isError && (
                  <div className="flex flex-col gap-3 w-full">
                    {/* ✅ 단어장(dictionary) 데이터를 CardSlider에 전달 */}
                    {msg.cards && (
                      <CardSlider cards={msg.cards} dictionary={msg.dictionary} />
                    )}

                    {msg.followUp && msg.followUp.length > 0 && (
                      <div className="ml-1 mt-1">
                        <span className="text-xs text-gray-400 ml-1">
                          💡 더 궁금한 게 있나요?
                        </span>
                        {renderFollowUp(msg.followUp)}
                      </div>
                    )}
                  </div>
                )}

                {msg.isError && (
                  <div className="bg-red-100 text-red-500 px-4 py-3 rounded-xl">
                    {msg.text}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex justify-start w-full mb-8">
            <div className="w-10 h-10 rounded-full bg-white border border-[#2F7DFF] flex items-center justify-center mr-3 shadow-sm shrink-0">
              <img
                src="/Dudu.png"
                alt="두두"
                className="w-7 h-7 object-contain"
              />
            </div>
            <div className="bg-white px-6 py-4 rounded-3xl rounded-tl-none shadow-sm border border-gray-100 flex items-center gap-3">
              <span className="text-[#2F7DFF] font-medium">
                {loadingMessage}
              </span>
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-[#2F7DFF]/50 rounded-full animate-bounce"></span>
                <span
                  className="w-2 h-2 bg-[#2F7DFF]/50 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></span>
                <span
                  className="w-2 h-2 bg-[#2F7DFF]/50 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      <div className="w-full flex justify-center pb-8 pt-4 bg-white/80 backdrop-blur-sm border-t border-gray-100">
        <div className="flex items-center bg-white w-[820px] max-w-[90%] px-6 py-4 rounded-full border-4 border-[#2F7DFF] shadow-sm">
          <img
            src={micIcon}
            alt="첨부"
            className="w-8 h-8 mr-3 opacity-50 cursor-pointer"
          />
          <input
            type="text"
            placeholder="궁금한 것을 질문해 보세요"
            className="flex-grow border-0 outline-none text-lg mx-2 placeholder:text-gray-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              !e.nativeEvent.isComposing &&
              sendMessage(input)
            }
            disabled={isLoading}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={isLoading}
            className="flex items-center justify-center w-10 h-10 bg-[#2F7DFF] rounded-full hover:bg-blue-600 transition-colors"
          >
            <img
              src="/search.png"
              alt="검색"
              className="w-5 h-5 invert brightness-0"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
