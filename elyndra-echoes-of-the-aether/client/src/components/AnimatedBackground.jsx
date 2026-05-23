import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const backgrounds = {
  'starfall-reach': 'linear-gradient(to bottom, #071426, #102B4E, #2D5A8E, #F7D88A)',
  'luminara-harbor': 'linear-gradient(to bottom, #071426, #0A2E36, #156064, #6EE7F5)',
  'sylvara-wilds': 'linear-gradient(to bottom, #051A10, #0D3B2E, #1B5E44, #50C878)',
  'frostveil-citadel': 'linear-gradient(to bottom, #0A192F, #1B3B5A, #3D6A8F, #E0F2F1)',
  'astral-hollow': 'linear-gradient(to bottom, #020617, #1E1B4B, #4C1D95, #F7D88A)',
  'default': 'linear-gradient(to bottom, #071426, #102B4E)'
};

const AnimatedBackground = ({ region = 'starfall-reach' }) => {
  const bg = backgrounds[region] || backgrounds.default;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={region}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{ background: bg }}
        />
      </AnimatePresence>

      {/* Overlay for cinematic depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(7,20,38,0.4)_100%)]" />
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
    </div>
  );
};

export default AnimatedBackground;
