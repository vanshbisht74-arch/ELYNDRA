import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, MessageSquare, Shield, Info } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { CHARACTERS } from '../data/characters';

const CompanionsModal = ({ isOpen, onClose }) => {
  const { companions } = useGameStore();

  if (!isOpen) return null;

  return (
    <motion.div
      data-testid="companions-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, x: 20 }}
        animate={{ scale: 1, opacity: 1, x: 0 }}
        exit={{ scale: 0.9, opacity: 0, x: 20 }}
        className="relative w-full max-w-4xl bg-midnight-900/95 border border-celestial-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-celestial-500/20 flex justify-between items-center bg-midnight-950/50">
          <div className="flex items-center gap-3">
            <Shield className="text-celestial-400" size={24} />
            <h2 className="text-3xl font-display text-celestial-300 tracking-wider">Companions</h2>
          </div>
          <button
            data-testid="companions-close-button"
            onClick={onClose}
            className="p-2 hover:bg-celestial-500/20 rounded-full transition-colors text-celestial-300"
          >
            <X size={28} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="space-y-8">
            {Object.keys(companions).map((name) => {
              const data = companions[name];
              const baseData = CHARACTERS[name] || {};

              return (
                <motion.div
                  key={name}
                  layout
                  className="flex flex-col md:flex-row gap-8 p-6 bg-midnight-800/40 rounded-2xl border border-white/5 relative overflow-hidden"
                >
                  {/* Portrait Placeholder */}
                  <div className="w-full md:w-48 h-64 rounded-xl bg-celestial-900/40 border border-celestial-500/20 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 to-transparent opacity-60" />
                    <span className="text-celestial-500/50 font-display text-4xl">{name[0]}</span>

                    {/* Affinity Badge */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                      <div className="px-3 py-1 bg-midnight-950/80 rounded-full border border-celestial-500/30 flex items-center gap-2">
                        <Heart size={14} className="text-rose-500 fill-rose-500" />
                        <span className="text-xs text-celestial-100">{data.affinity}</span>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-2xl font-display text-white">{name}</h3>
                        <p className="text-celestial-300 text-sm italic">{baseData.role || baseData.title}</p>
                      </div>
                      <span className="px-3 py-1 bg-celestial-500/10 text-celestial-300 text-[10px] uppercase font-bold rounded-full tracking-widest border border-celestial-500/20">
                        {data.bondLevel}
                      </span>
                    </div>

                    <p className="text-white/60 text-sm mb-6 leading-relaxed">
                      {baseData.personality}
                    </p>

                    {/* Memories Section */}
                    <div className="mt-auto">
                      <div className="flex items-center gap-2 mb-3 text-white/40 uppercase text-[10px] font-bold tracking-widest">
                        <MessageSquare size={12} />
                        <span>Recent Memories</span>
                      </div>
                      <div className="space-y-2">
                        {data.memories.length > 0 ? (
                          data.memories.slice(-2).map((memory, idx) => (
                            <div key={idx} className="p-3 bg-midnight-950/50 rounded-lg border border-white/5 text-xs text-celestial-100/70 italic">
                              "{memory}"
                            </div>
                          ))
                        ) : (
                          <div className="text-xs text-white/20 italic">No shared memories recorded yet.</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Decorative Glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-celestial-500/5 blur-3xl rounded-full" />
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="p-6 bg-midnight-950/80 border-t border-celestial-500/10 text-center">
          <div className="flex items-center justify-center gap-2 text-celestial-100/40 text-xs italic">
            <Info size={14} />
            <span>Bonds grow through shared experiences and dialogue choices.</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CompanionsModal;
