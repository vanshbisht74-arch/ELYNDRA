import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { Sparkles, RefreshCcw, Home } from 'lucide-react';

const EndingScreen = ({ endingType }) => {
  const store = useGameStore();

  const endings = {
    'guardian': {
      title: 'Guardian of the Aetherwell',
      description: 'You have restored balance through unity and trust. The continent of Elyndra begins a new age of golden peace.',
      quote: 'The echoes of the past have finally found their home.',
      color: 'from-amber-400 to-yellow-600'
    },
    'wandering-star': {
      title: 'Wandering Star',
      description: 'You refused the ultimate power of the Aetherwell, choosing instead to continue exploring the vast horizons of Elyndra with your companions.',
      quote: 'The journey was always the destination.',
      color: 'from-celestial-400 to-indigo-600'
    },
    'crown-of-echoes': {
      title: 'Crown of Echoes',
      description: 'You have taken control of the Aetherwell, reshaping the world in your image. A powerful, yet lonely path.',
      quote: 'The world is but a reflection of my will.',
      color: 'from-violet-500 to-midnight-900'
    },
    'demo-end': {
      title: 'The Echo Fades...',
      description: 'You have completed the first chapter of your journey in Starfall Reach. The mysteries of the Aetherwell still await.',
      quote: 'Every choice leaves an echo in the world.',
      color: 'from-celestial-500 to-celestial-900'
    }
  };

  const currentEnding = endings[endingType] || endings['demo-end'];

  return (
    <motion.div
      data-testid="ending-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-midnight-950 overflow-hidden"
    >
      {/* Background Cinematic */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentEnding.color} opacity-20`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(7,20,38,1)_80%)]" />

      <div className="relative z-10 max-w-2xl w-full p-8 text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Sparkles className="mx-auto mb-6 text-celestial-300" size={48} />
          <h1 className="text-5xl md:text-6xl font-display text-white mb-4 tracking-tighter text-shadow-glow">
            {currentEnding.title}
          </h1>
          <div className="h-px w-24 bg-celestial-500/50 mx-auto mb-8" />

          <p className="text-xl text-white/80 leading-relaxed mb-8 italic">
            {currentEnding.description}
          </p>

          <p className="text-celestial-300 font-display text-lg mb-12">
            "{currentEnding.quote}"
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button
              data-testid="replay-adventure-button"
              onClick={() => store.resetGame()}
              className="flex items-center gap-2 px-8 py-3 bg-white text-midnight-950 rounded-full font-bold hover:bg-celestial-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <RefreshCcw size={18} />
              Replay Adventure
            </button>
            <button
              data-testid="main-menu-button"
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 px-8 py-3 bg-midnight-900 border border-white/20 text-white rounded-full font-bold hover:bg-midnight-800 transition-all"
            >
              <Home size={18} />
              Main Menu
            </button>
          </div>
        </motion.div>

        {/* Stats Recap */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-16 grid grid-cols-3 gap-4"
        >
          <div className="p-4 glass rounded-2xl">
            <div className="text-[10px] uppercase text-white/40 tracking-widest mb-1">Level</div>
            <div className="text-2xl font-display text-celestial-300">{store.player.level}</div>
          </div>
          <div className="p-4 glass rounded-2xl">
            <div className="text-[10px] uppercase text-white/40 tracking-widest mb-1">Path</div>
            <div className="text-2xl font-display text-aether-gold">{store.player.aetherPath}</div>
          </div>
          <div className="p-4 glass rounded-2xl">
            <div className="text-[10px] uppercase text-white/40 tracking-widest mb-1">Bond</div>
            <div className="text-2xl font-display text-rose-400">{store.companions['Lyra']?.bondLevel}</div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              y: [null, Math.random() * -100],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="w-1 h-1 bg-white rounded-full"
          />
        ))}
      </div>
    </motion.div>
  );
};

export default EndingScreen;
