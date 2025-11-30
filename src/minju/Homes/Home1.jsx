import React from "react";

export default function Home1() {
  return (
    <section className="w-full flex justify-center py-20">
      <div className="max-w-4xl px-6">
        <p className="text-[30px] leading-relaxed mb-6 text-left text-[#60A5FA]">
          인터넷에 정보는 많아도, 정확한 건 많지 않아요.
          <br />
          검색하면 뭐든 나오지만, 믿어도 되는지는 알기 어려워요.
        </p>

        <h2 className="font-extrabold text-[70px] leading-tight text-center text-[#027FFF]">
          두두는 교과서 기반 학습 AI로 교과서에 나온 사실만 알려줘요
        </h2>
      </div>
    </section>
  );
}
