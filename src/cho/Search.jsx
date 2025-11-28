// src/cho/Search.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const clipIcon = "/clip.png";
const micIcon = "/mic.png";

// ===================== 🔐 API KEY =====================
const API_KEY = "AIzaSyCh6lm9rUbYgqw_CTaI3OVFe5dS-66wJ0I";

// ===================== 🤖 Gemini 호출 함수 =====================
async function callGeminiAPI(userText) {
  if (!API_KEY) {
    console.error("🚨 API 키 없음");
    return "⚠️ 서버 설정 오류: API 키가 없습니다. 개발자에게 문의해 주세요.";
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
  console.log("Gemini 요청 URL:", url);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: userText }],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errTxt = await response.text();
      console.error("Gemini API 에러:", errTxt);
      return "⚠️ 답변을 가져오는 데 문제가 발생했어요. 잠시 후 다시 시도해 주세요.";
    }

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "⚠️ 응답에서 텍스트를 찾을 수 없어요.";

    return text;
  } catch (err) {
    console.error("Gemini 호출 중 오류:", err);
    return "⚠️ 네트워크 오류가 발생했어요. 인터넷 연결을 확인해 주세요.";
  }
}

// ===================== 💬 Search 컴포넌트 =====================
export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();

  const initialQuery = location.state?.query || "";
  const initialSubject = location.state?.subject || "";

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const processedQuery = useRef("");

  // 공통 "메시지 보내기"
  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      text: text.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const reply = await callGeminiAPI(text.trim());

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        role: "assistant",
        text: reply,
      },
    ]);

    setIsLoading(false);
  };

  // Home에서 넘어온 쿼리 자동 실행
  useEffect(() => {
    if (initialQuery && initialQuery !== processedQuery.current) {
      processedQuery.current = initialQuery;
      sendMessage(initialQuery);
    }
  }, [initialQuery]);

  // 하단 검색바
  const SearchBar = (
    <div className="flex items-center bg-white w-[820px] max-w-[820px] px-8 py-5 rounded-[999px] border-4 border-[#2F7DFF] shadow-sm">
      <img src={clipIcon} alt="첨부" className="w-10 h-10 mr-3" />

      <input
        type="text"
        placeholder="궁금한 것을 질문해 보세요"
        className="flex-grow border-0 outline-none text-[1.1rem] mx-[8px] placeholder:text-gray-400"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage(input);
        }}
      />

      <button type="button" className="mr-3">
        <img src={micIcon} alt="음성 입력" className="w-6 h-8" />
      </button>

      <button
        className="flex items-center justify-center"
        onClick={() => sendMessage(input)}
      >
        <img src="/search.png" alt="검색" className="w-9 h-9" />
      </button>
    </div>
  );

  // 화면
  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-b from-[#e7efff] to-white font-sans pt-24">
      <main className="flex-1 w-full max-w-[1200px] flex flex-col items-center">
        <div className="flex-1 w-full flex flex-col px-10 pt-4 pb-6 overflow-y-auto">
          {messages.length === 0 && !isLoading && (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-400 text-xl">
                {initialSubject && `[${initialSubject}] `}
                궁금한 것을 질문해 보세요
              </p>
            </div>
          )}

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
                    max-w-[70%] px-6 py-3 rounded-3xl text-lg
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
              <div className="bg-white px-6 py-3 rounded-3xl shadow-md text-gray-500 text-lg">
                생각 중...
              </div>
            </div>
          )}
        </div>

        <div className="w-full flex justify-center pb-8">{SearchBar}</div>
      </main>
    </div>
  );
}
