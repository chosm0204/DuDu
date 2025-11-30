import React from "react";
import { motion } from "framer-motion";

const SUBJECTS = [
  { key: "korean", label: "국어", icon: "/korean.png" },
  { key: "math", label: "수학", icon: "/math.png" },
  { key: "society", label: "사회", icon: "/society.png" },
  { key: "science", label: "과학", icon: "/science.png" },
  { key: "english", label: "영어", icon: "/english.png" },
  { key: "history", label: "역사", icon: "/history.png" },
];

const MATH_UNITS = [
  "3-2, 3단원 - 원",
  "5-2, 5단원 - 직육면체",
  "6-2, 2단원 소수의 나눗셈",
];

export default function Home5() {
  // ================= 애니메이션 설정 구간 =================

  const titleVariant = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15, delay: 0.2 },
    },
  };

  const subjectContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const subjectItem = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 15 },
    },
  };

  const unitItem = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 150, damping: 15 },
    },
  };

  const contentItem = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 150, damping: 15 },
    },
  };

  const descriptionVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15, delay: 0.6 },
    },
  };

  // ======================================================

  return (
    <section className="w-full flex justify-center py-60">
      <div className="w-full max-w-[1200px] px-6 flex flex-col items-center">
        {/* ========== 큰 제목 ========== */}
        <motion.h2
          className="text-center text-[54px] font-extrabold leading-snug mb-10 whitespace-pre-line text-[#1273FF]"
          variants={titleVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          학습한 내용들을
          {"\n"}
          단원별로 착착 모아줘요
        </motion.h2>

        {/* ========== 리포트 ========== */}
        <motion.div
          className="w-[750px] bg-white rounded-[40px] shadow-[0_20px_40px_rgba(0,0,0,0.06)] px-12 py-12 flex flex-col items-center"
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{
            y: -8,
            boxShadow: "0 24px 50px rgba(0,0,0,0.1)",
            transition: { duration: 0.3 },
          }}
        >
          {/* 과목 버튼들 */}
          <motion.div
            className="flex gap-5 justify-center mb-10"
            variants={subjectContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {SUBJECTS.map(({ key, label, icon }) => {
              const isActive = key === "math";
              return (
                <motion.div
                  key={key}
                  className={`w-[90px] h-[90px] rounded-[22px] flex flex-col items-center justify-center text-[14px] font-semibold
                    shadow-[0_10px_20px_rgba(0,0,0,0.08)] transition-all duration-200
                    ${
                      isActive
                        ? "bg-[#2F7DFF] text-white"
                        : "bg-white text-gray-800"
                    }
                  `}
                  variants={subjectItem}
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                  }}
                >
                  <img src={icon} alt="" className="w-8 h-8 mb-2" />
                  <span>{label}</span>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="w-full flex gap-10 pt-4">
            {/* 단원 리스트 */}
            <div className="w-1/2">
              <p className="font-extrabold text-[18px] text-gray-800 mb-4">
                단원
              </p>
              <div className="space-y-3">
                {MATH_UNITS.map((unit, idx) => {
                  const active = idx === 0;
                  return (
                    <motion.div
                      key={unit}
                      className={`w-full px-6 py-3 rounded-full text-[15px] shadow-[0_4px_10px_rgba(0,0,0,0.05)]
                        ${
                          active
                            ? "bg-[#DCEBFF] text-[#1D4ED8] font-semibold"
                            : "bg-white text-gray-700"
                        }
                      `}
                      variants={unitItem}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      {unit}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* 구분선 */}
            <div className="flex flex-col items-center justify-center">
              <motion.div
                className="w-px h-[120px] bg-[#D5DEEE] mb-1"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />
              <motion.div
                className="w-[4px] h-[40px] rounded-full bg-[#AEB9D7]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
              />
            </div>

            {/* 모아보기 */}
            <div className="w-1/2">
              <p className="font-extrabold text-[18px] text-gray-800 mb-4">
                모아보기
              </p>
              <div className="flex gap-6">
                <motion.div
                  className="w-[160px] h-[170px] bg-white rounded-[26px] shadow-[0_10px_24px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center text-[17px] font-extrabold text-[#1273FF]"
                  variants={contentItem}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.12)",
                  }}
                >
                  <img
                    src="/cardnews.png"
                    alt="카드뉴스"
                    className="w-[60px] h-[60px] mb-3"
                  />
                  카드뉴스
                </motion.div>

                <motion.div
                  className="w-[160px] h-[170px] bg-white rounded-[26px] shadow-[0_10px_24px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center text-[17px] font-extrabold text-[#F4B100]"
                  variants={contentItem}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.12)",
                  }}
                >
                  <img
                    src="/quiz.png"
                    alt="퀴즈"
                    className="w-[50px] h-[56px] mb-3"
                  />
                  퀴즈
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========== 아래 설명 ========== */}
        <motion.p
          className="mt-8 text-center text-[27px] leading-relaxed text-[#3B82F6] font-semibold"
          variants={descriptionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          학습했던 내용들이 과목·단원 기준으로
          <br />
          자동 정리되어 복습과 확인이 쉬워져요
        </motion.p>
      </div>
    </section>
  );
}
