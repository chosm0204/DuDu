import React, { useState } from "react";
import { motion } from "framer-motion";

const QUESTIONS = [
  {
    tag: "사회 5-1, 1단원",
    text: "다음 중 '광역자치단체'에 해당하는 것은?",
    choices: ["1. 구", "2. 시·군", "3. 특별시", "4. 읍"],
    answerIndex: 2,
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
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleChoiceClick = (questionIndex, choiceIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: choiceIndex,
    }));
  };

  // ================= 애니메이션 설정 구간 =================

  const titleVariant = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const descriptionVariant = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 15, delay: 0.2 },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 80, damping: 14 },
    },
  };

  // 문제 리스트 순차 등장
  const questionContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const questionItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 150, damping: 20 },
    },
  };

  // ======================================================

  return (
    <section className="w-full flex justify-center py-60">
      <div className="w-full max-w-[1200px] px-6 flex items-center gap-16">
        {/* ========== 왼쪽 설명 ========== */}
        <div className="flex-1">
          <motion.h2
            className="text-[60px] font-extrabold text-[#1273FF] leading-snug mb-4 whitespace-pre-line"
            variants={titleVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            학습 흐름을
            {"\n"}
            기반으로 한{"\n"}
            맞춤형 문제집
          </motion.h2>
          <motion.p
            className="text-[28px] text-[#4A7BFF] leading-relaxed font-semibold"
            variants={descriptionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            두두가 학습 기록을 정리해
            <br />
            개인 맞춤 문제집을 완성해줘요.
          </motion.p>
        </div>

        {/* ========== 문제 카드 ========== */}
        <motion.div
          className="w-[700px] bg-white rounded-[40px] shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{
            y: -8,
            boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
            transition: { duration: 0.3 },
          }}
        >
          <motion.div
            className="p-8"
            variants={questionContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {QUESTIONS.map((q, idx) => (
              <motion.div
                key={q.tag}
                className={`pb-4 ${
                  idx !== QUESTIONS.length - 1
                    ? "mb-6 border-b border-[#E5EAF2]"
                    : ""
                }`}
                variants={questionItem}
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="inline-block text-[14px] bg-[#027FFF] text-white px-3 py-1 rounded-full font-medium whitespace-nowrap">
                    {q.tag}
                  </span>
                  <p className="text-[19px] font-semibold leading-relaxed">
                    {q.text}
                  </p>
                </div>

                {q.choices && (
                  <ul className="text-[17px] space-y-2 ml-2">
                    {q.choices.map((choice, i) => (
                      <motion.li
                        key={choice}
                        className="cursor-pointer"
                        onClick={() => handleChoiceClick(idx, i)}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span
                          className={`inline-block px-2 py-1 rounded-md transition-all ${
                            i === q.answerIndex
                              ? "bg-[#D0E5FF] font-bold text-[#2F7DFF]"
                              : selectedAnswers[idx] === i
                              ? "bg-[#FFF4E5] font-semibold text-[#FF8C00]"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          {choice}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </motion.div>

          <div className="px-8 pt-0 pb-8 flex justify-center">
            <motion.button
              className="w-[150px] h-[50px] rounded-full bg-[#2F7DFF] text-white font-semibold text-[20px]"
              whileHover={{
                scale: 1.05,
                backgroundColor: "#1273FF",
                boxShadow: "0 8px 20px rgba(47, 125, 255, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              결과보기
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
