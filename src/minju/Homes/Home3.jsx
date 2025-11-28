import React from "react";

const tigerImg = "/quiz_tiger.png";
const micIcon = "/mic.png";

export default function Home3() {
  return (
    <section className="w-full flex justify-center py-60">
      <div className="w-full max-w-[1200px] px-6 flex flex-col">
        {/* ========== 큰 제목 ========== */}
        <div className="mb-10 max-w-[900px]">
          <h2 className="text-[60px] font-extrabold text-[#1273FF] leading-snug whitespace-pre-line">
            그림으로 푸는
            {"\n"}
            속담·사자성어·맞춤법 퀴즈
          </h2>
        </div>

        <div className="flex items-center justify-start gap-16">
          {/* ========== 퀴즈 카드 ========== */}
          <div className="w-[750px] bg-white rounded-[40px] shadow-[0_16px_40px_rgba(0,0,0,0.06)] pt-6 pb-9">

            <div className="flex justify-center gap-16 border-b border-[#E5EAF2] pb-3 text-[20px]">
              <span className="font-bold text-black border-b-4 border-[#2F7DFF] pb-1">
                속담
              </span>
              <span className="text-gray-400 font-semibold">사자성어</span>
              <span className="text-gray-400 font-semibold">맞춤법</span>
            </div>

            <div className="flex flex-col items-center mt-8 px-10">
              <div className="w-[220px] h-[220px] rounded-[48px] overflow-hidden mb-6">
                <img
                  src={tigerImg}
                  alt="호랑이 그림 퀴즈"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-[20px] font-semibold mb-6">
                이 그림이 뜻하는 속담은 무엇일까요?
              </p>

              <div className="w-full flex items-center bg-white rounded-full border-4 border-[#2F7DFF] px-6 py-3">
                <span className="flex-1 text-gray-400 text-[18px]">
                  정답을 말하거나 입력해 보세요!
                </span>
                <img src={micIcon} alt="음성 입력" className="w-5 h-7 mx-3" />
                <img src="/search.png" alt="검색" className="w-7 h-7" />
              </div>
            </div>
          </div>

          {/* ========== 오른쪽 설명 ========== */}
          <div className="w-[300px]">
            <p className="text-[28px] text-[#4A7BFF] leading-relaxed">
              생성형 AI가
              <br />
              그림 퀴즈를 만들어주면,
              <br />
              아이들은 보고 맞춰보며
              <br />
              더 재미있게 학습해요.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
