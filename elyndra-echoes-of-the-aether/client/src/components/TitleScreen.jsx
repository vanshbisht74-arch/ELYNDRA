import React from 'react';
import { motion } from 'framer-motion';
import { Play, History, Settings } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const TitleScreen = ({ onStart, onContinue }) => {
  const { game } = useGameStore();

  return (
    <div
      data-testid="title-screen"
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-midnight-950"
    >
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 cinematic-vignette pointer-events-none" />

      <div className="z-10 text-center space-y-12 p-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4"
        >
          <h1 className="text-8xl md:text-[10rem] font-display text-white tracking-[0.15em] text-shadow-glow leading-none">
            ELYNDRA
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="text-celestial-200/60 tracking-[0.6em] uppercase text-xs md:text-sm font-light ml-[0.6em]"
          >
            Echoes of the Aether
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col items-center gap-6"
        >
          <button
            data-testid="title-begin-journey"
            onClick={onStart}
            className="group relative flex items-center justify-center px-16 py-4 bg-midnight-900/40 hover:bg-celestial-500/5 border border-white/10 rounded-full transition-all duration-500 hover:border-celestial-500/30 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-celestial-500/0 via-celestial-500/5 to-celestial-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <span className="relative flex items-center gap-4 text-celestial-100 font-display uppercase tracking-[0.2em] text-sm">
              <Play className="fill-celestial-100" size={14} />
              Begin Journey
            </span>
          </button>

          {game.started && (
            <button
              data-testid="title-continue-adventure"
              onClick={onContinue}
              className="flex items-center gap-2 text-celestial-100/40 hover:text-celestial-200 transition-colors uppercase tracking-[0.3em] text-[10px] py-2"
            >
              <History size={12} />
              Continue Adventure
            </button>
          )}

          <div className="pt-4">
            <button
              data-testid="settings-button-title"
              className="p-3 text-white/10 hover:text-celestial-300 transition-colors"
            >
              <Settings size={18} />
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 2 }}
        className="absolute bottom-12 text-celestial-100/20 text-[9px] uppercase tracking-[0.6em] font-light font-serif-elegant italic"
      >
        "Every choice leaves an echo in the world."
      </motion.div>
    </div>
  );
};

export default TitleScreen;
