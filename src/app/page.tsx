"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation";
import { useDarkModeStore } from "@/store/darkModeStore";

const ParticleBackground = dynamic(
  () => import('../components/PartialBackground'),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 -z-50 bg-gray-900/50" />
  }
);

export default function HomePage() {
  const router = useRouter();
  const { darkMode } = useDarkModeStore();
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const features = [
    {
      id: "voice",
      title: "AI Voice Coach",
      description: "Instruksi latihan melalui suara cerdas",
      icon: "🎤",
      darkColor: "from-emerald-500 to-teal-600",
      lightColor: "from-blue-500 to-indigo-600",
      navigate: "/voice",
    },
    {
      id: "gesture",
      title: "Gesture Control",
      description: "Kontrol dengan gerakan tubuh alami",
      icon: "💪",
      darkColor: "from-amber-500 to-orange-600",
      lightColor: "from-amber-400 to-orange-500",
      navigate: "/gesture",
    },
    {
      id: "planner",
      title: "AI Workout Planner",
      description: "Jadwal latihan pintar & pengingat",
      icon: "📅",
      darkColor: "from-purple-500 to-pink-600",
      lightColor: "from-violet-500 to-purple-600",
      navigate: "/planner",
    },
  ];

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      const nextIndex = activeFeature === null ? 0 : (activeFeature + 1) % features.length;
      setActiveFeature(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeFeature, features.length]);

  if (!isMounted) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-dark-bg" : "bg-light-bg"
        }`}>
        <div className="text-2xl text-blue-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen overflow-hidden relative transition-colors duration-300 ${darkMode
      ? "bg-gradient-to-br from-dark-bg to-gray-900"
      : "bg-gradient-to-br from-light-bg to-gray-100"
      }`}>
      <ParticleBackground />

      <div className="relative z-10">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${darkMode ? "bg-blue-500/20" : "bg-blue-400/20"
                }`}
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                opacity: Math.random() * 0.5 + 0.1
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                transition: {
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
            />
          ))}
        </div>

        <div className={`absolute top-1/4 -left-20 w-64 h-64 rounded-full filter blur-3xl ${darkMode ? "bg-blue-500/20" : "bg-blue-400/20"
          }`}></div>
        <div className={`absolute bottom-1/4 -right-20 w-64 h-64 rounded-full filter blur-3xl ${darkMode ? "bg-emerald-500/20" : "bg-emerald-400/20"
          }`}></div>

        <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className={`text-5xl md:text-7xl font-bold bg-clip-text text-transparent mb-6 ${darkMode
              ? "bg-gradient-to-r from-blue-400 to-emerald-400"
              : "bg-gradient-to-r from-blue-600 to-emerald-500"
              }`}>
              <span className="inline-block">FITBUDDY</span>
              <span className={`text-xs md:text-sm font-mono px-2 py-1 rounded ml-2 align-top ${darkMode
                ? "bg-blue-900/50 text-blue-300"
                : "bg-blue-200 text-blue-800"
                }`}>
                AI-POWERED
              </span>
            </h1>

            <p className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-700"
              }`}>
              Revolusi kebugaran dengan teknologi <span className={`font-semibold ${darkMode ? "text-blue-300" : "text-blue-600"
                }`}>AI canggih</span> yang memahami setiap gerakan dan memberikan{" "}
              <span className={`font-semibold ${darkMode ? "text-emerald-300" : "text-emerald-500"
                }`}>umpan balik instan</span> untuk hasil maksimal.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  whileHover={{ y: -10 }}
                  className={`bg-gradient-to-br ${darkMode ? feature.darkColor : feature.lightColor
                    } p-0.5 rounded-2xl cursor-pointer`}
                  onClick={() => router.push(feature.navigate)}
                >
                  <div className={`rounded-2xl p-6 h-full ${darkMode ? "bg-dark-card" : "bg-light-card"
                    }`}>
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-800"
                      }`}>{feature.title}</h3>
                    <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {activeFeature !== null && (
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`mt-6 rounded-xl p-6 max-w-md mx-auto border ${darkMode
                ? "bg-dark-card/80 backdrop-blur-md border-dark-accent/30"
                : "bg-white/80 backdrop-blur-md border-gray-200"
                }`}
            >
              <div className="flex items-start gap-4">
                <div className={`bg-gradient-to-br ${darkMode
                  ? features[activeFeature].darkColor
                  : features[activeFeature].lightColor
                  } p-3 rounded-full`}>
                  {features[activeFeature].icon}
                </div>
                <div className="flex-1">
                  <h4 className={`font-bold text-lg ${darkMode ? "text-blue-300" : "text-blue-600"
                    }`}>
                    {features[activeFeature].title}
                  </h4>
                  <p className={darkMode ? "text-gray-300 mt-1" : "text-gray-600 mt-1"}>
                    {features[activeFeature].id === "voice" && "Coba katakan: 'Mulai latihan kaki hari ini'"}
                    {features[activeFeature].id === "gesture" && "Angkat tangan untuk memulai deteksi gerakan"}
                    {features[activeFeature].id === "planner" && "Mulai membuat rencana latihan dengan AI"}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}