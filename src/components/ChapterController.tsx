"use client";

import { useStoryStore } from "@/store/storyStore";
import { AnimatePresence, motion } from "framer-motion";
import LockScreen from "./chapters/LockScreen";
import TheJourney from "./chapters/TheJourney";
import HeartCollectionGame from "./chapters/HeartCollectionGame";
import TheProposal from "./chapters/TheProposal";
import TheStory from "./chapters/TheStory";

export default function ChapterController() {
    const { currentChapter } = useStoryStore();

    return (
        <div className="relative w-full h-[100dvh] overflow-hidden bg-love-cream text-slate-800">
            <AnimatePresence mode="wait">
                {currentChapter === 0 && (
                    <motion.div key="chapter-0" exit={{ opacity: 0 }} className="absolute inset-0">
                        <LockScreen />
                    </motion.div>
                )}
                {currentChapter === 1 && (
                    <motion.div
                        key="chapter-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                    >
                        <TheJourney />
                    </motion.div>
                )}
                {currentChapter === 2 && (
                    <motion.div
                        key="chapter-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                    >
                        <HeartCollectionGame />
                    </motion.div>
                )}
                {currentChapter === 3 && (
                    <motion.div
                        key="chapter-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0"
                    >
                        <TheProposal />
                    </motion.div>
                )}
                {currentChapter === 4 && (
                    <motion.div
                        key="chapter-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0"
                    >
                        <TheStory />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
