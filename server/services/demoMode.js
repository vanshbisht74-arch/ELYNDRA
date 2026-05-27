/**
 * Demo Mode Responses for Elyndra
 * Returns structured JSON matching the expected frontend schema.
 */
class DemoMode {
  generateResponse(payload) {
    const { player, game, choice } = payload;

    // Default fallback
    const fallback = {
      narration: "The mists of Elyndra react to your presence, swirling with a faint indigo light. The path ahead remains veiled, but you feel the weight of your decision settle into the world's memory.",
      speaker: "Lyra",
      dialogue: "I felt that too... the Aether is shifting. Whatever you're doing, Traveler, the world is listening.",
      emotion: "mysterious",
      choices: [
        { id: "continue", text: "Push forward into the unknown", tone: "bold", nextScene: "awakening" }
      ],
      rewards: { xp: 20, coins: 5, items: [] },
      affinityChanges: [{ npc: "Lyra", change: 1, reason: "Trusting the flow of Aether" }]
    };

    // Simple routing for demo purposes
    if (choice && choice.id === 'help-creature') {
        return {
            narration: "You lift the fallen pillar using a surge of aetheric energy. The Iridescent sky-creature chirps happily, nudging a glowing vial toward you before vanishing into the dawn clouds.",
            speaker: "Lyra",
            dialogue: "That was truly brave, Arin. Most would have just kept running. The Aether responds to kindness.",
            emotion: "joyful",
            choices: [
                { id: "continue-to-observatory", text: "Continue to the Observatory", tone: "bold", nextScene: "observatory-arrival" }
            ],
            rewards: { xp: 50, coins: 10, items: ['item-5'] },
            affinityChanges: [{ npc: "Lyra", change: 10, reason: "Showed compassion to a wounded soul" }],
            memoryUpdates: [{ npc: "Lyra", memory: "You prioritized mercy over haste." }]
        };
    }

    return fallback;
  }
}

module.exports = new DemoMode();
