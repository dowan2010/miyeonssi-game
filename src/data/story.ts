import type { CharacterId, Scene } from '../types'
import { yeonghanScenes } from './story-yeonghan'
import { neuroScenes } from './story-neuro'

const STORIES: Record<CharacterId, Record<string, Scene>> = {
  yeonghan: yeonghanScenes,
  neuro: neuroScenes,
}

export const getScene = (id: string, character: CharacterId): Scene => {
  const story = STORIES[character]
  const initialKey = Object.keys(story)[0]
  return story[id] ?? story[initialKey]
}
