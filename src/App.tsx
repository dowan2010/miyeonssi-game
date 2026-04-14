import { useEffect, useState } from 'react'
import { fetchMe } from './auth'
import { useGameStore } from './store/gameStore'
import LoginPage from './components/LoginPage'
import TitleScreen from './components/TitleScreen'
import CharacterSelectScreen from './components/CharacterSelectScreen'
import SettingsScreen from './components/SettingsScreen'
import GameScreen from './components/GameScreen'

type Screen = 'title' | 'character-select' | 'settings' | 'game'

export default function App() {
  const { user, setUser, cloudLoad } = useGameStore()
  const [screen, setScreen] = useState<Screen>('title')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMe().then(async (u) => {
      setUser(u)
      if (u) await cloudLoad()
      setLoading(false)
    })
  }, [setUser, cloudLoad])

  if (loading) return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <span className="text-white/40 text-sm animate-pulse">로딩 중…</span>
    </div>
  )

  if (!user) return (
    <div className="w-screen h-screen font-gothic">
      <LoginPage />
    </div>
  )

  return (
    <div className="w-screen h-screen font-gothic">
      {screen === 'title' && (
        <TitleScreen
          onContinue={() => setScreen('game')}
          onNewGame={() => setScreen('character-select')}
          onSettings={() => setScreen('settings')}
        />
      )}
      {screen === 'character-select' && (
        <CharacterSelectScreen
          onStart={() => setScreen('game')}
          onBack={() => setScreen('title')}
        />
      )}
      {screen === 'settings' && (
        <SettingsScreen onBack={() => setScreen('title')} />
      )}
      {screen === 'game' && (
        <GameScreen onMenu={() => setScreen('title')} />
      )}
    </div>
  )
}
