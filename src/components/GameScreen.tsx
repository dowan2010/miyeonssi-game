import { useState, useCallback } from 'react'
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

const BG_STYLES: Record<string, string> = {
  black:     'bg-black',
  classroom: 'bg-black',
  rooftop:   'bg-black',
  corridor:  'bg-black',
  park:      'bg-black',
  cafe:      'bg-black',
  home:      'bg-black',
  office:    'bg-black',
  server:    'bg-black',
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

  const bgClass = BG_STYLES[scene.background] ?? 'bg-black'
  const showCharacter = scene.speaker === '김영한' || scene.speaker === '뉴로우'
  const hasChoices = !!(scene.choices && scene.choices.length > 0)
  const hasContinue = !hasChoices && !!scene.next
  const isChapterEnd = textDone && !hasChoices && !scene.next

  return (
    <div className={`relative w-full h-full overflow-hidden ${bgClass} transition-colors duration-1000 font-gothic`}>
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      {/* 위치 표시 */}
      <div className="absolute top-4 left-4 text-white/60 text-xs drop-shadow select-none">
        {scene.background !== 'black' && BG_LABEL[scene.background]}
      </div>

      {/* 호감도 / 이해도 미터 */}
      <AffectionMeter affection={affection} character={selectedCharacter} />

      {/* 우측 상단 버튼 */}
      <div className="absolute top-12 right-4 flex gap-3 items-center">
        <button
          onClick={() => cloudSave()}
          className="text-white/40 text-xs hover:text-white/80 transition-colors"
        >
          💾
        </button>
        <button
          onClick={async () => { await cloudSave(); onMenu() }}
          className="text-white/40 text-xs hover:text-white/80 transition-colors"
        >
          ☰ 메뉴
        </button>
      </div>

      {/* 유저 이름 */}
      {user && (
        <div className="absolute top-12 left-4 text-white/35 text-xs select-none">
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
