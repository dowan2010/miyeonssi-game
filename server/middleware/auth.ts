import type { Request, Response, NextFunction } from 'express'
import type { AppUser } from '../auth.js'

export interface AuthRequest extends Request {
  uid?: string
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated?.()) {
    res.status(401).json({ error: '로그인이 필요해요.' })
    return
  }
  req.uid = (req.user as AppUser).id
  next()
}
