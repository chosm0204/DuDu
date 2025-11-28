import React from "react";

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
  return (
    <section className="w-full flex justify-center py-60">
      <div className="w-full max-w-[1200px] px-6 flex flex-col items-center">
        {/* ========== 큰 제목 ========== */}
        <h2 className="text-center text-[54px] font-extrabold leading-snug mb-10 whitespace-pre-line text-[#1273FF]">
          학습한 내용들을
          {"\n"}
          단원별로 착착 모아줘요
        </h2>

        {/* ========== 리포트 ========== */}
        <div className="w-[750px] bg-white rounded-[40px] shadow-[0_20px_40px_rgba(0,0,0,0.06)] px-12 py-12 flex flex-col items-center">
          <div className="flex gap-5 justify-center mb-10">
            {SUBJECTS.map(({ key, label, icon }) => {
              const isActive = key === "math";
              return (
                <div key={key}
                  className={`w-[90px] h-[90px] rounded-[22px] flex flex-col items-center justify-center text-[14px] font-semibold
                    shadow-[0_10px_20px_rgba(0,0,0,0.08)] transition-all duration-200
                    ${isActive ? "bg-[#2F7DFF] text-white" : "bg-white text-gray-800"}
                  `}
                >
                  <img src={icon} alt="" className="w-8 h-8 mb-2" />
                  <span>{label}</span>
                </div>
              );
            })}
          </div>

          <div className="w-full flex gap-10 pt-4">
            <div className="w-1/2">
              <p className="font-extrabold text-[18px] text-gray-800 mb-4">
                단원
              </p>
              <div className="space-y-3">
                {MATH_UNITS.map((unit, idx) => {
                  const active = idx === 0;
                  return (
                    <div
                      key={unit}
                      className={` w-full px-6 py-3 rounded-full text-[15px] shadow-[0_4px_10px_rgba(0,0,0,0.05)]
                        ${
                          active
                            ? "bg-[#DCEBFF] text-[#1D4ED8] font-semibold"
                            : "bg-white text-gray-700"
                        }
                      `}
                    >
                      {unit}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="w-px h-[120px] bg-[#D5DEEE] mb-1" />
              <div className="w-[4px] h-[40px] rounded-full bg-[#AEB9D7]" />
            </div>

            <div className="w-1/2">
              <p className="font-extrabold text-[18px] text-gray-800 mb-4">
                모아보기
              </p>
              <div className="flex gap-6">
                <div className="w-[160px] h-[170px] bg-white rounded-[26px] shadow-[0_10px_24px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center text-[17px] font-extrabold text-[#1273FF]">
                  <img src="/cardnews.png" alt="카드뉴스" className="w-[60px] h-[60px] mb-3"/>
                  카드뉴스
                </div>

                <div className="w-[160px] h-[170px] bg-white rounded-[26px] shadow-[0_10px_24px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center text-[17px] font-extrabold text-[#F4B100]">
                  <img src="/quiz.png" alt="퀴즈" className="w-[50px] h-[56px] mb-3"/>
                  퀴즈
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========== 아래 설명 ========== */}
        <p className="mt-8 text-center text-[27px] leading-relaxed text-[#3B82F6]">
          학습했던 내용들이 과목·단원 기준으로
          <br />
          자동 정리되어 복습과 확인이 쉬워져요
        </p>
      </div>
    </section>
  );
}
