import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, MessageSquare, Star, Zap } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const MemoryTimeline = ({ isOpen, onClose }) => {
  const { memoryTimeline } = useGameStore();

  if (!isOpen) return null;

  return (
    <motion.div
      data-testid="memory-timeline-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-lg p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-2xl bg-midnight-900 border border-celestial-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[70vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-celestial-500/20 flex justify-between items-center bg-midnight-950/50">
          <div className="flex items-center gap-3">
            <Clock className="text-celestial-400" size={24} />
            <h2 className="text-2xl font-display text-celestial-300 tracking-wider text-shadow-glow">Memory Timeline</h2>
          </div>
          <button
            data-testid="memory-timeline-close-button"
            onClick={onClose}
            className="p-2 hover:bg-celestial-500/20 rounded-full transition-colors text-celestial-300"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          {/* Vertical Line */}
          <div className="absolute left-12 top-0 bottom-0 w-px bg-gradient-to-b from-celestial-500/0 via-celestial-500/30 to-celestial-500/0" />

          <div className="space-y-8 relative z-10">
            {memoryTimeline.length > 0 ? (
              [...memoryTimeline].reverse().map((entry, idx) => (
                <motion.div
                  key={idx}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  {/* Icon Node */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-midnight-950 border border-celestial-500/50 flex items-center justify-center shadow-[0_0_10px_rgba(110,231,245,0.2)]">
                    {entry.type === 'decision' ? (
                      <Star size={14} className="text-aether-gold" />
                    ) : (
                      <MessageSquare size={14} className="text-celestial-300" />
                    )}
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 p-5 bg-midnight-800/40 border border-white/5 rounded-2xl relative group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-celestial-400">
                        {entry.chapter}
                      </span>
                      <span className="text-[10px] text-white/30">{entry.timestamp || 'Recorded'}</span>
                    </div>

                    <p className="text-white/80 text-sm italic leading-relaxed">
                      "{entry.description}"
                    </p>

                    {entry.affectedNPC && (
                      <div className="mt-3 flex items-center gap-2">
                        <div className="px-2 py-0.5 rounded-md bg-celestial-500/10 border border-celestial-500/20 text-[9px] text-celestial-300 font-bold uppercase">
                          Impacts {entry.affectedNPC}
                        </div>
                      </div>
                    )}

                    {/* Subtle Glow Hover */}
                    <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-celestial-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-white/20 italic space-y-4 pt-20">
                <Zap size={48} className="opacity-10" />
                <p>The threads of your story have yet to be woven.</p>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 bg-midnight-950/80 border-t border-celestial-500/10 text-center text-[10px] text-white/40 uppercase tracking-widest">
          Every choice leaves an echo in the world.
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MemoryTimeline;
