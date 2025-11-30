import React from "react";
import { motion } from "framer-motion";

export default function Home2() {
  // 타이핑 효과를 적용할 텍스트
  const typingText = "원이 뭐야?";

  // ================= 애니메이션 설정 구간 =================

  // 1. 큰 덩어리들 등장 애니메이션 (기존과 동일: 아래에서 띠용~ 하고 올라옴)
  const springVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15, mass: 1 },
    },
  };

  // 2. 오른쪽 섹션 전체 컨테이너 (기존과 동일: 순차적 등장)
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  // 3. 타자기 효과 컨테이너 설정
  const typewriterContainer = {
    visible: {
      transition: {
        delayChildren: 0.8,
        staggerChildren: 0.08, // 타이핑 속도
      },
    },
  };

  // 4. 키보드 타자 느낌의 글자 애니메이션
  const typewriterLetter = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.05,
        ease: "easeOut",
      },
    },
  };

  // ======================================================

  return (
    <section className="w-full flex justify-center py-80 overflow-hidden">
      <div className="w-full max-w-[1200px] px-6 flex items-center gap-16">
        {/* ========== 왼쪽 카드뉴스 (기존 동일) ========== */}
        <motion.div
          className="w-[470px] bg-white rounded-[32px] shadow-[0_16px_40px_rgba(0,0,0,0.06)] p-8"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 80, damping: 14 }}
          whileHover={{ y: -10, transition: { duration: 0.3 } }}
        >
          <p className="text-[18px] font-bold text-[#1273FF] mb-4">
            1. 원의 중심
          </p>
          <div className="w-full h-[450px] rounded-[28px] overflow-hidden mb-4 bg-[#f5f7ff] flex items-center justify-center relative group">
            {/* 중심점 파장 효과 */}
            <motion.div
              className="absolute w-4 h-4 bg-[#1273FF] rounded-full opacity-50 z-0"
              style={{ top: "50%", left: "50%", x: "-50%", y: "-50%" }}
              animate={{ scale: [1, 3], opacity: [0.5, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
            />
            <img
              src="/home_circle.png"
              alt="원의 중심을 나타내는 도형"
              className="w-full h-full object-cover relative z-10 transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <p className="text-[20px] leading-relaxed text-gray-700">
            원의 한가운데 있는 점을 '원의 중심'이라고 불러! 두 개의 지름이
            만나는 곳이 바로 원의 중심이란다. 그리고 이 원의 중심에서 원 위에
            있는 어떤 점까지의 길이는 모두 똑같아!
          </p>
        </motion.div>

        {/* ========== 오른쪽 텍스트 + 검색 ========== */}
        <motion.div
          className="flex-1"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-[60px] font-extrabold leading-snug mb-4 whitespace-pre-line text-[#1273FF]"
            variants={springVariant}
          >
            내용이 복잡해도
            <br />
            이해는 쉬워야 하니까
          </motion.h2>

          <motion.p
            className="text-[30px] text-[#4A7BFF] mb-8 text-center leading-relaxed"
            variants={springVariant}
          >
            생성형 AI가 내용을 카드뉴스로
            <br />
            정리해 쉽게 이해할 수 있도록 도와줘요.
          </motion.p>

          {/* ========== 검색 바 (타이핑 효과 적용) ========== */}
          <motion.div
            className="w-full max-w-[600px] flex items-center bg-white rounded-full border-4 border-[#2F7DFF] px-6 py-4 cursor-pointer"
            variants={springVariant}
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 10px 20px rgba(47, 125, 255, 0.3)",
              borderColor: "#1273FF",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="/clip.png" alt="" className="w-7 h-7 mr-3" />

            {/* ✅ 타이핑 효과가 적용된 텍스트 영역 */}
            <motion.span
              className="flex-1 text-[23px] text-gray-500 select-none flex items-center"
              variants={typewriterContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* 텍스트를 한 글자씩 쪼개서 매핑 */}
              {typingText.split("").map((char, index) => (
                <motion.span key={index} variants={typewriterLetter}>
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}

              {/* ✅ 타이핑 완료 후 계속 깜빡이는 최종 커서 */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  delay: typingText.length * 0.08 + 0.8,
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="inline-block w-[2px] h-6 bg-[#1273FF] ml-1"
              />
            </motion.span>

            <img src="/mic.png" alt="음성입력" className="w-5 h-7 mx-3" />
            <motion.img
              src="/search.png"
              alt="검색"
              className="w-7 h-7"
              whileHover={{
                rotate: [0, -20, 20, -10, 10, 0],
                transition: { duration: 0.5 },
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
