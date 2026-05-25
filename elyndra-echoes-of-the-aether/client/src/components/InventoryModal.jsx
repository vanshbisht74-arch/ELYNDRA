import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Info, Sparkles } from 'lucide-react';
import { ITEMS } from '../data/items';

const InventoryModal = ({ items, isOpen, onClose }) => {
  if (!isOpen) return null;

  // Combine user inventory state with base item data
  // ITEMS is an object, not an array
  const inventoryItems = items.map(userItem => {
      const itemId = userItem.id || userItem;
      const baseItem = ITEMS[itemId] || {};
      return { ...baseItem, ...userItem };
  });

  return (
    <motion.div
      data-testid="inventory-modal"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="relative w-full max-w-4xl bg-midnight-900/90 border border-celestial-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[70vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-celestial-500/20 flex justify-between items-center bg-midnight-950/50">
          <div className="flex items-center gap-3">
            <Package className="text-celestial-400" size={24} />
            <h2 className="text-3xl font-display text-celestial-300 tracking-wider">Inventory</h2>
          </div>
          <button
            data-testid="inventory-close-button"
            onClick={onClose}
            className="p-2 hover:bg-celestial-500/20 rounded-full transition-colors text-celestial-300"
          >
            <X size={28} />
          </button>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {inventoryItems.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, translateY: -5 }}
                className={`
                  relative aspect-square rounded-2xl border bg-midnight-950/50 p-4 flex flex-col items-center justify-center text-center group cursor-pointer overflow-hidden
                  ${item.rarity === 'legendary' ? 'border-amber-500/40 shadow-lg shadow-amber-500/10' :
                    item.rarity === 'epic' ? 'border-violet-500/40' :
                    item.rarity === 'rare' ? 'border-celestial-500/40' : 'border-white/5'}
                `}
              >
                <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center mb-2 transition-transform group-hover:rotate-12
                    ${item.rarity === 'legendary' ? 'bg-amber-500/20 text-amber-500' :
                      item.rarity === 'epic' ? 'bg-violet-500/20 text-violet-500' :
                      item.rarity === 'rare' ? 'bg-celestial-500/20 text-celestial-300' : 'bg-white/5 text-white/40'}
                `}>
                    <Sparkles size={24} />
                </div>
                <span className="text-[10px] text-white/80 font-bold uppercase tracking-tighter line-clamp-1">{item.name}</span>

                {/* Rarity Glow */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none ${
                    item.rarity === 'legendary' ? 'bg-amber-500' :
                    item.rarity === 'epic' ? 'bg-violet-500' :
                    item.rarity === 'rare' ? 'bg-celestial-500' : 'bg-white'
                }`} />
              </motion.div>
            ))}

            {/* Empty Slots */}
            {[...Array(Math.max(0, 15 - inventoryItems.length))].map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square rounded-2xl border border-white/5 bg-midnight-950/20" />
            ))}
          </div>
        </div>

        {/* Info Footer */}
        <div className="p-6 bg-midnight-950/80 border-t border-celestial-500/10 flex items-center gap-4">
            <div className="p-3 bg-celestial-500/10 rounded-xl text-celestial-300">
                <Info size={20} />
            </div>
            <p className="text-xs text-celestial-100/60 leading-relaxed italic">
                Items collected during your journey can be used to unlock secrets or aid in magical challenges.
            </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InventoryModal;
