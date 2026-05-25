import React, { useState, useEffect } from 'react';
import { useGameStore } from './store/gameStore';
import TitleScreen from './components/TitleScreen';
import CharacterCreation from './components/CharacterCreation';
import AdventureScreen from './components/AdventureScreen';
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
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <AdventureScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
