/** 서버 세션 기반 인증 — Firebase 대체 */

export interface AppUser {
  id: string
  name: string
  email: string
  photoUrl?: string
}

export const loginWithGoogle = () => {
  window.location.href = '/auth/google'
}

export const logout = () => {
  window.location.href = '/auth/logout'
}

export const fetchMe = async (): Promise<AppUser | null> => {
  const res = await fetch('/api/auth/me', { credentials: 'include' })
  if (!res.ok) return null
  return res.json()
}
