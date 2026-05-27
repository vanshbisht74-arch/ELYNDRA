import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarfallReachBG, LuminaraHarborBG, SylvaraWildsBG, FrostveilCitadelBG, AstralHollowBG } from './Illustrations';

const backgrounds = {
  'starfall-reach': <StarfallReachBG />,
  'luminara-harbor': <LuminaraHarborBG />,
  'sylvara-wilds': <SylvaraWildsBG />,
  'frostveil-citadel': <FrostveilCitadelBG />,
  'astral-hollow': <AstralHollowBG />,
  'default': <StarfallReachBG />
};

const AnimatedBackground = ({ regionId = 'starfall-reach' }) => {
  const bg = backgrounds[regionId] || backgrounds.default;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={regionId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.5 }}
          className="absolute inset-0 w-full h-full brightness-[60%]"
        >
          {bg}
        </motion.div>
      </AnimatePresence>

      {/* Mythic Vignette */}
      <div className="absolute inset-0 cinematic-vignette opacity-80 pointer-events-none" />
    </div>
  );
};

export default AnimatedBackground;
