import React from 'react';
import { motion } from 'framer-motion';

const ChoiceButton = ({ choice, onClick, index }) => {
  const toneColors = {
    kind: 'border-green-500/30 hover:bg-green-500/10 text-green-100',
    bold: 'border-aether/30 hover:bg-aether/10 text-aether',
    clever: 'border-celestial/30 hover:bg-celestial/10 text-celestial',
    cautious: 'border-white/20 hover:bg-white/5 text-cloudwhite',
    secretive: 'border-moonlave/30 hover:bg-moonlave/10 text-moonlave'
  };

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 + index * 0.1 }}
      onClick={() => onClick(choice)}
      className={`w-full p-4 rounded-xl border glass text-left transition-all duration-300 group relative overflow-hidden ${toneColors[choice.tone || 'cautious']}`}
    >
      <div className="flex justify-between items-center relative z-10">
        <span className="font-medium tracking-wide">{choice.text}</span>
        <span className="text-[10px] uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
          {choice.tone}
        </span>
      </div>
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.button>
  );
};

export default ChoiceButton;
