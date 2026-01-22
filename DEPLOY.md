# Vercel 배포 가이드

## 방법 1: Vercel Dashboard 사용 (추천)

1. **Vercel 접속**
   - https://vercel.com 접속
   - GitHub 계정으로 로그인

2. **새 프로젝트 임포트**
   - "Add New..." → "Project" 클릭
   - GitHub 저장소 목록에서 `FactChecker` 선택
   - "Import" 클릭

3. **프로젝트 설정**
   - **Framework Preset**: Next.js 자동 감지됨
   - **Root Directory**: `frontend` 입력 (중요!)
   - **Build Command**: `npm run build` (기본값)
   - **Output Directory**: `.next` (기본값)
   - **Install Command**: `npm install` (기본값)

4. **배포**
   - "Deploy" 버튼 클릭
   - 몇 분 후 배포 완료!
   - 제공된 URL로 접속하여 확인

## 방법 2: Vercel CLI 사용

1. **Vercel CLI 설치**
   ```bash
   npm install -g vercel
   ```

2. **로그인**
   ```bash
   vercel login
   ```

3. **배포**
   ```bash
   # 프로젝트 루트에서
   vercel
   
   # 또는 frontend 폴더에서
   cd frontend
   vercel
   ```

4. **프로덕션 배포**
   ```bash
   vercel --prod
   ```

## 주의사항

### Root Directory 설정
- Vercel Dashboard에서 **반드시** Root Directory를 `frontend`로 설정해야 합니다.
- 이 설정을 하지 않으면 404 오류가 발생합니다.

### 환경 변수 (선택사항)
나중에 백엔드를 연동할 때 Vercel Dashboard에서 환경 변수를 추가하세요:
- Settings → Environment Variables
- `NEXT_PUBLIC_API_URL`: 백엔드 API URL

## 자동 배포

GitHub에 push하면 자동으로 Vercel이 배포합니다:

```bash
git add .
git commit -m "Update frontend"
git push origin main
```

몇 분 후 Vercel이 자동으로 새 버전을 배포합니다.

## 문제 해결

### 404 오류가 계속 발생하는 경우

1. Vercel Dashboard → Settings → General
2. Root Directory가 `frontend`로 설정되어 있는지 확인
3. 설정 변경 후 "Redeploy"

### 빌드 오류

1. 로컬에서 먼저 빌드 테스트:
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. 오류가 없으면 다시 배포

## 배포 확인

배포 후 다음을 확인하세요:
- ✅ 홈페이지가 제대로 로드되는지
- ✅ 스타일이 제대로 적용되는지
- ✅ 모든 섹션이 표시되는지
- ✅ 반응형 디자인이 작동하는지 (모바일/태블릿)

## 커스텀 도메인 설정 (선택사항)

1. Vercel Dashboard → Settings → Domains
2. 원하는 도메인 입력
3. DNS 설정 안내에 따라 설정

---

문제가 있으면 Vercel 문서를 참조하세요: https://vercel.com/docs
