import React from 'react';
import { motion } from 'framer-motion';
import { X, Trophy, Star } from 'lucide-react';

const AchievementsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const achievements = [
    { id: 1, title: 'First Step Beyond the Clouds', desc: 'Awaken in Starfall Reach.', unlocked: true },
    { id: 2, title: 'Friend of the Skybound', desc: 'Help a wounded sky-creature.', unlocked: false },
    { id: 3, title: 'Keeper of Forgotten Promises', desc: 'Recover your first memory.', unlocked: false },
    { id: 4, title: 'The World Remembers', desc: 'Make 10 impactful decisions.', unlocked: false },
  ];

  return (
    <motion.div
      data-testid="achievements-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-2xl bg-midnight-900 border border-celestial-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[60vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-celestial-500/20 flex justify-between items-center bg-midnight-950/50">
          <div className="flex items-center gap-3">
            <Trophy className="text-aether-gold" size={24} />
            <h2 className="text-2xl font-display text-celestial-300">Achievements</h2>
          </div>
          <button
            data-testid="achievements-close-button"
            onClick={onClose}
            className="p-2 hover:bg-celestial-500/20 rounded-full text-celestial-300"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className={`p-6 rounded-2xl border transition-all ${ach.unlocked ? 'bg-midnight-800/60 border-aether-gold/30' : 'bg-midnight-950/40 border-white/5 opacity-50'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${ach.unlocked ? 'bg-aether-gold/20 text-aether-gold' : 'bg-white/5 text-white/20'}`}>
                    <Star size={24} fill={ach.unlocked ? 'currentColor' : 'none'} />
                  </div>
                  <div>
                    <h3 className={`font-display text-lg ${ach.unlocked ? 'text-white' : 'text-white/40'}`}>{ach.title}</h3>
                    <p className="text-xs text-white/40">{ach.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AchievementsModal;
