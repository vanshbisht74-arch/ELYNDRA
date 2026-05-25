import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Lock, CheckCircle2 } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { REGIONS } from '../data/regions';

const WorldMapModal = ({ isOpen, onClose }) => {
  const { unlockedRegions, game, completedQuests } = useGameStore();

  if (!isOpen) return null;

  // REGIONS is an object, convert to array for mapping
  const regionsList = Object.values(REGIONS);

  return (
    <motion.div
      data-testid="world-map-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-5xl aspect-video bg-midnight-900/90 border border-celestial-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-celestial-500/20 flex justify-between items-center bg-midnight-950/50">
          <div>
            <h2 className="text-3xl font-display text-celestial-300 tracking-wider">World of Elyndra</h2>
            <p className="text-celestial-100/60 text-sm">Every region holds an Echo of the Aether.</p>
          </div>
          <button
            data-testid="world-map-close-button"
            onClick={onClose}
            className="p-2 hover:bg-celestial-500/20 rounded-full transition-colors text-celestial-300"
          >
            <X size={28} />
          </button>
        </div>

        {/* Map Grid */}
        <div className="flex-1 relative p-8 overflow-auto">
          {/* Animated Map Background (Abstract) */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#6EE7F5_0%,transparent_70%)]" />
            <div className="grid grid-cols-6 grid-rows-6 w-full h-full border border-celestial-500/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {regionsList.map((region) => {
              const isUnlocked = unlockedRegions.includes(region.id);
              const isCurrent = game.currentRegion === region.id;
              const regionQuests = completedQuests.filter(q => q.regionId === region.id).length;

              return (
                <motion.div
                  key={region.id}
                  whileHover={isUnlocked ? { scale: 1.02, translateY: -5 } : {}}
                  className={`
                    relative group p-6 rounded-2xl border transition-all duration-300
                    ${isUnlocked
                      ? 'bg-midnight-800/60 border-celestial-500/40 hover:border-celestial-400 cursor-pointer shadow-lg shadow-celestial-900/20'
                      : 'bg-midnight-950/40 border-white/5 grayscale opacity-60'}
                  `}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl ${isUnlocked ? 'bg-celestial-500/20 text-celestial-300' : 'bg-white/5 text-white/20'}`}>
                      {isUnlocked ? <MapPin size={24} /> : <Lock size={24} />}
                    </div>
                    {isCurrent && (
                      <span className="px-3 py-1 bg-aether-gold/20 text-aether-gold text-[10px] font-bold rounded-full uppercase tracking-tighter border border-aether-gold/30">
                        Current Location
                      </span>
                    )}
                  </div>

                  <h3 className={`text-xl font-display mb-2 ${isUnlocked ? 'text-white' : 'text-white/40'}`}>
                    {region.name}
                  </h3>
                  <p className="text-sm text-white/50 mb-4 line-clamp-2">
                    {isUnlocked ? region.description : 'The path to this region remains clouded in mist.'}
                  </p>

                  {isUnlocked && (
                    <div className="flex items-center gap-4 pt-4 border-t border-white/10 text-xs">
                      <div className="flex items-center gap-1 text-celestial-300">
                        <CheckCircle2 size={14} />
                        <span>{regionQuests} Quests</span>
                      </div>
                      <div className="text-white/40 italic">
                        {region.companion}
                      </div>
                    </div>
                  )}

                  {/* Decorative Glow */}
                  {isUnlocked && (
                    <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-celestial-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-midnight-950/80 text-center text-xs text-celestial-100/40 border-t border-celestial-500/10">
          Reach the required milestones in the story to unlock new regions.
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WorldMapModal;
