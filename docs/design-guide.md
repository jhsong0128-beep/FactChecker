# FactChecker - 디자인 가이드

**버전**: 1.0  
**작성일**: 2026년 1월 22일

---

## 목차

1. [디자인 원칙](#디자인-원칙)
2. [색상 시스템](#색상-시스템)
3. [타이포그래피](#타이포그래피)
4. [간격 시스템](#간격-시스템)
5. [컴포넌트 스타일](#컴포넌트-스타일)
6. [레이아웃](#레이아웃)
7. [반응형 디자인](#반응형-디자인)
8. [접근성](#접근성)
9. [TailwindCSS 설정](#tailwindcss-설정)

---

## 디자인 원칙

### 1. 명확성 (Clarity)
- 정보 검증 서비스답게 명확하고 직관적인 인터페이스
- 신뢰도 평가를 한눈에 파악할 수 있는 시각적 표현

### 2. 신뢰성 (Trustworthiness)
- 깔끔하고 전문적인 디자인
- 과도한 장식 배제, 콘텐츠 중심

### 3. 접근성 (Accessibility)
- WCAG 2.1 AA 기준 준수
- 충분한 색상 대비 (최소 4.5:1)
- 키보드 네비게이션 지원

### 4. 일관성 (Consistency)
- 모든 페이지에서 동일한 패턴 사용
- 예측 가능한 사용자 경험

---

## 색상 시스템

### Primary 컬러 (브랜드)

```
Primary Blue
━━━━━━━━━━━━━━━━━━━━━━━━━
#2563eb (blue-600)
RGB: 37, 99, 235

용도:
- 주요 버튼
- 링크
- 활성 상태
- 포커스 상태

Hover: #1d4ed8 (blue-700)
Light: #dbeafe (blue-50)
```

### Semantic 컬러 (신뢰도 평가)

#### 신뢰함 (Trusted)

```
Green
━━━━━━━━━━━━━━━━━━━━━━━━━
배경: #dcfce7 (green-100)
텍스트: #166534 (green-800)
테두리: #22c55e (green-500)

RGB:
- 배경: 220, 252, 231
- 텍스트: 22, 101, 52

아이콘: ✓ (체크마크)
```

#### 주의 필요 (Caution)

```
Yellow
━━━━━━━━━━━━━━━━━━━━━━━━━
배경: #fef3c7 (yellow-100)
텍스트: #854d0e (yellow-800)
테두리: #eab308 (yellow-500)

RGB:
- 배경: 254, 243, 199
- 텍스트: 133, 77, 14

아이콘: ⚠️ (경고)
```

#### 의심스러움 (Suspicious)

```
Red
━━━━━━━━━━━━━━━━━━━━━━━━━
배경: #fee2e2 (red-100)
텍스트: #991b1b (red-800)
테두리: #ef4444 (red-500)

RGB:
- 배경: 254, 226, 226
- 텍스트: 153, 27, 27

아이콘: ✕ (엑스마크)
```

### Neutral 컬러

```
White
#ffffff
배경, 카드

Gray 50
#f9fafb
라이트 배경

Gray 100
#f3f4f6
hover 배경

Gray 200
#e5e7eb
테두리, 분리선

Gray 400
#9ca3af
비활성 텍스트

Gray 600
#4b5563
보조 텍스트

Gray 900
#111827
주요 텍스트
```

### 색상 사용 예시

```typescript
// Primary 액션
className="bg-blue-600 hover:bg-blue-700 text-white"

// 신뢰도 배지
className="bg-green-100 text-green-800 border border-green-500"
className="bg-yellow-100 text-yellow-800 border border-yellow-500"
className="bg-red-100 text-red-800 border border-red-500"

// 카드
className="bg-white border border-gray-200 hover:border-gray-300"

// 텍스트
className="text-gray-900"  // 본문
className="text-gray-600"  // 보조
className="text-gray-400"  // 비활성
```

---

## 타이포그래피

### 폰트 패밀리

```css
/* 한글 */
font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;

/* 영문/숫자 */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* 코드 */
font-family: 'JetBrains Mono', 'Fira Code', monospace;
```

### 폰트 크기 스케일

```
Heading 1 (H1)
━━━━━━━━━━━━━━━━━━
text-5xl: 48px (3rem)
font-bold: 700
line-height: 1.2
letter-spacing: -0.025em

용도: 메인 페이지 제목


Heading 2 (H2)
━━━━━━━━━━━━━━━━━━
text-4xl: 36px (2.25rem)
font-bold: 700
line-height: 1.25
letter-spacing: -0.02em

용도: 섹션 제목


Heading 3 (H3)
━━━━━━━━━━━━━━━━━━
text-3xl: 30px (1.875rem)
font-semibold: 600
line-height: 1.3

용도: 카드 제목


Heading 4 (H4)
━━━━━━━━━━━━━━━━━━
text-2xl: 24px (1.5rem)
font-semibold: 600
line-height: 1.35

용도: 서브 섹션 제목


Heading 5 (H5)
━━━━━━━━━━━━━━━━━━
text-xl: 20px (1.25rem)
font-medium: 500
line-height: 1.4

용도: 컴포넌트 제목


Body Large
━━━━━━━━━━━━━━━━━━
text-lg: 18px (1.125rem)
font-normal: 400
line-height: 1.7

용도: 강조 본문


Body (기본)
━━━━━━━━━━━━━━━━━━
text-base: 16px (1rem)
font-normal: 400
line-height: 1.6

용도: 일반 본문


Body Small
━━━━━━━━━━━━━━━━━━
text-sm: 14px (0.875rem)
font-normal: 400
line-height: 1.5

용도: 보조 텍스트, 캡션


Caption
━━━━━━━━━━━━━━━━━━
text-xs: 12px (0.75rem)
font-normal: 400
line-height: 1.4

용도: 메타 정보, 레이블
```

### 폰트 굵기

```
font-normal: 400  → 일반 본문
font-medium: 500  → 강조, 버튼
font-semibold: 600 → 서브 제목
font-bold: 700    → 메인 제목
```

### 사용 예시

```typescript
// 페이지 제목
<h1 className="text-5xl font-bold text-gray-900 tracking-tight">
  정보의 신뢰도를 확인하세요
</h1>

// 섹션 제목
<h2 className="text-4xl font-bold text-gray-900 mb-8">
  검증 결과
</h2>

// 본문
<p className="text-base text-gray-600 leading-relaxed">
  이는 널리 알려진 속설이나...
</p>

// 보조 텍스트
<span className="text-sm text-gray-500">
  2024년 1월 20일
</span>
```

---

## 간격 시스템

### Spacing Scale (4px 기반)

```
0   → 0px
0.5 → 2px    (매우 좁음)
1   → 4px    (좁음)
2   → 8px    (작음)
3   → 12px   (보통-작음)
4   → 16px   (보통)
5   → 20px   
6   → 24px   (넓음)
8   → 32px   (매우 넓음)
10  → 40px
12  → 48px
16  → 64px   (섹션 간격)
20  → 80px
24  → 96px
```

### 사용 기준

```typescript
// 컴포넌트 내부 패딩
className="p-4"      // 작은 카드
className="p-6"      // 일반 카드
className="p-8"      // 큰 카드

// 컴포넌트 간 여백
className="space-y-4"  // 밀접한 요소들
className="space-y-6"  // 일반 요소들
className="space-y-8"  // 섹션 내 요소들

// 섹션 간 여백
className="py-16"  // 섹션 상하 패딩
className="mb-12"  // 섹션 사이 여백

// 페이지 패딩
className="px-4 md:px-6 lg:px-8"  // 반응형 패딩
```

### 그리드 시스템

```typescript
// 컨테이너
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* 콘텐츠 */}
</div>

// 최대 너비
max-w-sm   : 384px   (모바일 양식)
max-w-md   : 448px   (작은 양식)
max-w-lg   : 512px   (일반 양식)
max-w-xl   : 576px   (긴 양식)
max-w-2xl  : 672px   (본문 콘텐츠)
max-w-4xl  : 896px   (넓은 콘텐츠)
max-w-7xl  : 1280px  (메인 컨테이너)
```

---

## 컴포넌트 스타일

### 버튼

#### Primary Button

```typescript
<button className="
  bg-blue-600 
  hover:bg-blue-700 
  active:bg-blue-800
  disabled:bg-gray-300 
  disabled:cursor-not-allowed
  text-white 
  font-medium 
  px-6 py-3 
  rounded-lg 
  transition-colors
  focus:outline-none 
  focus:ring-2 
  focus:ring-blue-500 
  focus:ring-offset-2
">
  검증 시작
</button>
```

시각적 표현:
```
┌─────────────────┐
│   검증 시작      │  ← 배경: #2563eb, 높이: 48px
└─────────────────┘

Hover:
┌─────────────────┐
│   검증 시작      │  ← 배경: #1d4ed8
└─────────────────┘

Disabled:
┌─────────────────┐
│   검증 시작      │  ← 배경: #d1d5db, 커서: not-allowed
└─────────────────┘
```

#### Secondary Button

```typescript
<button className="
  bg-white
  hover:bg-gray-50
  border border-gray-300
  text-gray-700
  font-medium
  px-6 py-3
  rounded-lg
  transition-colors
">
  취소
</button>
```

#### Outline Button

```typescript
<button className="
  bg-transparent
  hover:bg-blue-50
  border border-blue-600
  text-blue-600
  font-medium
  px-6 py-3
  rounded-lg
  transition-colors
">
  더 알아보기
</button>
```

### 입력 필드

#### Text Input

```typescript
<input 
  type="text"
  className="
    w-full
    border border-gray-300
    focus:border-blue-500
    focus:ring-2
    focus:ring-blue-200
    rounded-lg
    px-4 py-3
    text-base
    placeholder:text-gray-400
    transition
  "
  placeholder="검증하고 싶은 내용을 입력하세요"
/>
```

#### Textarea

```typescript
<textarea 
  className="
    w-full
    min-h-[200px]
    border border-gray-300
    focus:border-blue-500
    focus:ring-2
    focus:ring-blue-200
    rounded-lg
    px-4 py-3
    text-base
    resize-y
  "
/>
```

#### Input with Error

```typescript
<input 
  className="
    border-red-500
    focus:border-red-500
    focus:ring-red-200
  "
/>
<p className="mt-2 text-sm text-red-600">
  최소 10자 이상 입력해주세요
</p>
```

### 카드

#### 기본 카드

```typescript
<div className="
  bg-white
  border border-gray-200
  rounded-lg
  p-6
  hover:border-gray-300
  hover:shadow-md
  transition
">
  {/* 카드 콘텐츠 */}
</div>
```

#### 결과 카드

```typescript
<div className="
  bg-white
  border border-gray-200
  rounded-xl
  p-8
  shadow-sm
">
  {/* 검증 결과 */}
</div>
```

#### 출처 카드

```typescript
<div className="
  bg-gray-50
  border border-gray-200
  rounded-lg
  p-6
  space-y-4
">
  <div className="flex items-start justify-between">
    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
      학술지
    </span>
  </div>
  {/* 출처 내용 */}
</div>
```

### 배지

#### 신뢰도 배지

```typescript
// 신뢰함
<div className="
  bg-green-100
  border border-green-500
  text-green-800
  px-6 py-4
  rounded-lg
  text-center
">
  <span className="text-2xl font-semibold">✓ 신뢰함</span>
  <p className="mt-2 text-sm">
    신뢰할 수 있는 출처가 여러 개 확인되었습니다
  </p>
</div>

// 주의 필요
<div className="bg-yellow-100 border border-yellow-500 text-yellow-800...">
  <span className="text-2xl font-semibold">⚠️ 주의 필요</span>
  ...
</div>

// 의심스러움
<div className="bg-red-100 border border-red-500 text-red-800...">
  <span className="text-2xl font-semibold">✕ 의심스러움</span>
  ...
</div>
```

#### 태그 배지

```typescript
<span className="
  inline-flex
  items-center
  px-3 py-1
  bg-gray-100
  text-gray-700
  text-sm
  rounded-full
  font-medium
">
  학술지
</span>

<span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
  정부기관
</span>

<span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
  언론사
</span>
```

### 탭

```typescript
<div className="border-b border-gray-200">
  <nav className="flex space-x-8">
    {/* 활성 탭 */}
    <button className="
      border-b-2 border-blue-600
      text-blue-600
      font-medium
      pb-4
      px-1
    ">
      AI 분석
    </button>
    
    {/* 비활성 탭 */}
    <button className="
      border-b-2 border-transparent
      text-gray-500
      hover:text-gray-700
      hover:border-gray-300
      pb-4
      px-1
    ">
      근거 자료
    </button>
  </nav>
</div>
```

### 알림 배너

```typescript
// 정보
<div className="bg-blue-50 border-l-4 border-blue-500 p-4">
  <div className="flex">
    <div className="flex-shrink-0">
      <svg className="h-5 w-5 text-blue-400">...</svg>
    </div>
    <div className="ml-3">
      <p className="text-sm text-blue-700">
        AI의 판단은 참고용이며, 최종 판단은 사용자의 몫입니다
      </p>
    </div>
  </div>
</div>

// 경고
<div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
  ...
</div>

// 에러
<div className="bg-red-50 border-l-4 border-red-500 p-4">
  ...
</div>
```

---

## 레이아웃

### 컨테이너

```typescript
// 메인 컨테이너
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* 콘텐츠 */}
</div>

// 좁은 컨테이너 (본문 콘텐츠)
<div className="max-w-2xl mx-auto px-4">
  {/* 콘텐츠 */}
</div>

// 넓은 컨테이너
<div className="max-w-full px-4 sm:px-6 lg:px-8">
  {/* 콘텐츠 */}
</div>
```

### 그리드 레이아웃

```typescript
// 3열 그리드 (기능 카드)
<div className="
  grid grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3 
  gap-6
">
  {features.map(feature => (
    <FeatureCard key={feature.id} {...feature} />
  ))}
</div>

// 2열 그리드 (출처 카드)
<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
  {sources.map(source => (
    <SourceCard key={source.id} {...source} />
  ))}
</div>
```

### 섹션 간격

```typescript
// 페이지 섹션
<section className="py-16 px-4">
  <div className="max-w-7xl mx-auto">
    {/* 섹션 콘텐츠 */}
  </div>
</section>

// Hero 섹션
<section className="py-20 lg:py-32 px-4">
  {/* Hero 콘텐츠 */}
</section>
```

---

## 반응형 디자인

### 브레이크포인트

```
sm:  640px   (모바일 가로, 작은 태블릿)
md:  768px   (태블릿)
lg:  1024px  (데스크톱)
xl:  1280px  (큰 데스크톱)
2xl: 1536px  (매우 큰 화면)
```

### 모바일 퍼스트 예시

```typescript
// 텍스트 크기
<h1 className="text-3xl md:text-4xl lg:text-5xl">
  제목
</h1>

// 패딩
<div className="px-4 md:px-6 lg:px-8 py-8 lg:py-16">
  콘텐츠
</div>

// 그리드
<div className="
  grid grid-cols-1 
  sm:grid-cols-2 
  lg:grid-cols-3 
  gap-4 lg:gap-6
">
  카드들
</div>

// 숨김/보임
<div className="hidden md:block">
  데스크톱에서만 보임
</div>

<div className="block md:hidden">
  모바일에서만 보임
</div>
```

### 반응형 컨테이너

```typescript
<div className="
  w-full
  px-4 sm:px-6 lg:px-8
  max-w-7xl
  mx-auto
">
  {/* 자동으로 중앙 정렬 및 최대 너비 제한 */}
</div>
```

---

## 접근성

### 색상 대비

```
최소 대비율: 4.5:1 (일반 텍스트)
최소 대비율: 3:1 (큰 텍스트, 18px 이상)

검증된 조합:
✓ 흰 배경 (#ffffff) + 회색 900 텍스트 (#111827) → 16.8:1
✓ 파랑 600 배경 (#2563eb) + 흰 텍스트 (#ffffff) → 8.6:1
✓ 초록 100 배경 (#dcfce7) + 초록 800 텍스트 (#166534) → 7.2:1
```

### 포커스 스타일

```typescript
// 모든 인터랙티브 요소에 포커스 스타일 필수
<button className="
  focus:outline-none
  focus:ring-2
  focus:ring-blue-500
  focus:ring-offset-2
">
  버튼
</button>

<input className="
  focus:border-blue-500
  focus:ring-2
  focus:ring-blue-200
">
```

### 스크린 리더

```typescript
// 버튼에 명확한 레이블
<button aria-label="검증 시작하기">
  <SearchIcon />
</button>

// 상태 알림
<div role="alert" aria-live="polite">
  검증이 완료되었습니다
</div>

// 숨김 텍스트 (스크린 리더만)
<span className="sr-only">
  현재 페이지: 홈
</span>
```

---

## TailwindCSS 설정

### `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 브랜드 컬러는 기본 blue 사용
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',  // 메인
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        }
      },
      fontFamily: {
        sans: ['Pretendard', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

export default config
```

### 글로벌 스타일 (`globals.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* 기본 폰트 설정 */
  body {
    @apply text-gray-900 bg-white;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-bold;
  }
  
  /* 링크 스타일 */
  a {
    @apply text-blue-600 hover:text-blue-700 transition-colors;
  }
}

@layer components {
  /* 버튼 컴포넌트 */
  .btn-primary {
    @apply bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors;
  }
  
  .btn-secondary {
    @apply bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-medium px-6 py-3 rounded-lg transition-colors;
  }
  
  /* 입력 필드 */
  .input-base {
    @apply w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-3 transition;
  }
  
  /* 카드 */
  .card {
    @apply bg-white border border-gray-200 rounded-lg p-6 shadow-sm;
  }
}

@layer utilities {
  /* 커스텀 유틸리티 */
  .text-balance {
    text-wrap: balance;
  }
}
```

---

## 다크 모드 (향후 확장)

다크 모드는 Phase 2에서 고려. 기본 클래스 구조:

```typescript
// 준비된 구조
<div className="bg-white dark:bg-gray-900">
  <h1 className="text-gray-900 dark:text-white">
    제목
  </h1>
</div>
```

---

## 참고 자료

- [Tailwind CSS 공식 문서](https://tailwindcss.com/docs)
- [WCAG 2.1 가이드라인](https://www.w3.org/WAI/WCAG21/quickref/)
- [색상 대비 체커](https://webaim.org/resources/contrastchecker/)
- [Pretendard 폰트](https://github.com/orioncactus/pretendard)

---

**문서 끝**

이 디자인 가이드를 바탕으로 일관된 UI를 구현하세요. 와이어프레임과 함께 참고하여 개발하시기 바랍니다.
