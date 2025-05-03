"use client";

import { useEffect, useState } from 'react';
import { useDarkModeStore } from '@/store/darkModeStore';

export default function DarkModeProvider({ children }: { children: React.ReactNode }) {
    const { initializeDarkMode, darkMode } = useDarkModeStore();
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        initializeDarkMode();
        setHydrated(true);
    }, [initializeDarkMode]);

    useEffect(() => {
        if (hydrated) {
            document.documentElement.classList.toggle("dark", darkMode);
        }
    }, [darkMode, hydrated]);

    if (!hydrated) return null; // hindari render sebelum darkMode siap

    return <>{children}</>;
}
