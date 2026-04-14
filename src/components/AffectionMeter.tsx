import type { CharacterId } from '../types'
import { CHARACTER_META } from '../types'

const YEONGHAN_LABELS = ['무관심 😶', '친구 🤝', '썸 💓', '연인 💕']
const NEURO_LABELS    = ['무관심 😶', '친구 🤝', '썸 💙', '연인 💕']

interface Props {
  affection: number
  character: CharacterId
}

export default function AffectionMeter({ affection, character }: Props) {
  const labels = character === 'neuro' ? NEURO_LABELS : YEONGHAN_LABELS
  const label = affection >= 90 ? labels[3]
    : affection >= 60 ? labels[2]
    : affection >= 30 ? labels[1]
    : labels[0]

  const meta = CHARACTER_META[character]
  const barColor = character === 'neuro'
    ? 'from-cyan-400 to-blue-400'
    : 'from-pink-400 to-red-400'

  return (
    <div className="absolute top-4 right-4 flex flex-col items-end gap-1 select-none">
      <span className="text-white text-xs font-medium opacity-80 drop-shadow">
        {meta.meterLabel} {affection} — {label}
      </span>
      <div className="w-40 h-3 bg-black/40 rounded-full overflow-hidden border border-white/20">
        <div
          className={`h-full bg-gradient-to-r ${barColor} rounded-full transition-all duration-700`}
          style={{ width: `${affection}%` }}
        />
      </div>
    </div>
  )
}
