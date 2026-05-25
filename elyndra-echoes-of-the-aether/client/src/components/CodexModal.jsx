import React from 'react';
import { motion } from 'framer-motion';
import { X, BookOpen, Sparkles } from 'lucide-react';

const CodexModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const entries = [
    { id: 1, title: 'The Aetherwell', desc: 'A celestial source of magical balance that once protected Elyndra.' },
    { id: 2, title: 'The Sundering', desc: 'The cataclysmic event where the Aetherwell shattered into seven Echo Shards.' },
    { id: 3, title: 'Starfall Reach', desc: 'Floating ruins above the clouds where the player first awakens.' },
  ];

  return (
    <motion.div
      data-testid="codex-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-2xl bg-midnight-900 border border-celestial-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[70vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-celestial-500/20 flex justify-between items-center bg-midnight-950/50">
          <div className="flex items-center gap-3">
            <BookOpen className="text-celestial-400" size={24} />
            <h2 className="text-2xl font-display text-celestial-300">Lore Codex</h2>
          </div>
          <button
            data-testid="codex-close-button"
            onClick={onClose}
            className="p-2 hover:bg-celestial-500/20 rounded-full text-celestial-300"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8 overflow-y-auto space-y-6">
          {entries.map((entry) => (
            <div key={entry.id} className="p-6 bg-midnight-800/40 rounded-2xl border border-white/5 space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-celestial-500" />
                <h3 className="font-display text-xl text-white tracking-wide">{entry.title}</h3>
              </div>
              <p className="text-sm text-white/60 leading-relaxed italic">{entry.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CodexModal;
