# Vercel 배포 오류 해결 방법

## 오류 원인
Root Directory 설정이 잘못되어 빌드 오류가 발생했습니다.

## 해결 방법 (2가지 중 1개 선택)

### ⭐ 방법 1: Vercel Dashboard에서 설정 변경 (추천)

1. **Vercel Dashboard 접속**
   - 배포한 프로젝트 클릭

2. **Settings로 이동**
   - 상단 메뉴에서 "Settings" 클릭

3. **Root Directory 변경**
   - "General" 섹션 찾기
   - "Root Directory" 항목에서 "Edit" 클릭
   - `frontend` 입력 (중요!)
   - "Save" 클릭

4. **재배포**
   - "Deployments" 탭으로 이동
   - 가장 최근 배포 옆의 "..." 메뉴 클릭
   - "Redeploy" 선택
   - "Redeploy" 버튼 클릭

### 방법 2: 프로젝트 다시 임포트

1. **현재 프로젝트 삭제**
   - Settings → 맨 아래 "Delete Project"

2. **새로 임포트**
   - Dashboard → "Add New..." → "Project"
   - `FactChecker` 저장소 선택
   - **Configure Project** 화면에서:
     - **Root Directory**: `frontend` (반드시 설정!)
     - "Override" 버튼 클릭 후 입력
   - "Deploy" 클릭

## 확인 방법

배포가 성공하면:
- ✅ BUILD LOGS에 초록색 체크 마크
- ✅ "Building..." → "Completed" 상태
- ✅ 배포 URL에서 FactChecker 랜딩 페이지 확인 가능

## 여전히 오류가 발생하면

빌드 로그의 오류 메시지를 확인하세요:
1. Deployments → 실패한 배포 클릭
2. "Building" 또는 "Build Logs" 섹션 확인
3. 빨간색으로 표시된 오류 메시지 복사

---

**중요**: Root Directory를 `frontend`로 설정하는 것이 핵심입니다!
