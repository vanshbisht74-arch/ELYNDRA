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
  Film,
  Menu,
  ChevronRight
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
import EndingScreen from './EndingScreen';
import useVoiceNarration from '../hooks/useVoiceNarration';

const AdventureScreen = () => {
  const store = useGameStore();
  const [currentSceneId, setCurrentSceneId] = useState(store.game.currentScene || 'awakening');
  const [aiSceneData, setAiSceneData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeRewards, setActiveRewards] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const sceneData = aiSceneData || DEMO_STORY[currentSceneId];
  const { speak, stop } = useVoiceNarration();

  useEffect(() => {
    if (store.settings.autoNarrate && sceneData) {
      const text = sceneData.dialogue || sceneData.narration;
      speak(text, sceneData.speaker);
    }
  }, [currentSceneId, store.settings.autoNarrate, speak, sceneData, aiSceneData]);

  const handleChoice = async (choice) => {
    stop();
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

    if (choice.nextScene) {
      if (DEMO_STORY[choice.nextScene]) {
        setAiSceneData(null);
        setCurrentSceneId(choice.nextScene);
        store.updateGame({ currentScene: choice.nextScene });
      } else {
        try {
          setIsLoading(true);
          const response = await generateStory({ ...store, selectedChoice: choice });
          setAiSceneData(response);
          setCurrentSceneId('ai-generated');
          store.updateGame({ currentScene: 'ai-generated' });
        } catch (error) {
          setCurrentSceneId('chapter-1-teaser');
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  return (
    <div data-testid="adventure-screen" className="relative h-screen w-full flex flex-col items-center overflow-y-auto">
      {/* HUD Bar */}
      <div className="absolute top-0 left-0 w-full z-30 p-8 flex justify-between items-start pointer-events-none">
        <PlayerHUD player={store.player} />

        {/* Region Indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-mythic px-8 py-3 rounded-sm text-center pointer-events-auto">
          <p className="text-[9px] text-gold/40 tracking-[0.4em] uppercase">Continental Discovery</p>
          <p className="text-xl font-display text-white tracking-widest uppercase">{store.game.currentRegion.replace('-', ' ')}</p>
        </motion.div>
      </div>

      {/* Main Narrative Area */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center justify-center min-h-screen pt-32 pb-48 px-12">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center space-y-6">
              <div className="w-16 h-16 rounded-full border border-gold/20 border-t-gold/80 animate-spin" />
              <p className="font-serif-elegant italic text-gold/80 tracking-widest animate-pulse">The Aetherwell Remembers...</p>
            </motion.div>
          ) : sceneData ? (
            <motion.div
                key={currentSceneId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.8 }}
                className="w-full"
            >
                <DialoguePanel
                  narration={sceneData.narration}
                  dialogue={sceneData.dialogue}
                  speaker={sceneData.speaker}
                  choices={sceneData.choices}
                  onChoice={handleChoice}
                />
            </motion.div>
          ) : (
            <EndingScreen endingType="demo-end" />
          )}
        </AnimatePresence>
      </div>

      {/* Mythic Navigation Rail */}
      <motion.div
        className="fixed right-0 top-0 h-full z-40 flex items-center pr-8"
        onMouseEnter={() => setIsNavExpanded(true)}
        onMouseLeave={() => setIsNavExpanded(false)}
      >
        <div className="glass-mythic p-3 rounded-full flex flex-col gap-5 border border-white/5 items-end group transition-all duration-500">
          <NavButton icon={Scroll} label="Quests" active={activeModal === 'quests'} onClick={() => setActiveModal('quests')} isExpanded={isNavExpanded} data-testid="quest-journal-button" />
          <NavButton icon={Package} label="Inventory" active={activeModal === 'inventory'} onClick={() => setActiveModal('inventory')} isExpanded={isNavExpanded} data-testid="inventory-button" />
          <NavButton icon={Map} label="Map" active={activeModal === 'map'} onClick={() => setActiveModal('map')} isExpanded={isNavExpanded} data-testid="map-button" />
          <NavButton icon={Users} label="Companions" active={activeModal === 'companions'} onClick={() => setActiveModal('companions')} isExpanded={isNavExpanded} data-testid="companions-button" />
          <NavButton icon={History} label="Timeline" active={activeModal === 'history'} onClick={() => setActiveModal('history')} isExpanded={isNavExpanded} data-testid="memories-button" />

          <div className="h-px w-6 bg-gold/20" />

          <NavButton icon={Trophy} label="Trophy" active={activeModal === 'achievements'} onClick={() => setActiveModal('achievements')} isExpanded={isNavExpanded} data-testid="achievements-button" />
          <NavButton icon={BookOpen} label="Codex" active={activeModal === 'codex'} onClick={() => setActiveModal('codex')} isExpanded={isNavExpanded} data-testid="codex-button" />
          <NavButton icon={Settings} label="System" active={activeModal === 'settings'} onClick={() => setActiveModal('settings')} isExpanded={isNavExpanded} data-testid="settings-button" />
        </div>
      </motion.div>

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
      </AnimatePresence>

      {activeRewards && <RewardPopup rewards={activeRewards} onComplete={() => setActiveRewards(null)} />}
    </div>
  );
};

const NavButton = ({ icon: Icon, label, onClick, isExpanded, active, "data-testid": testId }) => (
  <button
    data-testid={testId}
    onClick={onClick}
    className={`group relative flex items-center justify-end gap-4 p-2 transition-all duration-300 ${active ? 'text-gold' : 'text-white/40 hover:text-white'}`}
  >
    <AnimatePresence>
      {isExpanded && (
        <motion.span initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="text-[9px] font-display uppercase tracking-[0.3em] pointer-events-none">
          {label}
        </motion.span>
      )}
    </AnimatePresence>
    <div className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all ${active ? 'bg-gold/10 border-gold/40' : 'bg-white/5 border-white/5 group-hover:border-white/20'}`}>
      <Icon size={16} />
    </div>
  </button>
);

export default AdventureScreen;
