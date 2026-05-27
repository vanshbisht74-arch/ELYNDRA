import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const backgrounds = {
  'starfall-reach': '/images/backgrounds/starfall-reach.png',
  'luminara-harbor': '/images/backgrounds/luminara-harbor.png',
  'sylvara-wilds': '/images/backgrounds/sylvara-wilds.png',
  'frostveil-citadel': '/images/backgrounds/frostveil-citadel.png',
  'astral-hollow': '/images/backgrounds/astral-hollow.png',
  'default': '/images/backgrounds/starfall-reach.png'
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
