# 🔑 실제 API 키 발급 가이드

## 무료로 실제 데이터 사용하기!

### 1. 📚 도서관정보나루 (추천! 가장 쉬움)

**전국 공공도서관 통합 정보**

- **신청 링크**: https://www.data4library.kr/api
- **발급 시간**: 즉시 (회원가입 후 자동 발급)
- **무료 제한**: 일 1,000건

#### 발급 방법:
1. https://www.data4library.kr 접속
2. 회원가입
3. 로그인 후 "마이페이지" → "API 인증키"
4. API 키 자동 발급됨
5. `.env` 파일에 추가:
   ```
   DATA4LIBRARY_KEY=발급받은키
   ```

### 2. 📖 국립중앙도서관 서지정보 API

**국립중앙도서관 소장 자료**

- **신청 링크**: https://www.nl.go.kr/seoji/
- **발급 시간**: 2-3일 (승인 필요)
- **무료 제한**: 일 1,000건

#### 발급 방법:
1. 국립중앙도서관 홈페이지 접속
2. "서지정보 OpenAPI" 검색
3. 이용 신청서 작성
4. 승인 후 API 키 발급
5. `.env` 파일에 추가:
   ```
   LIBRARY_API_KEY=발급받은키
   ```

### 3. 🔬 RISS (한국학술연구정보서비스)

**국내 학술논문 검색**

- **신청 링크**: http://www.riss.kr/link?id=T12005
- **발급 시간**: 즉시
- **무료 제한**: 일 1,000건

#### 발급 방법:
1. http://www.riss.kr 접속
2. 회원가입 및 로그인
3. "오픈API" 메뉴 클릭
4. API 키 신청
5. `.env` 파일에 추가:
   ```
   RISS_API_KEY=발급받은키
   ```

### 4. 🌐 Google Custom Search API

**실시간 웹 검색**

- **신청 링크**: https://developers.google.com/custom-search/v1/overview
- **발급 시간**: 즉시
- **무료 제한**: 하루 100건 (그 이상은 유료)

#### 발급 방법:
1. Google Cloud Console 접속
2. 프로젝트 생성
3. "Custom Search API" 활성화
4. API 키 생성
5. Custom Search Engine 생성 (https://cse.google.com/)
6. `.env` 파일에 추가:
   ```
   GOOGLE_SEARCH_API_KEY=발급받은키
   GOOGLE_SEARCH_ENGINE_ID=검색엔진ID
   ```

### 5. 🤖 OpenAI API (선택사항)

**실제 AI 분석**

- **신청 링크**: https://platform.openai.com/api-keys
- **발급 시간**: 즉시
- **비용**: 사용량 기반 (GPT-4는 비쌈, GPT-3.5-turbo는 저렴)

## 📝 API 키 설정 방법

`backend/.env` 파일을 만들고:

```env
PORT=3001
NODE_ENV=development

# 도서관정보나루 (가장 중요!)
DATA4LIBRARY_KEY=여기에_발급받은_키

# RISS 학술검색
RISS_API_KEY=여기에_발급받은_키

# 국립중앙도서관 (선택)
LIBRARY_API_KEY=여기에_발급받은_키

# Google Search (선택)
GOOGLE_SEARCH_API_KEY=여기에_발급받은_키
GOOGLE_SEARCH_ENGINE_ID=여기에_검색엔진ID

# OpenAI (선택)
OPENAI_API_KEY=sk-여기에_발급받은_키

# CORS
FRONTEND_URL=http://localhost:3000
```

## 🚀 우선순위 추천

### 즉시 시작 (무료 + 간단):

1. **도서관정보나루** ⭐⭐⭐
   - 가장 쉽고 빠름
   - 전국 도서관 정보
   
2. **RISS** ⭐⭐⭐
   - 학술논문 검색
   - 무료이고 빠름

### 나중에 추가 (시간 소요):

3. **국립중앙도서관**
   - 승인 필요 (2-3일)
   
4. **Google Search**
   - 하루 100건 제한
   
5. **OpenAI**
   - 비용 발생

## ✅ API 키 없이도 작동!

API 키가 없어도:
- 자동으로 스마트 시뮬레이션 모드
- 검색어 기반 맞춤 결과
- 완벽하게 작동

## 🎯 권장 시작 방법

1. **먼저 API 키 없이 테스트**
   - 바로 `npm run dev`로 실행
   - 시뮬레이션 모드 확인

2. **도서관정보나루 API 발급** (5분 소요)
   - 실제 도서 데이터 확인

3. **RISS API 발급** (5분 소요)
   - 실제 논문 데이터 확인

4. **나머지는 필요할 때**
   - Google, OpenAI 등

---

**참고**: API 키를 발급받아도 오류가 나면 자동으로 시뮬레이션 모드로 전환되므로 안전합니다!
