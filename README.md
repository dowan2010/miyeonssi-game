# 미연시 게임 — 한국형 미소녀 연애 시뮬레이션

Google 계정으로 로그인해서 즐기는 비주얼 노벨 스타일의 연애 시뮬레이션 게임입니다.

## 등장인물

- **김영한** — 쿨계 츤데레
- **뉴로우** — 활발계, CSR을 꿰뚫는 그녀

---

## 기술 스택

| 분류 | 사용 기술 |
|---|---|
| 프론트엔드 | React + Vite + TypeScript + Tailwind CSS + Zustand |
| 백엔드 | Express + TypeScript (tsx) |
| 인증 | Passport.js + Google OAuth 2.0 |
| 데이터베이스 | Supabase PostgreSQL |
| 배포 | Render.com |

---

## 로컬 개발 환경 설정

### 1. 저장소 클론

```bash
git clone https://github.com/dowan2010/miyeonssi-game.git
cd miyeonssi-game
npm install
```

### 2. 환경 변수 설정

`.env.example`을 복사해서 `.env.local`을 만드세요.

```bash
cp .env.example .env.local
```

`.env.local` 을 열어서 아래 값들을 채워넣으세요:

```env
# Supabase 대시보드 > Project Settings > Database > Connection string (URI)
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-1-ap-northeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Google Cloud Console > API 및 서비스 > 사용자 인증 정보
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3001/auth/google/callback

CLIENT_URL=http://localhost:5173
SESSION_SECRET=랜덤하고-긴-문자열
PORT=3001
```

### 3. Google OAuth 설정

1. [Google Cloud Console](https://console.cloud.google.com) → API 및 서비스 → 사용자 인증 정보
2. **OAuth 2.0 클라이언트 ID 만들기** (웹 애플리케이션)
3. 승인된 리디렉션 URI 추가:
   - 로컬: `http://localhost:3001/auth/google/callback`
   - 배포: `https://[앱이름].onrender.com/auth/google/callback`
4. 발급된 클라이언트 ID / 시크릿을 `.env.local`에 입력

### 4. Supabase 설정

1. [supabase.com](https://supabase.com) → New Project 생성
2. **Project Settings → Database → Connection string → URI** 복사
3. `.env.local`의 `DATABASE_URL`에 붙여넣기
4. 서버 시작 시 테이블이 자동으로 생성됩니다

### 5. 개발 서버 실행

```bash
npm run dev
```

- 프론트엔드: `http://localhost:5173`
- 백엔드: `http://localhost:3001`

---

## Render 배포

1. GitHub 저장소를 Render에 연결
2. `render.yaml`이 자동으로 서비스를 구성합니다
3. Render 대시보드 → Environment에 아래 환경 변수 직접 입력:

| 키 | 값 |
|---|---|
| `DATABASE_URL` | Supabase 연결 문자열 |
| `GOOGLE_CLIENT_ID` | Google OAuth 클라이언트 ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth 클라이언트 시크릿 |
| `GOOGLE_CALLBACK_URL` | `https://[앱이름].onrender.com/auth/google/callback` |
| `CLIENT_URL` | `https://[앱이름].onrender.com` |
| `SESSION_SECRET` | 랜덤 문자열 (`openssl rand -base64 32`) |

---

## npm 스크립트

```bash
npm run dev      # 프론트 + 백엔드 동시 개발 서버
npm run build    # 프로덕션 빌드
npm start        # 프로덕션 서버 실행
```
