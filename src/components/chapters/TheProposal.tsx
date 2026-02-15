"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useStoryStore } from "@/store/storyStore";
import ThreeDEmoji from "../ui/ThreeDEmoji";

export default function TheProposal() {
    const { nextChapter } = useStoryStore();
    const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
    const [yesDecor, setYesDecor] = useState(false);

    useEffect(() => {
        if (yesDecor) {
            const timer = setTimeout(() => {
                nextChapter();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [yesDecor, nextChapter]);

    const moveNo = () => {
        setNoPosition({
            x: Math.random() * 300 - 150,
            y: Math.random() * 300 - 150,
        });
    };

    return (
        <div className="flex flex-col items-center justify-center h-full bg-gradient-to-t from-rose-100 to-white text-center relative overflow-hidden">
            {yesDecor && <Confetti recycle={false} numberOfPieces={500} />}

            {!yesDecor ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="z-10 bg-white/80 p-12 rounded-3xl shadow-xl backdrop-blur-sm border border-rose-100"
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-rose-600 mb-12 leading-tight font-serif">
                        Will you be my<br />Valentine?<ThreeDEmoji name="ring" size={80} />
                    </h1>

                    <div className="flex gap-8 justify-center items-center h-32">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setYesDecor(true)}
                            className="bg-rose-500 text-white text-3xl font-bold py-6 px-16 rounded-full shadow-lg hover:bg-rose-600 transition-colors flex items-center gap-3"
                        >
                            YES! <ThreeDEmoji name="heart" size={40} />
                        </motion.button>

                        <motion.button
                            animate={{ x: noPosition.x, y: noPosition.y }}
                            onHoverStart={moveNo}
                            onTouchStart={moveNo}
                            className="bg-gray-300 text-gray-600 text-xl font-bold py-3 px-8 rounded-full shadow-inner"
                        >
                            No <ThreeDEmoji name="sad" size={24} />
                        </motion.button>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="z-10 max-w-2xl p-8 bg-white/90 rounded-3xl shadow-2xl"
                >
                    <h1 className="text-6xl font-bold text-rose-600 mb-6 flex items-center justify-center gap-4 font-serif">
                        Yay!!! <ThreeDEmoji name="party" size={60} /> <ThreeDEmoji name="heart" size={60} />
                    </h1>
                    <p className="text-2xl text-slate-700">You've made me the happiest person alive!</p>
                    <p className="mt-4 text-rose-400">P.S. I love you so much.</p>
                </motion.div>
            )}
        </div>
    );
}
