import React from 'react';
import { motion } from 'framer-motion';
import { Play, Settings as SettingsIcon, History } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { ElyndraEmblem } from './LocalAssets';

const TitleScreen = ({ onStart, onContinue }) => {
  const { player } = useGameStore();

  return (
    <div data-testid="title-screen" className="relative h-screen w-screen flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="z-10 flex flex-col items-center text-center space-y-8"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="opacity-40"
        >
          <ElyndraEmblem className="w-40 h-40" />
        </motion.div>

        <div className="space-y-4">
          <motion.h1
            className="text-7xl md:text-9xl font-black tracking-[0.25em] text-white text-shadow-mythic"
            initial={{ letterSpacing: "0.1em", opacity: 0 }}
            animate={{ letterSpacing: "0.25em", opacity: 1 }}
            transition={{ duration: 2 }}
          >
            ELYNDRA
          </motion.h1>
          <p className="text-xl md:text-2xl font-serif-elegant italic tracking-[0.4em] text-gold/80 uppercase">
            Echoes of the Aether
          </p>
        </div>

        <div className="flex flex-col gap-5 w-64 pt-12">
          <TitleButton
            icon={Play}
            label="Begin Journey"
            onClick={onStart}
            primary
            data-testid="title-begin-journey"
          />

          {player.name && (
            <TitleButton
              icon={History}
              label="Continue"
              onClick={onContinue}
              data-testid="title-continue-journey"
            />
          )}

          <TitleButton
            icon={SettingsIcon}
            label="Settings"
            onClick={() => {}}
          />
        </div>
      </motion.div>

      <div className="absolute bottom-12 z-10 text-[10px] tracking-[0.5em] text-white/20 uppercase">
        © MMXXIV Aetherwell Systems
      </div>
    </div>
  );
};

const TitleButton = ({ icon: Icon, label, onClick, primary = false, "data-testid": testId }) => (
  <motion.button
    data-testid={testId}
    whileHover={{ scale: 1.05, letterSpacing: "0.3em" }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`
      flex items-center justify-center gap-3 py-4 rounded-sm border transition-all duration-300
      ${primary
        ? 'bg-gold/10 border-gold/40 text-gold text-shadow-gold'
        : 'bg-white/5 border-white/10 text-white/60 hover:text-white'}
      font-display text-[10px] uppercase tracking-[0.2em]
    `}
  >
    <Icon size={14} />
    {label}
  </motion.button>
);

export default TitleScreen;
