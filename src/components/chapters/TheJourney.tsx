"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useStoryStore } from "@/store/storyStore";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import ThreeDEmoji from "../ui/ThreeDEmoji";

export default function TheJourney() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollXProgress } = useScroll({ container: containerRef });
    const { nextChapter } = useStoryStore();

    const memories = [
        {
            id: 1,
            title: "The Spark",
            emoji: "sparkles",
            description: "Do you remember when we first met? My world changed forever.",
            img: "/images/image1.jpg",
            color: "bg-red-100",
        },
        {
            id: 2,
            title: "The Adventure",
            emoji: "fire",
            description: "From our silly jokes to our big dreams. Every moment with you is magic.",
            img: "/images/image2.jpg",
            color: "bg-pink-100",
        },
        {
            id: 3,
            title: "The Future",
            emoji: "ring",
            description: "I can't wait to see what's next. Just you and me.",
            img: "/images/wedding_future.png",
            color: "bg-rose-100",
        },
    ];

    return (
        <div className="relative h-full w-full bg-white text-slate-800 flex flex-col">
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 h-2 bg-rose-500 z-50 origin-left"
                style={{ scaleX: scrollXProgress }}
            />

            {/* Horizontal Scroll Container */}
            <div
                ref={containerRef}
                className="flex-1 overflow-x-auto flex snap-x snap-mandatory scrollbar-hide"
            >
                {/* Intro Slide */}
                <section className="min-w-full h-full flex flex-col items-center justify-center bg-love-cream snap-center p-8 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold text-rose-600 mb-4"
                    >
                        Our Journey
                    </motion.h2>
                    <p className="text-lg text-slate-500">Swipe to see our story &rarr;</p>
                </section>

                {/* Memory Slides */}
                {memories.map((mem) => (
                    <section
                        key={mem.id}
                        className={`min-w-full h-full flex flex-col md:flex-row items-center justify-center p-8 snap-center ${mem.color}`}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="w-full md:w-1/2 max-w-md h-64 md:h-96 relative rounded-3xl overflow-hidden shadow-2xl mb-8 md:mb-0 md:mr-12"
                        >
                            {/* Placeholder Image Div */}
                            <Image
                                src={mem.img}
                                alt={mem.title}
                                fill
                                className="object-cover"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="w-full md:w-1/3 text-center md:text-left"
                        >
                            <h3 className="text-4xl font-bold text-rose-600 mb-4 flex items-center justify-center md:justify-start gap-2 font-serif">
                                {mem.title} <ThreeDEmoji name={mem.emoji as any} size={40} />
                            </h3>
                            <p className="text-xl leading-relaxed">{mem.description}</p>
                        </motion.div>
                    </section>
                ))}

                {/* Final Slide (Transition to Next Chapter) */}
                <section className="min-w-full h-full flex flex-col items-center justify-center bg-rose-50 snap-center p-8">
                    <h2 className="text-3xl font-bold mb-8">Ready for the next part?</h2>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextChapter}
                        className="bg-rose-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg flex items-center gap-2"
                    >
                        Continue <ArrowRight />
                    </motion.button>
                </section>
            </div>
        </div>
    );
}
