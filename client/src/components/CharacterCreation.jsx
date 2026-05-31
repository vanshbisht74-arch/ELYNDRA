import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { PathSymbol } from './LocalAssets';

const CharacterCreation = ({ onComplete }) => {
  const [step, setStep] = React.useState(1);
  const [name, setName] = React.useState('');
  const [selectedAvatar, setSelectedAvatar] = React.useState(1);
  const [selectedPath, setSelectedPath] = React.useState('Solara');
  const { setPlayer, startGame } = useGameStore();

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      setPlayer({
        name,
        avatar: `avatar-${selectedAvatar}`,
        aetherPath: selectedPath,
      });
      startGame();
      onComplete();
    }
  };

  return (
    <div data-testid="character-creation-screen" className="relative min-h-screen w-full flex flex-col items-center justify-center p-12">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="z-10 w-full max-w-4xl"
      >
        <div className="text-center mb-16">
          <p className="text-gold font-display text-[10px] tracking-[0.6em] uppercase mb-4 opacity-60">Sequence {step} of 3</p>
          <h2 className="text-6xl text-white font-black tracking-widest text-shadow-mythic uppercase">
            {step === 1 ? 'Designation' : step === 2 ? 'The Vessel' : 'Affinity'}
          </h2>
        </div>

        <div className="glass-mythic p-12 rounded-sm border border-gold/10">
          {step === 1 && (
            <div className="space-y-12">
              <p className="text-center text-xl font-serif-elegant italic text-white/60 tracking-widest leading-relaxed">
                "What name shall be etched into the archives of Elyndra?"
              </p>
              <div className="flex flex-col items-center">
                <input
                  data-testid="character-name-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="IDENTITY"
                  className="w-full max-w-md bg-transparent border-b border-gold/30 py-4 text-center text-3xl font-display tracking-[0.4em] text-white focus:border-gold outline-none transition-all placeholder:text-white/5 uppercase"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map(id => (
                <button
                  key={id}
                  data-testid={`avatar-option-${id}`}
                  onClick={() => setSelectedAvatar(id)}
                  className={`relative group aspect-square flex items-center justify-center transition-all duration-500 rounded-sm overflow-hidden border
                    ${selectedAvatar === id ? 'border-gold bg-gold/5 shadow-[0_0_40px_rgba(247,216,138,0.1)]' : 'border-white/5 hover:border-white/20'}
                  `}
                >
                  <p className="text-4xl font-display text-white/10 group-hover:text-white/40 transition-colors uppercase">V-{id}</p>
                  {selectedAvatar === id && (
                    <motion.div layoutId="selection-ring" className="absolute inset-2 border border-gold/40 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {['Solara', 'Tidelume', 'Verdance', 'Zephyra', 'Umbralis'].map(path => (
                <button
                  key={path}
                  data-testid={`aether-path-${path.toLowerCase()}`}
                  onClick={() => setSelectedPath(path)}
                  className={`p-6 flex flex-col items-center space-y-6 transition-all duration-500 border
                    ${selectedPath === path ? 'border-gold bg-gold/5 shadow-[0_0_30px_rgba(247,216,138,0.05)]' : 'border-white/5 hover:border-white/10'}
                  `}
                >
                  <div className={`w-16 h-16 ${selectedPath === path ? 'text-gold' : 'text-white/20'}`}>
                    <PathSymbol name={path} className="w-full h-full" />
                  </div>
                  <p className={`text-[9px] font-display uppercase tracking-widest ${selectedPath === path ? 'text-gold' : 'text-white/30'}`}>
                    {path}
                  </p>
                </button>
              ))}
            </div>
          )}

          <div className="mt-16 flex justify-center">
            <button
              data-testid={step === 3 ? "begin-adventure-button" : "creation-next-button"}
              disabled={step === 1 && !name}
              onClick={handleNext}
              className="mythic-button px-12 py-5 disabled:opacity-20"
            >
              {step === 3 ? 'Awaken' : 'Proceed'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CharacterCreation;
