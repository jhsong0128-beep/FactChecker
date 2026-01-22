# FactChecker - 환경 변수 설정 가이드

**버전**: 1.0  
**작성일**: 2026년 1월 22일

---

## 개요

FactChecker는 다양한 외부 서비스와 연동되므로 환경 변수 설정이 중요합니다.

---

## Backend 환경 변수 (`.env`)

프로젝트 루트 또는 `backend/` 폴더에 `.env` 파일을 생성하세요.

```env
# ================================================
# Server Configuration
# ================================================
NODE_ENV=development
PORT=3001

# ================================================
# Database
# ================================================
DATABASE_URL=postgresql://postgres:password@localhost:5432/factchecker

# ================================================
# Redis Cache
# ================================================
REDIS_URL=redis://localhost:6379

# ================================================
# JWT Authentication
# ================================================
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d

# ================================================
# AI Services
# ================================================
OPENAI_API_KEY=sk-...your-openai-api-key...

# ================================================
# Google Cloud Services
# ================================================
GOOGLE_APPLICATION_CREDENTIALS=./config/google-credentials.json

# ================================================
# External APIs
# ================================================
LIBRARY_API_KEY=your-library-api-key

# ================================================
# Rate Limiting
# ================================================
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=10

# ================================================
# Security
# ================================================
CORS_ORIGIN=http://localhost:3000

# ================================================
# Monitoring
# ================================================
SENTRY_DSN=
LOG_LEVEL=info
```

---

## Frontend 환경 변수 (`.env.local`)

`frontend/` 폴더에 `.env.local` 파일을 생성하세요.

```env
# API 서버 주소
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# 앱 URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Google Analytics (선택)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 환경 변수 상세 설명

### 1. Server Configuration

#### `NODE_ENV`
- **설명**: 실행 환경
- **값**: `development`, `staging`, `production`
- **기본값**: `development`

#### `PORT`
- **설명**: 백엔드 서버 포트
- **값**: 숫자
- **기본값**: `3001`

---

### 2. Database

#### `DATABASE_URL`
- **설명**: PostgreSQL 데이터베이스 연결 문자열
- **형식**: `postgresql://USER:PASSWORD@HOST:PORT/DATABASE`
- **예시**: `postgresql://postgres:mypassword@localhost:5432/factchecker`
- **필수**: ✅

**로컬 PostgreSQL 설치**:
```bash
# macOS
brew install postgresql@15
brew services start postgresql@15

# Ubuntu
sudo apt install postgresql-15
sudo systemctl start postgresql

# Docker
docker run -d \
  --name postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=factchecker \
  -p 5432:5432 \
  postgres:15
```

---

### 3. Redis

#### `REDIS_URL`
- **설명**: Redis 캐시 서버 주소
- **형식**: `redis://[user:password@]host:port`
- **예시**: `redis://localhost:6379`
- **필수**: ✅

**로컬 Redis 설치**:
```bash
# macOS
brew install redis
brew services start redis

# Ubuntu
sudo apt install redis-server
sudo systemctl start redis

# Docker
docker run -d \
  --name redis \
  -p 6379:6379 \
  redis:7
```

---

### 4. JWT Authentication

#### `JWT_SECRET`
- **설명**: JWT 토큰 서명에 사용할 비밀 키
- **생성 방법**:
  ```bash
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
  ```
- **필수**: ✅
- **주의**: 절대 공개하지 말 것!

#### `JWT_EXPIRES_IN`
- **설명**: Access Token 만료 시간
- **형식**: `15m`, `1h`, `7d` 등
- **권장값**: `15m` (15분)

#### `REFRESH_TOKEN_EXPIRES_IN`
- **설명**: Refresh Token 만료 시간
- **권장값**: `7d` (7일)

---

### 5. AI Services

#### `OPENAI_API_KEY`
- **설명**: OpenAI API 키
- **발급 방법**:
  1. https://platform.openai.com 접속
  2. 회원가입 및 로그인
  3. API Keys 메뉴에서 새 키 생성
  4. 결제 정보 등록 (사용량 기반 과금)
- **형식**: `sk-...`로 시작
- **필수**: ✅
- **비용**: 토큰당 과금 (GPT-4 Turbo 기준 약 $0.01/1K tokens)

**비용 관리 팁**:
- Usage Limits 설정 (월 $50 등)
- 캐싱으로 중복 요청 방지
- 무료 사용자 일일 제한

#### `ANTHROPIC_API_KEY` (선택)
- **설명**: Claude API 키
- **발급**: https://console.anthropic.com
- **필수**: ❌ (OpenAI 대신 사용 가능)

---

### 6. Google Cloud Services

#### `GOOGLE_APPLICATION_CREDENTIALS`
- **설명**: Google Cloud 서비스 계정 JSON 파일 경로
- **필요한 서비스**: Vision API (OCR)
- **발급 방법**:
  1. https://console.cloud.google.com 접속
  2. 프로젝트 생성
  3. Vision API 활성화
  4. 서비스 계정 생성 및 JSON 키 다운로드
- **형식**: 파일 경로 또는 JSON 문자열
- **필수**: ✅ (OCR 기능 사용 시)

**Vision API 활성화**:
```bash
# gcloud CLI 설치 후
gcloud auth login
gcloud projects create factchecker-prod
gcloud services enable vision.googleapis.com
```

**비용**: 월 1,000건 무료, 이후 1,000건당 $1.50

---

### 7. External APIs

#### `LIBRARY_API_KEY`
- **설명**: 국립중앙도서관 API 인증키
- **발급 방법**:
  1. https://www.nl.go.kr 접속
  2. KOLISNET 검색 API 신청
  3. 승인 후 키 발급
- **필수**: ✅ (도서관 연계 기능)
- **비용**: 무료

#### `GOOGLE_SEARCH_API_KEY` (선택)
- **설명**: Google Custom Search API 키
- **용도**: 웹 출처 검색
- **발급**: https://developers.google.com/custom-search
- **비용**: 일일 100건 무료, 이후 1,000건당 $5

---

### 8. Rate Limiting

#### `RATE_LIMIT_WINDOW_MS`
- **설명**: Rate limit 시간 창 (밀리초)
- **권장값**: `60000` (1분)

#### `RATE_LIMIT_MAX_REQUESTS`
- **설명**: 시간 창 내 최대 요청 수
- **권장값**: `10` (분당 10회)

---

### 9. Security

#### `CORS_ORIGIN`
- **설명**: CORS 허용 도메인
- **개발**: `http://localhost:3000`
- **프로덕션**: `https://yourdomain.com`
- **여러 도메인**: 쉼표로 구분

---

### 10. Monitoring

#### `SENTRY_DSN` (선택)
- **설명**: Sentry 에러 추적 DSN
- **발급**: https://sentry.io
- **용도**: 프로덕션 에러 모니터링
- **비용**: 월 5,000 이벤트 무료

#### `LOG_LEVEL`
- **설명**: 로그 레벨
- **값**: `debug`, `info`, `warn`, `error`
- **개발**: `debug`
- **프로덕션**: `info` 또는 `warn`

---

## 환경별 설정 예시

### 개발 환경

```env
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://postgres:password@localhost:5432/factchecker_dev
REDIS_URL=redis://localhost:6379
LOG_LEVEL=debug
DEBUG=true
```

### 프로덕션 환경

```env
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://user:pass@prod-db.example.com:5432/factchecker
REDIS_URL=redis://prod-redis.example.com:6379
CORS_ORIGIN=https://factchecker.com
LOG_LEVEL=warn
SENTRY_DSN=https://...@sentry.io/...
```

---

## 보안 주의사항

### ⚠️ 절대 Git에 커밋하지 말 것

`.gitignore`에 다음 추가:
```gitignore
.env
.env.local
.env.*.local
*.key
*.pem
google-credentials.json
```

### 프로덕션 배포

**AWS**: AWS Secrets Manager  
**GCP**: Secret Manager  
**Vercel**: Environment Variables 설정  
**Docker**: Docker Secrets

```bash
# Docker Compose 예시
version: '3.8'
services:
  backend:
    env_file:
      - .env.production
    secrets:
      - jwt_secret
      - openai_key

secrets:
  jwt_secret:
    external: true
  openai_key:
    external: true
```

---

## 검증 방법

환경 변수가 제대로 설정되었는지 확인:

```javascript
// config/validate-env.ts
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'staging', 'production']),
  PORT: z.string().transform(Number),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  OPENAI_API_KEY: z.string().startsWith('sk-')
});

export const env = envSchema.parse(process.env);
```

---

## 문제 해결

### Q: "DATABASE_URL is not defined"
A: `.env` 파일이 올바른 위치에 있는지, `dotenv` 패키지가 설치되었는지 확인

### Q: OpenAI API 에러 "401 Unauthorized"
A: API 키가 유효한지, 결제 정보가 등록되었는지 확인

### Q: Vision API 에러 "403 Forbidden"
A: Vision API가 활성화되었는지, 서비스 계정 권한이 올바른지 확인

---

**문서 끝**

환경 변수 설정에 문제가 있다면 팀에 문의하세요.
