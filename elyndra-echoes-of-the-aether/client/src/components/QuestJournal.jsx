import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Scroll, CheckCircle2, Circle, Trophy } from 'lucide-react';

const QuestJournal = ({ quests, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      data-testid="quest-journal-modal"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-midnight-950/95 backdrop-blur-xl border-l border-celestial-500/20 z-50 flex flex-col shadow-2xl"
    >
      {/* Header */}
      <div className="p-8 border-b border-white/5 flex justify-between items-center bg-midnight-900/50">
        <div className="flex items-center gap-3">
          <Scroll className="text-celestial-400" size={24} />
          <h2 className="text-3xl font-display text-celestial-300 tracking-wider">Quest Journal</h2>
        </div>
        <button
          data-testid="quest-journal-close-button"
          onClick={onClose}
          className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-white"
        >
          <X size={28} />
        </button>
      </div>

      {/* Quest List */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        {quests.length > 0 ? (
          quests.map((quest) => (
            <div
              key={quest.id}
              data-testid="current-quest-panel"
              className="space-y-6"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-display text-white leading-tight">{quest.title}</h3>
                <span className="px-3 py-1 bg-celestial-500/10 text-celestial-300 text-[10px] uppercase font-bold rounded-full tracking-tighter border border-celestial-500/20">
                  {quest.status}
                </span>
              </div>

              <p className="text-sm text-white/50 italic leading-relaxed">
                "{quest.description}"
              </p>

              <div className="space-y-3">
                <h4 className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Objectives</h4>
                {quest.objectives.map((obj) => (
                  <div key={obj.id} className="flex items-start gap-3 group">
                    {obj.completed ? (
                      <CheckCircle2 className="text-celestial-500 mt-0.5" size={16} />
                    ) : (
                      <Circle className="text-white/20 mt-0.5" size={16} />
                    )}
                    <span className={`text-sm ${obj.completed ? 'text-white/40 line-through' : 'text-white/80'}`}>
                      {obj.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Decorative Divider */}
              <div className="h-px w-full bg-gradient-to-r from-celestial-500/20 to-transparent" />
            </div>
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-20">
             <Trophy size={64} strokeWidth={1} />
             <p className="font-display uppercase tracking-widest text-sm">No Active Quests</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 bg-midnight-900/50 border-t border-white/5 text-center">
        <p className="text-[10px] text-white/30 uppercase tracking-[0.3em]">The world remembers your deeds</p>
      </div>
    </motion.div>
  );
};

export default QuestJournal;
