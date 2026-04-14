import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CHARACTER_META, type CharacterId } from '../types'
import type { AppUser } from '../auth'

interface GameStore {
  // 인증
  user: AppUser | null
  setUser: (user: AppUser | null) => void

  // 선택된 캐릭터
  selectedCharacter: CharacterId
  setCharacter: (id: CharacterId) => void

  // 게임 상태
  currentSceneId: string
  affection: number
  flags: Record<string, boolean>

  // 설정
  typingSpeed: number
  setTypingSpeed: (v: number) => void

  // 액션
  goToScene: (id: string, affectionDelta?: number) => void
  setFlag: (key: string, value: boolean) => void
  resetGame: () => void

  // 저장/불러오기
  cloudSave: () => Promise<void>
  cloudLoad: () => Promise<void>
}

const apiFetch = (path: string, options?: RequestInit) =>
  fetch(path, { credentials: 'include', ...options, headers: { 'Content-Type': 'application/json', ...options?.headers } })

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),

      selectedCharacter: 'yeonghan',
      setCharacter: (id) => set({ selectedCharacter: id }),

      currentSceneId: CHARACTER_META.yeonghan.initialScene,
      affection: 0,
      flags: {},

      typingSpeed: 40,
      setTypingSpeed: (v) => set({ typingSpeed: v }),

      goToScene: (id, affectionDelta = 0) =>
        set((s) => ({
          currentSceneId: id,
          affection: Math.min(100, Math.max(0, s.affection + affectionDelta)),
        })),

      setFlag: (key, value) =>
        set((s) => ({ flags: { ...s.flags, [key]: value } })),

      resetGame: () => {
        const character = get().selectedCharacter
        set({ currentSceneId: CHARACTER_META[character].initialScene, affection: 0, flags: {} })
      },

      cloudSave: async () => {
        const { currentSceneId, affection, flags, selectedCharacter } = get()
        await apiFetch('/api/save', {
          method: 'POST',
          body: JSON.stringify({ scene_id: currentSceneId, affection, flags, selected_character: selectedCharacter }),
        })
      },

      cloudLoad: async () => {
        const res = await apiFetch('/api/save')
        if (!res.ok) return
        const data = await res.json()
        if (data) {
          set({
            currentSceneId: data.scene_id,
            affection: data.affection,
            flags: data.flags ?? {},
            selectedCharacter: data.selected_character ?? 'yeonghan',
          })
        }
      },
    }),
    {
      name: 'miyeonssi-local',
      partialize: (s) => ({
        currentSceneId: s.currentSceneId,
        affection: s.affection,
        flags: s.flags,
        selectedCharacter: s.selectedCharacter,
        typingSpeed: s.typingSpeed,
      }),
    }
  )
)
