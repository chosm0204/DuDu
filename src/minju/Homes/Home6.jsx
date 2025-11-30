import React from "react";
import { motion } from "framer-motion";

export default function Home6() {
  const benefits = [
    "두두노트\n생성 무제한",
    "더 빠르고, 더 높은\n이미지 생성 업그레이드",
    "모든 과목\n전 범위 지원",
  ];

  // ================= 애니메이션 설정 구간 =================

  const titleVariant = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const subtitleVariant = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15, delay: 0.2 },
    },
  };

  const benefitsContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4,
      },
    },
  };

  const benefitItem = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 150, damping: 15 },
    },
  };

  const buttonContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.8,
      },
    },
  };

  const buttonItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 150, damping: 15 },
    },
  };

  // ======================================================

  return (
    <section className="w-full flex justify-center py-60">
      <div className="w-full max-w-[1200px] px-6 flex flex-col items-center">
        {/* ========== 큰 제목 ========== */}
        <motion.h2
          className="text-[70px] font-extrabold text-[#1273FF] leading-snug whitespace-pre-line mb-6 text-center"
          variants={titleVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          두두와 함께,
          {"\n"}더 똑똑하게.
        </motion.h2>

        {/* ========== 부제목 ========== */}
        <motion.p
          className="text-[50px] text-[#4A7BFF] mb-12 leading-relaxed text-center font-semibold"
          variants={subtitleVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          더 깊고, 더 정확하게 경험할 수 있어요
        </motion.p>

        {/* ========== 박스 3개 ========== */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mb-14"
          variants={benefitsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {benefits.map((text, index) => (
            <motion.div
              key={text}
              className="px-12 py-5 rounded-[24px] bg-white shadow-[0_12px_24px_rgba(0,0,0,0.06)] border-2 border-[#60A5FA] flex items-center justify-center
                text-center text-[23px] font-semibold text-[#2F2F2F] whitespace-pre-line"
              variants={benefitItem}
              whileHover={{
                scale: 1.05,
                y: -8,
                borderColor: "#2F7DFF",
                boxShadow: "0 16px 32px rgba(47, 125, 255, 0.15)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              {text}
            </motion.div>
          ))}
        </motion.div>

        {/* ========== 버튼 ========== */}
        <motion.div
          className="flex gap-10 mt-4 flex-wrap justify-center"
          variants={buttonContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.button
            className="w-[260px] h-[70px] rounded-full bg-[#2F7DFF] text-white text-[25px] font-bold shadow-[0_12px_24px_rgba(47,125,255,0.4)]"
            variants={buttonItem}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#1273FF",
              boxShadow: "0 16px 32px rgba(47, 125, 255, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            지금 구독하기
          </motion.button>

          <motion.button
            className="w-[260px] h-[70px] rounded-full border-[3px] border-[#2F7DFF] text-[#2F7DFF] text-[25px] font-bold bg-white"
            variants={buttonItem}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#EEF5FF",
              borderColor: "#1273FF",
              color: "#1273FF",
              boxShadow: "0 8px 20px rgba(47, 125, 255, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            무료로 체험하기 →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
