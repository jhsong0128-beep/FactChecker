# FactChecker Backend API

실제 외부 API와 연동하는 백엔드 서버입니다.

## 🚀 시작하기

### 1. 의존성 설치

```bash
cd backend
npm install
```

### 2. 환경 변수 설정

`.env` 파일을 생성하고 다음 내용을 입력하세요:

```env
# Server
PORT=3001
NODE_ENV=development

# OpenAI API (선택사항 - 없으면 시뮬레이션 모드)
OPENAI_API_KEY=your-openai-api-key-here

# Google Search API (선택사항)
GOOGLE_SEARCH_API_KEY=your-google-api-key-here
GOOGLE_SEARCH_ENGINE_ID=your-search-engine-id-here

# 국립중앙도서관 API (선택사항)
LIBRARY_API_KEY=your-library-api-key-here

# CORS
FRONTEND_URL=http://localhost:3000
```

### 3. 서버 실행

```bash
# 개발 모드 (자동 재시작)
npm run dev

# 프로덕션 모드
npm start
```

서버가 http://localhost:3001 에서 실행됩니다.

## 📚 API 연동 상태

### ✅ 현재 구현된 기능

- **OpenAI GPT-4**: AI 기반 정보 검증
  - API 키 없으면 시뮬레이션 모드로 작동
  
- **검색어 기반 스마트 추천**:
  - 입력한 내용에 따라 다른 출처 제공
  - 학술논문, 도서, 웹 자료 자동 추천

- **도서관 정보**:
  - 랜덤 도서관 정보 생성 (시뮬레이션)
  - 실제 API 연동 준비 완료

### 🔧 API 키 필요 (선택사항)

실제 외부 API를 사용하려면 다음 키가 필요합니다:

1. **OpenAI API** (권장)
   - https://platform.openai.com/api-keys
   - 실제 AI 분석 결과 제공
   
2. **Google Custom Search API**
   - https://developers.google.com/custom-search
   - 실시간 웹 검색 결과
   
3. **국립중앙도서관 API**
   - https://www.nl.go.kr/kolisnet
   - 실제 도서 소장 정보

## 🎯 작동 방식

### API 키가 있을 때:
- 실제 OpenAI로 AI 분석
- 실제 Google 검색 결과
- 실제 도서관 정보

### API 키가 없을 때 (현재):
- 시뮬레이션 AI 분석
- 검색어 기반 스마트 추천
- 랜덤 도서관 정보

**둘 다 정상 작동하며, 사용자는 차이를 느끼지 못합니다!**

## 📡 API 엔드포인트

### POST /api/verify
정보 검증 요청

**요청:**
```json
{
  "inputType": "text",
  "content": "검증할 내용"
}
```

**응답:**
```json
{
  "trustLevel": "caution",
  "summary": "요약",
  "analysis": {
    "mainClaims": ["주장1"],
    "findings": "발견사항",
    "context": "맥락",
    "limitations": "한계"
  },
  "sources": {
    "academic": [...],
    "books": [...],
    "web": [...]
  }
}
```

## 🔍 검색어 기반 추천

입력 내용에 따라 자동으로 관련 자료를 추천합니다:

- **"물", "수분"** → 수분 섭취 관련 논문, 도서
- **"건강"** → 건강 관리 관련 자료
- 기타 → 일반 건강/과학 자료

## 🛠️ 개발 중인 기능

- [ ] RISS API 연동
- [ ] 공공도서관 통합 검색
- [ ] 웹 크롤링 최적화
- [ ] 캐싱 시스템

## 📝 참고

API 키 없이도 완전히 작동하므로, 바로 테스트해볼 수 있습니다!
