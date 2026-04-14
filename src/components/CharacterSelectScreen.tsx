import { useGameStore } from '../store/gameStore'
import { CHARACTER_META, type CharacterId } from '../types'

interface Props {
  onStart: () => void
  onBack: () => void
}

const CARD_STYLES: Record<CharacterId, {
  bg: string
  border: string
  badge: string
  btn: string
  glow: string
}> = {
  yeonghan: {
    bg: 'bg-gradient-to-b from-pink-950/60 to-purple-950/60',
    border: 'border-pink-400/30 hover:border-pink-400/70',
    badge: 'bg-pink-500/20 text-pink-300 border-pink-400/30',
    btn: 'bg-pink-600/80 hover:bg-pink-500 border-pink-400/60',
    glow: 'shadow-pink-500/20',
  },
  neuro: {
    bg: 'bg-gradient-to-b from-cyan-950/60 to-blue-950/60',
    border: 'border-cyan-400/30 hover:border-cyan-400/70',
    badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30',
    btn: 'bg-cyan-600/80 hover:bg-cyan-500 border-cyan-400/60',
    glow: 'shadow-cyan-500/20',
  },
}

export default function CharacterSelectScreen({ onStart, onBack }: Props) {
  const { setCharacter, resetGame } = useGameStore()

  const handleSelect = (id: CharacterId) => {
    setCharacter(id)
    resetGame()
    onStart()
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-black flex flex-col">

      {/* 별빛 배경 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${(i % 3) + 1}px`,
              height: `${(i % 3) + 1}px`,
              left: `${(i * 23 + 7) % 100}%`,
              top: `${(i * 17 + 3) % 90}%`,
              opacity: 0.1 + (i % 4) * 0.07,
            }}
          />
        ))}
      </div>

      {/* 헤더 */}
      <div className="relative z-10 flex items-center gap-4 px-6 pt-10 pb-2">
        <button
          onClick={onBack}
          className="text-white/50 hover:text-white transition-colors text-sm"
        >
          ← 뒤로
        </button>
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 pt-4 pb-2">
        <p className="text-white/40 text-xs tracking-widest uppercase mb-1">Select Character</p>
        <h2 className="text-white text-2xl font-bold">누구와 함께할까요?</h2>
      </div>

      {/* 캐릭터 카드 목록 */}
      <div className="relative z-10 flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4">
        {(Object.keys(CHARACTER_META) as CharacterId[]).map((id) => {
          const meta = CHARACTER_META[id]
          const style = CARD_STYLES[id]

          return (
            <div
              key={id}
              className={`
                rounded-3xl border backdrop-blur-sm p-5
                flex items-center gap-5
                transition-all duration-200 cursor-pointer
                shadow-2xl ${style.glow} ${style.bg} ${style.border}
                active:scale-[0.98]
              `}
              onClick={() => handleSelect(id)}
            >
              {/* 캐릭터 아바타 */}
              <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-5xl shadow-inner">
                {meta.emoji}
              </div>

              {/* 정보 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-white text-lg font-bold">{meta.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${style.badge}`}>
                    {meta.tagline}
                  </span>
                </div>
                <p className="text-white/55 text-xs leading-relaxed whitespace-pre-line">
                  {meta.description}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-white/30 text-xs">{meta.meterLabel} 시스템</span>
                  <span className="text-white/20 text-xs">·</span>
                  <span className="text-white/30 text-xs">선택지 기반 스토리</span>
                </div>
              </div>

              {/* 선택 화살표 */}
              <div className="flex-shrink-0 text-white/30 text-xl">›</div>
            </div>
          )
        })}
      </div>

      {/* 하단 안내 */}
      <div className="relative z-10 px-6 pb-8 text-center">
        <p className="text-white/20 text-xs">카드를 탭하면 바로 시작해요</p>
      </div>
    </div>
  )
}
