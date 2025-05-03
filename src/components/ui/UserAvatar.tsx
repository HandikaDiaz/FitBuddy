"use client";

import { useDarkModeStore } from "@/store/darkModeStore";


export default function UserAvatar() {
    const darkMode = useDarkModeStore(state => state.darkMode);

    return (
        <div className="flex items-center gap-4">
            <button
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
            >
                {darkMode ? (
                    <span className="text-xl">🌞</span>
                ) : (
                    <span className="text-xl">🌙</span>
                )}
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-emerald-400 flex items-center justify-center text-white font-bold">
                U
            </div>
        </div>
    );
}