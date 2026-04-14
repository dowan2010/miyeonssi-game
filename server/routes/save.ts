import { Router } from 'express'
import { requireAuth, type AuthRequest } from '../middleware/auth.js'
import pool from '../db.js'

const router = Router()

router.get('/save', requireAuth, async (req: AuthRequest, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT scene_id, affection, flags, selected_character, played_at FROM saves WHERE uid = $1',
      [req.uid]
    )
    res.json(rows[0] ?? null)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'DB 조회 실패' })
  }
})

router.post('/save', requireAuth, async (req: AuthRequest, res) => {
  const { scene_id, affection, flags, selected_character } = req.body
  try {
    await pool.query(
      `INSERT INTO saves (uid, scene_id, affection, flags, selected_character, played_at)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (uid) DO UPDATE
       SET scene_id = EXCLUDED.scene_id,
           affection = EXCLUDED.affection,
           flags = EXCLUDED.flags,
           selected_character = EXCLUDED.selected_character,
           played_at = EXCLUDED.played_at`,
      [req.uid, scene_id, affection, flags ?? {}, selected_character ?? 'yeonghan', Date.now()]
    )
    res.json({ ok: true })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'DB 저장 실패' })
  }
})

export default router
