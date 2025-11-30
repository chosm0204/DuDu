import os
import google.generativeai as genai
from dotenv import load_dotenv

# 1. .env 로드
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))
api_key = os.environ.get("GEMINI_API_KEY")

# 2. 구글 연결
genai.configure(api_key=api_key)

print("------------------------------------------------")
print("📋 내 API 키로 사용 가능한 모델 목록:")
print("------------------------------------------------")

try:
    count = 0
    # 사용 가능한 모든 모델 조회
    for m in genai.list_models():
        # 'generateContent' 기능(채팅)이 되는 모델만 출력
        if 'generateContent' in m.supported_generation_methods:
            print(f"- {m.name}")
            count += 1
            
    if count == 0:
        print("🚨 사용 가능한 모델이 하나도 없습니다! API 키 권한을 확인하세요.")
        
except Exception as e:
    print(f"🚨 에러 발생: {e}")

print("------------------------------------------------")