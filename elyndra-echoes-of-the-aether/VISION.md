# ELYNDRA: Echoes of the Aether - Product Vision

1. **Original Anime Fantasy RPG**: A premium, cinematic experience with a unique identity, avoiding any copyrighted material.
2. **AI-Driven Storytelling**: Dynamic NPC memories, branching paths, and meaningful consequences powered by an AI Dungeon Master.
3. **Aether Paths Magic System**: Distinct magical affinities (Solara, Tidelume, Verdance, Zephyra, Umbralis) influencing gameplay, dialogue, and visuals.
4. **Breathtaking Visuals**: High-end UI with glassmorphism, drifting particles, and luminous gradients for an immersive browser-based atmosphere.
5. **Voice Narration**: Integrated browser-based SpeechSynthesis for NPCs to enhance narrative immersion, with support for premium TTS.
6. **Original Regions**: Five diverse, unlockable regions (Starfall Reach, Luminara Harbor, Sylvara Wilds, Frostveil Citadel, Astral Hollow) with unique lore.
7. **Companion System**: Deep relationships with NPCs like Lyra and Cael Ardent that evolve based on trust and affinity.
8. **Interactive Quest System**: Comprehensive tracking for main, side, and hidden quests with rewarded progression.
9. **Browser-Based Portability**: Built with React, Vite, and Tailwind CSS for a high-performance, responsive RPG experience.
10. **Future-Ready Architecture**: Modular design for easy integration of advanced AI providers, persistent databases (Supabase/Firebase), and premium assets.

## Project Architecture

```
elyndra-echoes-of-the-aether/
├── client/
│   ├── src/
│   │   ├── assets/          # Images, icons, and sounds
│   │   ├── components/      # Reusable UI components
│   │   ├── data/            # Static game data (regions, items, demo story)
│   │   ├── hooks/           # Custom React hooks (voice, state)
│   │   ├── store/           # Global state management (Zustand)
│   │   ├── services/        # API and external service integrations
│   │   ├── utils/           # Helper functions (save game, logic)
│   │   ├── App.jsx          # Main application component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles and Tailwind imports
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
├── server/
│   ├── prompts/         # AI system prompts
│   ├── routes/          # Express API routes
│   ├── services/        # AI provider and demo mode logic
│   ├── server.js        # Express server entry point
│   ├── .env.example
│   └── package.json
└── README.md
```
