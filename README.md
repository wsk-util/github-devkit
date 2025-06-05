# GitHub DevKit (gdk)

GitHub 워크플로우를 자동화하는 CLI 도구입니다. 저장소 생성, 라벨 관리, 이슈 생성, 브랜치 관리 등 반복적인 GitHub 작업을 명령어로 간편하게 처리할 수 있습니다.

## 설치(Installation)

```bash
npm install -g .
```

## 초기 설정(Initial Setup)

GitHub Token(Classic)을 설정해야 합니다:

```bash
# 대화형 설정 메뉴
gdk config

# 또는 직접 토큰 설정
gdk config -t
```

토큰은 다음 권한이 필요합니다:
- `repo` (저장소 관리)
- `public_repo` (공개 저장소)
- `user` (사용자 정보)

## 명령어(Commands)

### 설정 관리(Configuration Management)

```bash
# 대화형 설정 메뉴
gdk config

# GitHub 토큰 설정
gdk config -t

# 저장소 클론 기본 경로 설정
gdk config -p

# 현재 설정 조회
gdk config -s
```

### 저장소 관리(Repository Management)

```bash
# 새 저장소 생성 및 로컬 클론
gdk repo -c
```

새 저장소를 생성하고 복제합니다. 저장소명, 설명, 공개/비공개 설정을 대화형으로 입력받습니다.

### 라벨 관리(Label Management)

```bash
# 미리 정의된 라벨 생성
gdk label -c

# 기존 라벨 제거 후 새 라벨 생성
gdk label -r
```

미리 정의된 라벨 템플릿을 사용하여 일관된 라벨 시스템을 구축할 수 있습니다. 또는 `data/labels.json`을 수정하여 커스텀 라벨 목록을 생성할 수 있습니다.

**기본 라벨 목록(Default Labels):**

```
상태(Status)
- Needs-Triage 🎯 - 분류 대기중
- Hotfix 🔥 - 치명적인 버그(긴급 수정 필요)
- Bug 🐛 - 치명적이지 않은 버그
- ASAP ⚡ - 우선순위가 높은 작업

진행(Progress)
- Status: In Progress ⏳ - 작업 진행 중
- Status: Paused ⏸️ - 작업이 일시 중단됨
- Status: Blocked 🚫 - 다른 작업/요인에 의해 막힘
- Status: Done ✅ - 작업 완료됨
- Status: Aborted ❌ - 작업 취소됨

작업 유형(Type)
- Type: Documentation 📝 - 문서 관련 작업
- Type: UI/UX 🎨 - UI/UX 관련 작업
- Type: Feature ✨ - 새로운 기능 추가
- Type: Enhancement ⚡ - 기존 기능 개선
- Type: Refactor ♻️ - 코드 리팩터링
- Type: Fix 🐛 - 버그 수정
- Type: Test 🧪 - 테스트 코드 작성/수정
- Type: Chore 📦 - 유지보수성 작업
- Type: Deploy 🚀 - 배포 관련 작업

작업 범위(Scope)
- Scope: FE - 프론트엔드 관련 작업
- Scope: BE - 백엔드 관련 작업
- Scope: Infra - 인프라 관련 작업
- Scope: Github - Github 관련 작업
```

### 이슈 관리(Issue Management)

```bash
# 새 이슈 생성
gdk issue -c
```

제목, 내용, 라벨, 담당자를 대화형으로 입력받아 새 이슈를 생성합니다.

### 브랜치 관리(Branch Management)

```bash
# 새 브랜치 생성
gdk branch -c
```

GitHub에서 새 브랜치를 생성합니다. 베이스 브랜치와 새 브랜치명을 입력받습니다.

## 사용 예시(Usage Examples)

### 새 프로젝트 시작하기(Starting a New Project)

```bash
# 1. 설정
gdk config

# 2. 저장소 생성
gdk repo -c

# 3. 라벨 시스템 설정
gdk label -r

# 4. 이슈 생성
gdk issue -c

# 5. 개발 브랜치 생성
gdk branch -c
```

### 기존 프로젝트에 라벨 추가(Add Labels on Existing Project)

```bash
# 기존 라벨 제거하고 새 라벨 시스템 적용
gdk label -r
```

## 설정 파일(Configuration File)

설정은 `config/env.json`에 저장됩니다:

```json
{
  "GITHUB_TOKEN": "your_github_token",
  "GITHUB_USERNAME": "your_username"
}
```

## 요구사항(Requirements)

- Node.js 14.0 이상
- GitHub Token(Classic)

## 라이센스(License)

MIT
