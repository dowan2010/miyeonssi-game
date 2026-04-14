import type { Choice } from '../types'

interface Props {
  show: boolean
  /** 복수 선택지가 있을 때 */
  choices?: Choice[]
  onSelect: (choice: Choice) => void
  /** 단일 진행(next만 있을 때) */
  hasContinue: boolean
  onContinue: () => void
}

export default function ChoiceBox({
  show,
  choices,
  onSelect,
  hasContinue,
  onContinue,
}: Props) {
  if (!show) return null

  /* ── 복수 선택지 ─────────────────────────────────────────── */
  if (choices && choices.length > 0) {
    return (
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-3 flex flex-col gap-2 animate-slide-up">
        {choices.map((choice, i) => (
          <button
            key={i}
            onClick={() => onSelect(choice)}
            className="
              w-full py-3 px-5
              bg-black/75 backdrop-blur-sm
              text-white text-sm font-medium text-left
              rounded-xl border border-pink-400/40
              hover:bg-pink-700/60 hover:border-pink-400
              active:scale-[0.98]
              transition-all duration-150 shadow-lg
            "
          >
            <span className="text-pink-300 font-bold mr-2">{i + 1}.</span>
            {choice.text}
            {typeof choice.affectionDelta === 'number' && choice.affectionDelta !== 0 && (
              <span className={`ml-2 text-xs ${choice.affectionDelta > 0 ? 'text-pink-400' : 'text-gray-400'}`}>
                {choice.affectionDelta > 0 ? `+${choice.affectionDelta}` : choice.affectionDelta} 💕
              </span>
            )}
          </button>
        ))}
      </div>
    )
  }

  /* ── 단일 계속하기 버튼 ──────────────────────────────────── */
  if (hasContinue) {
    return (
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-3 flex justify-end animate-slide-up">
        <button
          onClick={onContinue}
          className="
            py-2 px-6
            bg-pink-600/80 backdrop-blur-sm
            text-white text-sm font-semibold
            rounded-full border border-pink-400/60
            hover:bg-pink-500 active:scale-95
            transition-all duration-150 shadow-lg
            flex items-center gap-2
          "
        >
          계속하기 <span className="text-base">▶</span>
        </button>
      </div>
    )
  }

  return null
}
