import React from "react";
import { motion } from "framer-motion";

export default function Home2() {
  const messages = [
    "설명이 너무 어려워서\n읽어도 모르겠어요…",
    "검색하면 나오지만…\n뭐가 맞는지 모르겠어요",
    "틀린 정보 보면 어쩌지?\n정확한 답을 알고 싶어요!",
  ];

  // ================= 애니메이션 설정 구간 =================

  const messageContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const messageItem = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 150, damping: 15 },
    },
  };

  const titleVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15, delay: 0.8 },
    },
  };

  const descriptionVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15, delay: 1.0 },
    },
  };

  // ======================================================

  return (
    <section className="w-full min-h-screen flex items-center justify-center py-40 bg-gradient-to-b from-white to-[#F0F7FF]">
      <div className="w-full max-w-[1200px] px-6 flex flex-col items-center">
        {/* ========== 말풍선들 ========== */}
        <motion.div
          className="w-full flex justify-between items-start mb-16 relative"
          variants={messageContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* 왼쪽 상단 */}
          <motion.div
            className="absolute left-[5%] top-0"
            variants={messageItem}
          >
            <motion.div
              className="bg-white rounded-[32px] px-8 py-6 shadow-[0_12px_30px_rgba(0,0,0,0.08)] border border-gray-100"
              whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
              }}
            >
              <p className="text-[22px] font-semibold text-gray-800 whitespace-pre-line leading-relaxed">
                {messages[0]}
              </p>
            </motion.div>
          </motion.div>

          {/* 오른쪽 상단 */}
          <motion.div
            className="absolute right-[8%] top-[50px]"
            variants={messageItem}
          >
            <motion.div
              className="bg-white rounded-[32px] px-8 py-6 shadow-[0_12px_30px_rgba(0,0,0,0.08)] border border-gray-100"
              whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
              }}
            >
              <p className="text-[22px] font-semibold text-gray-800 whitespace-pre-line leading-relaxed">
                {messages[1]}
              </p>
            </motion.div>
          </motion.div>

          {/* 왼쪽 중앙 */}
          <motion.div
            className="absolute left-[12%] top-[200px]"
            variants={messageItem}
          >
            <motion.div
              className="bg-white rounded-[32px] px-8 py-6 shadow-[0_12px_30px_rgba(0,0,0,0.08)] border border-gray-100"
              whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
              }}
            >
              <p className="text-[22px] font-semibold text-gray-800 whitespace-pre-line leading-relaxed">
                {messages[2]}
              </p>
            </motion.div>
          </motion.div>

          {/* 공간 확보용 invisible 요소 */}
          <div className="w-full h-[350px]" />
        </motion.div>

        {/* ========== 메인 타이틀 ========== */}
        <motion.h2
          className="text-center text-[72px] font-extrabold leading-tight mb-6 whitespace-pre-line text-[#0066FF]"
          variants={titleVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          두두가 올바른 답을
          {"\n"}
          딱! 알려드릴게요
        </motion.h2>

        {/* ========== 설명 텍스트 ========== */}
        <motion.p
          className="text-center text-[30px] text-[#4A90E2] leading-relaxed font-semibold"
          variants={descriptionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          두두는 교과서 내용을 바탕으로
          <br />
          아이들이 믿고 배울 수 있는 정확한 정보를 알려줘요
        </motion.p>
      </div>
    </section>
  );
}
