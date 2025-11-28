// src/cho/Search.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const logo = "/logo.png";
const clipIcon = "/clip.png";
const micIcon = "/mic.png";

async function callGeminiAPI(userText) {
  // ✅ 나중에 여기만 실제 Gemini 호출 코드로 교체하면 됨
  // 예시:
  // const res = await fetch("/api/gemini-chat", {...});
  // const data = await res.json();
  // return data.reply;

  // 일단은 동작 확인용 임시 응답
  return `[임시 답변] "${userText}" 에 대한 카드뉴스/설명이 여기에 들어갈 거예요.`;
}

export default function Search() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialQuery = searchParams.get("q") || "";

  // 메시지 리스트: { id, role: "user" | "assistant", text }
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState(""); // 하단 입력창
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 공통으로 쓰는 "메시지 보내기" 로직
  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      text: text.trim(),
    };

    // 유저 메시지 + "카드뉴스 생성 중..." 말풍선 추가
    setMessages((prev) => [
      ...prev,
      userMessage,
      {
        id: Date.now() + 1,
        role: "assistant",
        text: "카드뉴스 생성 중...",
      },
    ]);

    setInput("");
    setIsLoading(true);

    try {
      const reply = await callGeminiAPI(text.trim());

      // 실제 Gemini 응답 말풍선 추가
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          role: "assistant",
          text: reply,
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 3,
          role: "assistant",
          text: "답변을 가져오는 데 실패했어요. 잠시 후 다시 시도해 주세요.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Home에서 /search?q=... 로 넘어왔을 때, 처음 한 번 자동 전송
  useEffect(() => {
    if (initialQuery) {
      sendMessage(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  // 하단 검색바 컴포넌트
  const SearchBar = (
    <div
      className="
        flex items-center bg-white
        w-[820px] max-w-[820px]
        px-8 py-5
        rounded-[999px] border-4 border-[#2F7DFF] shadow-sm
      "
    >
      <img src={clipIcon} alt="첨부" className="w-10 h-10 mr-3" />

      <input
        type="text"
        placeholder="궁금한 것을 질문해 보세요"
        className="flex-grow border-0 outline-none text-[1.1rem] mx-[8px] placeholder:text-gray-400"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage(input);
          }
        }}
      />

      <button
        type="button"
        className="mr-3"
        onClick={() => {
          // 나중에 음성 인식 붙이면 여기
        }}
      >
        <img src={micIcon} alt="음성 입력" className="w-6 h-8" />
      </button>

      <button
        className="w-9 h-9 rounded-full bg-[#2F7DFF] flex items-center justify-center text-white text-lg"
        onClick={() => sendMessage(input)}
      >
        ↑
      </button>
    </div>
  );

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-b from-[#e7efff] to-white font-sans">
      {/* ---------------------- CHAT 영역 ---------------------- */}
      <main className="flex-1 w-full max-w-[1200px] flex flex-col items-center">
        {/* 메시지 리스트 */}
        <div className="flex-1 w-full flex flex-col px-10 pt-4 pb-6 overflow-y-auto">
          {messages.map((msg) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={msg.id}
                className={`w-full flex mb-4 ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`
                    max-w-[70%] px-6 py-3 rounded-full text-lg
                    ${
                      isUser
                        ? "bg-[#2F7DFF] text-white"
                        : "bg-white text-gray-800 shadow-md"
                    }
                  `}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="w-full flex justify-start mb-4">
              <div className="bg-white px-6 py-3 rounded-full shadow-md text-gray-500 text-lg">
                생각 중...
              </div>
            </div>
          )}
        </div>

        {/* 하단 검색바 */}
        <div className="w-full flex justify-center mb-8">{SearchBar}</div>
      </main>
    </div>
  );
}
