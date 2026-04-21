import type { Request, Response, NextFunction } from 'express'

// 차단할 봇/크롤러 User-Agent 패턴
const BOT_PATTERNS = [
  /googlebot/i,
  /bingbot/i,
  /yandexbot/i,
  /baiduspider/i,
  /duckduckbot/i,
  /slurp/i,           // Yahoo
  /facebookexternalhit/i,
  /twitterbot/i,
  /rogerbot/i,
  /semrushbot/i,
  /ahrefsbot/i,
  /mj12bot/i,
  /dotbot/i,
  /petalbot/i,
  /applebot/i,
  /python-requests/i,
  /python-urllib/i,
  /go-http-client/i,
  /curl\//i,
  /wget\//i,
  /scrapy/i,
  /httpclient/i,
  /axios/i,
  /node-fetch/i,
  /libwww-perl/i,
  /java\//i,
  /okhttp/i,
  /spider/i,
  /crawler/i,
  /scraper/i,
  /bot\b/i,
]

// API 엔드포인트 경로 (정상 프로그래밍 클라이언트 허용)
const API_PATHS = ['/api/', '/auth/']

export function botBlock(req: Request, res: Response, next: NextFunction) {
  const ua = req.headers['user-agent'] ?? ''

  // User-Agent 아예 없으면 차단
  if (!ua.trim()) {
    res.status(403).json({ error: 'Forbidden' })
    return
  }

  // API/인증 경로는 봇 체크 패스 (OAuth redirect 등)
  if (API_PATHS.some((p) => req.path.startsWith(p))) {
    return next()
  }

  // 봇 패턴 매칭
  if (BOT_PATTERNS.some((pattern) => pattern.test(ua))) {
    console.log(`[BOT BLOCK] ${req.ip} — ${ua.slice(0, 80)}`)
    res.status(403).send('Access denied')
    return
  }

  next()
}

// IP당 요청 수 제한 (간단한 인메모리 rate limiter)
const ipMap = new Map<string, { count: number; reset: number }>()
const LIMIT = 120       // 1분에 최대 120 요청
const WINDOW = 60_000   // 1분

export function rateLimit(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip ?? 'unknown'
  const now = Date.now()
  const entry = ipMap.get(ip)

  if (!entry || now > entry.reset) {
    ipMap.set(ip, { count: 1, reset: now + WINDOW })
    return next()
  }

  entry.count++
  if (entry.count > LIMIT) {
    res.status(429).json({ error: 'Too many requests' })
    return
  }

  next()
}
