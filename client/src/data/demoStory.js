export const DEMO_STORY = {
  // PROLOGUE: STARFALL REACH
  'awakening': {
    narration: "The mists of Starfall Reach slowly part, revealing a horizon of infinite gold. You awaken upon a platform of carved stone, suspended between the heavens and the earth.",
    dialogue: "Stay focused, Traveler. The rift is closing, and the sky-tides are shifting. Can you hear me?",
    speaker: "???",
    emotion: "worried",
    choices: [
      { id: 'wake-up', text: "Open your eyes to the light", tone: "cautious", nextScene: 'meeting-lyra' }
    ]
  },
  'meeting-lyra': {
    narration: "A girl with silver-blue hair and a star-shaped charm kneels beside you. Behind her, waterfalls tumble into a vast ocean of clouds. This is Starfall Reach, the gateway to the Aetherwell.",
    dialogue: "By the stars, you're alive! I thought the Sundering had claimed another soul. You're the first one I've seen wake up with the Mark glowing like that.",
    speaker: "Lyra",
    emotion: "joyful",
    choices: [
      { id: 'who-are-you', text: "Who are you, Wayfinder?", tone: "cautious", nextScene: 'lyra-introduces' },
      { id: 'where-am-i', text: "Where has the wind taken me?", tone: "clever", nextScene: 'lyra-explains-location' },
      { id: 'trust-lyra', text: "I'm glad a friendly face found me.", tone: "kind", nextScene: 'lyra-trust-boost', affinityChange: { npc: 'Lyra', change: 10, reason: 'You showed kindness in a moment of confusion.' } }
    ]
  },
  'lyra-introduces': {
    narration: "She stands, offering a hand. Her explorer's cloak flutters in the thin, crisp air of the high altitude.",
    dialogue: "I'm Lyra. I've spent my life mapping these floating ruins. I saw your fall from the Astral Hollow. It shouldn't be possible to survive that... unless the Mark chose you.",
    speaker: "Lyra",
    emotion: "cheerful",
    choices: [
      { id: 'examine-mark', text: "Examine the glowing symbol on your palm", tone: "cautious", nextScene: 'examine-mark' }
    ]
  },
  'lyra-explains-location': {
    narration: "She gestures to the crumbling pillars and suspended gardens surrounding you.",
    dialogue: "You're in Starfall Reach. Or what's left of it. This was once the center of the world's magic before the Aetherwell shattered. Now, it's just echoes and falling stone.",
    speaker: "Lyra",
    emotion: "mysterious",
    choices: [
      { id: 'examine-mark-2', text: "What is this mark on my hand?", tone: "cautious", nextScene: 'examine-mark' }
    ]
  },
  'lyra-trust-boost': {
    narration: "Lyra smiles, a genuine warmth reaching her blue eyes. She seems relieved that you aren't hostile.",
    dialogue: "And I'm glad I found someone who isn't a shadow-wraith. I'm Lyra. We need to get moving—the Aether-currents are becoming violent here.",
    speaker: "Lyra",
    emotion: "joyful",
    choices: [
      { id: 'examine-mark-3', text: "Look at the symbol on your hand", tone: "cautious", nextScene: 'examine-mark' }
    ]
  },
  'examine-mark': {
    narration: "A crystalline pattern of azure and gold pulses beneath your skin. It resonates with the ancient ruins, humming with a power you don't yet understand.",
    dialogue: "That's the Aether Mark. It's a key, Traveler. And right now, it's the only reason these ruins haven't dropped us into the abyss. We need to reach the Observatory.",
    speaker: "Lyra",
    emotion: "determined",
    choices: [
      { id: 'follow-lyra', text: "Follow Lyra across the bridge", tone: "bold", nextScene: 'wounded-creature' }
    ]
  },
  'wounded-creature': {
    narration: "As you cross a narrow bridge of light, a sharp cry echoes from below a collapsed archway. A small sky-creature, its wings shimmering like opals, is pinned beneath a heavy rune-stone.",
    dialogue: "Wait! Do you hear that? Oh no... the poor thing is trapped. We should help, but if the bridge collapses while we're stopping...",
    speaker: "Lyra",
    emotion: "worried",
    choices: [
      {
        id: 'help-creature',
        text: "Use your Aether to lift the stone",
        tone: "kind",
        nextScene: 'help-creature-result',
        memory: 'You chose mercy over speed, saving a sky-creature at the risk of your own safety.',
        rewards: { xp: 50, items: ['item-5'] },
        affinityChange: { npc: 'Lyra', change: 15, reason: 'You demonstrated the heart of a true protector.' }
      },
      {
        id: 'ignore-creature',
        text: "We must prioritize the mission",
        tone: "cautious",
        nextScene: 'ignore-creature-result',
        memory: 'You prioritized the mission over a life, leaving the sky-creature to its fate.',
        affinityChange: { npc: 'Lyra', change: -5, reason: 'She was disappointed by your cold pragmatism.' }
      }
    ]
  },
  'help-creature-result': {
    narration: "You channel the energy from your palm. The stone lifts easily, and the creature chirps a song of gratitude before disappearing into the mist, leaving behind a vial of Moonwater.",
    dialogue: "That was... incredible. I've never seen someone use Aether like that without a focus. You really are special. Let's go, the Observatory is just ahead!",
    speaker: "Lyra",
    emotion: "joyful",
    choices: [
      { id: 'reach-observatory', text: "Reach the Ancient Observatory", tone: "bold", nextScene: 'observatory-arrival' }
    ]
  },
  'ignore-creature-result': {
    narration: "You quicken your pace. Lyra casts a lingering, sorrowful look back at the trapped creature, her silence speaking louder than words.",
    dialogue: "I understand... the world is harsh. But I hope we don't have to make many more choices like that. The Observatory is through those gates.",
    speaker: "Lyra",
    emotion: "calm",
    choices: [
      { id: 'reach-observatory-2', text: "Approach the Observatory Gates", tone: "bold", nextScene: 'observatory-arrival' }
    ]
  },
  'observatory-arrival': {
    narration: "The Ancient Observatory stands as a monolith of white marble against the violet sky. A massive circular door is etched with five unique sigils, none of which are lit.",
    dialogue: "This is it. The place where the first Echo Shard was hidden during the Sundering. Only the Mark can break the seal. Touch the center, Traveler.",
    speaker: "Lyra",
    emotion: "excited",
    choices: [
      { id: 'open-door', text: "Place your hand upon the seal", tone: "bold", nextScene: 'observatory-inside' }
    ]
  },
  'observatory-inside': {
    narration: "The door grinds open, revealing a chamber filled with floating star-maps and ancient machinery. At the center, a jagged fragment of pure light pulses with a rhythmic heartbeat.",
    dialogue: "An Echo Shard... I've only read about them in the Elder's scrolls. It's beautiful, and terrifying. Do you feel that? It's calling to you.",
    speaker: "Lyra",
    emotion: "mysterious",
    choices: [
      { id: 'take-shard', text: "Claim the first Echo Shard", tone: "bold", nextScene: 'first-vision',
        rewards: { xp: 150, coins: 100, items: ['echo-shard'] }
      }
    ]
  },
  'first-vision': {
    narration: "As your fingers brush the Shard, the world around you dissolves into a kaleidoscope of memories. You see a coastal city of turquoise canals and glowing lanterns... Luminara Harbor.",
    dialogue: "Wake up! Traveler! You went into some kind of trance. The map... it's pointing to the coast. To Luminara. We have our path.",
    speaker: "Lyra",
    emotion: "determined",
    choices: [
      { id: 'go-to-harbor', text: "Descend to Luminara Harbor", tone: "bold", nextScene: 'harbor-arrival' }
    ]
  },

  // CHAPTER 1: LUMINARA HARBOR
  'harbor-arrival': {
    narration: "The journey down from Starfall takes days, but finally, the scent of salt and cedar fills the air. Luminara Harbor is a city built on water, lit by thousands of enchanted lanterns.",
    dialogue: "Welcome to the Jewel of the Coast. Be careful here—information is the only currency that matters in Luminara, and the walls have ears.",
    speaker: "Lyra",
    emotion: "cheerful",
    choices: [
      { id: 'explore-market', text: "Visit the Floating Market", tone: "bold", nextScene: 'market-meeting' },
      { id: 'find-broker', text: "Look for an Information Broker", tone: "clever", nextScene: 'mira-intro' }
    ]
  },
  'mira-intro': {
    narration: "Tucked between two turquoise canals is a shop draped in silk maps. A woman with sharp eyes and teal-and-gold robes looks up as you enter, an amused smirk on her face.",
    dialogue: "A Wayfinder and a Traveler with a very loud Mark... you two aren't exactly subtle. I'm Mira Vey. What brings such interesting shadows to my doorstep?",
    speaker: "Mira Vey",
    emotion: "mysterious",
    choices: [
      { id: 'ask-shard', text: "We're looking for an Echo Shard", tone: "bold", nextScene: 'mira-deal' },
      { id: 'ask-past', text: "What do you know about this Mark?", tone: "clever", nextScene: 'mira-secret' }
    ]
  },
  'mira-deal': {
    dialogue: "Straight to the point. I like that. Shards are dangerous things to carry. I might know where one is hidden, but I'll need a favor in return. A map was stolen from me by a guild of canal-thieves.",
    speaker: "Mira Vey",
    emotion: "calm",
    choices: [
      { id: 'accept-quest', text: "I'll retrieve your map", tone: "bold", nextScene: 'market-quest-start' },
      { id: 'refuse-mira', text: "We'll find it ourselves", tone: "cautious", nextScene: 'harbor-exploration' }
    ]
  },
  'chapter-1-teaser': {
    narration: "The story continues as you uncover the secrets of Luminara Harbor, meet the noble Knight Cael Ardent in the mountains, and eventually face the choice that will decide the fate of the Aetherwell.",
    dialogue: "The echoes are growing louder, Traveler. The world is watching your every move. Are you ready for what comes next?",
    speaker: "Narrator",
    emotion: "mysterious",
    choices: [
      { id: 'to-be-continued', text: "The Journey Continues...", tone: "bold", nextScene: null }
    ]
  }
};
