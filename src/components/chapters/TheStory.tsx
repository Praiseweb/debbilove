"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ThreeDEmoji from "../ui/ThreeDEmoji";
import { Play, Pause, Repeat } from "lucide-react";

export default function TheStory() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [typedText, setTypedText] = useState("");
    const fullText = `My Dearest,

From the moment our paths crossed, my world shifted on its axis. You are the melody that plays in my heart, the spark that lights up my darkest days, and the dream I never want to wake up from.

"Doubt thou the stars are fire;
Doubt that the sun doth move;
Doubt truth to be a liar;
But never doubt I love."

Every laugh we share is a treasure, and every moment with you is a gift I cherish. You are my best friend, my confidant, and my greatest adventure.

I promise to love you in this life, and in every timeline across the cosmos.

Forever yours,
My Pride and Joy,
Praiz`;

    useEffect(() => {
        // Typing effect
        let index = 0;
        const speed = 50;
        const interval = setInterval(() => {
            if (index < fullText.length) {
                setTypedText((prev) => prev + fullText.charAt(index));
                index++;
            } else {
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Auto-play music (browser policy might block, so handle silently)
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
            audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
        }
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const restartStory = () => {
        window.location.reload();
    };

    return (
        <div className="relative w-full h-full bg-love-cream text-slate-800 flex flex-col md:flex-row overflow-hidden">
            <audio ref={audioRef} src="/music/love_my_baby.mp3" loop />

            {/* Left Side: The Letter */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full p-6 md:p-16 flex flex-col justify-center overflow-y-auto relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 md:p-12 shadow-xl rounded-sm border border-slate-200 relative rotate-1 mb-24 md:mb-0"
                >
                    {/* Paper texture effect */}
                    <div className="absolute inset-0 bg-[#fdfbf7] opacity-60 pointer-events-none"></div>

                    <div className="relative z-10 font-serif text-2xl md:text-3xl font-bold leading-relaxed whitespace-pre-wrap text-slate-800 drop-shadow-sm">
                        {typedText}
                        <span className="animate-pulse">|</span>
                    </div>

                    <div className="absolute top-2 right-2 md:top-4 md:right-4 opacity-20 rotate-12">
                        <ThreeDEmoji name="heart" size={60} />
                    </div>
                </motion.div>
            </div>

            {/* Right Side: The Player */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full bg-rose-100 flex flex-col items-center justify-center p-4 relative z-10">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-10 -right-10 opacity-30"><ThreeDEmoji name="sparkles" size={120} /></div>
                    <div className="absolute bottom-5 left-5 opacity-30"><ThreeDEmoji name="fire" size={100} /></div>
                </div>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="z-10 bg-white/30 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/50 w-full max-w-md"
                >
                    {/* Album Art */}
                    <div className="relative aspect-square rounded-full overflow-hidden mb-8 shadow-lg bg-black p-1">
                        <div className="absolute inset-0 bg-black rounded-full"></div>
                        <img
                            src="/images/image3.jpg"
                            alt="Wizkid Superstar"
                            className={`w-full h-full object-cover rounded-full transition-transform duration-[10s] ease-linear ${isPlaying ? 'animate-spin-slow' : ''}`}
                        />
                        {/* Vinyl Center Hole */}
                        <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2 border-2 border-white/20 z-10"></div>
                    </div>

                    {/* Song Info */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-slate-800 mb-2">Love My Baby</h2>
                        <p className="text-xl text-rose-600 font-medium">Wizkid</p>
                    </div>

                    {/* Controls */}
                    <div className="flex justify-center items-center gap-8">
                        <button
                            onClick={togglePlay}
                            className="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform"
                        >
                            {isPlaying ? <Pause size={32} fill="white" /> : <Play size={32} fill="white" className="ml-1" />}
                        </button>
                    </div>
                </motion.div>

                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 10 }} // Show after reading time
                    onClick={restartStory}
                    className="mt-12 z-10 flex items-center gap-2 text-rose-500 hover:text-rose-700 font-bold transition-colors"
                >
                    <Repeat size={20} /> Replay Our Story
                </motion.button>
            </div>

            <style jsx>{`
                .animate-spin-slow {
                    animation: spin 10s linear infinite;
                }
                .running { animation-play-state: running; }
                .paused { animation-play-state: paused; }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
