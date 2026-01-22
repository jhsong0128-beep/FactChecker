# FactChecker - 기술 사양서

**버전**: 1.0  
**작성일**: 2026년 1월 22일

## 목차

1. [시스템 아키텍처](#1-시스템-아키텍처)
2. [기술 스택](#2-기술-스택)
3. [데이터베이스 설계](#3-데이터베이스-설계)
4. [API 설계](#4-api-설계)
5. [AI 검증 프로세스](#5-ai-검증-프로세스)
6. [외부 API 연동](#6-외부-api-연동)
7. [보안 고려사항](#7-보안-고려사항)
8. [성능 최적화](#8-성능-최적화)

---

## 1. 시스템 아키텍처

### 전체 구조

```
┌─────────────┐
│   사용자    │
└──────┬──────┘
       │
       ▼
┌─────────────────────────┐
│   Frontend (React)      │
│   - Next.js             │
│   - TailwindCSS         │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│   API Server            │
│   - Node.js/Express     │
│   - REST API            │
└──────────┬──────────────┘
           │
    ┌──────┴──────┐
    ▼             ▼
┌─────────┐  ┌──────────────┐
│Database │  │  AI Services │
│PostgreSQL│  │  - GPT-4 API │
│Redis    │  │  - Vision API│
└─────────┘  └──────────────┘
                   │
                   ▼
            ┌──────────────┐
            │External APIs │
            │- 도서관 API  │
            │- Web Scraper │
            └──────────────┘
```

### 주요 컴포넌트

#### Frontend
- **프레임워크**: Next.js 14+ (App Router)
- **UI 라이브러리**: TailwindCSS + shadcn/ui
- **상태 관리**: React Query + Context API
- **인증**: NextAuth.js

#### Backend
- **런타임**: Node.js 20+
- **프레임워크**: Express.js
- **인증**: JWT + bcrypt
- **파일 처리**: Multer

#### Database
- **주 데이터베이스**: PostgreSQL 15+
- **캐싱**: Redis 7+
- **ORM**: Prisma

---

## 2. 기술 스택

### Frontend

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "tailwindcss": "^3.4.0",
    "@tanstack/react-query": "^5.0.0",
    "next-auth": "^4.24.0",
    "zustand": "^4.5.0",
    "axios": "^1.6.0"
  }
}
```

### Backend

```json
{
  "dependencies": {
    "express": "^4.18.0",
    "prisma": "^5.8.0",
    "@prisma/client": "^5.8.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5",
    "axios": "^1.6.0",
    "cheerio": "^1.0.0",
    "puppeteer": "^21.0.0",
    "openai": "^4.0.0",
    "ioredis": "^5.3.0"
  }
}
```

---

## 3. 데이터베이스 설계

### ERD (주요 테이블)

```prisma
// schema.prisma

model User {
  id            String         @id @default(uuid())
  email         String         @unique
  name          String?
  password      String
  provider      String?        // email, google, kakao
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt
  verifications Verification[]
  folders       Folder[]
}

model Verification {
  id            String      @id @default(uuid())
  userId        String
  user          User        @relation(fields: [userId], references: [id])
  
  inputType     String      // text, url, image
  inputContent  String      @db.Text
  
  trustLevel    String      // trusted, caution, suspicious
  summary       String      @db.Text
  analysis      Json
  sources       Json
  
  createdAt     DateTime    @default(now())
  
  savedItems    SavedItem[]
  
  @@index([userId, createdAt])
}

model Source {
  id            String      @id @default(uuid())
  title         String
  url           String?
  type          String      // academic, government, news, web
  publisher     String?
  publishedDate DateTime?
  isbn          String?
  
  createdAt     DateTime    @default(now())
  
  @@index([type])
}

model Folder {
  id          String      @id @default(uuid())
  userId      String
  user        User        @relation(fields: [userId], references: [id])
  name        String
  createdAt   DateTime    @default(now())
  
  items       SavedItem[]
  
  @@index([userId])
}

model SavedItem {
  id              String       @id @default(uuid())
  folderId        String
  folder          Folder       @relation(fields: [folderId], references: [id])
  verificationId  String
  verification    Verification @relation(fields: [verificationId], references: [id])
  
  createdAt       DateTime     @default(now())
  
  @@index([folderId])
}

model Feedback {
  id              String       @id @default(uuid())
  verificationId  String
  userId          String?
  type            String       // incorrect, good, poor
  comment         String?      @db.Text
  createdAt       DateTime     @default(now())
}
```

---

## 4. API 설계

### 인증 API

```
POST   /api/auth/register      - 회원가입
POST   /api/auth/login         - 로그인
POST   /api/auth/logout        - 로그아웃
GET    /api/auth/me            - 현재 사용자 정보
```

### 검증 API

```
POST   /api/verify             - 새 검증 요청
GET    /api/verify/:id         - 검증 결과 조회
GET    /api/verify/history     - 검증 히스토리
DELETE /api/verify/:id         - 검증 결과 삭제
```

#### POST /api/verify 요청 예시

```json
{
  "inputType": "text",
  "content": "하루 물 8잔을 마시는 것이 건강에 필수적이다"
}
```

#### 응답 예시

```json
{
  "id": "uuid-here",
  "trustLevel": "caution",
  "summary": "널리 알려진 속설이나 과학적 근거는 제한적입니다...",
  "analysis": {
    "mainClaims": ["하루 물 8잔이 필수"],
    "findings": "개인차가 큼",
    "context": "1945년 미국 권장사항에서 유래",
    "limitations": "최신 연구는 개인별 필요량 강조"
  },
  "sources": [
    {
      "title": "수분 섭취와 건강 (대한의학회지, 2025)",
      "url": "https://...",
      "type": "academic",
      "reason": "최신 의학 연구 결과",
      "library": {
        "available": true,
        "libraries": ["국립중앙도서관"]
      }
    }
  ],
  "createdAt": "2026-01-22T10:00:00Z"
}
```

### 저장 API

```
GET    /api/folders            - 폴더 목록
POST   /api/folders            - 폴더 생성
POST   /api/folders/:id/items  - 항목 저장
DELETE /api/folders/:id/items/:itemId - 항목 삭제
```

### 피드백 API

```
POST   /api/feedback           - 피드백 제출
```

---

## 5. AI 검증 프로세스

### 검증 플로우

```
1. 입력 수신
   ↓
2. 전처리
   - 텍스트 정제
   - URL → 본문 추출
   - 이미지 → OCR
   ↓
3. 캐시 확인
   - Redis에서 유사 검증 확인
   - 있으면 캐시 반환
   ↓
4. AI 분석
   - LLM API 호출
   - 프롬프트 엔지니어링
   ↓
5. 출처 검색
   - Web Search API
   - 학술 DB 검색
   ↓
6. 도서관 정보 조회
   - 국립중앙도서관 API
   ↓
7. 결과 생성 및 저장
   - DB 저장
   - 캐시 저장
   ↓
8. 응답 반환
```

### LLM 프롬프트 예시

```javascript
const prompt = `
당신은 정보 검증 전문가입니다. 다음 주장을 분석해주세요:

주장: "${userInput}"

다음 형식으로 분석해주세요:
1. 신뢰도 평가 (trusted/caution/suspicious)
2. 핵심 요약 (3-5줄)
3. 주요 논점
4. 확인된 사실
5. 맥락 및 한계
6. 권장 출처 (학술지, 정부기관 우선)

객관적이고 신중하게 분석하되, 확실하지 않은 경우 "확인 필요" 표시하세요.
`;
```

### 신뢰도 평가 기준

```javascript
function determineTrustLevel(analysis) {
  const criteria = {
    trusted: [
      '여러 신뢰할 수 있는 출처에서 확인',
      '학술 연구 다수 지지',
      '정부/공식 기관 데이터 일치'
    ],
    caution: [
      '일부 출처만 확인',
      '상충하는 정보 존재',
      '오래된 정보일 가능성'
    ],
    suspicious: [
      '신뢰할 출처 찾기 어려움',
      '반박 자료 다수',
      '출처 불분명'
    ]
  };
  
  // AI 분석 결과 + 휴리스틱 규칙 조합
  return evaluatedLevel;
}
```

---

## 6. 외부 API 연동

### 6.1 OpenAI GPT-4 API

```javascript
const openai = require('openai');

const client = new openai.OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function verifyWithAI(content) {
  const response = await client.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: content }
    ],
    temperature: 0.3, // 낮게 설정 (일관성)
    max_tokens: 2000
  });
  
  return response.choices[0].message.content;
}
```

### 6.2 Google Vision API (OCR)

```javascript
const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_CREDENTIALS_PATH
});

async function extractTextFromImage(imageBuffer) {
  const [result] = await client.textDetection(imageBuffer);
  const detections = result.textAnnotations;
  return detections[0]?.description || '';
}
```

### 6.3 국립중앙도서관 API

```javascript
const axios = require('axios');

async function searchLibrary(isbn, title) {
  const response = await axios.get(
    'https://www.nl.go.kr/kolisnet/openapi/search',
    {
      params: {
        cert_key: process.env.LIBRARY_API_KEY,
        result_type: 'json',
        title: title,
        isbn: isbn
      }
    }
  );
  
  return response.data;
}
```

### 6.4 웹 스크래핑 (URL 입력)

```javascript
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

async function scrapeURL(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto(url, { waitUntil: 'networkidle2' });
  const html = await page.content();
  await browser.close();
  
  const $ = cheerio.load(html);
  
  // 본문 추출
  const article = $('article, .content, main').text();
  const title = $('h1, title').first().text();
  
  return { title, content: article };
}
```

---

## 7. 보안 고려사항

### 7.1 인증 및 권한

- **JWT 토큰**: Access Token (15분) + Refresh Token (7일)
- **비밀번호**: bcrypt 해싱 (salt rounds: 10)
- **Rate Limiting**: IP당 분당 10회, 사용자당 일일 100회

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1분
  max: 10, // 10회
  message: '너무 많은 요청입니다. 잠시 후 다시 시도해주세요.'
});

app.use('/api/verify', limiter);
```

### 7.2 입력 검증

```javascript
const { body, validationResult } = require('express-validator');

app.post('/api/verify', [
  body('content')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .escape(),
  body('inputType')
    .isIn(['text', 'url', 'image'])
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // ...
});
```

### 7.3 XSS/CSRF 방지

- **helmet.js**: HTTP 헤더 보안
- **CORS**: 허용된 도메인만 접근
- **CSP**: Content Security Policy 설정

### 7.4 API 키 관리

- 환경변수로 관리 (.env)
- 프로덕션: AWS Secrets Manager / GCP Secret Manager

---

## 8. 성능 최적화

### 8.1 캐싱 전략

```javascript
const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL);

async function getOrSetCache(key, ttl, fetchFunction) {
  const cached = await redis.get(key);
  
  if (cached) {
    return JSON.parse(cached);
  }
  
  const fresh = await fetchFunction();
  await redis.setex(key, ttl, JSON.stringify(fresh));
  
  return fresh;
}

// 사용 예시
const result = await getOrSetCache(
  `verify:${hash(content)}`,
  3600, // 1시간
  () => verifyWithAI(content)
);
```

### 8.2 데이터베이스 최적화

```sql
-- 인덱스 추가
CREATE INDEX idx_verification_user_created 
  ON "Verification" ("userId", "createdAt" DESC);

CREATE INDEX idx_source_type 
  ON "Source" ("type");

-- 자주 조회하는 컬럼만 선택
SELECT id, trustLevel, summary, createdAt 
FROM "Verification" 
WHERE "userId" = $1 
ORDER BY "createdAt" DESC 
LIMIT 20;
```

### 8.3 이미지 최적화

- **업로드 제한**: 최대 5MB
- **리사이징**: Sharp 라이브러리 사용
- **포맷 변환**: PNG → WebP

### 8.4 API 응답 최적화

- **Pagination**: 기본 20개씩
- **필드 선택**: GraphQL 또는 필드 파라미터
- **압축**: gzip/brotli

---

## 9. 배포 및 인프라

### 추천 구성

**클라우드**: AWS / GCP / Vercel

```
Frontend: Vercel (Next.js 최적화)
Backend: AWS EC2 / GCP Cloud Run
Database: AWS RDS PostgreSQL
Cache: AWS ElastiCache Redis
Storage: AWS S3 (이미지)
CDN: CloudFront
```

### CI/CD

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to production
        run: |
          npm run build
          npm run deploy
```

---

## 10. 모니터링

### 추천 도구

- **APM**: New Relic / DataDog
- **로깅**: Winston + CloudWatch
- **에러 추적**: Sentry
- **분석**: Google Analytics / Mixpanel

```javascript
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
});

// 에러 핸들링
app.use(Sentry.Handlers.errorHandler());
```

---

**문서 끝**

이 기술 사양서는 MVP 개발을 위한 기술적 가이드입니다. 실제 구현 시 프로젝트 요구사항에 맞게 조정하세요.
