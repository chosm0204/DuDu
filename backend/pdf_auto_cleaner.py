import os
import glob
import re  # 정규 표현식(RegEx) 라이브러리
from pypdf import PdfReader

# --- 설정 ---
# 1. PDF 원본 파일들이 있는 폴더
PDF_INPUT_DIR = "pdfs_input" 
# 2. 추출/정제된 TXT 파일을 저장할 폴더 (app.py가 읽는 곳)
TXT_OUTPUT_DIR = "data"
# ----------------

def clean_text(text):
    """
    정규 표현식(RegEx)을 사용해 텍스트에서 노이즈를 자동으로 제거합니다.
    (100페이지 분량도 1초 안에 처리합니다.)
    """
    
    # 1. 페이지 번호 제거 (예: "- 15 -", "20", " 30 ")
    text = re.sub(r'^\s*-\s*\d+\s*-\s*$', '', text, flags=re.MULTILINE)
    text = re.sub(r'^\s*\d+\s*$', '', text, flags=re.MULTILINE)
    
    # 2. 스크립트가 추가한 페이지 구분선 제거
    text = re.sub(r'--- 페이지 구분 ---', '', text)
    
    # 3. '제 O 단원' 같은 교과서 머리글 제거
    text = re.sub(r'^\s*제\s*\d+\s*단원.*$', '', text, flags=re.MULTILINE)
    
    # 4. '생각 열기', '정리하기' 같은 반복 코너 제목 제거
    text = re.sub(r'^\s*(생각 열기|되돌아보기|정리하기|펼치기)\s*$', '', text, flags=re.MULTILINE)
    
    # 5. (선택 사항) 성진님이 발견한 반복 노이즈 직접 추가
    #    예: 교과서 머리글이 "4학년 1학기 사회"라면
    # text = re.sub(r'4학년 1학기 사회', '', text) 
    
    # 6. 불필요한 공백 줄이기 (3줄 이상의 공백을 2줄로 줄임)
    text = re.sub(r'\n{3,}', '\n\n', text)
    
    return text.strip() # 앞뒤 공백 최종 제거

def extract_and_clean_pdf(pdf_path, output_path):
    """PDF에서 텍스트를 '추출'하고 '정제'하여 TXT 파일로 저장합니다."""
    
    try:
        reader = PdfReader(pdf_path)
        full_text = ""
        
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                full_text += page_text + "\n\n--- 페이지 구분 ---\n\n"
        
        # 🚨 자동 정제(Cleaning) 단계
        cleaned_text = clean_text(full_text)
        
        # data 폴더가 없다면 생성
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        # 정제된 텍스트를 .txt 파일로 저장
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(cleaned_text)
            
        print(f"  ✅ 성공 (정제 완료): {os.path.basename(pdf_path)} -> {os.path.basename(output_path)}")

    except Exception as e:
        print(f"  ❌ 오류: {os.path.basename(pdf_path)} 처리 중 문제 발생 - {e}")

if __name__ == '__main__':
    print("="*50)
    print(f"📚 {PDF_INPUT_DIR} 폴더 PDF '추출' 및 '자동 정제' 시작...")
    print("="*50)
    
    # pdfs_input 폴더 안의 모든 .pdf 파일을 찾습니다.
    pdf_files = glob.glob(os.path.join(PDF_INPUT_DIR, "*.pdf"))

    if not pdf_files:
        print(f"⚠️ 경고: '{PDF_INPUT_DIR}' 폴더에 PDF 파일이 없습니다.")
    else:
        print(f"총 {len(pdf_files)}개의 PDF 파일을 찾았습니다...")
        
        for pdf_file_path in pdf_files:
            # 원본 PDF의 파일 이름 (확장자 제외)
            base_name = os.path.splitext(os.path.basename(pdf_file_path))[0]
            
            # 💡 최종 TXT 파일 경로 (예: data/4-1 사회_CLEANED.txt)
            output_txt_path = os.path.join(TXT_OUTPUT_DIR, f"{base_name}_CLEANED.txt")
            
            extract_and_clean_pdf(pdf_file_path, output_txt_path)
            
    print("="*50)
    print("🎉 모든 PDF 파일 처리 완료. data 폴더를 확인하세요.")
    print("="*50)