import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Coins, Package } from 'lucide-react';

const RewardPopup = ({ rewards, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      data-testid="reward-popup"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-4 pointer-events-none"
    >
      <div className="glass p-6 md:p-8 rounded-3xl border border-aether-gold/40 shadow-[0_0_50px_rgba(247,216,138,0.2)] bg-midnight-950/80 backdrop-blur-xl flex flex-col items-center">
        <div className="flex items-center gap-2 text-aether-gold mb-4 uppercase tracking-[0.3em] text-[10px] font-bold">
            <Sparkles size={14} />
            ADVENTURE REWARD
        </div>

        <div className="flex items-center gap-8">
            {rewards.xp > 0 && (
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 text-celestial-300 mb-1">
                        <Star size={20} className="fill-celestial-300" />
                        <span className="text-2xl font-display">+{rewards.xp} XP</span>
                    </div>
                    <span className="text-[10px] text-white/30 uppercase tracking-widest">Growth</span>
                </div>
            )}

            {rewards.coins > 0 && (
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 text-aether-gold mb-1">
                        <Coins size={20} className="fill-aether-gold" />
                        <span className="text-2xl font-display">+{rewards.coins}</span>
                    </div>
                    <span className="text-[10px] text-white/30 uppercase tracking-widest">Coins</span>
                </div>
            )}

            {rewards.items && rewards.items.length > 0 && (
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 text-rose-400 mb-1">
                        <Package size={20} />
                        <span className="text-2xl font-display">{rewards.items.length}</span>
                    </div>
                    <span className="text-[10px] text-white/30 uppercase tracking-widest">New Items</span>
                </div>
            )}
        </div>
      </div>

      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 3 }}
        className="h-1 bg-aether-gold/50 rounded-full"
      />
    </motion.div>
  );
};

export default RewardPopup;
