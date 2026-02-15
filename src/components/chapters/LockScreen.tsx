import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useStoryStore } from "@/store/storyStore";
import ThreeDEmoji from "../ui/ThreeDEmoji";

export default function LockScreen() {
    const [code, setCode] = useState(["", "", "", ""]);
    const [error, setError] = useState(false);
    const { unlock } = useStoryStore();

    // CORRECT CODE: Date you became my girlfriend
    const CORRECT_CODE = "0110";

    const handleInput = (value: string, index: number) => {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto-focus next input
        if (value && index < 3) {
            const nextInput = document.getElementById(`code-${index + 1}`);
            nextInput?.focus();
        }

        // Check code
        if (newCode.join("").length === 4) {
            if (newCode.join("") === CORRECT_CODE) {
                unlock();
            } else {
                setError(true);
                setTimeout(() => {
                    setCode(["", "", "", ""]);
                    setError(false);
                    document.getElementById("code-0")?.focus();
                }, 500);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-rose-400 to-red-500 text-white relative overflow-hidden">
            {/* Background Hearts */}
            <motion.div
                animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute top-10 left-10 opacity-60"
            >
                <ThreeDEmoji name="heart" size={60} />
            </motion.div>
            <motion.div
                animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
                transition={{ repeat: Infinity, duration: 4, delay: 1 }}
                className="absolute bottom-20 right-20 opacity-60"
            >
                <ThreeDEmoji name="heart" size={80} />
            </motion.div>

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="z-10 text-center"
            >
                <div className="bg-white/20 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/30">
                    <div className="mb-6 flex justify-center">
                        <div className="p-4 bg-white/30 rounded-full">
                            <ThreeDEmoji name="lock" size={50} />
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold mb-2">My Heart is Locked</h1>
                    <p className="mb-8 text-rose-100">Enter our special date (DDMM) to open.</p>

                    <div className="flex gap-4 justify-center">
                        {code.map((digit, i) => (
                            <motion.input
                                key={i}
                                id={`code-${i}`}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e: any) => handleInput(e.target.value, i)}
                                className={`w-12 h-16 text-center text-2xl font-bold bg-white/20 rounded-lg outline-none border-2 focus:border-white transition-all 
                  ${error ? "border-red-400 animate-shake" : "border-transparent"}`}
                                animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
