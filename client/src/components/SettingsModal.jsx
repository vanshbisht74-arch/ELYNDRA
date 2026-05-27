import React from 'react';
import { motion } from 'framer-motion';
import { X, Volume2, VolumeX, Zap, RefreshCcw } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const SettingsModal = ({ isOpen, onClose }) => {
  const store = useGameStore();

  if (!isOpen) return null;

  return (
    <motion.div
      data-testid="settings-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-md bg-midnight-900 border border-celestial-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-celestial-500/20 flex justify-between items-center bg-midnight-950/50">
          <h2 className="text-2xl font-display text-celestial-300">Settings</h2>
          <button
            data-testid="settings-close-button"
            onClick={onClose}
            className="p-2 hover:bg-celestial-500/20 rounded-full text-celestial-300"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8 space-y-6">
          {/* Voice Enabled */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 className="text-celestial-400" size={20} />
              <span className="text-white/80">Voice Narration</span>
            </div>
            <button
              data-testid="voice-enabled-toggle"
              onClick={() => store.updateSettings({ voiceEnabled: !store.settings.voiceEnabled })}
              className={`w-12 h-6 rounded-full transition-colors relative ${store.settings.voiceEnabled ? 'bg-celestial-500' : 'bg-white/10'}`}
            >
              <motion.div
                animate={{ x: store.settings.voiceEnabled ? 26 : 4 }}
                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
              />
            </button>
          </div>

          {/* Auto Narrate */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="text-celestial-400" size={20} />
              <span className="text-white/80">Auto Narrate</span>
            </div>
            <button
              data-testid="auto-narrate-toggle"
              onClick={() => store.updateSettings({ autoNarrate: !store.settings.autoNarrate })}
              className={`w-12 h-6 rounded-full transition-colors relative ${store.settings.autoNarrate ? 'bg-celestial-500' : 'bg-white/10'}`}
            >
              <motion.div
                animate={{ x: store.settings.autoNarrate ? 26 : 4 }}
                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
              />
            </button>
          </div>

          {/* Volume */}
          <div className="space-y-3">
            <div className="flex justify-between text-xs uppercase tracking-widest text-white/40 font-bold">
              <span>Volume</span>
              <span>{Math.round(store.settings.volume * 100)}%</span>
            </div>
            <input
              data-testid="volume-slider"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={store.settings.volume}
              onChange={(e) => store.updateSettings({ volume: parseFloat(e.target.value) })}
              className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-celestial-500"
            />
          </div>

          {/* Speed */}
          <div className="space-y-3">
            <div className="flex justify-between text-xs uppercase tracking-widest text-white/40 font-bold">
              <span>Speech Rate</span>
              <span>{store.settings.speechRate}x</span>
            </div>
            <input
              data-testid="speech-rate-slider"
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={store.settings.speechRate}
              onChange={(e) => store.updateSettings({ speechRate: parseFloat(e.target.value) })}
              className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-celestial-500"
            />
          </div>

          <div className="pt-6 border-t border-white/5">
            <button
              data-testid="reset-save-button"
              onClick={() => {
                if (window.confirm("Are you sure? This will delete all your progress.")) {
                  store.resetGame();
                  window.location.reload();
                }
              }}
              className="w-full py-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-xl transition-all flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest"
            >
              <RefreshCcw size={16} />
              Reset All Progress
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SettingsModal;
