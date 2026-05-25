import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  Volume2,
  MessageSquare
} from 'lucide-react';
import { CHARACTERS } from '../data/characters';
import useVoiceNarration from '../hooks/useVoiceNarration';

const DialoguePanel = ({ narration, dialogue, speaker, choices, onChoice }) => {
  const character = speaker ? CHARACTERS[speaker] : null;
  const { speak } = useVoiceNarration();

  const handleSpeak = () => {
    if (dialogue) {
      speak(dialogue, speaker);
    } else if (narration) {
      speak(narration);
    }
  };

  return (
    <div
      data-testid="dialogue-panel"
      className="flex flex-col gap-10 w-full max-w-4xl mx-auto"
    >
      {/* Narration Box - Cinematic Narrative Text */}
      <AnimatePresence mode="wait">
        {narration && (
          <motion.div
            key={narration}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8 }}
            className="p-8 md:p-10 glass-card rounded-[2rem] border-white/5"
          >
            <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-serif-elegant italic font-light tracking-wide">
              {narration}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dialogue Box - NPC Conversation */}
      <AnimatePresence mode="wait">
        {(dialogue || speaker) && (
          <motion.div
            key={dialogue}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative p-10 md:p-12 glass-card rounded-[2rem] border-white/5"
          >
            {/* Speaker Tag */}
            {speaker && (
              <div
                data-testid="npc-speaker-name"
                className="absolute -top-3 left-10 px-6 py-1 text-[10px] text-white/40 font-display uppercase tracking-[0.4em] italic"
              >
                {speaker}
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-10 items-start">
              {/* Character Avatar Icon */}
              <div className="flex-shrink-0 w-32 h-32 rounded-2xl border border-white/10 overflow-hidden bg-white/5">
                {character?.avatar ? (
                  <img src={character.avatar} alt={speaker} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <MessageSquare className="text-white/10" size={32} />
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-8">
                <div className="flex items-start gap-4">
                  <p className="text-2xl md:text-3xl text-white/90 leading-snug font-medium font-serif-elegant">
                    "{dialogue}"
                  </p>
                  <button
                    data-testid="voice-enabled-toggle"
                    onClick={handleSpeak}
                    className="mt-2 p-2 rounded-full hover:bg-white/5 transition-colors text-white/10 hover:text-white/40"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>

                {/* Choices Grid */}
                <div className="grid grid-cols-1 gap-4 pt-6">
                  {choices.map((choice, idx) => (
                    <motion.button
                      key={choice.id || idx}
                      data-testid={`dialogue-choice-${idx}`}
                      whileHover={{ scale: 1.01, x: 8 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => onChoice(choice)}
                      className="group relative flex items-center justify-between p-6 glass-light border-white/5 rounded-2xl hover:border-white/10 hover:bg-white/5 transition-all text-left"
                    >
                      <span className="text-base md:text-lg text-white/50 group-hover:text-white/90 transition-colors font-serif-elegant">
                        {choice.text}
                      </span>
                      <ChevronRight size={16} className="text-white/20 group-hover:text-white/60 transition-all -translate-x-2 group-hover:translate-x-0" />
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
