import Image from "next/image";

interface ThreeDEmojiProps {
    name: "heart" | "fire" | "sparkles" | "party" | "sad" | "ring" | "lock" | "unlock";
    size?: number;
    className?: string;
}

const EMOJI_MAP: Record<string, string> = {
    heart: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Red%20Heart.png",
    fire: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Fire.png",
    sparkles: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png",
    party: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Party%20Popper.png",
    sad: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Crying%20Face.png",
    ring: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Ring.png",
    lock: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Locked.png",
    unlock: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Unlocked.png",
};

export default function ThreeDEmoji({ name, size = 40, className = "" }: ThreeDEmojiProps) {
    // Use remote URLs directly for now as they are reliable, or we could download them.
    // Using unoptimized to allow external URLs without next.config changes if possible, 
    // but better to add domain to next.config. For speed, I'll use a standard img tag if next/image blocks.

    return (
        <img
            src={EMOJI_MAP[name]}
            alt={name}
            width={size}
            height={size}
            className={`inline-block object-contain ${className} drop-shadow-md`}
        />
    );
}
