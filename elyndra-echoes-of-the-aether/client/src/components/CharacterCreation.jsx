import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Sun, Droplets, Leaf, Wind, Moon, ChevronRight, User, CheckCircle2 } from 'lucide-react';

const PATHS = [
  {
    id: 'solara',
    name: 'Solara',
    icon: Sun,
    color: 'text-solara-gold',
    bg: 'bg-solara-gold/10',
    border: 'border-solara-gold/30',
    description: 'Path of sun and warmth. Master radiant shields and bolster courage in others.',
    ability: 'Radiant Shield'
  },
  {
    id: 'tidelume',
    name: 'Tidelume',
    icon: Droplets,
    color: 'text-tidelume-aqua',
    bg: 'bg-tidelume-aqua/10',
    border: 'border-tidelume-aqua/30',
    description: 'Path of moonlit water. Heal the weary and reveal hidden memories within the aether.',
    ability: 'Memory Recall'
  },
  {
    id: 'verdance',
    name: 'Verdance',
    icon: Leaf,
    color: 'text-verdance-emerald',
    bg: 'bg-verdance-emerald/10',
    border: 'border-verdance-emerald/30',
    description: 'Path of the forest. Bond with nature spirits to restore balance and growth.',
    ability: 'Nature Bond'
  },
  {
    id: 'zephyra',
    name: 'Zephyra',
    icon: Wind,
    color: 'text-zephyra-cyan',
    bg: 'bg-zephyra-cyan/10',
    border: 'border-zephyra-cyan/30',
    description: 'Path of the sky. Move with the agility of the wind and explore unreachable heights.',
    ability: 'Sky Dash'
  },
  {
    id: 'umbralis',
    name: 'Umbralis',
    icon: Moon,
    color: 'text-umbralis-violet',
    bg: 'bg-umbralis-violet/10',
    border: 'border-umbralis-violet/30',
    description: 'Path of shadow. Detect deception and uncover hidden paths through the dark.',
    ability: 'Shadow Sight'
  }
];

const AVATARS = [
  { id: 'wanderer', name: 'The Wanderer', desc: 'A seeker of lost horizons.', style: 'linear-gradient(135deg, #6EE7F5 0%, #102B4E 100%)' },
  { id: 'mystic', name: 'The Mystic', desc: 'A guardian of ancient whispers.', style: 'linear-gradient(135deg, #B9A7FF 0%, #4C1D95 100%)' },
  { id: 'sentinel', name: 'The Sentinel', desc: 'A protector of the realm.', style: 'linear-gradient(135deg, #F7D88A 0%, #78350F 100%)' },
  { id: 'scholar', name: 'The Scholar', desc: 'A weaver of aetheric truth.', style: 'linear-gradient(135deg, #50C878 0%, #064E3B 100%)' },
];

const CharacterCreation = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedPath, setSelectedPath] = useState(null);
  const [step, setStep] = useState(1);

  const handleComplete = () => {
    if (name && selectedAvatar && selectedPath) {
      onComplete({ name, avatar: selectedAvatar.id, aetherPath: selectedPath.id });
    }
  };

  const stepsInfo = [
    'Identify Yourself',
    'Choose Your Form',
    'Choose Your Path'
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl glass p-8 md:p-12 rounded-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sparkles size={120} className="text-celestial" />
        </div>

        <div className="relative z-10">
          <header className="mb-12">
            <h2 className="text-4xl font-bold text-cloudwhite mb-2 tracking-tight">Begin Your Awakening</h2>
            <p className="text-cloudwhite/60 uppercase tracking-[0.2em] text-sm">Step {step} of 3: {stepsInfo[step-1]}</p>
          </header>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <label className="block text-aether font-fantasy tracking-widest uppercase text-sm">What is your name, Traveler?</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-cloudwhite/30" size={20} />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name..."
                      className="w-full bg-midnight/40 border border-cloudwhite/10 rounded-xl py-4 pl-12 pr-4 text-cloudwhite placeholder:text-cloudwhite/20 focus:outline-none focus:border-celestial/50 transition-all text-xl"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    disabled={!name.trim()}
                    onClick={() => setStep(2)}
                    className="flex items-center gap-2 px-8 py-4 bg-celestial/20 hover:bg-celestial/30 disabled:opacity-30 disabled:cursor-not-allowed border border-celestial/30 rounded-xl transition-all group"
                  >
                    <span className="font-fantasy uppercase tracking-widest">Next</span>
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {AVATARS.map((avatar) => (
                    <button
                      key={avatar.id}
                      onClick={() => setSelectedAvatar(avatar)}
                      className={`relative aspect-[3/4] rounded-xl overflow-hidden border transition-all duration-300 group ${
                        selectedAvatar?.id === avatar.id ? 'border-celestial shadow-[0_0_20px_rgba(110,231,245,0.3)]' : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity" style={{ background: avatar.style }} />
                      <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-center">
                        <span className="font-fantasy text-xs uppercase tracking-wider mb-1">{avatar.name}</span>
                        <p className="text-[10px] text-cloudwhite/60 leading-tight">{avatar.desc}</p>
                      </div>
                      {selectedAvatar?.id === avatar.id && (
                        <div className="absolute top-2 right-2 text-celestial">
                          <CheckCircle2 size={20} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <button onClick={() => setStep(1)} className="text-cloudwhite/40 hover:text-cloudwhite transition-colors uppercase tracking-widest text-xs">Back</button>
                  <button
                    disabled={!selectedAvatar}
                    onClick={() => setStep(3)}
                    className="flex items-center gap-2 px-8 py-4 bg-celestial/20 hover:bg-celestial/30 disabled:opacity-30 border border-celestial/30 rounded-xl transition-all group"
                  >
                    <span className="font-fantasy uppercase tracking-widest">Next</span>
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {PATHS.map((path) => (
                    <button
                      key={path.id}
                      onClick={() => setSelectedPath(path)}
                      className={`relative p-6 rounded-xl border transition-all duration-300 flex flex-col items-center gap-4 text-center group ${
                        selectedPath?.id === path.id
                          ? `${path.bg} ${path.border} shadow-[0_0_20px_rgba(255,255,255,0.05)]`
                          : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <path.icon size={32} className={`${path.color} ${selectedPath?.id === path.id ? 'scale-110' : 'group-hover:scale-110'} transition-transform`} />
                      <span className="font-fantasy text-sm uppercase tracking-wider text-cloudwhite">{path.name}</span>

                      {selectedPath?.id === path.id && (
                        <motion.div
                          layoutId="path-selector"
                          className="absolute inset-0 border-2 border-celestial/50 rounded-xl pointer-events-none"
                        />
                      )}
                    </button>
                  ))}
                </div>

                <div className="min-h-[120px] p-6 rounded-xl bg-white/5 border border-white/5">
                  <AnimatePresence mode="wait">
                    {selectedPath ? (
                      <motion.div
                        key={selectedPath.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2"
                      >
                        <h4 className={`font-fantasy text-xl ${selectedPath.color}`}>{selectedPath.name} Path</h4>
                        <p className="text-cloudwhite/70 text-sm leading-relaxed">{selectedPath.description}</p>
                        <div className="flex items-center gap-2 mt-4">
                          <span className="text-[10px] uppercase tracking-widest text-cloudwhite/40">Initial Ability:</span>
                          <span className={`text-xs font-bold uppercase tracking-widest ${selectedPath.color}`}>{selectedPath.ability}</span>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="h-full flex items-center justify-center text-cloudwhite/20 italic">
                        Select an Aether Path to see its details...
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setStep(2)}
                    className="text-cloudwhite/40 hover:text-cloudwhite transition-colors uppercase tracking-widest text-xs"
                  >
                    Back to Avatar
                  </button>
                  <button
                    disabled={!selectedPath}
                    onClick={handleComplete}
                    className="flex items-center gap-2 px-10 py-4 bg-aether text-midnight hover:bg-aether/80 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl transition-all font-bold group shadow-xl"
                  >
                    <span className="font-fantasy uppercase tracking-widest">Wake Up</span>
                    <Sparkles size={20} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default CharacterCreation;
