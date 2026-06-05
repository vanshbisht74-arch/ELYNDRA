# ⚔️ ELYNDRA: Echoes of the Aether

“Every choice leaves an echo in the world.”
 
**ELYNDRA** is a premium, web-based AI fantasy RPG built with a "Mythic UI" design language. It combines cinematic storytelling, original anime-inspired visuals, and a dynamic AI-driven narrative engine.  
 
## ✨ Core Features

- **Mythic UI Design**: Glassmorphism interfaces, luminous skies, and animated magical energy.
- **AI Dungeon Master**: A backend-powered story engine that reacts to player choices (supports OpenAI, Gemini, and Claude).
- **NPC Memory System**: Characters like Lyra and Mira Vey remember your decisions, affecting future dialogues and endings.
- **Aether Paths**: Choose your magical affinity (Solara, Tidelume, Verdance, Zephyra, or Umbralis) to influence the world.
- **Voice Narration**: Built-in browser TTS for character dialogue with distinct personality presets.
- **Rich Systems**: Comprehensive Inventory, World Map, Quest Journal, and Achievement systems.
- **Demo Mode**: Play the full first chapter without an API key. 

## 🚀 Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Lucide Icons, Zustand (Persistence via LocalStorage).
- **Backend**: Node.js, Express, Axios.
- **AI**: Adapter-based architecture for LLM providers.

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or bun

### 1. Clone & Install Dependencies
```powershell
# Clone the repository
git clone <your-repo-url>
cd elyndra-echoes-of-the-aether

# Install Frontend
cd client
npm install

# Install Backend
cd ../server
npm install
```

### 2. Environment Configuration
Create a `.env` file in the `server` directory:
```env
PORT=5000
AI_PROVIDER=demo  # Options: demo, openai, gemini
OPENAI_API_KEY=your_key_here
GEMINI_API_KEY=your_key_here
CLIENT_ORIGIN=http://localhost:5173
```

### 3. Running the Game
Open two terminal windows:

**Terminal 1 (Backend):**
```powershell
cd server
npm start
```

**Terminal 2 (Frontend):**
```powershell
cd client
npm run dev
```

The game will be available at `http://localhost:5173`.

## 📖 Playing the Demo
1. **Title Screen**: Click "Begin Journey" to enter character creation.
2. **Creation**: Enter your name, choose your vessel (avatar), and select an Aether Path.
3. **Adventure**: Navigate Starfall Reach, interact with Lyra, and find the first Echo Shard.
4. **Modals**: Hover over the right-side navigation rail to access the Map, Inventory, and Quest Journal.

## 🎨 Creative Direction
This project is 100% original. All naming conventions, lore, regions, and visual components were custom-designed to provide a premium anime RPG experience while remaining unique to the Elyndra universe.

## 🏗️ Future Upgrades
- [ ] Supabase/Firebase backend for cloud saves.
- [ ] Multi-language voice support.
- [ ] Interactive 3D/WebGL background environments.
- [ ] Combat/Challenge mini-games.

---
© 2024 Aetherwell Systems. Built for elite portfolio showcase.
