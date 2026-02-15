"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useStoryStore } from "@/store/storyStore";
import ThreeDEmoji from "../ui/ThreeDEmoji";

export default function HeartCollectionGame() {
    const { nextChapter } = useStoryStore();
    const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
    const [score, setScore] = useState(0);
    const TARGET_SCORE = 10;

    useEffect(() => {
        // Spawn hearts periodically
        const interval = setInterval(() => {
            if (score < TARGET_SCORE) {
                setHearts((prev) => [
                    ...prev,
                    {
                        id: Date.now(),
                        x: Math.random() * 80 + 10, // 10% to 90%
                        y: Math.random() * 80 + 10,
                    },
                ]);
            }
        }, 800);

        return () => clearInterval(interval);
    }, [score]);

    const collectHeart = (id: number) => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
        setScore((prev) => prev + 1);
    };

    useEffect(() => {
        if (score >= TARGET_SCORE) {
            setTimeout(nextChapter, 1500);
        }
    }, [score, nextChapter]);

    return (
        <div className="flex flex-col items-center justify-center h-full bg-pink-100 relative overflow-hidden">
            <h2 className="text-4xl font-bold text-rose-600 mb-8 z-10 flex items-center gap-3 font-serif">
                Collect 10 Hearts! <ThreeDEmoji name="heart" />
            </h2>
            <div className="text-2xl font-bold text-rose-400 z-10 mb-8">Score: {score} / {TARGET_SCORE}</div>

            {score >= TARGET_SCORE && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-20"
                >
                    <div className="text-center">
                        <ThreeDEmoji name="party" size={100} />
                        <h1 className="text-6xl font-bold text-rose-600 mt-4 font-serif">Perfect!</h1>
                    </div>
                </motion.div>
            )}

            {hearts.map((heart) => (
                <motion.button
                    key={heart.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => collectHeart(heart.id)}
                    className="absolute drop-shadow-lg cursor-pointer"
                    style={{ top: `${heart.y}%`, left: `${heart.x}%` }}
                >
                    <ThreeDEmoji name="heart" size={64} />
                </motion.button>
            ))}
        </div>
    );
}
