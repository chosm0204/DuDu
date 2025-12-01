import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home3() {
  // 탭 상태 관리
  const [activeTab, setActiveTab] = useState("속담");

  // 각 탭의 데이터
  const quizData = {
    속담: {
      image: "/quiz_tiger.png",
      question: "이 그림이 뜻하는 속담은 무엇일까요?",
      placeholder: "정답을 말하거나 입력해 보세요!",
      type: "input",
    },
    사자성어: {
      image: "idiom_main.jpg",
      question: (
        <>
          <span className="text-[32px] text-[#1273FF] mb-2 block text-center">
            자업OO
          </span>
          빈 칸에 들어갈 말을 적어보세요
        </>
      ),
      placeholder: "정답을 말하거나 입력해 보세요!",
      type: "input",
    },

    맞춤법: {
      image: "/spelling_win.jpg",
      question: "우승은 [\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0] 당상이다",
      options: ["따 놓은", "따논"],
      type: "choice",
    },
  };

  const currentQuiz = quizData[activeTab];

  // ================= 애니메이션 설정 구간 =================

  const titleVariant = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const tabContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const tabItem = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
  };

  // 컨텐츠 전환 애니메이션
  const contentVariant = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
  };

  const descriptionVariant = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 80, damping: 15, delay: 0.8 },
    },
  };

  // ======================================================

  return (
    <section className="w-full flex justify-center py-60">
      <div className="w-full max-w-[1200px] px-6 flex flex-col">
        {/* ========== 큰 제목 ========== */}
        <motion.div
          className="mb-10 max-w-[900px]"
          variants={titleVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-[60px] font-extrabold text-[#1273FF] leading-snug whitespace-pre-line">
            그림으로 푸는
            {"\n"}
            속담·사자성어·맞춤법 퀴즈
          </h2>
        </motion.div>

        <div className="flex items-center justify-start gap-16">
          {/* ========== 퀴즈 카드 ========== */}
          <motion.div
            className="w-[750px] bg-white rounded-[40px] shadow-[0_16px_40px_rgba(0,0,0,0.06)] pt-6 pb-9"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 80, damping: 14 }}
            whileHover={{
              y: -8,
              boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
              transition: { duration: 0.3 },
            }}
          >
            {/* 탭 메뉴 */}
            <motion.div
              className="flex justify-center gap-16 border-b border-[#E5EAF2] pb-3 text-[20px] relative"
              variants={tabContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {["속담", "사자성어", "맞춤법"].map((tab) => (
                <motion.button
                  key={tab}
                  className={`pb-1 cursor-pointer transition-colors relative ${
                    activeTab === tab ? "font-bold" : "font-semibold"
                  }`}
                  style={{
                    color: activeTab === tab ? "#1273FF" : "#9CA3AF",
                  }}
                  variants={tabItem}
                  onClick={() => setActiveTab(tab)}
                  whileHover={{ scale: 1.05, color: "#1273FF" }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      className="absolute bottom-[-13px] left-0 right-0 h-1 bg-[#2F7DFF]"
                      layoutId="activeTab"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>

            {/* 퀴즈 내용 - AnimatePresence로 전환 애니메이션 */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className="flex flex-col items-center mt-8 px-10"
                variants={contentVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* 이미지 */}
                <motion.div
                  className="w-[220px] h-[220px] rounded-[48px] overflow-hidden mb-6 relative group"
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={currentQuiz.image}
                    alt={`${activeTab} 그림 퀴즈`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>

                {/* 질문 텍스트 - 고정 높이로 통일 */}
                <div className="text-[20px] font-semibold mb-6 h-[100px] flex flex-col items-center justify-center">
                  {currentQuiz.question}
                </div>

                {/* 입력 타입에 따른 UI */}
                {currentQuiz.type === "input" ? (
                  // 입력형 (속담, 사자성어)
                  <motion.div
                    className="w-full h-[60px] flex items-center bg-white rounded-full border-4 border-[#2F7DFF] px-6 cursor-pointer"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0px 8px 16px rgba(47, 125, 255, 0.2)",
                      borderColor: "#1273FF",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex-1 text-gray-400 text-[18px]">
                      {currentQuiz.placeholder}
                    </span>
                    <motion.img
                      src="/mic.png"
                      alt="음성 입력"
                      className="w-5 h-7 mx-3"
                      whileHover={{ scale: 1.2 }}
                    />
                    <motion.img
                      src="/search.png"
                      alt="검색"
                      className="w-7 h-7"
                      whileHover={{
                        rotate: 360,
                        transition: { duration: 0.5 },
                      }}
                    />
                  </motion.div>
                ) : (
                  // 선택형 (맞춤법)
                  <div className="w-[400px] h-[60px] flex gap-4 justify-center items-center">
                    {currentQuiz.options.map((option, index) => (
                      <motion.button
                        key={index}
                        className="flex-1 bg-white border-2 border-[#2F7DFF] rounded-[24px] py-3 px-6 text-[20px] font-semibold text-gray-700"
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "#EEF5FF",
                          borderColor: "#1273FF",
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* ========== 오른쪽 설명 ========== */}
          <motion.div
            className="w-[300px]"
            variants={descriptionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <p className="text-[27px] text-[#4A7BFF] leading-relaxed font-semibold">
              생성형 AI가
              <br />
              그림 퀴즈를 만들어주면,
              <br />
              아이들은 보고 맞춰보며
              <br />더 재미있게 학습해요.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
