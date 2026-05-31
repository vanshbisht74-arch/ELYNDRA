import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const backgrounds = {
  'starfall-reach': 'https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&q=80&w=2000',
  'luminara-harbor': 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&q=80&w=2000',
  'sylvara-wilds': 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2000',
  'frostveil-citadel': 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&q=80&w=2000',
  'astral-hollow': 'https://images.unsplash.com/photo-1506318137071-a8e063b4bcc0?auto=format&fit=crop&q=80&w=2000',
  'default': 'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?auto=format&fit=crop&q=80&w=2000'
};

const AnimatedBackground = ({ regionId = 'starfall-reach' }) => {
  const bgImage = backgrounds[regionId] || backgrounds.default;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={regionId}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={bgImage}
            alt={regionId}
            className="w-full h-full object-cover brightness-[55%] contrast-[110%] blur-[2px]"
          />
        </motion.div>
      </AnimatePresence>

      {/* Mythic Vignette and Overlay */}
      <div className="absolute inset-0 cinematic-vignette opacity-90 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#071426]/80 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export default AnimatedBackground;
