import React from "react";

export default function Home6() {
  const benefits = [
    "두두노트\n생성 무제한",
    "더 빠르고, 더 높은\n이미지 생성 업그레이드",
    "모든 과목\n전 범위 지원",
  ];

  return (
    <section className="w-full flex justify-center py-60">
      <div className="w-full max-w-[1200px] px-6 flex flex-col items-center">
        {/* ========== 큰 제목 ========== */}
        <h2 className="text-[70px] font-extrabold text-[#1273FF] leading-snug whitespace-pre-line mb-6 text-center">
          두두와 함께,
          {"\n"}
          더 똑똑하게.
        </h2>

        {/* ========== 부제목 ========== */}
        <p className="text-[50px] text-[#4A7BFF] mb-12 leading-relaxed text-center">
          더 깊고, 더 정확하게 경험할 수 있어요
        </p>

        {/* ========== 박스 3개 ========== */}
        <div className="flex flex-wrap justify-center gap-6 mb-14">
          {benefits.map((text) => (
            <div
              key={text}
              className="px-12 py-5 rounded-[24px] bg-white shadow-[0_12px_24px_rgba(0,0,0,0.06)] border-2 border-[#60A5FA] flex items-center justify-center
                text-center text-[23px] font-semibold text-[#2F2F2F] whitespace-pre-line">
              {text}
            </div>
          ))}
        </div>

        {/* ========== 버튼 ========== */}
        <div className="flex gap-10 mt-4 flex-wrap justify-center">
          <button className="w-[260px] h-[70px] rounded-full bg-[#2F7DFF] text-white text-[25px] font-bold shadow-[0_12px_24px_rgba(47,125,255,0.4)]">
            지금 구독하기
          </button>

          <button className="w-[260px] h-[70px] rounded-full border-[3px] border-[#2F7DFF] text-[#2F7DFF] text-[25px] font-bold bg-white">
            무료로 체험하기 →
          </button>
        </div>
      </div>
    </section>
  );
}
