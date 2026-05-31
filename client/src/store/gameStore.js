import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useGameStore = create(
  persist(
    (set) => ({
      player: {
        name: '',
        avatar: '',
        aetherPath: '',
        level: 1,
        xp: 0,
        health: 100,
        aether: 100,
        coins: 50
      },
      game: {
        started: false,
        currentChapter: 'prologue',
        currentScene: 'awakening',
        currentRegion: 'starfall-reach',
        endingFlags: []
      },
      inventory: ['item-1', 'item-2', 'item-3'],
      activeQuests: ['q1'], // Fix: Use correct IDs from quests.js
      completedQuests: [],
      unlockedRegions: ['starfall-reach'],
      companions: {
        'Lyra': {
          affinity: 10,
          bondLevel: 'Acquaintance',
          memories: [],
          gifts: [],
          mood: 'curious'
        }
      },
      memoryTimeline: [],
      achievements: [],
      settings: {
        voiceEnabled: true,
        autoNarrate: false,
        musicEnabled: false,
        volume: 0.8,
        speechRate: 1
      },

      setPlayer: (playerData) => set((state) => ({
        player: { ...state.player, ...playerData }
      })),

      startGame: () => set((state) => ({
        game: { ...state.game, started: true }
      })),

      updateGame: (gameData) => set((state) => ({
        game: { ...state.game, ...gameData }
      })),

      addToInventory: (itemId) => set((state) => ({
        inventory: [...state.inventory, itemId]
      })),

      removeFromInventory: (itemId) => set((state) => {
        const index = state.inventory.indexOf(itemId);
        if (index > -1) {
          const newInventory = [...state.inventory];
          newInventory.splice(index, 1);
          return { inventory: newInventory };
        }
        return state;
      }),

      addXP: (amount) => set((state) => {
        const newXP = state.player.xp + amount;
        const newLevel = Math.floor(newXP / 100) + 1;
        return {
          player: { ...state.player, xp: newXP, level: newLevel }
        };
      }),

      addCoin: (amount) => set((state) => ({
        player: { ...state.player, coins: state.player.coins + amount }
      })),

      addQuest: (questId) => set((state) => ({
        activeQuests: Array.from(new Set([...state.activeQuests, questId]))
      })),

      completeQuest: (questId) => set((state) => ({
        activeQuests: state.activeQuests.filter(id => id !== questId),
        completedQuests: [...state.completedQuests, questId]
      })),

      updateCompanion: (name, data) => set((state) => ({
        companions: {
          ...state.companions,
          [name]: { ...state.companions[name], ...data }
        }
      })),

      addMemory: (memory) => set((state) => ({
        memoryTimeline: [memory, ...state.memoryTimeline]
      })),

      resetGame: () => set({
        player: { name: '', avatar: '', aetherPath: '', level: 1, xp: 0, health: 100, aether: 100, coins: 50 },
        game: { started: false, currentChapter: 'prologue', currentScene: 'awakening', currentRegion: 'starfall-reach', endingFlags: [] },
        inventory: ['item-1', 'item-2', 'item-3'],
        activeQuests: ['q1'],
        completedQuests: [],
        unlockedRegions: ['starfall-reach'],
        memoryTimeline: [],
        achievements: []
      })
    }),
    {
      name: 'elyndra-game-state',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
