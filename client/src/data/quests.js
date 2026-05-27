export const QUESTS = {
  'q1': {
    id: 'q1',
    title: 'The Girl Beneath the Falling Stars',
    description: 'Follow Lyra through Starfall Reach and uncover why you bear the Aether Mark.',
    status: 'active',
    objectives: [
      { id: 'o1', text: 'Follow Lyra', completed: false },
      { id: 'o2', text: 'Reach the Observatory', completed: false }
    ],
    rewards: { xp: 100, coins: 50 }
  },
  'sq-mercy': {
    id: 'sq-mercy',
    title: 'Mercy Above the Clouds',
    description: 'Help the wounded sky-creature in Starfall Reach.',
    status: 'available',
    rewards: { xp: 50, items: ['item-5'] }
  }
};
