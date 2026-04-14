import { useGameStore } from '../store/gameStore'
import { CHARACTER_META } from '../types'
import { logout } from '../auth'

interface Props {
  onContinue: () => void    // 이어하기 → 바로 게임
  onNewGame: () => void     // 새 게임 → 캐릭터 선택
  onSettings: () => void
}

const SAKURA = ['🌸', '🌺', '🌼', '🌷', '✿']

export default function TitleScreen({ onContinue, onNewGame, onSettings }: Props) {
  const { user, selectedCharacter, currentSceneId, cloudSave } = useGameStore()

  const meta = CHARACTER_META[selectedCharacter]
  const isNewGame = currentSceneId === meta.initialScene

  const handleLogout = () => {
    cloudSave().finally(() => logout())
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-black flex flex-col items-center justify-between py-12 px-6">

      {/* 벚꽃 파티클 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 28 }).map((_, i) => (
          <span
            key={i}
            className="absolute opacity-20 animate-bounce text-lg select-none"
            style={{
              left: `${(i * 19 + 3) % 100}%`,
              top: `${(i * 11 + 7) % 90}%`,
              animationDuration: `${2.5 + (i % 5) * 0.5}s`,
              animationDelay: `${(i * 0.25) % 2.5}s`,
            }}
          >
            {SAKURA[i % SAKURA.length]}
          </span>
        ))}
      </div>

      {/* 상단: 유저 정보 */}
      <div className="relative z-10 w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          {user?.photoUrl && (
            <img src={user.photoUrl} className="w-7 h-7 rounded-full border border-white/30" />
          )}
          <span className="text-white/50 text-xs">{user?.name}</span>
        </div>
        <button
          onClick={handleLogout}
          className="text-white/30 text-xs hover:text-white/70 transition-colors"
        >
          로그아웃
        </button>
      </div>

      {/* 중앙: 타이틀 */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="w-28 h-28 rounded-full bg-gradient-to-b from-pink-200 to-pink-100 border-4 border-pink-300 flex items-center justify-center text-6xl shadow-2xl animate-pulse-heart">
          🌸
        </div>
        <div className="text-center">
          <p className="text-pink-300 text-xs tracking-[0.3em] font-light mb-2 uppercase">Visual Novel</p>
          <h1 className="text-white text-4xl font-bold drop-shadow-2xl leading-tight">
            김영한과 함께
          </h1>
          <p className="text-white/40 text-sm mt-2 tracking-wider">봄날의 이야기</p>
        </div>
      </div>

      {/* 하단: 메뉴 */}
      <div className="relative z-10 w-full max-w-xs flex flex-col gap-3">

        {/* 이어하기 (세이브 있을 때) */}
        {!isNewGame && (
          <button
            onClick={onContinue}
            className="
              w-full py-4 px-6
              bg-pink-600/80 backdrop-blur-sm
              text-white text-base font-bold
              rounded-2xl border border-pink-400/60
              hover:bg-pink-500 active:scale-95
              transition-all duration-150 shadow-xl
              flex items-center justify-center gap-2
            "
          >
            <span>▶</span>
            이어하기
            <span className="text-pink-200 text-xs ml-1 opacity-80">
              ({meta.name})
            </span>
          </button>
        )}

        {/* 스토리 모드 / 처음부터 → 캐릭터 선택 */}
        <button
          onClick={onNewGame}
          className="
            w-full py-4 px-6
            bg-white/10 backdrop-blur-sm
            text-white text-base font-semibold
            rounded-2xl border border-white/20
            hover:bg-white/20 active:scale-95
            transition-all duration-150 shadow-xl
            flex items-center justify-center gap-2
          "
        >
          {isNewGame
            ? <><span>🌸</span> 스토리 모드 시작</>
            : <><span>↩</span> 처음부터 (캐릭터 선택)</>}
        </button>

        {/* 설정 */}
        <button
          onClick={onSettings}
          className="
            w-full py-3 px-6
            bg-white/5 backdrop-blur-sm
            text-white/70 text-sm font-medium
            rounded-2xl border border-white/10
            hover:bg-white/10 hover:text-white active:scale-95
            transition-all duration-150
            flex items-center justify-center gap-2
          "
        >
          <span>⚙️</span> 설정
        </button>
      </div>
    </div>
  )
}
