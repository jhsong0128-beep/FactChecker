# FactChecker Frontend

AI 기반 정보 검증 서비스의 프론트엔드 애플리케이션입니다.

## 시작하기

### 개발 서버 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

### 프로덕션 빌드

```bash
npm run build
npm start
```

## 기술 스택

- **Next.js 14** - React 프레임워크
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 스타일링
- **React 18** - UI 라이브러리

## 프로젝트 구조

```
frontend/
├── app/                # Next.js App Router
│   ├── layout.tsx     # 루트 레이아웃
│   ├── page.tsx       # 홈페이지
│   └── globals.css    # 글로벌 스타일
├── public/            # 정적 파일
├── package.json       # 의존성 관리
└── next.config.js     # Next.js 설정
```

## 배포

이 프로젝트는 Vercel에 최적화되어 있습니다:

```bash
vercel deploy
```

## 환경 변수

`.env.local` 파일을 생성하여 다음 변수를 설정하세요:

```
NEXT_PUBLIC_API_URL=your-api-url
NEXT_PUBLIC_APP_URL=your-app-url
```
