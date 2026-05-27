import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Zap, Star, Coins } from 'lucide-react';

const PlayerHUD = ({ player }) => {
  return (
    <div
      data-testid="player-hud"
      className="fixed top-0 left-0 p-8 flex flex-col gap-6 z-40 pointer-events-none"
    >
      <div className="flex items-start gap-5 pointer-events-auto">
        {/* Profile Avatar */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full glass-card border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl">
            <span className="text-2xl font-display text-white/40">{player.name ? player.name[0] : 'T'}</span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-midnight-950 border border-white/10 flex items-center justify-center text-white/60 text-[9px] font-medium font-display">
            {player.level}
          </div>
        </div>

        {/* Stats Panel */}
        <div className="glass-card p-5 rounded-2xl border border-white/5 min-w-[240px] space-y-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-white/80 font-display text-[10px] tracking-[0.3em] uppercase">{player.name || 'Traveler'}</span>
            <div className="flex items-center gap-1.5 opacity-60">
              <Coins size={10} className="text-amber-400" />
              <span className="text-amber-200 text-[9px] font-bold">{player.coins}</span>
            </div>
          </div>

          {/* Health Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[8px] uppercase tracking-[0.2em] text-white/20 font-bold px-0.5">
              <span>Health</span>
              <span>{player.health}/100</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${player.health}%` }}
                className="h-full bg-rose-500/60 shadow-[0_0_8px_rgba(244,63,94,0.3)]"
              />
            </div>
          </div>

          {/* Aether Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[8px] uppercase tracking-[0.2em] text-white/20 font-bold px-0.5">
              <span>Aether</span>
              <span>{player.aether}/100</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${player.aether}%` }}
                className="h-full bg-celestial-500/40 shadow-[0_0_8px_rgba(110,231,245,0.2)]"
              />
            </div>
          </div>

          {/* XP Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[8px] uppercase tracking-[0.2em] text-white/20 font-bold px-0.5">
              <span>XP</span>
              <span>{player.xp}/{player.level * 100}</span>
            </div>
            <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(player.xp / (player.level * 100)) * 100}%` }}
                className="h-full bg-white/10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerHUD;
