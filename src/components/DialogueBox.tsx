import { useEffect, useRef, useState } from 'react'
import { useGameStore } from '../store/gameStore'

interface Props {
  speaker?: string
  text: string
  /** 타이핑이 끝났을 때 호출 — 버튼 표시 트리거 */
  onDone: () => void
}

export default function DialogueBox({ speaker, text, onDone }: Props) {
  const typingSpeed = useGameStore((s) => s.typingSpeed)
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    setDisplayed('')
    setDone(false)

    let i = 0
    intervalRef.current = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(intervalRef.current!)
        setDone(true)
        onDoneRef.current()
      }
    }, typingSpeed)

    return () => clearInterval(intervalRef.current!)
  }, [text, typingSpeed])

  /** 클릭 = 타이핑 스킵만. 진행은 버튼으로. */
  const skipTyping = () => {
    if (done) return
    clearInterval(intervalRef.current!)
    setDisplayed(text)
    setDone(true)
    onDoneRef.current()
  }

  return (
    <div
      className="absolute bottom-0 left-0 right-0 select-none animate-slide-up"
      onClick={skipTyping}
    >
      {/* 화자 이름 */}
      {speaker && speaker !== '나레이터' && (
        <div className="inline-block ml-8 mb-1 px-4 py-1 bg-pink-500 text-white text-sm font-bold rounded-t-lg shadow">
          {speaker}
        </div>
      )}

      {/* 텍스트 박스 */}
      <div className="mx-4 p-5 bg-black/80 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl min-h-[90px]">
        <p className="text-white text-base leading-relaxed font-gothic whitespace-pre-line">
          {displayed}
          {!done && <span className="animate-pulse ml-0.5 opacity-60">▌</span>}
        </p>
        {!done && (
          <p className="text-right text-white/25 text-xs mt-1">탭하면 스킵</p>
        )}
      </div>
    </div>
  )
}
