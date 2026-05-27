import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  Volume2,
} from 'lucide-react';
import { CharacterPortrait } from './LocalAssets';
import useVoiceNarration from '../hooks/useVoiceNarration';

const DialoguePanel = ({ narration, dialogue, speaker, choices, onChoice }) => {
  const { speak } = useVoiceNarration();

  const handleSpeak = () => {
    if (dialogue) speak(dialogue, speaker);
    else if (narration) speak(narration);
  };

  const isNarrator = !speaker || speaker === 'Narrator' || speaker === '???';

  return (
    <div data-testid="dialogue-panel" className="flex flex-col gap-8 w-full max-w-5xl mx-auto pointer-events-auto">
      {/* Cinematic Narration Layer */}
      <AnimatePresence mode="wait">
        {narration && (
          <motion.div
            key={narration}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="text-center px-12"
          >
            <p className="text-2xl md:text-3xl text-white/90 leading-relaxed font-serif-elegant italic font-light tracking-wide text-shadow-mythic">
              {narration}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NPC Dialogue Box */}
      <AnimatePresence mode="wait">
        {(dialogue || speaker) && (
          <motion.div
            key={dialogue}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-mythic p-1 rounded-sm overflow-hidden"
          >
            <div className="bg-black/80 p-8 md:p-10 flex flex-col md:flex-row gap-10 items-center md:items-end">

              {/* Mythic Character Frame */}
              {!isNarrator && (
                <div className="relative flex-shrink-0 group">
                  <div className="relative w-40 h-40 rounded-full border border-gold/30 p-1 overflow-hidden bg-black/40 shadow-[0_0_30px_rgba(247,216,138,0.1)]">
                    <CharacterPortrait name={speaker} className="w-full h-full transform transition-transform group-hover:scale-110" />

                    <motion.div
                        animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute inset-0 border-2 border-gold/40 rounded-full"
                    />
                  </div>

                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-black font-display text-[9px] uppercase tracking-[0.2em] font-bold whitespace-nowrap">
                    {speaker}
                  </div>
                </div>
              )}

              <div className="flex-1 space-y-8 w-full text-center md:text-left">
                <div className="space-y-4">
                  <div className="flex items-center justify-center md:justify-start gap-4">
                    <p className="text-[9px] text-gold/40 font-display uppercase tracking-[0.4em]">Current Echo</p>
                    <button onClick={handleSpeak} className="p-1 text-gold/40 hover:text-gold transition-colors">
                      <Volume2 size={12} />
                    </button>
                  </div>
                  <h2 className="text-2xl md:text-4xl text-white font-medium font-serif-elegant leading-tight">
                    "{dialogue}"
                  </h2>
                </div>

                {/* Choices */}
                <div className="flex flex-col gap-3 max-w-xl mx-auto md:mx-0">
                  {choices.map((choice, idx) => (
                    <motion.button
                      key={choice.id || idx}
                      data-testid={`dialogue-choice-${idx}`}
                      whileHover={{ x: 10, backgroundColor: 'rgba(247, 216, 138, 0.08)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onChoice(choice)}
                      className="group flex items-center justify-between p-5 border border-white/10 hover:border-gold/50 transition-all text-left bg-white/5"
                    >
                      <span className="text-white/60 group-hover:text-white transition-colors font-display tracking-widest text-[10px] uppercase">
                        {choice.text}
                      </span>
                      <ChevronRight size={14} className="text-gold/40 group-hover:text-gold transition-all" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DialoguePanel;
