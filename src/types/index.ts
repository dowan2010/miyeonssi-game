export type Background =
  | 'classroom'
  | 'rooftop'
  | 'corridor'
  | 'park'
  | 'cafe'
  | 'home'
  | 'office'
  | 'server'
  | 'black';

export type Expression =
  | 'normal'
  | 'happy'
  | 'shy'
  | 'surprised'
  | 'sad'
  | 'angry'
  | 'embarrassed'
  | 'smug'
  | 'explain'
  | 'quiz';

export type CharacterId = 'yeonghan' | 'neuro'

export interface CharacterMeta {
  id: CharacterId
  name: string
  tagline: string
  description: string
  emoji: string
  accentColor: string       // tailwind color class prefix (e.g. 'pink', 'cyan')
  meterLabel: string        // '호감도' | '이해도'
  initialScene: string
}

export const CHARACTER_META: Record<CharacterId, CharacterMeta> = {
  yeonghan: {
    id: 'yeonghan',
    name: '김영한',
    tagline: '봄날의 이야기',
    description: '쿨하고 츤데레한 그녀와 함께하는\n4월의 학원 러브 스토리',
    emoji: '😊',
    accentColor: 'pink',
    meterLabel: '호감도',
    initialScene: 'intro_01',
  },
  neuro: {
    id: 'neuro',
    name: '뉴로우',
    tagline: 'CSR을 꿰뚫는 그녀',
    description: 'CSR에 진심인 활발한 뉴로우와 함께하는\n컴퓨터실의 두근두근 러브 스토리',
    emoji: '🌟',
    accentColor: 'cyan',
    meterLabel: '호감도',
    initialScene: 'neuro_01',
  },
}

export interface Choice {
  text: string
  next: string
  affectionDelta?: number
}

export interface Scene {
  id: string
  background: Background
  speaker?: '김영한' | '뉴로우' | '선생님' | '나레이터'
  expression?: Expression
  text: string
  choices?: Choice[]
  next?: string
  affectionDelta?: number
}

export interface SaveData {
  currentSceneId: string
  affection: number
  flags: Record<string, boolean>
  selectedCharacter: CharacterId
  playedAt: number
}
