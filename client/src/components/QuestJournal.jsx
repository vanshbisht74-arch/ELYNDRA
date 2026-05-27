import React from 'react';
import { motion } from 'framer-motion';
import { X, Scroll, CheckCircle2, Circle } from 'lucide-react';
import { QUESTS } from '../data/quests';

const QuestJournal = ({ quests, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/90 backdrop-blur-md"
    >
      <div className="relative w-full max-w-4xl glass-mythic rounded-sm border border-gold/20 p-12 overflow-hidden">
        <div className="flex justify-between items-start mb-12">
          <div>
            <p className="text-gold font-display text-[10px] tracking-[0.5em] uppercase mb-2">Active Chronicle</p>
            <h2 className="text-5xl text-white font-black tracking-widest text-shadow-mythic">QUESTS</h2>
          </div>
          <button
            data-testid="quest-journal-close-button"
            onClick={onClose}
            className="p-2 text-white/40 hover:text-white transition-colors"
          >
            <X size={32} />
          </button>
        </div>

        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-4">
          {quests.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-white/5 opacity-30">
              <p className="font-serif-elegant italic tracking-widest">No active burdens currently weigh upon your soul...</p>
            </div>
          ) : (
            quests.map((questId) => {
              const quest = QUESTS[questId];
              if (!quest) return null;

              return (
                <motion.div
                  key={questId}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="bg-white/5 border border-white/10 p-8 hover:border-gold/30 transition-colors"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <Scroll size={18} className="text-gold" />
                    <h3 className="text-xl font-display text-white tracking-widest uppercase">{quest.title}</h3>
                  </div>

                  <p className="font-serif-elegant text-white/60 text-lg italic mb-6">
                    "{quest.description}"
                  </p>

                  {quest.objectives && (
                    <div className="space-y-3">
                      {quest.objectives.map((obj) => (
                        <div key={obj.id} className="flex items-center gap-3 text-sm tracking-wider text-white/40">
                          {obj.completed ? <CheckCircle2 size={14} className="text-gold" /> : <Circle size={14} />}
                          <span className={obj.completed ? 'line-through' : ''}>{obj.text}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-8 pt-6 border-t border-white/5 flex gap-6 text-[9px] font-display uppercase tracking-[0.2em] text-gold/60">
                    <span>Rewards: {quest.rewards.xp} XP</span>
                    {quest.rewards.coins && <span>{quest.rewards.coins} Coins</span>}
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default QuestJournal;
