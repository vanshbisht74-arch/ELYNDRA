import React from 'react';
import { motion } from 'framer-motion';
import { X, Lock, MapPin } from 'lucide-react';
import { REGIONS } from '../data/regions';
import { useGameStore } from '../store/gameStore';

const WorldMapModal = ({ isOpen, onClose }) => {
  const { unlockedRegions, game } = useGameStore();

  if (!isOpen) return null;

  return (
    <motion.div
      data-testid="world-map-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/90 backdrop-blur-md"
    >
      <div className="relative w-full max-w-7xl h-full flex flex-col items-center justify-center">
        {/* Close Button */}
        <button
          data-testid="world-map-close-button"
          onClick={onClose}
          className="absolute top-0 right-0 p-4 text-white/40 hover:text-white transition-colors"
        >
          <X size={32} />
        </button>

        <div className="text-center mb-12">
          <p className="text-gold font-display text-[10px] tracking-[0.5em] uppercase mb-2">Continental Survey</p>
          <h2 className="text-5xl text-white font-black tracking-widest text-shadow-mythic">ELYNDRA</h2>
        </div>

        {/* Mythic Map Canvas */}
        <div className="relative w-full aspect-video glass-mythic rounded-sm border border-gold/20 overflow-hidden">
          {/* Abstract SVG Landmasses */}
          <svg viewBox="0 0 1000 600" className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
            <path d="M100 200 Q150 150 250 200 T400 150 Q500 200 600 100 T800 200" fill="none" stroke="#F7D88A" strokeWidth="1" strokeDasharray="10 5" />
            <path d="M200 400 Q300 450 400 400 T600 450 Q700 400 900 450" fill="none" stroke="#F7D88A" strokeWidth="1" strokeDasharray="5 10" />
            <circle cx="500" cy="300" r="250" fill="none" stroke="#F7D88A" strokeWidth="0.5" opacity="0.3" />
          </svg>

          {/* Region Nodes */}
          {REGIONS.map((region) => {
            const isUnlocked = unlockedRegions.includes(region.id);
            const isCurrent = game.currentRegion === region.id;

            return (
              <motion.div
                key={region.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{ left: region.coords.x, top: region.coords.y }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <div className="relative group">
                  {/* Connection Lines (Simulated) */}
                  {isCurrent && (
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -inset-8 border-2 border-gold/40 rounded-full"
                    />
                  )}

                  <button
                    disabled={!isUnlocked}
                    className={`
                      w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500
                      ${isUnlocked
                        ? 'bg-gold/20 border-2 border-gold/60 text-gold shadow-[0_0_30px_rgba(247,216,138,0.3)]'
                        : 'bg-black/40 border-2 border-white/5 text-white/20'}
                    `}
                  >
                    {isUnlocked ? <MapPin size={24} /> : <Lock size={20} />}
                  </button>

                  {/* Region Label */}
                  <div className={`
                    absolute top-20 left-1/2 -translate-x-1/2 whitespace-nowrap text-center
                    ${isUnlocked ? 'text-white' : 'text-white/30'}
                  `}>
                    <p className="font-display text-[9px] tracking-[0.3em] uppercase mb-1">{region.id.replace('-', ' ')}</p>
                    {isUnlocked && <p className="text-[8px] italic text-gold/60">Unlocked</p>}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-12 flex gap-12 text-[10px] font-display uppercase tracking-[0.3em] text-white/40">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-gold/20 border border-gold/60" />
            <span>Echo Discovered</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-black/40 border border-white/5" />
            <span>Veiled Region</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WorldMapModal;
