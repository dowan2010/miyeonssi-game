import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import pool from './db.js'

export interface AppUser {
  id: string
  name: string
  email: string
  photoUrl?: string
}

/**
 * ESM에서는 import가 코드보다 먼저 실행됩니다.
 * GoogleStrategy 초기화를 함수 안으로 넣어야
 * dotenv.config() 이후에 env 변수를 읽을 수 있습니다.
 */
export const configureAuth = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      },
      async (_at, _rt, profile, done) => {
        try {
          const user: AppUser = {
            id: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0].value ?? '',
            photoUrl: profile.photos?.[0].value,
          }
          await pool.query(
            `INSERT INTO users (id, email, name, photo_url, created_at)
             VALUES ($1, $2, $3, $4, $5)
             ON CONFLICT (id) DO UPDATE
             SET name = EXCLUDED.name, photo_url = EXCLUDED.photo_url`,
            [user.id, user.email, user.name, user.photoUrl ?? null, Date.now()]
          )
          done(null, user)
        } catch (e) {
          done(e as Error)
        }
      }
    )
  )

  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((user, done) => done(null, user as AppUser))
}

export default passport
