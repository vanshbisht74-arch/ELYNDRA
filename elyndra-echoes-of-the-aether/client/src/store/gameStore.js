import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = {
  player: {
    name: "",
    avatar: "",
    aetherPath: "",
    level: 1,
    xp: 0,
    health: 100,
    aether: 100,
    coins: 50,
  },
  game: {
    started: false,
    currentChapter: "prologue",
    currentScene: "awakening",
    currentRegion: "starfall-reach",
    endingFlags: [],
  },
  inventory: [
    { id: 'item-1', name: 'Traveler\'s Satchel', description: 'A sturdy leather bag for your journey.', rarity: 'common', type: 'quest' },
    { id: 'item-2', name: 'Star Compass', description: 'An ancient device that points toward the Aetherwell.', rarity: 'rare', type: 'quest' },
    { id: 'item-3', name: 'Small Healing Draught', description: 'Restores 20 Health.', rarity: 'common', type: 'consumable', effect: { health: 20 } },
    { id: 'item-4', name: 'Ancient Shard Fragment', description: 'A pulsing remnant of the Aetherwell.', rarity: 'epic', type: 'quest' },
  ],
  activeQuests: [
    {
      id: 'q1',
      title: 'The Girl Beneath the Falling Stars',
      description: 'Follow Lyra through Starfall Reach and uncover why you bear the Aether Mark.',
      status: 'active',
      objectives: [
        { id: 'o1', text: 'Follow Lyra', completed: false },
        { id: 'o2', text: 'Reach the Observatory', completed: false }
      ]
    }
  ],
  completedQuests: [],
  unlockedRegions: ["starfall-reach"],
  companions: {
    "Lyra": {
      affinity: 0,
      bondLevel: "Stranger",
      memories: [],
      gifts: [],
      mood: "curious"
    }
  },
  storyHistory: [],
  memoryTimeline: [],
  achievements: [],
  settings: {
    voiceEnabled: true,
    autoNarrate: false,
    musicEnabled: false,
    volume: 0.8,
    speechRate: 1
  }
};

export const useGameStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      setPlayer: (playerData) =>
        set((state) => ({ player: { ...state.player, ...playerData } })),

      updateGame: (gameData) =>
        set((state) => ({ game: { ...state.game, ...gameData } })),

      startGame: (playerDetails) =>
        set((state) => ({
          player: { ...state.player, ...playerDetails },
          game: { ...state.game, started: true }
        })),

      resetGame: () => set(initialState),

      updateHealth: (change) =>
        set((state) => ({
          player: { ...state.player, health: Math.max(0, Math.min(100, state.player.health + change)) }
        })),

      updateAether: (change) =>
        set((state) => ({
          player: { ...state.player, aether: Math.max(0, Math.min(100, state.player.aether + change)) }
        })),

      addXP: (amount) =>
        set((state) => {
          const newXP = state.player.xp + amount;
          const levelUp = newXP >= state.player.level * 100;
          return {
            player: {
              ...state.player,
              xp: levelUp ? newXP - (state.player.level * 100) : newXP,
              level: levelUp ? state.player.level + 1 : state.player.level
            }
          };
        }),

      addCoin: (amount) =>
        set((state) => ({ player: { ...state.player, coins: state.player.coins + amount } })),

      addToInventory: (item) =>
        set((state) => ({ inventory: [...state.inventory, item] })),

      updateCompanion: (name, data) =>
        set((state) => ({
          companions: {
            ...state.companions,
            [name]: { ...state.companions[name], ...data }
          }
        })),

      addMemory: (memory) =>
        set((state) => ({ memoryTimeline: [...state.memoryTimeline, memory] })),

      updateSettings: (newSettings) =>
        set((state) => ({ settings: { ...state.settings, ...newSettings } })),

      addStoryEvent: (event) =>
        set((state) => ({ storyHistory: [...state.storyHistory, event] }))
    }),
    {
      name: 'elyndra-game-save',
    }
  )
);
