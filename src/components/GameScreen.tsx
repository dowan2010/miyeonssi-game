import { useState, useCallback } from 'react'
import type React from 'react'
import { useGameStore } from '../store/gameStore'
import { getScene } from '../data/story'
import type { Choice } from '../types'
import CharacterSprite from './CharacterSprite'
import DialogueBox from './DialogueBox'
import ChoiceBox from './ChoiceBox'
import AffectionMeter from './AffectionMeter'

interface Props {
  onMenu: () => void
}

// 장소별 배경 그라디언트
const BG_STYLE: Record<string, React.CSSProperties> = {
  black: { background: '#000000' },

  // 교실 — 오후 햇살이 드는 따뜻한 호박빛
  classroom: {
    background: `
      radial-gradient(ellipse 80% 40% at 70% 0%, #3d2a0a44 0%, transparent 70%),
      linear-gradient(175deg, #1c1407 0%, #2c1e0c 45%, #1a1205 100%)
    `,
  },

  // 옥상 — 노을 지는 보라-주황 하늘
  rooftop: {
    background: `
      radial-gradient(ellipse 100% 50% at 60% 0%, #5c1e0a55 0%, transparent 65%),
      radial-gradient(ellipse 60% 40% at 20% 10%, #2a083855 0%, transparent 60%),
      linear-gradient(180deg, #0e0318 0%, #200a24 20%, #3a1810 55%, #100808 100%)
    `,
  },

  // 복도 — 형광등 아래 차가운 청회색
  corridor: {
    background: `
      radial-gradient(ellipse 30% 60% at 50% 20%, #1a2a3a44 0%, transparent 70%),
      linear-gradient(175deg, #08101c 0%, #0d1a2c 50%, #08101c 100%)
    `,
  },

  // 공원 — 수풀 사이 스며드는 달빛
  park: {
    background: `
      radial-gradient(ellipse 70% 50% at 50% 0%, #0a1e0c55 0%, transparent 65%),
      radial-gradient(ellipse 40% 30% at 80% 30%, #0e2a1044 0%, transparent 60%),
      linear-gradient(170deg, #050e06 0%, #0c1e0d 48%, #050e06 100%)
    `,
  },

  // 카페 — 앰버 조명의 따스한 모카
  cafe: {
    background: `
      radial-gradient(ellipse 60% 50% at 50% 30%, #2e180644 0%, transparent 70%),
      linear-gradient(170deg, #140d04 0%, #221608 48%, #140d04 100%)
    `,
  },

  // 집 — 인디고 빛 방
  home: {
    background: `
      radial-gradient(ellipse 50% 40% at 50% 20%, #1a0c3044 0%, transparent 70%),
      linear-gradient(170deg, #0c0818 0%, #180e2c 48%, #0c0818 100%)
    `,
  },

  // 오피스 — 네이비 블루 도시야경
  office: {
    background: `
      radial-gradient(ellipse 80% 40% at 50% 0%, #0a183055 0%, transparent 65%),
      linear-gradient(170deg, #050a1c 0%, #0a1428 48%, #050a1c 100%)
    `,
  },

  // 서버룸 — 어두운 청록 테크
  server: {
    background: `
      radial-gradient(ellipse 50% 50% at 50% 50%, #073020 22 0%, transparent 70%),
      linear-gradient(170deg, #030d12 0%, #071c22 48%, #030d12 100%)
    `,
  },
}

// 장소별 분위기 오버레이
const BG_OVERLAY: Record<string, string> = {
  classroom: 'bg-amber-900/5',
  rooftop:   'bg-purple-900/10',
  corridor:  'bg-blue-900/10',
  park:      'bg-green-900/10',
  cafe:      'bg-amber-900/10',
  home:      'bg-indigo-900/10',
  office:    'bg-blue-900/15',
  server:    'bg-teal-900/10',
}

const BG_LABEL: Record<string, string> = {
  classroom: '📚 교실',
  rooftop:   '🌅 옥상',
  corridor:  '🏫 복도',
  park:      '🌳 공원',
  cafe:      '☕ 카페',
  home:      '🏠 집',
  office:    '🏢 오피스',
  server:    '🖥️ 서버룸',
}

export default function GameScreen({ onMenu }: Props) {
  const {
    currentSceneId,
    affection,
    selectedCharacter,
    goToScene,
    cloudSave,
    user,
  } = useGameStore()

  const scene = getScene(currentSceneId, selectedCharacter)
  const [textDone, setTextDone] = useState(false)
  const [prevSceneId, setPrevSceneId] = useState(currentSceneId)

  if (prevSceneId !== currentSceneId) {
    setPrevSceneId(currentSceneId)
    setTextDone(false)
  }

  const handleNext = useCallback(() => {
    if (scene.next) goToScene(scene.next, scene.affectionDelta)
  }, [scene, goToScene])

  const handleChoice = useCallback(
    (choice: Choice) => {
      goToScene(choice.next, (choice.affectionDelta ?? 0) + (scene.affectionDelta ?? 0))
    },
    [scene, goToScene]
  )

  const bgStyle = BG_STYLE[scene.background] ?? BG_STYLE.black
  const bgOverlay = BG_OVERLAY[scene.background] ?? ''
  const showCharacter = scene.speaker === '김영한' || scene.speaker === '뉴로우'
  const showAffection = !scene.hideAffection
  const hasChoices = !!(scene.choices && scene.choices.length > 0)
  const hasContinue = !hasChoices && !!scene.next
  const isChapterEnd = textDone && !hasChoices && !scene.next

  return (
    <div style={bgStyle} className="relative w-full h-full overflow-hidden transition-all duration-1000 font-gothic">
      {/* 장소 분위기 오버레이 */}
      <div className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${bgOverlay}`} />

      {/* 위치 표시 */}
      <div className="absolute top-4 left-4 text-white/60 text-xs drop-shadow select-none">
        {scene.background !== 'black' && BG_LABEL[scene.background]}
      </div>

      {/* 호감도 / 이해도 미터 — 중요 장면에서는 숨김 */}
      {showAffection && <AffectionMeter affection={affection} character={selectedCharacter} />}

      {/* 우측 상단 버튼 */}
      <div className="absolute top-12 right-4 flex gap-3 items-center">
        <button
          onClick={() => cloudSave()}
          className="text-white/70 text-xs hover:text-white transition-colors drop-shadow"
        >
          💾
        </button>
        <button
          onClick={async () => { await cloudSave(); onMenu() }}
          className="text-white/70 text-xs hover:text-white transition-colors drop-shadow"
        >
          ☰ 메뉴
        </button>
      </div>

      {/* 유저 이름 */}
      {user && (
        <div className="absolute top-12 left-4 text-white/65 text-xs select-none drop-shadow">
          {user.name}
        </div>
      )}

      {/* 캐릭터 스프라이트 */}
      <CharacterSprite
        character={selectedCharacter}
        expression={scene.expression}
        visible={showCharacter}
      />

      {/* 대화창 */}
      <div className="absolute bottom-0 left-0 right-0">
        <DialogueBox
          key={scene.id}
          speaker={scene.speaker}
          text={scene.text}
          onDone={() => setTextDone(true)}
        />
      </div>

      {/* 선택지 / 계속하기 */}
      <ChoiceBox
        show={textDone}
        choices={hasChoices ? scene.choices : undefined}
        onSelect={handleChoice}
        hasContinue={hasContinue}
        onContinue={handleNext}
      />

      {/* 챕터 완료 오버레이 */}
      {isChapterEnd && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 gap-6">
          <p className="text-white/70 text-sm tracking-widest">— 챕터 완료 —</p>
          <button
            onClick={async () => { await cloudSave(); onMenu() }}
            className="px-8 py-3 border border-white/30 text-white/80 text-sm rounded hover:bg-white/10 transition-colors"
          >
            메뉴로 돌아가기
          </button>
        </div>
      )}
    </div>
  )
}
