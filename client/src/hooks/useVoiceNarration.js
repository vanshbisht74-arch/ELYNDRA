import { useCallback } from 'react';
import { useGameStore } from '../store/gameStore';

const useVoiceNarration = () => {
  const settings = useGameStore((state) => state.settings);

  const speak = useCallback((text, speaker = 'Narrator') => {
    if (!settings.voiceEnabled || !window.speechSynthesis) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Simple heuristic for voices
    switch (speaker) {
      case 'Lyra':
        utterance.pitch = 1.2;
        utterance.rate = 1.1;
        break;
      case 'Elder Rowan':
        utterance.pitch = 0.8;
        utterance.rate = 0.85;
        break;
      case 'Mira Vey':
        utterance.pitch = 1.1;
        utterance.rate = 1.2;
        break;
      case 'Cael Ardent':
        utterance.pitch = 0.9;
        utterance.rate = 0.9;
        break;
      case 'Seraphine Noct':
        utterance.pitch = 0.7;
        utterance.rate = 0.8;
        break;
      default:
        utterance.pitch = 1.0;
        utterance.rate = settings.speechRate;
    }

    utterance.volume = settings.volume;

    window.speechSynthesis.speak(utterance);
  }, [settings]);

  const stop = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  return { speak, stop };
};

export default useVoiceNarration;
