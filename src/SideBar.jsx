// src/SideBar.jsx
import React from "react";

export default function SideBar({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* 배경(블러) - Tailwind 애니메이션 */}
      <div
        className="fixed inset-0 bg-black/30 z-40 animate-[fadeIn_0.2s_ease-out]"
        onClick={onClose}
        aria-label="사이드바 닫기"
      />

      {/* 사이드바 - Tailwind 애니메이션 */}
      <aside className="fixed top-0 right-0 h-full w-[320px] bg-white z-50 shadow-2xl flex flex-col animate-[slideIn_0.3s_ease-out]">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="사이드바 닫기"
        >
          ✕
        </button>

        {/* 프로필 영역 */}
        <div className="flex flex-col items-center pt-10 pb-6 border-b border-gray-100">
          <div className="w-16 h-16 rounded-full bg-[#2F7DFF] flex items-center justify-center text-white text-2xl mb-3">
            😊
          </div>
          <p className="text-[20px] text-gray-500">5학년 2학기</p>
          <p className="text-[25px] font-bold mt-1 leading-tight">손채영</p>
          <p className="text-[20px] text-gray-700 leading-tight mb-2">학생</p>
          <button className="mt-4 px-6 py-1.5 rounded-full bg-[#2F7DFF] text-white text-[15px] hover:bg-[#2567E0] transition-colors">
            정보 수정
          </button>
        </div>

        {/* 메뉴 영역 */}
        <div className="flex-1 overflow-y-auto px-10 py-6 text-left">
          {/* 알림마당 */}
          <div className="mb-8">
            <p className="text-[#2F7DFF] font-bold text-[22px] mb-4">
              알림마당
            </p>
            <ul className="space-y-3 text-[20px] text-gray-900 leading-tight">
              <li className="cursor-pointer hover:text-[#2F7DFF] transition-colors">
                시간표
              </li>
              <li className="cursor-pointer hover:text-[#2F7DFF] transition-colors">
                학사 일정
              </li>
              <li className="cursor-pointer hover:text-[#2F7DFF] transition-colors">
                가정통신문
              </li>
              <li className="cursor-pointer hover:text-[#2F7DFF] transition-colors">
                급식 메뉴
              </li>
            </ul>
          </div>

          <div className="h-px bg-gray-200 my-6" />

          {/* 학습마당 */}
          <div className="mb-8">
            <p className="text-[#2F7DFF] font-bold text-[22px] mb-4">
              학습마당
            </p>
            <ul className="space-y-3 text-[20px] text-gray-900 leading-tight">
              <li className="cursor-pointer hover:text-[#2F7DFF] transition-colors">
                알림장
              </li>
              <li className="cursor-pointer hover:text-[#2F7DFF] transition-colors">
                독서록
              </li>
              <li className="cursor-pointer hover:text-[#2F7DFF] transition-colors">
                진로
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="border-t border-[#E5EAF2] px-6 py-4 flex gap-4 justify-center">
          <button className="min-w-[120px] h-[40px] rounded-full bg-[#2F7DFF] text-white text-sm shadow-[0_4px_10px_rgba(47,125,255,0.25)] hover:bg-[#2567E0] transition-colors">
            고객센터
          </button>
          <button className="min-w-[120px] h-[40px] rounded-full bg-[#2F7DFF] text-white text-sm shadow-[0_4px_10px_rgba(47,125,255,0.25)] hover:bg-[#2567E0] transition-colors">
            회원탈퇴
          </button>
        </div>

        {/* 🔹 애니메이션 CSS - 컴포넌트 내부에 정의 */}
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes slideIn {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(0);
            }
          }
        `}</style>
      </aside>
    </>
  );
}
