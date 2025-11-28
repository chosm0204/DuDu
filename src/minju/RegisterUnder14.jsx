import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const GRADE_OPTIONS = [
  "1학년 1학기",
  "1학년 2학기",
  "2학년 1학기",
  "2학년 2학기",
  "3학년 1학기",
  "3학년 2학기",
  "4학년 1학기",
  "4학년 2학기",
  "5학년 1학기",
  "5학년 2학기",
  "6학년 1학기",
  "6학년 2학기",
];

export default function RegisterUnder14() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    grade: "",
    school: "",
    password: "",
    passwordConfirm: "",
  });

  const [isGradeOpen, setIsGradeOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectGrade = (grade) => {
    setForm((prev) => ({ ...prev, grade }));
    setIsGradeOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 3단계로 이동 임시 !!!!!!!!!!!!!!!
    navigate("/signup/complete");
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#E6F2FF] to-white flex flex-col items-center pt-10">
      {/* ========== 헤더 ========== */}
      <header className="w-full flex items-center px-10 mb-6">
        <Link to="/">
          <img src="/logo.png" alt="두두 로고" className="w-12 h-12" />
        </Link>
      </header>

      {/* ========== 카드 영역 ========== */}
      <div className="w-[90%] max-w-[900px] bg-white rounded-3xl shadow-md p-10 pt-12 min-h-[500px]">
        {/* 단계 표시 */}
        <div className="flex justify-center gap-14 mb-6">
          <div className="text-gray-400 font-semibold text-[23px]">
            1. 회원 유형 선택
          </div>
          <div className="text-black font-semibold text-[23px]">
            2. 회원 정보 입력
          </div>
          <div className="text-gray-400 font-semibold text-[23px]">
            3. 회원 가입 완료
          </div>
        </div>

        <div className="w-full h-px bg-[#F0F2F7] mb-8" />

        {/* ========== 입력 폼 ========== */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 이름 */}
          <div className="flex items-center gap-6">
            <label className="w-24 text-right text-gray-700 text-[17px]">
              이름
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="flex-1 h-11 px-4 rounded-full border border-[#E5EDF9] bg-[#F8FAFF] outline-none focus:ring-2 focus:ring-[#2F7DFF]"
            />
          </div>

          {/* 이메일 */}
          <div className="flex items-center gap-6">
            <label className="w-24 text-right text-gray-700 text-[17px]">
              이메일
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="flex-1 h-11 px-4 rounded-full border border-[#E5EDF9] bg-[#F8FAFF] outline-none focus:ring-2 focus:ring-[#2F7DFF]"
            />
          </div>

          {/* 학년 커스텀 드롭다운 */}
          <div className="flex items-center gap-6">
            <label className="w-24 text-right text-gray-700 text-[17px]">
              학년
            </label>
            <div className="relative flex-1">
              <button
                type="button"
                onClick={() => setIsGradeOpen((prev) => !prev)}
                className="w-full h-11 px-4 rounded-full border border-[#E5EDF9] bg-[#F8FAFF] outline-none flex items-center justify-between focus:ring-2 focus:ring-[#2F7DFF]"
              >
                <span
                  className={
                    form.grade
                      ? "text-[14px] text-gray-800"
                      : "text-[14px] text-gray-400"
                  }
                >
                  {form.grade || "학년을 선택하세요"}
                </span>
                <span className="ml-2 text-gray-400 text-[12px]">▼</span>
              </button>

              {isGradeOpen && (
                <ul className="absolute z-10 mt-2 w-full bg-white rounded-xl shadow-lg border border-[#E5EDF9] max-h-60 overflow-y-auto">
                  {GRADE_OPTIONS.map((option) => (
                    <li key={option}>
                      <button
                        type="button"
                        onClick={() => handleSelectGrade(option)}
                        className={`w-full px-4 py-2 flex items-center justify-between text-left text-[14px] ${
                          form.grade === option
                            ? "text-black"
                            : "text-gray-600"
                        } hover:bg-[#E8F2FF] hover:text-[#2F7DFF]`}
                      >
                        <span>{option}</span>
                        {form.grade === option && (
                          <span className="text-[#2F7DFF] text-[13px]">
                            ✓
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* 초등학교 */}
          <div className="flex items-center gap-6">
            <label className="w-24 text-right text-gray-700 text-[17px]">
              초등학교
            </label>
            <div className="flex flex-1 gap-3">
              <input
                type="text"
                name="school"
                value={form.school}
                onChange={handleChange}
                className="flex-1 h-11 px-4 rounded-full border border-[#E5EDF9] bg-[#F8FAFF] outline-none focus:ring-2 focus:ring-[#2F7DFF]"
              />
              <button
                type="button"
                className="px-4 h-11 rounded-full bg-[#2F7DFF] text-white text-[15px] font-medium"
              >
                초등학교 검색
              </button>
            </div>
          </div>

          {/* 비밀번호 */}
          <div className="flex items-center gap-6">
            <label className="w-24 text-right text-gray-700 text-[17px]">
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="flex-1 h-11 px-4 rounded-full border border-[#E5EDF9] bg-[#F8FAFF] outline-none focus:ring-2 focus:ring-[#2F7DFF]"
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className="flex items-center gap-6">
            <label className="w-24 text-right text-gray-700 text-[17px]">
              비밀번호 확인
            </label>
            <input
              type="password"
              name="passwordConfirm"
              value={form.passwordConfirm}
              onChange={handleChange}
              className="flex-1 h-11 px-4 rounded-full border border-[#E5EDF9] bg-[#F8FAFF] outline-none focus:ring-2 focus:ring-[#2F7DFF]"
            />
          </div>

          {/* ========== 회원가입 버튼 ========== */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full h-[56px] rounded-full bg-[#2F7DFF] hover:bg-[#1F5EDB] text-white font-semibold text-[18px] transition"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}