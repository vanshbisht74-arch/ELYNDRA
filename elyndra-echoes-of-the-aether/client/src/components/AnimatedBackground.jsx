import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const backgrounds = {
  'starfall-reach': {
    gradient: 'linear-gradient(to bottom, #071426, #102B4E, #2D5A8E, #F7D88A)',
    url: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&q=80&w=2000'
  },
  'luminara-harbor': {
    gradient: 'linear-gradient(to bottom, #071426, #0A2E36, #156064, #6EE7F5)',
    url: 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&q=80&w=2000'
  },
  'sylvara-wilds': {
    gradient: 'linear-gradient(to bottom, #051A10, #0D3B2E, #1B5E44, #50C878)',
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2000'
  },
  'frostveil-citadel': {
    gradient: 'linear-gradient(to bottom, #0A192F, #1B3B5A, #3D6A8F, #E0F2F1)',
    url: 'https://images.unsplash.com/photo-1517299321529-639a9c665434?auto=format&fit=crop&q=80&w=2000'
  },
  'astral-hollow': {
    gradient: 'linear-gradient(to bottom, #020617, #1E1B4B, #4C1D95, #F7D88A)',
    url: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bcc0?auto=format&fit=crop&q=80&w=2000'
  },
  'default': {
    gradient: 'linear-gradient(to bottom, #071426, #102B4E)',
    url: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80&w=2000'
  }
};

const AnimatedBackground = ({ regionId = 'starfall-reach' }) => {
  const bg = backgrounds[regionId] || backgrounds.default;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={regionId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${bg.url})`,
            backgroundColor: '#071426'
          }}
        >
          {/* Blend gradient for mood consistency */}
          <div
            className="absolute inset-0 opacity-40 mix-blend-overlay"
            style={{ background: bg.gradient }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay for cinematic depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(7,20,38,0.4)_100%)]" />
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
    </div>
  );
};

export default AnimatedBackground;
