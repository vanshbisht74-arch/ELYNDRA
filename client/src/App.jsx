import React, { useState, useEffect } from 'react';
import { useGameStore } from './store/gameStore';
import TitleScreen from './components/TitleScreen';
import CharacterCreation from './components/CharacterCreation';
import AdventureScreen from './components/AdventureScreen';
import AnimatedBackground from './components/AnimatedBackground';
import ParticleField from './components/ParticleField';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const { game } = useGameStore();
  const [view, setView] = useState('title');

  // Unified view management
  useEffect(() => {
    if (game.started && view !== 'adventure') {
      setView('adventure');
    }
  }, [game.started, view]);

  return (
    <div className="relative min-h-screen w-full bg-[#020617] text-white font-body overflow-hidden">
      {/* Global Background Layer */}
      <div className="fixed inset-0 z-0">
        <AnimatedBackground regionId={game.currentRegion} />
      </div>

      {/* Global Particle Layer */}
      <div className="fixed inset-0 z-[5] pointer-events-none">
        <ParticleField />
      </div>

      {/* Main UI Content Container */}
      <div className="relative z-10 w-full h-full min-h-screen flex flex-col">
        <AnimatePresence>
          {view === 'title' && !game.started && (
            <motion.div
              key="title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full"
            >
              <TitleScreen onStart={() => setView('creation')} onContinue={() => setView('adventure')} />
            </motion.div>
          )}

          {view === 'creation' && !game.started && (
            <motion.div
              key="creation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full"
            >
              <CharacterCreation onComplete={() => setView('adventure')} />
            </motion.div>
          )}

          {game.started && (
            <motion.div
              key="adventure"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative w-full h-full min-h-screen"
            >
              <AdventureScreen />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
