// dotenv를 제일 먼저 — ESM에서 import보다 이 코드가 먼저 실행되게 하려면
// package.json scripts에 --env-file 플래그를 사용합니다 (아래 참고)
// 이 파일의 dotenv.config()는 production 폴백으로 남겨둡니다.
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
dotenv.config()

import express from 'express'
import cors from 'cors'
import session from 'express-session'
import connectPgSimple from 'connect-pg-simple'
import path from 'path'
import { fileURLToPath } from 'url'
import { initDb } from './db.js'
import pool from './db.js'
import passport, { configureAuth } from './auth.js'
import type { AppUser } from './auth.js'
import saveRouter from './routes/save.js'

// dotenv 로딩 이후에 Passport 전략 초기화
configureAuth()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PgStore = connectPgSimple(session)
const CLIENT_URL = process.env.CLIENT_URL ?? 'http://localhost:5173'

// Render 등 리버스 프록시 뒤에서 HTTPS 세션 쿠키가 정상 동작하도록
app.set('trust proxy', 1)

app.use(cors({ origin: CLIENT_URL, credentials: true }))
app.use(express.json())

app.use(
  session({
    store: new PgStore({ pool: pool as any, createTableIfMissing: true }),
    secret: process.env.SESSION_SECRET ?? 'dev-secret-change-me',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'lax' : false,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  })
)

app.use(passport.initialize())
app.use(passport.session())

// ── Google OAuth 라우트 ──────────────────────────────────────────
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: `${CLIENT_URL}/?error=auth_failed` }),
  (_req, res) => res.redirect(CLIENT_URL)
)

app.get('/auth/logout', (req, res) => {
  req.logout(() => res.redirect(CLIENT_URL))
})

app.get('/api/auth/me', (req, res) => {
  if (!req.isAuthenticated?.()) return res.json(null)
  res.json(req.user as AppUser)
})

// ── API 라우트 ───────────────────────────────────────────────────
app.use('/api', saveRouter)

// ── 프로덕션: 빌드된 프론트엔드 서빙 ────────────────────────────
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '..', 'dist')
  app.use(express.static(distPath))
  app.get('*', (_req, res) => res.sendFile(path.join(distPath, 'index.html')))
}

const PORT = Number(process.env.PORT) || 3001

// 서버를 먼저 올린 후 DB 초기화 — initDb 실패해도 502 안 뜨도록
app.listen(PORT, () => {
  console.log(`🎮 서버 실행 중 :${PORT}`)
  initDb()
    .then(() => console.log('[DB] 초기화 완료'))
    .catch((err) => console.error('[DB] 초기화 실패 (서버는 유지):', err))
})
