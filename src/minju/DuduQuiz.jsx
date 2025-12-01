// src/minju/DuduQuiz.jsx
import React, { useState } from "react";

const QUIZ_TABS = ["속담", "사자성어", "맞춤법"];

// 1. 속담
const PROVERB_DATA = {
  image: "/quiz_tiger.png",
  correctAnswer: "호랑이도 제 말 하면 온다",
  questionMessage: (type) => `이 그림이 뜻하는 ${type}은 무엇일까요?`,
};

// 2. 사자성어
const IDIOM_DATA = {
  image: "/idiom_main.jpg",
  correctAnswer: "자업자득",
  questionMessage: () => "빈 칸에 들어갈 말을 적어보세요.",
  partialHint: "자업",
  meaning: "자신이 저지른 일의 결과를 좋든 나쁘든 자신이 받는 것의 의미",
};

// 3. 맞춤법
const SPELLING_DATA = {
  image: "/spelling_win.jpg",
  correctAnswer: "따 놓은",
  questionMessage: () => "우승은 [ ] 당상이다",
  options: ["따 놓은", "따논"],
  hintType: "none",
};

const AnswerStatus = {
  PENDING: "pending",
  CORRECT: "correct",
  INCORRECT: "incorrect",
};

const CHOSUNG = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

function getChosung(str) {
  if (!str) return "";

  let result = "";

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const charCode = char.charCodeAt(0);

    if (charCode >= 44032 && charCode <= 55203) {
      const chosungIndex = Math.floor((charCode - 44032) / 588);
      result += CHOSUNG[chosungIndex];
    } else {
      result += char;
    }
  }

  return result;
}

const getActiveQuizData = (type) => {
  switch (type) {
    case "속담":
      return PROVERB_DATA;
    case "사자성어":
      return IDIOM_DATA;
    case "맞춤법":
      return SPELLING_DATA;
    default:
      return PROVERB_DATA;
  }
};

export default function DuduQuiz() {
  const [selectedQuizType, setSelectedQuizType] = useState("속담");
  const [answer, setAnswer] = useState("");
  const [answerStatus, setAnswerStatus] = useState(AnswerStatus.PENDING);

  const activeQuizData = getActiveQuizData(selectedQuizType);
  const { correctAnswer, partialHint, meaning, options } = activeQuizData;

  const normalize = (text) => text.replace(/\s/g, "");

  // 정답 확인
  const checkAnswer = () => {
    const cleanedAnswer = normalize(answer);
    const cleanedCorrectAnswer = normalize(correctAnswer);

    if (selectedQuizType === "속담") {
      setAnswerStatus(
        cleanedAnswer === cleanedCorrectAnswer
          ? AnswerStatus.CORRECT
          : AnswerStatus.INCORRECT
      );
    } else if (selectedQuizType === "사자성어") {
      const fullAnswerFromPartial =
        (IDIOM_DATA.partialHint || "") + cleanedAnswer;

      if (
        cleanedAnswer === cleanedCorrectAnswer ||
        fullAnswerFromPartial === cleanedCorrectAnswer
      ) {
        setAnswerStatus(AnswerStatus.CORRECT);
      } else {
        setAnswerStatus(AnswerStatus.INCORRECT);
      }
    } else if (selectedQuizType === "맞춤법") {
      setAnswerStatus(
        cleanedAnswer === cleanedCorrectAnswer
          ? AnswerStatus.CORRECT
          : AnswerStatus.INCORRECT
      );
    } else {
      setAnswerStatus(AnswerStatus.INCORRECT);
    }
  };

  const handleOptionClick = (option) => {
    if (answerStatus === AnswerStatus.CORRECT) return;

    setAnswer(option);
    const cleanedOption = normalize(option);
    const cleanedCorrect = normalize(SPELLING_DATA.correctAnswer);

    if (cleanedOption === cleanedCorrect) {
      setAnswerStatus(AnswerStatus.CORRECT);
    } else {
      setAnswerStatus(AnswerStatus.INCORRECT);
    }
  };

  const handleTabChange = (tab) => {
    setSelectedQuizType(tab);
    setAnswer("");
    setAnswerStatus(AnswerStatus.PENDING);
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
    if (answerStatus === AnswerStatus.CORRECT) {
      setAnswerStatus(AnswerStatus.PENDING);
    }
  };

  const isCorrect = answerStatus === AnswerStatus.CORRECT;
  const isIncorrect = answerStatus === AnswerStatus.INCORRECT;

  const chosungHint = getChosung(correctAnswer);

  let feedbackMessage = "";
  let feedbackStyle = "";
  let hintToDisplay = "";

  if (isCorrect) {
    feedbackMessage = "정답이에요!";
    feedbackStyle = "text-[#207D4F] font-bold";
  } else if (isIncorrect) {
    feedbackMessage = "아쉬워요, 다시 생각해볼까요?";
    feedbackStyle = "text-[#FF0000] font-bold";
    if (selectedQuizType !== "맞춤법") {
      hintToDisplay = chosungHint;
    }
  }

  const pendingMessage = activeQuizData.questionMessage(selectedQuizType);

  const hintFormat =
    selectedQuizType === "사자성어" && isIncorrect
      ? partialHint + getChosung(correctAnswer.substring(partialHint.length))
      : null;

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-b from-[#E6F2FF] to-white">
      <main className="w-full max-w-[1200px] flex flex-col items-center pt-[140px]">
        <h1 className="text-[64px] font-bold bg-gradient-to-r from-[#60A5FA] to-[#027FFF] bg-clip-text text-transparent mb-10">
          두두퀴즈
        </h1>

        <section className="w-full max-w-[1000px] bg-white rounded-[40px] shadow-[0_18px_40px_rgba(0,0,0,0.06)] flex flex-col items-center pt-10 pb-12">
          {/* 탭 */}
          <div className="w-full flex justify-center border-b border-[#E5EAF2] pb-4">
            <div className="flex gap-[80px]">
              {QUIZ_TABS.map((tab) => {
                const isActive = selectedQuizType === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`pb-2 text-[22px] border-b-4
                      ${
                        isActive
                          ? "font-bold text-black border-[#2F7DFF]"
                          : "text-gray-400 border-transparent"
                      }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 이미지 + 내용 */}
          <div className="flex flex-col items-center mt-10 px-10 w-full">
            <div className="w-[260px] h-[260px] rounded-[48px] overflow-hidden mb-8">
              <img
                src={activeQuizData.image}
                className="w-full h-full object-cover"
                alt="퀴즈 이미지"
              />
            </div>

            {/* 메시지 영역 */}
            <p className="text-[24px] font-bold text-gray-900 mb-6 text-center">
              {answerStatus === AnswerStatus.PENDING && (
                <>
                  {selectedQuizType === "맞춤법" ? (
                    <span className="text-[24px] font-bold text-black">
                      {pendingMessage}
                    </span>
                  ) : (
                    <span className="text-[24px] font-bold text-black">
                      {pendingMessage}
                    </span>
                  )}
                </>
              )}

              {/* 정답/오답 */}
              {answerStatus !== AnswerStatus.PENDING && (
                <>
                  {isIncorrect && (
                    <>
                      {(selectedQuizType === "속담" ||
                        selectedQuizType === "사자성어") && (
                        <span className="text-[18px] block font-medium text-[#027FFF] mb-1">
                          {selectedQuizType === "사자성어"
                            ? hintFormat
                            : hintToDisplay}
                        </span>
                      )}
                      <span className={`text-[26px] ${feedbackStyle}`}>
                        {feedbackMessage}
                      </span>
                    </>
                  )}

                  {isCorrect && (
                    <>
                      <span className="text-[18px] block font-medium text-[#027FFF] mb-1">
                        {correctAnswer}
                      </span>
                      {selectedQuizType === "사자성어" && (
                        <span className="text-[18px] block font-medium text-black mb-1">
                          {meaning}
                        </span>
                      )}
                      <span className={`text-[26px] ${feedbackStyle}`}>
                        {feedbackMessage}
                      </span>
                    </>
                  )}
                </>
              )}
            </p>

            {selectedQuizType === "맞춤법" ? (
              <div className="flex gap-6 mt-2">
                {options?.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleOptionClick(opt)}
                    className={`
                      min-w-[120px] px-6 py-3 rounded-full bg-white
                      text-[18px] font-medium
                      shadow-[0_8px_20px_rgba(0,0,0,0.06)]
                      border border-[#E5EAF2]
                      hover:shadow-[0_10px_24px_rgba(0,0,0,0.08)]
                      transition
                      ${
                        normalize(answer) === normalize(opt)
                          ? "border-[#2F7DFF]"
                          : "border-[#E5EAF2]"
                      }
                    `}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ) : (
              <div
                className="w-[80%] max-w-[700px] flex items-center bg-white
                           rounded-[999px] border-4 border-[#2F7DFF]
                           px-8 py-4 shadow-sm"
              >
                <input
                  type="text"
                  placeholder="정답을 말하거나 입력해 보세요!"
                  value={answer}
                  onChange={handleAnswerChange}
                  className="flex-grow border-0 outline-none text-[20px] placeholder:text-gray-400"
                />

                <button className="mr-2">
                  <img src="/mic.png" className="w-6 h-8" alt="음성" />
                </button>

                <button
                  onClick={checkAnswer}
                  disabled={isCorrect || answer.trim().length === 0}
                >
                  <img
                    src="/search.png"
                    className="w-[38px] h-[38px]"
                    alt="제출"
                  />
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
