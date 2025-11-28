import React from "react";

const QUESTIONS = [
  {
    tag: "사회 5-1, 1단원",
    text: "다음 중 ‘광역자치단체’에 해당하는 것은?",
    choices: ["1. 구", "2. 시·군", "3. 특별시", "4. 읍"],
    answerIndex: 0,
  },
  {
    tag: "과학 4-2, 1단원",
    text: "물이 얼음이 될 때 일어나는 변화는 무엇인가?",
    choices: ["1. 기화", "2. 응고", "3. 응결", "4. 융해"],
    answerIndex: 1,
  },
  {
    tag: "사회 5-2, 6단원",
    text: "오존층 파괴와 가장 관련 있는 물질은?",
    choices: null,
    answerIndex: null,
  },
];

export default function Home4() {
  return (
    <section className="w-full flex justify-center py-60">
      <div className="w-full max-w-[1200px] px-6 flex items-center gap-16">
        {/* ========== 왼쪽 설명 ========== */}
        <div className="flex-1">
          <h2 className="text-[60px] font-extrabold text-[#1273FF] leading-snug mb-4 whitespace-pre-line">
            학습 흐름을
            {"\n"}
            기반으로 한
            {"\n"}
            맞춤형 문제집
          </h2>
          <p className="text-[28px] text-[#4A7BFF] leading-relaxed">
            두두가 학습 기록을 정리해
            <br />
            개인 맞춤 문제집을 완성해줘요.
          </p>
        </div>

        {/* ========== 문제 카드 ========== */}
        <div className="w-[700px] bg-white rounded-[40px] shadow-[0_16px_40px_rgba(0,0,0,0.06)]">

          <div className="p-8">
            {QUESTIONS.map((q, idx) => (
              <div
                key={q.tag}
                className={`pb-4 ${
                  idx !== QUESTIONS.length - 1 ? "mb-6 border-b border-[#E5EAF2]" : ""
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-block text-[16px] bg-[#027FFF] text-white px-3 py-1 rounded-full font-medium whitespace-nowrap">
                    {q.tag}
                  </span>
                  <p className="text-[20px] font-semibold">{q.text}</p>
                </div>

                {q.choices && (
                  <ul className="text-[18px] space-y-2">
                    {q.choices.map((choice, i) => (
                      <li key={choice}
                        className={i === q.answerIndex ? "font-bold text-[#2F7DFF]" : ""}>
                        {choice}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="px-8 pt-0 pb-8 flex justify-center">
            <button className="w-[150px] h-[50px] rounded-full bg-[#2F7DFF] text-white font-semibold text-[20px]">
              결과보기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
