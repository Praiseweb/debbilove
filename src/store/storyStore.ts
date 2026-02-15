import { create } from 'zustand';

interface StoryState {
    currentChapter: number;
    isUnlocked: boolean;
    heartsCollected: number;
    nextChapter: () => void;
    unlock: () => void;
    collectHeart: () => void;
    reset: () => void;
}

export const useStoryStore = create<StoryState>((set) => ({
    currentChapter: 0,
    isUnlocked: false,
    heartsCollected: 0,
    nextChapter: () => set((state) => ({ currentChapter: state.currentChapter + 1 })),
    unlock: () => set({ isUnlocked: true, currentChapter: 1 }),
    collectHeart: () => set((state) => ({ heartsCollected: state.heartsCollected + 1 })),
    reset: () => set({ currentChapter: 0, isUnlocked: false, heartsCollected: 0 }),
}));
