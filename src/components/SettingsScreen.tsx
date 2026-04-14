import { useGameStore } from '../store/gameStore'

interface Props {
  onBack: () => void
}

const SPEED_OPTIONS = [
  { label: '빠름', value: 20, desc: '타닥타닥' },
  { label: '보통', value: 40, desc: '또각또각' },
  { label: '느림', value: 75, desc: '천천히...' },
]

export default function SettingsScreen({ onBack }: Props) {
  const { typingSpeed, setTypingSpeed, affection, currentSceneId, resetGame } = useGameStore()

  const handleReset = () => {
    const ok = window.confirm('정말 처음부터 시작할까요?\n현재 진행 상황이 모두 사라져요.')
    if (ok) {
      resetGame()
      onBack()
    }
  }

  const affectionLabel =
    affection >= 90 ? '연인 💕'
    : affection >= 60 ? '썸 💓'
    : affection >= 30 ? '친구 🤝'
    : '무관심 😶'

  return (
    <div className="relative w-full h-full overflow-hidden bg-black flex flex-col">

      {/* 헤더 */}
      <div className="flex items-center gap-4 px-6 pt-10 pb-6">
        <button
          onClick={onBack}
          className="text-white/60 hover:text-white transition-colors text-lg"
        >
          ← 뒤로
        </button>
        <h2 className="text-white text-xl font-bold">설정</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-6 flex flex-col gap-6">

        {/* ── 현재 상태 ─────────────────────────────────── */}
        <section className="bg-white/5 rounded-2xl border border-white/10 p-5">
          <h3 className="text-white/60 text-xs font-semibold tracking-widest uppercase mb-4">현재 플레이 상태</h3>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-white/70 text-sm">호감도</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-400 to-red-400 rounded-full transition-all duration-500"
                    style={{ width: `${affection}%` }}
                  />
                </div>
                <span className="text-pink-300 text-xs font-bold w-16 text-right">{affectionLabel}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70 text-sm">진행 씬</span>
              <span className="text-white/40 text-xs font-mono">{currentSceneId}</span>
            </div>
          </div>
        </section>

        {/* ── 타이핑 속도 ────────────────────────────────── */}
        <section className="bg-white/5 rounded-2xl border border-white/10 p-5">
          <h3 className="text-white/60 text-xs font-semibold tracking-widest uppercase mb-4">타이핑 속도</h3>
          <div className="flex gap-2">
            {SPEED_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setTypingSpeed(opt.value)}
                className={`
                  flex-1 py-3 rounded-xl border text-sm font-medium transition-all duration-150 flex flex-col items-center gap-1
                  ${typingSpeed === opt.value
                    ? 'bg-pink-600/70 border-pink-400 text-white shadow-lg scale-105'
                    : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white/80'
                  }
                `}
              >
                <span>{opt.label}</span>
                <span className="text-xs opacity-60">{opt.desc}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ── 세이브 ────────────────────────────────────── */}
        <section className="bg-white/5 rounded-2xl border border-white/10 p-5">
          <h3 className="text-white/60 text-xs font-semibold tracking-widest uppercase mb-4">데이터</h3>
          <button
            onClick={handleReset}
            className="
              w-full py-3 px-5
              bg-red-900/40 border border-red-500/30
              text-red-300 text-sm font-medium
              rounded-xl hover:bg-red-800/50 hover:border-red-400/50
              active:scale-95 transition-all duration-150
            "
          >
            🗑️  처음부터 시작 (데이터 초기화)
          </button>
        </section>

        {/* ── 크레딧 ────────────────────────────────────── */}
        <section className="bg-white/5 rounded-2xl border border-white/10 p-5 mb-6">
          <h3 className="text-white/60 text-xs font-semibold tracking-widest uppercase mb-3">크레딧</h3>
          <div className="text-white/30 text-xs flex flex-col gap-1">
            <p>🌸 김영한과 함께 — 봄날의 이야기</p>
            <p>스토리 · 캐릭터 © 제작자</p>
            <p>엔진 · 개발 Claude Code</p>
          </div>
        </section>
      </div>
    </div>
  )
}
