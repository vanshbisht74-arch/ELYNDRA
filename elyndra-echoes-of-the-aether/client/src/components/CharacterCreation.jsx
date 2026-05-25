import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Sun, Droplets, Leaf, Wind, Moon, ChevronRight, User, CheckCircle2 } from 'lucide-react';

const PATHS = [
  {
    id: 'solara',
    name: 'Solara',
    icon: Sun,
    color: 'text-amber-400',
    bg: 'bg-amber-400/5',
    border: 'border-amber-400/20',
    description: 'Path of sun and warmth. Master radiant shields and bolster courage in others.',
    ability: 'Radiant Shield',
    testId: 'aether-path-solara'
  },
  {
    id: 'tidelume',
    name: 'Tidelume',
    icon: Droplets,
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/5',
    border: 'border-cyan-400/20',
    description: 'Path of moonlit water. Heal the weary and reveal hidden memories within the aether.',
    ability: 'Memory Recall',
    testId: 'aether-path-tidelume'
  },
  {
    id: 'verdance',
    name: 'Verdance',
    icon: Leaf,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/5',
    border: 'border-emerald-400/20',
    description: 'Path of the forest. Bond with nature spirits to restore balance and growth.',
    ability: 'Nature Bond',
    testId: 'aether-path-verdance'
  },
  {
    id: 'zephyra',
    name: 'Zephyra',
    icon: Wind,
    color: 'text-sky-400',
    bg: 'bg-sky-400/5',
    border: 'border-sky-400/20',
    description: 'Path of the sky. Move with the agility of the wind and explore unreachable heights.',
    ability: 'Sky Dash',
    testId: 'aether-path-zephyra'
  },
  {
    id: 'umbralis',
    name: 'Umbralis',
    icon: Moon,
    color: 'text-violet-400',
    bg: 'bg-violet-400/5',
    border: 'border-violet-400/20',
    description: 'Path of shadow. Detect deception and uncover hidden paths through the dark.',
    ability: 'Shadow Sight',
    testId: 'aether-path-umbralis'
  }
];

const AVATARS = [
  { id: 'wanderer', name: 'The Wanderer', desc: 'A seeker of lost horizons.', style: 'linear-gradient(180deg, #164e63, #083344)', testId: 'avatar-option-1' },
  { id: 'mystic', name: 'The Mystic', desc: 'A guardian of ancient whispers.', style: 'linear-gradient(180deg, #312e81, #1e1b4b)', testId: 'avatar-option-2' },
  { id: 'sentinel', name: 'The Sentinel', desc: 'A protector of the realm.', style: 'linear-gradient(180deg, #451a03, #2a0e02)', testId: 'avatar-option-3' },
  { id: 'scholar', name: 'The Scholar', desc: 'A weaver of aetheric truth.', style: 'linear-gradient(180deg, #064e3b, #022c22)', testId: 'avatar-option-4' },
];

const CharacterCreation = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedPath, setSelectedPath] = useState(null);
  const [step, setStep] = useState(1);

  const handleComplete = () => {
    if (name && selectedAvatar && selectedPath) {
      onComplete({
        name,
        avatar: selectedAvatar.id,
        aetherPath: selectedPath.id,
        level: 1,
        xp: 0,
        health: 100,
        aether: 100,
        coins: 50
      });
    }
  };

  const stepsInfo = [
    'Identify Yourself',
    'Choose Your Form',
    'Choose Your Path'
  ];

  return (
    <div
      data-testid="character-creation-screen"
      className="min-h-screen w-full flex items-center justify-center p-6 z-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl glass-card p-10 md:p-14 rounded-[2rem] relative overflow-hidden"
      >
        <div className="absolute top-10 right-10 opacity-[0.03]">
            <Sparkles size={160} className="text-white" />
        </div>

        <div className="relative z-10">
          <header className="mb-14">
            <h2 className="text-5xl font-display text-white mb-3 tracking-widest uppercase">Begin Your Awakening</h2>
            <p className="text-celestial-200/40 uppercase tracking-[0.4em] text-[10px] font-medium">
              Step {step} of 3: {stepsInfo[step-1]}
            </p>
          </header>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div className="space-y-6">
                  <label className="block text-amber-200/60 font-serif-elegant tracking-[0.2em] uppercase text-[10px]">What is your name, Traveler?</label>
                  <div className="relative">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 text-white/10" size={20} />
                    <input
                      data-testid="character-name-input"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name..."
                      className="w-full bg-midnight-950/40 border border-white/5 rounded-2xl py-6 pl-16 pr-6 text-white placeholder:text-white/10 focus:outline-none focus:border-celestial-500/30 transition-all text-2xl font-serif-elegant tracking-wider"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    data-testid="creation-next-button"
                    disabled={!name.trim()}
                    onClick={() => setStep(2)}
                    className="flex items-center gap-3 px-10 py-4 bg-celestial-500/10 hover:bg-celestial-500/20 disabled:opacity-20 disabled:cursor-not-allowed border border-white/10 rounded-xl transition-all group"
                  >
                    <span className="font-display uppercase tracking-widest text-sm text-celestial-100">Next</span>
                    <ChevronRight size={16} className="text-celestial-300 group-hover:translate-x-1 transition-transform" />
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
                className="space-y-10"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {AVATARS.map((avatar) => (
                    <button
                      key={avatar.id}
                      data-testid={avatar.testId}
                      onClick={() => setSelectedAvatar(avatar)}
                      className={`relative aspect-[3/4.5] rounded-2xl overflow-hidden border transition-all duration-500 group ${
                        selectedAvatar?.id === avatar.id ? 'border-celestial-500/50 shadow-2xl' : 'border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity" style={{ background: avatar.style }} />
                      <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center bg-gradient-to-t from-midnight-950 via-transparent to-transparent">
                        <span className="font-display text-[10px] uppercase tracking-widest text-white mb-2">{avatar.name}</span>
                        <p className="text-[9px] text-white/40 leading-relaxed font-light italic">{avatar.desc}</p>
                      </div>
                      {selectedAvatar?.id === avatar.id && (
                        <div className="absolute top-4 right-4 text-celestial-400">
                          <CheckCircle2 size={16} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <button onClick={() => setStep(1)} className="text-white/20 hover:text-white transition-colors uppercase tracking-[0.3em] text-[10px]">Back</button>
                  <button
                    data-testid="creation-next-button"
                    disabled={!selectedAvatar}
                    onClick={() => setStep(3)}
                    className="flex items-center gap-3 px-10 py-4 bg-celestial-500/10 hover:bg-celestial-500/20 disabled:opacity-20 border border-white/10 rounded-xl transition-all group"
                  >
                    <span className="font-display uppercase tracking-widest text-sm text-celestial-100">Next</span>
                    <ChevronRight size={16} className="text-celestial-300 group-hover:translate-x-1 transition-transform" />
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
                className="space-y-10"
              >
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {PATHS.map((path) => (
                    <button
                      key={path.id}
                      data-testid={path.testId}
                      onClick={() => setSelectedPath(path)}
                      className={`relative p-6 rounded-2xl border transition-all duration-500 flex flex-col items-center gap-4 text-center group ${
                        selectedPath?.id === path.id
                          ? `${path.bg} ${path.border} shadow-2xl`
                          : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                      }`}
                    >
                      <path.icon size={28} className={`${path.color} ${selectedPath?.id === path.id ? 'scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]' : 'group-hover:scale-110 opacity-40'} transition-all`} />
                      <span className={`font-display text-[10px] uppercase tracking-widest ${selectedPath?.id === path.id ? 'text-white' : 'text-white/20'}`}>{path.name}</span>
                    </button>
                  ))}
                </div>

                <div className="min-h-[140px] p-8 rounded-[1.5rem] bg-midnight-950/40 border border-white/5">
                  <AnimatePresence mode="wait">
                    {selectedPath ? (
                      <motion.div
                        key={selectedPath.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <h4 className={`font-display text-xs uppercase tracking-[0.4em] ${selectedPath.color}`}>{selectedPath.name} Path</h4>
                        <p className="text-white/60 text-sm leading-relaxed font-serif-elegant italic">{selectedPath.description}</p>
                      </motion.div>
                    ) : (
                      <div className="h-full flex items-center justify-center text-white/10 italic font-serif-elegant text-sm">
                        Select an Aether Path to see its details...
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setStep(2)}
                    className="text-white/20 hover:text-white transition-colors uppercase tracking-[0.3em] text-[10px]"
                  >
                    Back to Form
                  </button>
                  <button
                    data-testid="begin-adventure-button"
                    disabled={!selectedPath}
                    onClick={handleComplete}
                    className="flex items-center gap-3 px-12 py-5 bg-white/5 hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed border border-white/10 rounded-2xl transition-all group"
                  >
                    <span className="font-display uppercase tracking-widest text-sm text-celestial-100">Wake Up</span>
                    <Sparkles size={16} className="text-celestial-300" />
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
