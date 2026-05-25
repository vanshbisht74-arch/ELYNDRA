import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scroll,
  Package,
  Map,
  Users,
  History,
  Settings,
  Trophy,
  BookOpen,
  Film
} from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { DEMO_STORY } from '../data/demoStory';
import { generateStory } from '../services/api';
import PlayerHUD from './PlayerHUD';
import DialoguePanel from './DialoguePanel';
import QuestJournal from './QuestJournal';
import InventoryModal from './InventoryModal';
import WorldMapModal from './WorldMapModal';
import CompanionsModal from './CompanionsModal';
import MemoryTimeline from './MemoryTimeline';
import RewardPopup from './RewardPopup';
import SettingsModal from './SettingsModal';
import AchievementsModal from './AchievementsModal';
import CodexModal from './CodexModal';
import EndingGalleryModal from './EndingGalleryModal';
import AnimatedBackground from './AnimatedBackground';
import ParticleField from './ParticleField';
import EndingScreen from './EndingScreen';
import useVoiceNarration from '../hooks/useVoiceNarration';

const AdventureScreen = () => {
  const store = useGameStore();
  const [currentSceneId, setCurrentSceneId] = useState(store.game.currentScene || 'awakening');
  const [aiSceneData, setAiSceneData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeRewards, setActiveRewards] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  const sceneData = aiSceneData || DEMO_STORY[currentSceneId];
  const { speak, stop } = useVoiceNarration();

  // Auto-narrate on scene change if enabled
  useEffect(() => {
    if (store.settings.autoNarrate && sceneData) {
      const text = sceneData.dialogue || sceneData.narration;
      speak(text, sceneData.speaker);
    }
  }, [currentSceneId, store.settings.autoNarrate, speak, sceneData, aiSceneData]);

  const handleChoice = async (choice) => {
    stop(); // Stop current speech when choice is made

    // Process consequences
    if (choice.affinityChange) {
      const currentAffinity = store.companions[choice.affinityChange.npc]?.affinity || 0;
      store.updateCompanion(choice.affinityChange.npc, {
        affinity: currentAffinity + choice.affinityChange.change
      });
    }

    if (choice.memory) {
      store.addMemory({
        chapter: store.game.currentChapter,
        description: choice.memory,
        type: 'decision',
        affectedNPC: choice.affinityChange?.npc,
        timestamp: new Date().toLocaleTimeString()
      });
    }

    if (choice.rewards) {
      if (choice.rewards.xp) store.addXP(choice.rewards.xp);
      if (choice.rewards.coins) store.addCoin(choice.rewards.coins);
      if (choice.rewards.items) {
        choice.rewards.items.forEach(item => store.addToInventory(item));
      }
      setActiveRewards(choice.rewards);
    }

    // Move to next scene
    if (choice.nextScene) {
      if (DEMO_STORY[choice.nextScene]) {
        // Use local demo story
        setAiSceneData(null);
        setCurrentSceneId(choice.nextScene);
        store.updateGame({ currentScene: choice.nextScene });
      } else {
        // Call AI for next scene
        try {
          setIsLoading(true);
          const response = await generateStory({
            ...store,
            selectedChoice: choice
          });
          setAiSceneData(response);
          setCurrentSceneId('ai-generated');
          store.updateGame({ currentScene: 'ai-generated' });
        } catch (error) {
          console.error("AI Generation failed, falling back to prologue", error);
          setCurrentSceneId('awakening');
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  return (
    <div
      data-testid="adventure-screen"
      className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden bg-midnight-950"
    >
      <AnimatedBackground regionId={store.game.currentRegion} />
      <ParticleField />

      <PlayerHUD player={store.player} />

      {/* Main Gameplay Area */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="z-10 w-full max-w-5xl"
      >
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-12 glass-card rounded-2xl border border-white/5">
             <div className="w-12 h-12 rounded-full border-2 border-t-celestial-400 border-white/10 animate-spin mb-6" />
             <p className="text-white/60 font-serif italic tracking-widest animate-pulse">The world remembers your choices...</p>
          </div>
        ) : sceneData ? (
          <DialoguePanel
            narration={sceneData.narration}
            dialogue={sceneData.dialogue}
            speaker={sceneData.speaker}
            choices={sceneData.choices}
            onChoice={handleChoice}
          />
        ) : (
          <EndingScreen endingType="demo-end" />
        )}
      </motion.div>

      {/* Navigation HUD Sidebar - Integrated to the right */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-30">
        <div className="glass-card p-3 rounded-full flex flex-col gap-4 border border-white/5">
          <NavButton icon={Scroll} label="Quests" onClick={() => setActiveModal('quests')} data-testid="quest-journal-button" />
          <NavButton icon={Package} label="Inventory" onClick={() => setActiveModal('inventory')} data-testid="inventory-button" />
          <NavButton icon={Map} label="Map" onClick={() => setActiveModal('map')} data-testid="map-button" />
          <NavButton icon={Users} label="Companions" onClick={() => setActiveModal('companions')} data-testid="companions-button" />
          <NavButton icon={History} label="Memories" onClick={() => setActiveModal('history')} data-testid="memories-button" />

          <div className="h-px w-6 mx-auto bg-white/5" />

          <NavButton icon={Trophy} label="Trophies" onClick={() => setActiveModal('achievements')} data-testid="achievements-button" />
          <NavButton icon={BookOpen} label="Codex" onClick={() => setActiveModal('codex')} data-testid="codex-button" />
          <NavButton icon={Film} label="Endings" onClick={() => setActiveModal('gallery')} data-testid="ending-gallery-button" />

          <div className="h-px w-6 mx-auto bg-white/5" />

          <NavButton icon={Settings} label="System" onClick={() => setActiveModal('settings')} data-testid="settings-button" />
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {activeModal === 'quests' && <QuestJournal quests={store.activeQuests} isOpen={true} onClose={() => setActiveModal(null)} />}
        {activeModal === 'inventory' && <InventoryModal items={store.inventory} isOpen={true} onClose={() => setActiveModal(null)} />}
        {activeModal === 'map' && <WorldMapModal isOpen={true} onClose={() => setActiveModal(null)} />}
        {activeModal === 'companions' && <CompanionsModal isOpen={true} onClose={() => setActiveModal(null)} />}
        {activeModal === 'history' && <MemoryTimeline isOpen={true} onClose={() => setActiveModal(null)} />}
        {activeModal === 'settings' && <SettingsModal isOpen={true} onClose={() => setActiveModal(null)} />}
        {activeModal === 'achievements' && <AchievementsModal isOpen={true} onClose={() => setActiveModal(null)} />}
        {activeModal === 'codex' && <CodexModal isOpen={true} onClose={() => setActiveModal(null)} />}
        {activeModal === 'gallery' && <EndingGalleryModal isOpen={true} onClose={() => setActiveModal(null)} />}
      </AnimatePresence>

      {activeRewards && (
        <RewardPopup
          rewards={activeRewards}
          onComplete={() => setActiveRewards(null)}
        />
      )}
    </div>
  );
};

const NavButton = ({ icon: Icon, label, onClick, "data-testid": testId }) => (
  <motion.button
    data-testid={testId}
    whileHover={{ scale: 1.15 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className="group relative flex items-center justify-center w-10 h-10 rounded-full transition-all"
  >
    <Icon size={16} className="text-white/20 group-hover:text-white transition-colors" />

    {/* Tooltip */}
    <div className="absolute right-14 px-3 py-1 glass-card border-white/10 rounded-lg text-[9px] uppercase tracking-[0.2em] text-white/60 opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap">
      {label}
    </div>
  </motion.button>
);

export default AdventureScreen;
