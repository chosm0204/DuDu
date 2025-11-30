# debug_ai.py
import os
import google.generativeai as genai
from dotenv import load_dotenv

# 1. .env 파일 강제 로드
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
env_path = os.path.join(BASE_DIR, ".env")
load_dotenv(env_path)

# 2. 키 확인
api_key = os.environ.get("GEMINI_API_KEY")
print("------------------------------------------------")
if not api_key:
    print("🚨 [실패] .env 파일에서 GEMINI_API_KEY를 못 찾았습니다.")
    print(f"📂 파일 위치 확인: {env_path}")
    exit()
else:
    print(f"🔑 키 로드 성공: {api_key[:5]}********")

# 3. 구글 연결 시도
try:
    genai.configure(api_key=api_key)
    print("✅ 라이브러리 설정 완료")
except Exception as e:
    print(f"🚨 [치명적 에러] 라이브러리 설정 실패: {e}")
    exit()

# 4. 모델에게 말 걸기 (여기가 핵심!)
print("📡 Gemini 1.5 Flash에게 접속 시도 중...")
try:
    # 표준 라이브러리 방식
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content("안녕? 넌 누구니? 한 문장으로 대답해.")
    
    print("------------------------------------------------")
    print("🎉 [성공] AI 응답 도착:")
    print(f"🤖 답변: {response.text}")
    print("------------------------------------------------")
    print("결론: API 키와 인터넷은 정상입니다. app.py 코드만 다시 보면 됩니다.")

except Exception as e:
    print("------------------------------------------------")
    print("🚨 [실패] AI가 응답하지 않습니다!")
    print(f"에러 메시지: {e}")
    print("------------------------------------------------")