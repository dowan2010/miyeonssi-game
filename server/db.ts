import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Supabase / 외부 PostgreSQL은 항상 SSL 필요
  ssl: process.env.DATABASE_URL?.includes('supabase.')
    ? { rejectUnauthorized: false }
    : false,
})

export const initDb = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id         TEXT   PRIMARY KEY,
      email      TEXT   NOT NULL,
      name       TEXT   NOT NULL,
      photo_url  TEXT,
      created_at BIGINT NOT NULL DEFAULT 0
    )
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS saves (
      uid                TEXT    PRIMARY KEY,
      scene_id           TEXT    NOT NULL DEFAULT 'intro_01',
      affection          INTEGER NOT NULL DEFAULT 0,
      flags              JSONB   NOT NULL DEFAULT '{}',
      selected_character TEXT    NOT NULL DEFAULT 'yeonghan',
      played_at          BIGINT  NOT NULL DEFAULT 0
    )
  `)

  await pool.query(`
    ALTER TABLE saves
    ADD COLUMN IF NOT EXISTS selected_character TEXT NOT NULL DEFAULT 'yeonghan'
  `)

  console.log('[DB] 테이블 준비 완료')
}

export default pool
