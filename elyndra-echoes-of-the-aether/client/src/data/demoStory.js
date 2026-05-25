export const DEMO_STORY = {
  'awakening': {
    narration: "The screen begins completely dark. Small glowing stars slowly appear. The darkness fades into a breathtaking view of floating ruins above an ocean of clouds.",
    dialogue: "Wake up... please... the sky is breaking again.",
    speaker: "???",
    emotion: "worried",
    choices: [
      { id: 'wake-up', text: "Open your eyes", tone: "cautious", nextScene: 'meeting-lyra' }
    ]
  },
  'meeting-lyra': {
    narration: "You wake up on a broken stone platform. Ancient pillars float in the air, and waterfalls tumble into the clouds below. A girl with silver-blue hair races toward you.",
    dialogue: "You are alive... I thought I had lost you again. Oh! I mean... you're finally awake, Traveler.",
    speaker: "Lyra",
    emotion: "joyful",
    choices: [
      { id: 'who-are-you', text: "Who are you?", tone: "cautious", nextScene: 'lyra-introduces' },
      { id: 'where-am-i', text: "Where am I?", tone: "clever", nextScene: 'lyra-explains-location' },
      { id: 'trust-lyra', text: "I'm glad you're here.", tone: "kind", nextScene: 'lyra-trust-boost', affinityChange: { npc: 'Lyra', change: 5, reason: 'You were kind upon awakening.' } }
    ]
  },
  'lyra-introduces': {
    narration: "She catches her breath, a star-shaped charm on her neck pulsing softly.",
    dialogue: "I'm Lyra. I'm a... well, a bit of an explorer. I found you drifting near the Aetherwell ruins. You were glowing.",
    speaker: "Lyra",
    emotion: "cheerful",
    choices: [
      { id: 'glowing-mark', text: "Examine the mark on your hand", tone: "cautious", nextScene: 'examine-mark' }
    ]
  },
  'examine-mark': {
    narration: "A golden-blue symbol pulses on your palm. It feels warm, resonating with the ruins around you.",
    dialogue: "That's the Aether Mark. It's been centuries since anyone bore one. We need to move—the ruins are becoming unstable.",
    speaker: "Lyra",
    emotion: "worried",
    choices: [
      { id: 'follow-lyra', text: "Follow her", tone: "bold", nextScene: 'wounded-creature' }
    ]
  },
  'wounded-creature': {
    narration: "As you cross a bridge of floating stone, you hear a pained cry. A small sky-creature with iridescent wings is trapped beneath a fallen pillar.",
    dialogue: "Wait! Do you hear that? We should hurry, but... that poor creature looks badly hurt.",
    speaker: "Lyra",
    emotion: "worried",
    choices: [
      { id: 'help-creature', text: "Help the creature", tone: "kind", nextScene: 'help-creature-result',
        memory: 'You stopped to help a wounded creature when escaping would have been easier.',
        rewards: { xp: 50, items: ['item-5'] },
        affinityChange: { npc: 'Lyra', change: 10, reason: 'You showed compassion.' }
      },
      { id: 'ignore-creature', text: "Safety first, we must go", tone: "cautious", nextScene: 'ignore-creature-result',
        memory: 'You chose survival over helping the wounded creature.',
        affinityChange: { npc: 'Lyra', change: -2, reason: 'You chose practicality over mercy.' }
      }
    ]
  },
  'help-creature-result': {
    narration: "You lift the pillar using a surge of aether. The creature chirps and hands you a glowing vial before flying into the clouds.",
    dialogue: "That was brave. Most people would have just run. You have a good heart, Traveler.",
    speaker: "Lyra",
    emotion: "joyful",
    choices: [
      { id: 'continue-to-observatory', text: "Continue to the Observatory", tone: "bold", nextScene: 'observatory-arrival' }
    ]
  },
  'ignore-creature-result': {
    narration: "You press on. Lyra looks back at the creature with a sad expression but follows your lead.",
    dialogue: "You're right... we can't save everyone. Let's just hope we find what we're looking for.",
    speaker: "Lyra",
    emotion: "worried",
    choices: [
      { id: 'continue-to-observatory-2', text: "Continue to the Observatory", tone: "bold", nextScene: 'observatory-arrival' }
    ]
  },
  'observatory-arrival': {
    narration: "You reach a massive observatory floating at the highest peak. A massive stone door stands between you and the truth, sealed by ancient magic.",
    dialogue: "This is it. The Ancient Observatory. Only someone with the Aether Mark can open this door. Are you ready?",
    speaker: "Lyra",
    emotion: "excited",
    choices: [
      { id: 'open-door', text: "Touch the door", tone: "bold", nextScene: 'observatory-inside' }
    ]
  },
  'observatory-inside': {
    narration: "The door responds to your mark, sliding open with a low hum. Inside, a shattered celestial map floats in the air, glowing with starlight.",
    dialogue: "It... it worked. Look at the map! It's pointing toward Luminara Harbor. And... is that a Shard Fragment?",
    speaker: "Lyra",
    emotion: "joyful",
    choices: [
      { id: 'take-shard', text: "Take the Shard Fragment", tone: "bold", nextScene: 'end-of-prologue',
        rewards: { xp: 100, items: ['item-4'] }
      }
    ]
  },
  'end-of-prologue': {
    narration: "As you touch the shard, a vision of a coastal city with turquoise canals flashes in your mind. The journey has truly begun.",
    dialogue: "We have the first piece. Luminara Harbor is far, but with that mark, I know we'll make it. Let's go, Traveler.",
    speaker: "Lyra",
    emotion: "determined",
    choices: [
      { id: 'complete-prologue', text: "To Luminara Harbor!", tone: "bold", nextScene: 'chapter-1-teaser' }
    ]
  }
};
