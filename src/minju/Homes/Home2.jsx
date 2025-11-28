import React from "react";

const circleImg = "/home_circle.png";
const clipIcon = "/clip.png";
const micIcon = "/mic.png";

export default function Home2() {
  return (
    <section className="w-full flex justify-center py-80">
      <div className="w-full max-w-[1200px] px-6 flex items-center gap-16">

        {/* ========== 왼쪽 카드뉴스 ========== */}
        <div className="w-[470px] bg-white rounded-[32px] shadow-[0_16px_40px_rgba(0,0,0,0.06)] p-8">
          <p className="text-[18px] font-bold text-[#1273FF] mb-4">
            1. 원의 중심
          </p>

          <div className="w-full h-[450px] rounded-[28px] overflow-hidden mb-4 bg-[#f5f7ff] flex items-center justify-center">
            <img src={circleImg} className="w-full h-full object-cover" />
          </div>

          <p className="text-[20px] leading-relaxed text-gray-700">
            원의 한가운데 있는 점을 ‘원의 중심’이라고 불러! 두 개의 지름이 만나는 곳이 바로
            원의 중심이란다. 그리고 이 원의 중심에서 원 위에 있는 어떤 점까지의 길이는 모두 똑같아!
          </p>
        </div>

        {/* ========== 오른쪽 텍스트 + 검색 ========== */}
        <div className="flex-1">
          <h2 className="text-[70px] font-extrabold leading-snug mb-4 whitespace-pre-line text-[#1273FF]">
            내용이 복잡해도,
            {"\n"}
            이해는 쉬워야 하니까
          </h2>

          <p className="text-[30px] text-[#4A7BFF] mb-8 text-center leading-relaxed">
            생성형 AI가 내용을 카드뉴스로
            <br />
            정리해 쉽게 이해할 수 있도록 도와줘요.
          </p>

          {/* ========== 검색 바 ========== */}
          <div className="w-full max-w-[600px] flex items-center bg-white rounded-full border-4 border-[#2F7DFF] px-6 py-4">
            <img src={clipIcon} className="w-7 h-7 mr-3" />
            <span className="flex-1 text-[23px] text-gray-500">원</span>
            <img src={micIcon} className="w-5 h-7 mx-3" />
            <img src="/search.png" className="w-7 h-7" />
          </div>
        </div>
      </div>
    </section>
  );
}
