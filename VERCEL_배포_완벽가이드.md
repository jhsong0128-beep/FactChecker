# Vercel 배포 완벽 가이드 (Root Directory 설정 포함)

## 🚀 가장 확실한 방법: 프로젝트 다시 임포트

### 1단계: 현재 프로젝트 삭제 (선택사항)

Vercel Dashboard에서:
1. 프로젝트 클릭
2. **Settings** 탭 클릭
3. 맨 아래로 스크롤
4. **"Delete Project"** 찾기
5. 프로젝트 이름 입력 후 삭제

### 2단계: 새로 임포트하기 (Root Directory 설정)

1. **Vercel Dashboard 메인으로 이동**
   - https://vercel.com/dashboard

2. **"Add New..." 버튼 클릭** (우측 상단)
   - "Project" 선택

3. **Import Git Repository**
   - GitHub 연동 확인
   - `FactChecker` 또는 `jhsong0128-beep/FactChecker` 찾기
   - **"Import"** 클릭

4. **⭐ Configure Project 화면 (중요!)**
   
   이 화면에서 다음 설정을 확인하세요:

   **Framework Preset**
   - Next.js (자동 선택됨)

   **Root Directory** ⬅️ **여기가 핵심!**
   - "Edit" 또는 "Override" 버튼 클릭
   - 입력창에 `frontend` 입력
   - 체크 표시 클릭하여 확인

   **Build and Output Settings**
   - Build Command: `npm run build` (자동)
   - Output Directory: `.next` (자동)
   - Install Command: `npm install` (자동)

   **Environment Variables**
   - 지금은 비워두기 (나중에 백엔드 연동 시 추가)

5. **"Deploy" 버튼 클릭**

6. **배포 진행**
   - Building... (1-2분 소요)
   - ✅ 초록색 체크 마크 확인
   - "Visit" 버튼으로 사이트 확인

---

## 🔍 Root Directory 설정이 안 보이는 경우

### 방법 A: Configure Project 화면에서

Import 클릭 후 나오는 **Configure Project** 화면에서:

```
Project Name: [factchecker]

Framework Preset: Next.js

Root Directory: ./        [Edit] ⬅️ 이 Edit 버튼 클릭!
├─ ./ (선택됨)
└─ frontend/  ⬅️ 이것 선택!
```

### 방법 B: 배포 후 Settings에서

1. Settings → General
2. "Build & Development Settings" 섹션 찾기
3. Root Directory 항목에서 Edit
4. `frontend` 입력

---

## ✅ 배포 성공 확인

배포가 완료되면:

1. **초록색 체크 마크** 확인
2. **"Visit" 버튼** 클릭
3. FactChecker 랜딩 페이지가 보여야 함:
   - 파란색 배경의 Hero 섹션
   - "정보의 진실을 AI로 검증하세요" 제목
   - 6개의 기능 카드
   - Footer

---

## 🆘 여전히 안 된다면

### 스크린샷 확인 위치

다음 화면들을 확인해보세요:

**1. Import Repository 화면**
```
Import Git Repository
━━━━━━━━━━━━━━━━━━━
[검색창: Search...]

jhsong0128-beep/FactChecker
[Import] ⬅️ 여기 클릭 후
```

**2. Configure Project 화면** (Import 후)
```
Configure Project
━━━━━━━━━━━━━━━━━━━
Project Name: factchecker

Framework Preset: Next.js [Override ▼]

Root Directory: ./ [Edit] ⬅️ 여기!

Build and Output Settings
[Override]
```

**3. Root Directory 선택**
```
Root Directory
━━━━━━━━━━━━━━━
Select the directory...

( ) ./ (Root)
(•) frontend  ⬅️ 선택!

[Continue]
```

---

## 🎯 최종 체크리스트

배포 전 확인:
- [ ] Vercel에 GitHub 연동됨
- [ ] FactChecker 저장소가 보임
- [ ] Import 클릭
- [ ] Configure Project 화면에서 Root Directory를 `frontend`로 설정
- [ ] Deploy 클릭

배포 후 확인:
- [ ] BUILD LOGS에 초록색 체크
- [ ] Visit 버튼으로 사이트 접속 가능
- [ ] FactChecker 랜딩 페이지가 제대로 표시됨

---

**문제가 계속되면**: 현재 보이는 화면을 설명해주시면 정확히 도와드릴게요!
