import React from 'react';
import { motion } from 'framer-motion';
import { X, Film, Sparkles } from 'lucide-react';

const EndingGalleryModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const endings = [
    { id: 'guardian', title: 'Guardian of the Aetherwell', desc: 'Restored balance through unity and trust.', unlocked: false },
    { id: 'wandering-star', title: 'Wandering Star', desc: 'Refused power to continue the journey.', unlocked: false },
    { id: 'crown-of-echoes', title: 'Crown of Echoes', desc: 'Took control of the Aetherwell.', unlocked: false },
  ];

  return (
    <motion.div
      data-testid="ending-gallery-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-4xl bg-midnight-900 border border-celestial-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[70vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-celestial-500/20 flex justify-between items-center bg-midnight-950/50">
          <div className="flex items-center gap-3">
            <Film className="text-rose-400" size={24} />
            <h2 className="text-2xl font-display text-celestial-300">Ending Gallery</h2>
          </div>
          <button
            data-testid="ending-gallery-close-button"
            onClick={onClose}
            className="p-2 hover:bg-celestial-500/20 rounded-full text-celestial-300"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {endings.map((ending) => (
              <div
                key={ending.id}
                className="group relative aspect-video bg-midnight-950/60 border border-white/5 rounded-2xl overflow-hidden flex flex-col items-center justify-center text-center p-6 grayscale"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Sparkles size={32} className="text-white/10 mb-4" />
                <h3 className="font-display text-lg text-white/40">{ending.title}</h3>
                <p className="text-[10px] uppercase tracking-widest text-white/20 mt-2">Locked</p>

                <div className="absolute top-4 right-4 p-2 bg-black/40 rounded-full">
                  <Film size={16} className="text-white/20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EndingGalleryModal;
