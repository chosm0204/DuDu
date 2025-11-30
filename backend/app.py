from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import glob
import json
import urllib.parse
from dotenv import load_dotenv 
import random
import time
import shutil
import uuid
import re  # ✅ 정규표현식 모듈 추가

# RAG 관련 라이브러리
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter

import google.generativeai as genai
from google.generativeai.types import HarmCategory, HarmBlockThreshold

# =========================================================
# 🛠️ .env 파일 강제 로드
# =========================================================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ENV_PATH = os.path.join(BASE_DIR, ".env")

if os.path.exists(ENV_PATH):
    load_dotenv(ENV_PATH)
    print(f"✅ .env 로드됨: {ENV_PATH}")
else:
    print(f"🚨 .env 없음: {ENV_PATH}")

# =========================================================

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "super-secret-key")
CORS(app)

conversation_history = {}

# --- RAG 설정 ---
vector_db = None 
DATA_FOLDER = os.path.join(BASE_DIR, "data")
DB_PATH = os.path.join(BASE_DIR, "chroma_db")
DB_INFO_FILE = os.path.join(DB_PATH, "db_info.json")

def get_latest_file_time():
    text_files = glob.glob(os.path.join(DATA_FOLDER, "*.txt"))
    if not text_files: return 0
    return max(os.path.getmtime(f) for f in text_files)

def setup_rag_pipeline():
    global vector_db
    print("🔍 RAG 점검 중...")

    if not os.path.exists(DATA_FOLDER):
        os.makedirs(DATA_FOLDER)
        print(f"📁 '{DATA_FOLDER}' 생성됨. .txt 파일을 넣어주세요.")

    latest_mtime = get_latest_file_time()
    need_rebuild = True
    
    if os.path.exists(DB_PATH) and os.path.exists(DB_INFO_FILE):
        try:
            with open(DB_INFO_FILE, "r") as f:
                info = json.load(f)
                if latest_mtime <= info.get("build_time", 0) and latest_mtime > 0:
                    need_rebuild = False
        except: pass

    model_name = "jhgan/ko-sroberta-multitask" 
    embedding_model = SentenceTransformerEmbeddings(model_name=model_name)

    if not need_rebuild and os.path.exists(DB_PATH):
        print(f"⚡ 기존 DB 로드 완료")
        vector_db = Chroma(persist_directory=DB_PATH, embedding_function=embedding_model)
        return

    print("🔄 DB 재학습 시작...")
    if os.path.exists(DB_PATH):
        try: shutil.rmtree(DB_PATH)
        except: pass
        
    text_files = glob.glob(os.path.join(DATA_FOLDER, "*.txt"))
    documents = []
    if text_files:
        for file_path in text_files:
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    documents.append(f.read())
            except: pass

    if not documents:
        print("⚠️ 데이터 없음 (빈 DB)")
        return

    full_text = "\n\n".join(documents)
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    text_chunks = text_splitter.split_text(full_text)
    
    vector_db = Chroma.from_texts(texts=text_chunks, embedding=embedding_model, persist_directory=DB_PATH)
    
    if not os.path.exists(DB_PATH): os.makedirs(DB_PATH)
    with open(DB_INFO_FILE, "w") as f: json.dump({"build_time": time.time()}, f)
    print("🎉 DB 업데이트 완료!")

# =========================================================
# 🛡️ 1차 방어: 금지어 리스트
# =========================================================
BANNED_WORDS = ["바보", "멍청이", "씨발", "개새끼", "병신", "죽어", "미친", "존나", "졸라", "야동", "19금", "꺼져", "닥쳐"] 

def check_profanity(text):
    for word in BANNED_WORDS:
        if word in text:
            return True
    return False

# =========================================================
# 🎨 이미지 생성 설정 (글자/상표 강력 차단)
# 🔥 [수정] Stable Diffusion XL 모델 프롬프트로 전환 및 텍스트 금지 강화
# =========================================================
# 1. 스타일: 매끈한 재질, 상표 없음, 사물만, 깨끗한 배경
STYLE_DESC = "cute 3D isometric icon, toy-like texture, unbranded, object only, vibrant colors, soft lighting, minimalism, white background, clean image, no packaging, simplified surfaces, NO TEXT"

# 2. 부정 프롬프트: 글자, 상표, 로고 절대 금지
# 🔥 [수정] SDXL에서 효과적인 텍스트 금지 키워드와 매우 높은 가중치 사용 (2.9)
NEGATIVE_DESC = "(watermark:2.9), (text:2.9), (writing:2.9), (letters:2.9), (alphabet:2.9), (numbers:2.9), (typography:2.9), signature, logo, brand name, trademark, label, caption, blurry, distorted, human, face, texture with text, pattern with text, background with text"

# --- API ---

@app.route("/")
def home():
    return "DuDu Backend (Dictionary & Safety Features) Running!"

@app.route("/search", methods=["GET"])
def handle_search():
    query = request.args.get("query")
    session_id = request.args.get("session_id")
    
    if not query: return jsonify({"error": "검색어 없음"}), 400
    if not session_id: session_id = str(uuid.uuid4())
    if session_id not in conversation_history: conversation_history[session_id] = []

    # 1. [1차 방어] 욕설 감지 -> 이미지 생성 안 함 ("")
    if check_profanity(query):
        print(f"🚨 욕설 감지됨: {query}")
        return jsonify({
            "answer": [{
                "title": "두두가 속상해요 😢", 
                "content": "친구야, 그런 말을 들으니 마음이 아파요.\n우리 서로에게 힘이 되는 고운 말만 쓰기로 해요! 🤙", 
                "image_url": "", 
                "image_keyword": "warning"
            }],
            "dictionary": [],
            "follow_up_questions": [],
            "summary": "욕설 경고"
        })

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key: return jsonify({"error": "API Key 오류"}), 500
    
    genai.configure(api_key=api_key)

    # 2. RAG 검색 (디버깅용 출력 포함)
    print(f"\n🔍 [RAG 검색 시작] 질문: '{query}'")
    context = ""
    if vector_db:
        try:
            docs = vector_db.similarity_search(query, k=3)
            if docs: 
                print(f"✅ 참고 자료 {len(docs)}개 발견!")
                for i, doc in enumerate(docs):
                    print(f"   📄 [자료 {i+1}] {doc.page_content[:50]}...")
                context = "\n\n".join([d.page_content for d in docs])
            else:
                print("⚠️ 검색된 자료가 없습니다.")
        except: pass

    history_text = ""
    for item in conversation_history.get(session_id, [])[-3:]:
        history_text += f"학생: {item['question']}\n두두: {item['summary']}\n"

    # 3. 프롬프트 (단어장 기능 + 3단 구성 + 안전 규칙 + 글자 금지)
    prompt = f"""
    당신은 초등학생(8~13세)의 눈높이에 맞춰 설명해 주는 친절한 AI 선생님 '두두'입니다.
    
    [이전 대화]
    {history_text}
    
    [질문]: "{query}"
    [참고 자료]: {context if context else "없음"}

    [규칙]
    1. **안전 제일:** 폭력, 선정, 혐오 표현에는 절대 대답하지 마세요.
    2. **절대 규칙:** 오직 [참고 자료]에 있는 내용으로만 답변하세요.
    3. **모름 처리:** 자료에 없으면 솔직하게 모른다고 하고, **image_keyword는 'UNKNOWN'**으로 적으세요.
    4. **이미지 키워드:** 설명하는 사물을 **'브랜드 없는 일반적인(Generic) 영어 단어'**로 묘사하세요. **절대 특수문자나 괄호를 사용하지 마세요.**
    5. **꼬리 질문 규칙:** `follow_up_questions`은 반드시 제공된 [참고 자료]의 내용을 바탕으로 답변할 수 있는 질문이어야 합니다. 자료에 없는 내용은 질문하지 마세요.
    6. **⭐ 꼬리 질문 생성 강화 (NEW):** `follow_up_questions`을 만들 때, [참고 자료] 내에 **직접적으로 언급된 핵심 주어(Subject)와 명사**를 사용하여 질문하세요. 이는 검색 정확도를 높여 답변 실패를 줄입니다.

    [카드 구성 규칙 - 반드시 지키세요!]
    1. **첫 번째 카드:** 질문에 대한 **'간단하고 명확한 핵심 답변'** (3문장 이내)
    2. **두 번째 카드:** 첫 번째 내용을 보충하는 **'자세한 설명이나 예시'**
    3. **세 번째 카드:** 이 주제와 연관된 **'다른 재미있는 주제 추천'** 또는 '흥미로운 사실'

    [★ 단어장 기능]
    답변 내용 중 초등학생이 어려워할 만한 단어(예: 공전, 밀도, 광합성 등)가 있다면,
    그 단어와 쉬운 뜻풀이를 `dictionary` 리스트에 담아주세요. (없으면 빈 리스트)

    [필수 형식: JSON]
    반드시 마크다운 없이 아래 JSON 포맷으로만 응답하세요.
    {{
        "cards": [
            {{ "title": "핵심 쏙쏙!", "content": "내용...", "image_keyword": "Generic object description 1 or UNKNOWN" }},
            {{ "title": "자세히 알아봐요!", "content": "내용...", "image_keyword": "Generic object description 2 or UNKNOWN" }},
            {{ "title": "이건 어때요?", "content": "내용...", "image_keyword": "Generic object description 3 or UNKNOWN" }}
        ],
        "dictionary": [
            {{ "word": "어려운단어1", "meaning": "쉬운 뜻풀이" }},
            {{ "word": "어려운단어2", "meaning": "쉬운 뜻풀이" }}
        ],
        "follow_up_questions": ["질문1", "질문2"],
        "summary": "요약"
    }}
    """
    
    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        
        # 🛡️ [3차 방어] 안전 필터
        safety_settings = {
            HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
            HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
            HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
            HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        }

        response = model.generate_content(prompt, safety_settings=safety_settings)
        
        # 안전 필터 차단 시 -> 이미지 없음
        if not response.parts:
            return jsonify({
                "answer": [{"title":"위험해요! 🛡️", "content":"친구야, 그 질문은 조금 위험한 것 같아. 다른 걸 물어봐 줄래?", "image_url":"", "image_keyword":"shield"}],
                "dictionary": [],
                "follow_up_questions": [],
                "summary": "유해 콘텐츠 차단"
            })

        text = response.text.replace("```json", "").replace("```", "")
        try:
            data = json.loads(text)
        except:
            data = {
                "cards": [{"title":"오류", "content":"잠시 문제가 생겼어요.", "image_keyword":"UNKNOWN"}], 
                "dictionary": [],
                "follow_up_questions":[], 
                "summary":"에러"
            }

        # 5. 이미지 생성 (상표/글자 제거 강화 + 모름 처리)
        processed_cards = []
        session_seed = random.randint(1000, 9999)

        cards = data.get("cards", [])
        if not cards: cards = [{"title":"알 수 없음", "content":"내용을 찾을 수 없어요.", "image_keyword":"UNKNOWN"}]

        for i, card in enumerate(cards):
            keyword = card.get("image_keyword", "UNKNOWN")
            
            # UNKNOWN 처리 -> 물음표 아이콘
            if keyword == "UNKNOWN" or "unknown" in keyword.lower():
                final_prompt = f"cute 3D isometric question mark, puzzle piece, curiosity, {STYLE_DESC}, {NEGATIVE_DESC}"
            else:
                # 'generic', 'unbranded' 강제 추가로 특정 상표 방지
                clean_keyword = f"generic {keyword}, single object, unbranded, no text"
                final_prompt = f"{clean_keyword}, {STYLE_DESC}, {NEGATIVE_DESC}"
            
            encoded_prompt = urllib.parse.quote_plus(final_prompt)
            
            # 🔥 [수정 없음] Stable Diffusion XL 모델을 사용하도록 요청
            card['image_url'] = f"https://image.pollinations.ai/prompt/{encoded_prompt}?model=stable-diffusion-xl-1024-v1-0&width=800&height=600&seed={session_seed + i}&nologo=true&negative_prompt={urllib.parse.quote_plus(NEGATIVE_DESC)}"
            processed_cards.append(card)

        conversation_history[session_id].append({"question": query, "summary": data.get("summary", "")})

        # ✅ dictionary 데이터도 함께 전송
        return jsonify({
            "answer": processed_cards, 
            "dictionary": data.get("dictionary", []), 
            "follow_up_questions": data.get("follow_up_questions", [])
        })

    except Exception as e:
        print(f"🚨 에러 발생: {str(e)}")
        return jsonify({
            "answer": [{"title":"오류", "content":"서버 오류가 발생했어요.", "image_url":""}],
            "dictionary": [],
            "follow_up_questions": []
        })

# =========================================================
# 💡 [수정] 추천 질문 생성 API (과목별 파일 필터링 추가)
# =========================================================
@app.route("/recommendations", methods=["GET"])
def get_recommendations():
    # 쿼리 파라미터로 과목 받기 (없으면 general)
    subject = request.args.get("subject")
    if not subject: subject = "general"
    
    print(f"💡 추천 질문 요청 받음 (과목: {subject})")
    
    # 과목별 캐시 파일 분리
    CACHE_FILE = os.path.join(BASE_DIR, f"recommendations_cache_{subject}.json")
    CACHE_DURATION = 3600  # 1시간
    
    default_questions = [
        "🦖 공룡은 왜 사라졌을까?", "🌈 무지개는 어떻게 생겨?", 
        "🤖 로봇도 감정이 있을까?", "🚀 우주는 얼마나 넓어?",
        "🦷 이빨은 왜 빠지는 거야?", "🐳 고래는 물고기가 아니야?"
    ]

    # 1. 캐시 확인
    if os.path.exists(CACHE_FILE):
        try:
            with open(CACHE_FILE, "r", encoding="utf-8") as f:
                file_mod_time = os.path.getmtime(CACHE_FILE)
                if time.time() - file_mod_time < CACHE_DURATION:
                    all_questions = json.load(f)
                    if all_questions and isinstance(all_questions, list):
                        selected_questions = random.sample(all_questions, min(len(all_questions), 6))
                        print(f"🚀 캐시된 데이터에서 랜덤 반환 완료 (과목: {subject})")
                        return jsonify(selected_questions)
        except Exception as e:
            print(f"⚠️ 캐시 읽기 실패: {e}")

    # 2. 캐시 없으면 생성 (Gemini 호출)
    try:
        # ✅ 과목 코드와 한글 키워드 매핑
        alternate_keywords = ["실과", "체육", "미술", "음악", "도덕"]
        
        keyword_map = {
            "math": ["수학"],
            "science": ["과학"],
            "society": ["사회"],
            "english": ["영어"],
            "korean": alternate_keywords,
            "history": alternate_keywords
        }
        
        target_keywords = keyword_map.get(subject)
        
        # 모든 텍스트 파일 가져오기
        all_text_files = glob.glob(os.path.join(DATA_FOLDER, "*.txt"))
        
        target_files = []
        
        if subject == "general" or not target_keywords:
            target_files = all_text_files
        else:
            for f in all_text_files:
                for kw in target_keywords:
                    if kw in os.path.basename(f):
                        target_files.append(f)
                        break
            
            if not target_files:
                print(f"⚠️ {subject} 관련 파일 없음. 전체 파일 중 랜덤 선택.")
                target_files = all_text_files

        if not target_files:
            return jsonify(default_questions)

        # 필터링된 파일들 중에서 랜덤 선택
        selected_file = random.choice(target_files)
        print(f"📖 읽고 있는 파일: {os.path.basename(selected_file)}")
        
        with open(selected_file, "r", encoding="utf-8") as f:
            full_content = f.read()

        # 🔥 [추가] 텍스트 정제 (한글, 영어, 숫자, 기본 구두점/공백만 유지)
        full_content = re.sub(r"[^가-힣a-zA-Z0-9\s\.\,\?\!]", " ", full_content)
        full_content = re.sub(r"\s+", " ", full_content).strip()  # 연속된 공백 정리
            
        # 내용이 3000자보다 길면 중간 어딘가를 랜덤으로 자름 (앞부분 목차 회피)
        if len(full_content) > 3000:
            start_index = random.randint(0, len(full_content) - 3000)
            content = full_content[start_index : start_index + 3000]
        else:
            content = full_content

        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key: return jsonify(default_questions)
            
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-2.5-flash')

        # 프롬프트 설정 (과목별로 다르게 지시)
        if subject in ["korean", "history"]:
            subject_instruction = "이 텍스트 내용 중에서 아이들이 가장 신기해할 만한 사실을 찾아서 질문으로 바꿔주세요."
        else:
            subject_instruction = f"질문은 **{subject}** 과목 학습 내용과 관련되도록 만들어주세요."
        
        # ⭐️ [핵심 수정] 질문 퀄리티를 높이는 강력한 프롬프트
        prompt = f"""
        당신은 아이들의 호기심을 자극하는 '퀴즈 탐험대장'입니다.
        아래 텍스트는 교과서의 일부입니다. 이 내용을 바탕으로 친구에게 낼 수 있는 **'재미있는 퀴즈 질문'** 20개를 만들어주세요.
        
        [텍스트 내용]
        {content}
        
        {subject_instruction}

        [★질문 생성 규칙★]
        1. **단순한 정의를 묻지 마세요.** (예: "광합성이란?" (X) -> "식물은 어떻게 햇빛을 먹을까? 🌿" (O))
        2. **'왜?' 또는 '어떻게?'로 시작하는 호기심 질문**을 우선하세요.
        3. 반드시 **위 [텍스트 내용] 안에 정답이 있는 내용**이어야 합니다. (없는 내용 지어내기 금지)
        4. 어른스러운 말투 대신, **초등학생이 친구에게 물어보는 듯한 말투**를 사용하세요.
        5. 질문 앞에는 관련된 **이모지**를 꼭 붙여주세요.
        6. **[중요] 질문은 띄어쓰기 포함 25자 이내로 만드세요.** ["🚀 우주선 안에서는 왜 둥둥 떠다니게 될까?", "🐜 개미는 왜 항상 줄을 지어 다니는 걸까?", "💡 전구는 어떻게 뜨거워지지 않고 빛을 낼까?"]

        [출력 예시]
        ["🚀 우주선은 왜 떠다녀?", "🐜 개미는 왜 줄 서?", "💡 전구는 어떻게 빛나?"]
        
        [형식 조건]
        반드시 JSON 리스트 포맷으로만 출력하세요. 마크다운 없이 순수 JSON만 주세요.
        """

        response = model.generate_content(prompt)
        text = response.text.replace("```json", "").replace("```", "").strip()
        questions = json.loads(text)
        
        if not isinstance(questions, list) or not questions:
            return jsonify(default_questions)

        # 3. 생성된 질문을 캐시 파일에 저장
        with open(CACHE_FILE, "w", encoding="utf-8") as f:
            json.dump(questions, f, ensure_ascii=False)
            
        print(f"💾 새 질문 {len(questions)}개 생성 및 캐시 저장 완료 (과목: {subject})")
        
        # 4. 그 중에서 6개 랜덤 반환
        result = random.sample(questions, min(len(questions), 6))
        return jsonify(result)

    except Exception as e:
        print(f"🚨 추천 질문 생성 실패: {e}")
        return jsonify(default_questions)

# 🔄 서버 시작 시 기존 캐시 파일 삭제 (클린 스타트)
if __name__ == '__main__':
    print("🧹 기존 추천 질문 캐시 삭제 중...")
    cache_files = glob.glob(os.path.join(BASE_DIR, "recommendations_cache_*.json"))
    for f in cache_files:
        try:
            os.remove(f)
            print(f" - 삭제됨: {os.path.basename(f)}")
        except Exception as e:
            print(f" - 삭제 실패: {e}")

    setup_rag_pipeline()
    app.run(host='0.0.0.0', port=5001, debug=True)