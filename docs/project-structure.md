# FactChecker - 프로젝트 구조

**버전**: 1.0  
**작성일**: 2026년 1월 22일

---

## 전체 디렉토리 구조

```
factchecker/
├── frontend/                   # Next.js 프론트엔드
│   ├── app/                   # App Router (Next.js 14+)
│   │   ├── (auth)/           # 인증 관련 페이지
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (main)/           # 메인 페이지
│   │   │   ├── page.tsx      # 홈페이지
│   │   │   ├── verify/       # 검증 페이지
│   │   │   └── my/           # 마이페이지
│   │   ├── api/              # API Routes
│   │   │   └── auth/
│   │   ├── layout.tsx        # 루트 레이아웃
│   │   └── globals.css       # 글로벌 스타일
│   ├── components/           # 재사용 컴포넌트
│   │   ├── ui/               # shadcn/ui 컴포넌트
│   │   ├── forms/            # 폼 컴포넌트
│   │   ├── verify/           # 검증 관련 컴포넌트
│   │   └── layout/           # 레이아웃 컴포넌트
│   ├── lib/                  # 유틸리티 함수
│   │   ├── api.ts           # API 클라이언트
│   │   ├── utils.ts         # 공통 유틸
│   │   └── auth.ts          # 인증 헬퍼
│   ├── hooks/               # 커스텀 훅
│   │   ├── useVerify.ts
│   │   └── useAuth.ts
│   ├── types/               # TypeScript 타입
│   │   └── index.ts
│   ├── public/              # 정적 파일
│   │   ├── images/
│   │   └── icons/
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   └── next.config.js
│
├── backend/                  # Express.js 백엔드
│   ├── src/
│   │   ├── controllers/     # 컨트롤러
│   │   │   ├── auth.controller.ts
│   │   │   ├── verify.controller.ts
│   │   │   └── user.controller.ts
│   │   ├── services/        # 비즈니스 로직
│   │   │   ├── ai.service.ts
│   │   │   ├── scraper.service.ts
│   │   │   ├── ocr.service.ts
│   │   │   └── library.service.ts
│   │   ├── routes/          # API 라우트
│   │   │   ├── auth.routes.ts
│   │   │   ├── verify.routes.ts
│   │   │   └── user.routes.ts
│   │   ├── middleware/      # 미들웨어
│   │   │   ├── auth.middleware.ts
│   │   │   ├── validation.middleware.ts
│   │   │   └── error.middleware.ts
│   │   ├── utils/           # 유틸리티
│   │   │   ├── logger.ts
│   │   │   ├── cache.ts
│   │   │   └── helpers.ts
│   │   ├── config/          # 설정
│   │   │   ├── database.ts
│   │   │   ├── redis.ts
│   │   │   └── env.ts
│   │   ├── types/           # TypeScript 타입
│   │   │   └── index.ts
│   │   └── index.ts         # 앱 진입점
│   ├── prisma/              # Prisma ORM
│   │   ├── schema.prisma    # 데이터베이스 스키마
│   │   ├── migrations/      # 마이그레이션
│   │   └── seed.ts          # 시드 데이터
│   ├── tests/               # 테스트
│   │   ├── unit/
│   │   ├── integration/
│   │   └── e2e/
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── docs/                    # 문서
│   ├── service-proposal.md
│   ├── technical-specs.md
│   ├── development-roadmap.md
│   └── project-structure.md
│
├── .github/                 # GitHub 설정
│   ├── workflows/           # GitHub Actions
│   │   ├── ci.yml
│   │   └── deploy.yml
│   └── ISSUE_TEMPLATE/
│
├── README.md
├── .gitignore
└── LICENSE
```

---

## 주요 디렉토리 설명

### Frontend (`/frontend`)

#### `/app` - Next.js 페이지
App Router 구조를 사용합니다. 각 폴더가 라우트가 됩니다.

```
/                  → app/(main)/page.tsx
/login             → app/(auth)/login/page.tsx
/verify            → app/(main)/verify/page.tsx
/verify/[id]       → app/(main)/verify/[id]/page.tsx
/my                → app/(main)/my/page.tsx
```

#### `/components` - 재사용 컴포넌트
```typescript
// components/verify/TrustLevelBadge.tsx
export function TrustLevelBadge({ level }: { level: string }) {
  const colors = {
    trusted: 'bg-green-100 text-green-800',
    caution: 'bg-yellow-100 text-yellow-800',
    suspicious: 'bg-red-100 text-red-800'
  };
  
  return (
    <span className={`px-3 py-1 rounded ${colors[level]}`}>
      {level}
    </span>
  );
}
```

#### `/lib` - 유틸리티 함수
```typescript
// lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 인터셉터로 토큰 자동 추가
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

#### `/hooks` - 커스텀 훅
```typescript
// hooks/useVerify.ts
import { useMutation } from '@tanstack/react-query';
import api from '@/lib/api';

export function useVerify() {
  return useMutation({
    mutationFn: async (data: { inputType: string; content: string }) => {
      const response = await api.post('/verify', data);
      return response.data;
    }
  });
}
```

---

### Backend (`/backend`)

#### `/src/controllers` - 컨트롤러
```typescript
// controllers/verify.controller.ts
import { Request, Response } from 'express';
import { verifyService } from '../services/ai.service';

export class VerifyController {
  async create(req: Request, res: Response) {
    try {
      const { inputType, content } = req.body;
      const userId = req.user?.id;
      
      const result = await verifyService.verify(inputType, content, userId);
      
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async getById(req: Request, res: Response) {
    // ...
  }
}
```

#### `/src/services` - 비즈니스 로직
```typescript
// services/ai.service.ts
import OpenAI from 'openai';
import { prisma } from '../config/database';
import { cache } from '../utils/cache';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export class AIService {
  async verify(inputType: string, content: string, userId?: string) {
    // 1. 캐시 확인
    const cacheKey = `verify:${hashContent(content)}`;
    const cached = await cache.get(cacheKey);
    if (cached) return cached;
    
    // 2. AI 분석
    const analysis = await this.analyzeWithAI(content);
    
    // 3. 출처 검색
    const sources = await this.searchSources(analysis);
    
    // 4. 결과 생성
    const result = {
      trustLevel: analysis.trustLevel,
      summary: analysis.summary,
      analysis: analysis,
      sources: sources
    };
    
    // 5. DB 저장
    await prisma.verification.create({
      data: {
        userId,
        inputType,
        inputContent: content,
        ...result
      }
    });
    
    // 6. 캐시 저장
    await cache.set(cacheKey, result, 3600); // 1시간
    
    return result;
  }
  
  private async analyzeWithAI(content: string) {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: content }
      ],
      temperature: 0.3
    });
    
    return JSON.parse(response.choices[0].message.content);
  }
  
  private async searchSources(analysis: any) {
    // 출처 검색 로직
  }
}

export const verifyService = new AIService();
```

#### `/src/routes` - API 라우트
```typescript
// routes/verify.routes.ts
import express from 'express';
import { VerifyController } from '../controllers/verify.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validateVerify } from '../middleware/validation.middleware';

const router = express.Router();
const controller = new VerifyController();

router.post('/', authMiddleware, validateVerify, controller.create);
router.get('/:id', authMiddleware, controller.getById);
router.get('/history', authMiddleware, controller.getHistory);

export default router;
```

#### `/src/middleware` - 미들웨어
```typescript
// middleware/auth.middleware.ts
import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: '인증이 필요합니다' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: '유효하지 않은 토큰입니다' });
  }
}
```

---

## 환경 변수

### Frontend (`.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Backend (`.env`)
```env
# Server
NODE_ENV=development
PORT=3001

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/factchecker

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=15m

# OpenAI
OPENAI_API_KEY=sk-...

# Google Cloud
GOOGLE_APPLICATION_CREDENTIALS=./google-credentials.json

# Library API
LIBRARY_API_KEY=your-library-api-key

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=10
```

---

## 패키지 구조

### Frontend `package.json`
```json
{
  "name": "factchecker-frontend",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwindcss": "^3.4.0",
    "@tanstack/react-query": "^5.0.0",
    "axios": "^1.6.0",
    "zustand": "^4.5.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "typescript": "^5.0.0"
  }
}
```

### Backend `package.json`
```json
{
  "name": "factchecker-backend",
  "version": "1.0.0",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "prisma:migrate": "prisma migrate dev",
    "prisma:generate": "prisma generate",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0",
    "@prisma/client": "^5.8.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "openai": "^4.0.0",
    "ioredis": "^5.3.0",
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.0",
    "@types/node": "^20.0.0",
    "prisma": "^5.8.0",
    "tsx": "^4.0.0",
    "typescript": "^5.0.0",
    "jest": "^29.0.0"
  }
}
```

---

## Git 브랜치 전략

```
main              # 프로덕션 배포용
  ├── develop     # 개발 통합 브랜치
  │   ├── feature/auth
  │   ├── feature/verify
  │   └── feature/ui
  └── hotfix/...  # 긴급 수정
```

### 브랜치 네이밍
- `feature/기능명` - 새 기능 개발
- `fix/버그명` - 버그 수정
- `hotfix/긴급수정` - 프로덕션 긴급 수정
- `refactor/리팩토링명` - 리팩토링

---

**문서 끝**

이 프로젝트 구조는 권장사항이며, 팀의 상황에 맞게 조정할 수 있습니다.
