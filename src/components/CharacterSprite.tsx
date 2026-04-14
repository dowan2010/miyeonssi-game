import type { CharacterId, Expression } from '../types'

/* ── 표정 이모지 ─────────────────────────────────────────────── */
const YEONGHAN_EXPR: Record<Expression, string> = {
  normal:      '😐',
  happy:       '😊',
  shy:         '😳',
  surprised:   '😲',
  sad:         '😢',
  angry:       '😤',
  embarrassed: '😖',
  smug:        '😏',
  explain:     '🤔',
  quiz:        '🤔',
}

const NEURO_EXPR: Record<Expression, string> = {
  normal:      '🤖',
  happy:       '😄',
  shy:         '😅',
  surprised:   '😮',
  sad:         '😟',
  angry:       '😠',
  embarrassed: '🫣',
  smug:        '😎',
  explain:     '🧐',
  quiz:        '💡',
}

/* ── 캐릭터별 스타일 ─────────────────────────────────────────── */
const SPRITE_STYLE: Record<CharacterId, {
  face: string     // 얼굴 배경 gradient
  faceBorder: string
  body: string     // 몸 배경
  bodyBorder: string
  ribbon: string   // 포인트 색상
}> = {
  yeonghan: {
    face:       'from-pink-200 to-pink-100',
    faceBorder: 'border-pink-300',
    body:       'from-slate-100 to-slate-200',
    bodyBorder: 'border-slate-300',
    ribbon:     'bg-red-400',
  },
  neuro: {
    face:       'from-cyan-200 to-blue-100',
    faceBorder: 'border-cyan-300',
    body:       'from-cyan-50 to-blue-100',
    bodyBorder: 'border-cyan-300',
    ribbon:     'bg-cyan-500',
  },
}

interface Props {
  character: CharacterId
  expression?: Expression
  visible: boolean
}

export default function CharacterSprite({ character, expression = 'normal', visible }: Props) {
  if (!visible) return null

  const exprMap = character === 'neuro' ? NEURO_EXPR : YEONGHAN_EXPR
  const style   = SPRITE_STYLE[character]

  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center select-none pointer-events-none animate-fade-in">
      {/* 얼굴 */}
      <div className={`w-36 h-36 rounded-full bg-gradient-to-b ${style.face} border-4 ${style.faceBorder} flex items-center justify-center shadow-2xl text-6xl mb-2`}>
        {exprMap[expression]}
      </div>

      {/* 몸통 */}
      <div className={`w-48 h-52 bg-gradient-to-b ${style.body} rounded-t-[60px] border-2 ${style.bodyBorder} shadow-xl flex flex-col items-center pt-4 gap-1`}>
        {/* 포인트 아이템 */}
        <div className={`w-8 h-5 ${style.ribbon} rounded-sm`} />
        <div className="w-32 h-1 bg-slate-400/40 rounded mt-2" />
        <div className="w-32 h-1 bg-slate-400/40 rounded mt-1" />
        {/* 뉴로 전용: 배지 */}
        {character === 'neuro' && (
          <div className="mt-2 px-2 py-0.5 bg-cyan-500/30 rounded-full text-cyan-300 text-[10px] border border-cyan-400/30">
            AI Guide
          </div>
        )}
      </div>
    </div>
  )
}
