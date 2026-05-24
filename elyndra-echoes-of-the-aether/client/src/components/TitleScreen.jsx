import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Play, Settings, RefreshCw } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const TitleScreen = ({ onStart, onContinue }) => {
  const { player, game } = useGameStore();
  const canContinue = game.started;

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-center z-10"
      >
        <motion.div
          animate={{
            textShadow: ["0 0 20px rgba(110,231,245,0.4)", "0 0 40px rgba(110,231,245,0.7)", "0 0 20px rgba(110,231,245,0.4)"]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="mb-2"
        >
          <span className="text-celestial tracking-[0.5em] text-sm md:text-base font-bold uppercase">Aetherwell Chronicles</span>
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-bold text-cloudwhite tracking-tighter mb-4 drop-shadow-2xl">
          ELYNDRA
        </h1>

        <div className="flex items-center justify-center gap-4 text-aether mb-12">
          <div className="h-[1px] w-12 bg-aether/40" />
          <p className="text-lg md:text-xl font-fantasy italic tracking-widest uppercase">Echoes of the Aether</p>
          <div className="h-[1px] w-12 bg-aether/40" />
        </div>
      </motion.div>

      {/* Buttons Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="flex flex-col gap-4 w-64 z-10"
      >
        <button
          onClick={onStart}
          className="group relative flex items-center justify-center gap-3 py-4 bg-cloudwhite/10 hover:bg-cloudwhite/20 glass border border-cloudwhite/20 rounded-lg transition-all duration-300"
        >
          <Play size={18} className="text-celestial group-hover:scale-110 transition-transform" />
          <span className="text-cloudwhite font-fantasy tracking-wider">Begin Journey</span>
          <div className="absolute inset-0 bg-celestial/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
        </button>

        {canContinue && (
          <button
            onClick={onContinue}
            className="group flex items-center justify-center gap-3 py-4 bg-aether/10 hover:bg-aether/20 glass border border-aether/20 rounded-lg transition-all duration-300"
          >
            <RefreshCw size={18} className="text-aether group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-cloudwhite font-fantasy tracking-wider">Continue Adventure</span>
          </button>
        )}

        <button
          className="group flex items-center justify-center gap-3 py-3 text-cloudwhite/60 hover:text-cloudwhite transition-colors"
        >
          <Settings size={16} />
          <span className="text-xs uppercase tracking-[0.2em]">Settings</span>
        </button>
      </motion.div>

      {/* Footer Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 text-center"
      >
        <p className="text-[10px] uppercase tracking-[0.3em] text-cloudwhite/40">
          Created for the Aetherial Collective &bull; 2024
        </p>
      </motion.div>

      {/* Background Magic */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-celestial/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-moonlave/5 rounded-full blur-[100px]" />
      </div>
    </div>
  );
};

export default TitleScreen;
