import React from 'react';
import { motion } from 'framer-motion';
import { X, Package, Shield, Zap } from 'lucide-react';
import { ITEMS } from '../data/items';
import { ItemIcon } from './LocalAssets';

const InventoryModal = ({ items, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/90 backdrop-blur-md"
    >
      <div className="relative w-full max-w-5xl glass-mythic rounded-sm border border-gold/20 p-12 overflow-hidden">
        <div className="flex justify-between items-start mb-12">
          <div>
            <p className="text-gold font-display text-[10px] tracking-[0.5em] uppercase mb-2">Relics & Provisions</p>
            <h2 className="text-5xl text-white font-black tracking-widest text-shadow-mythic">INVENTORY</h2>
          </div>
          <button
            data-testid="inventory-close-button"
            onClick={onClose}
            className="p-2 text-white/40 hover:text-white transition-colors"
          >
            <X size={32} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center space-y-4 border border-dashed border-white/10 rounded-sm">
            <Package className="text-white/10" size={48} />
            <p className="font-serif-elegant italic text-white/30 tracking-widest">Your satchel is currently empty...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 max-h-[60vh] overflow-y-auto pr-4">
            {items.map((itemId, idx) => {
              const item = ITEMS[itemId];
              if (!item) return null;

              return (
                <motion.div
                  key={`${itemId}-${idx}`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group relative bg-white/5 border border-white/10 p-6 flex flex-col items-center text-center space-y-4 transition-all hover:border-gold/40"
                >
                  <div className={`absolute top-0 left-0 w-full h-1 ${
                    item.rarity === 'legendary' ? 'bg-gold' :
                    item.rarity === 'epic' ? 'bg-purple-500' :
                    item.rarity === 'rare' ? 'bg-blue-400' : 'bg-white/20'
                  }`} />

                  <div className="w-16 h-16 flex items-center justify-center">
                    <ItemIcon name={item.name} className="w-full h-full" />
                  </div>

                  <div>
                    <p className="text-[10px] font-display uppercase tracking-widest text-white/90 mb-1">{item.name}</p>
                    <p className="text-[8px] uppercase tracking-[0.2em] text-white/40">{item.rarity}</p>
                  </div>

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/95 p-6 flex flex-col justify-center text-left">
                    <p className="text-[8px] text-gold uppercase tracking-[0.2em] mb-2">{item.type}</p>
                    <p className="text-[10px] text-white/70 font-serif-elegant leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-white/5 flex gap-12 text-[9px] font-display uppercase tracking-[0.3em] text-white/40">
          <div className="flex items-center gap-2">
            <Shield size={12} className="text-gold/60" />
            <span>Capacity: {items.length} / 50</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap size={12} className="text-gold/60" />
            <span>Aether Relics: {items.filter(id => ITEMS[id]?.type === 'relic').length}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InventoryModal;
