"use client";
import { motion } from "framer-motion";

export default function ParticleBackground() {
    return (
        <div className="fixed inset-0 -z-50 overflow-hidden">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-blue-500/20"
                    initial={{
                        x: Math.random() * 100,
                        y: Math.random() * 100,
                        width: Math.random() * 10 + 5,
                        height: Math.random() * 10 + 5,
                        opacity: Math.random() * 0.3 + 0.1
                    }}
                    animate={{
                        x: [null, Math.random() * 100],
                        y: [null, Math.random() * 100],
                        transition: {
                            duration: Math.random() * 20 + 10,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "linear"
                        }
                    }}
                />
            ))}
        </div>
    );
}