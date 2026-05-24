import React, { useState, useEffect } from 'react';
import { useGameStore } from './store/gameStore';
import TitleScreen from './components/TitleScreen';
import CharacterCreation from './components/CharacterCreation';
import AnimatedBackground from './components/AnimatedBackground';
import ParticleField from './components/ParticleField';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const { game, player, startGame, updateGame } = useGameStore();
  const [view, setView] = useState('title'); // title, creation, adventure

  useEffect(() => {
    if (game.started) {
      setView('adventure');
    }
  }, [game.started]);

  const handleStartNewGame = () => {
    setView('creation');
  };

  const handleContinue = () => {
    setView('adventure');
  };

  const handleCreationComplete = (playerData) => {
    startGame(playerData);
    setView('adventure');
  };

  return (
    <div className="relative min-h-screen w-full bg-midnight text-cloudwhite overflow-hidden font-body">
      <AnimatedBackground region={game.currentRegion} />
      <ParticleField />

      <AnimatePresence mode="wait">
        {view === 'title' && (
          <motion.div
            key="title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <TitleScreen onStart={handleStartNewGame} onContinue={handleContinue} />
          </motion.div>
        )}

        {view === 'creation' && (
          <motion.div
            key="creation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
          >
            <CharacterCreation onComplete={handleCreationComplete} />
          </motion.div>
        )}

        {view === 'adventure' && (
          <motion.div
            key="adventure"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center h-screen"
          >
            <div className="text-center glass p-12 rounded-2xl">
              <h2 className="text-4xl font-fantasy mb-4">Welcome to {game.currentRegion}</h2>
              <p className="text-xl text-celestial mb-8">Greetings, {player.name} of the {player.aetherPath} Path.</p>
              <p className="text-cloudwhite/60 italic">Phase 2: Adventure Screen Implementation Coming Soon...</p>
              <button
                onClick={() => {
                   useGameStore.getState().resetGame();
                   setView('title');
                }}
                className="mt-8 px-6 py-2 border border-white/20 hover:bg-white/10 rounded-lg transition-colors uppercase tracking-widest text-xs"
              >
                Reset Odyssey
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
