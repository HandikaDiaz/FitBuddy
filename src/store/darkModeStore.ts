import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface DarkModeState {
    darkMode: boolean;
    toggleDarkMode: () => void;
    initializeDarkMode: () => void;
}

export const useDarkModeStore = create<DarkModeState>((set) => ({
    darkMode: false,
    toggleDarkMode: () => set((state) => {
        const newMode = !state.darkMode;
        localStorage.setItem('darkMode', String(newMode));
        document.documentElement.classList.toggle('dark', newMode);
        return { darkMode: newMode };
    }),
    initializeDarkMode: () => {
        const savedMode = localStorage.getItem('darkMode');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialMode = savedMode ? savedMode === 'true' : systemPrefersDark;
        document.documentElement.classList.toggle('dark', initialMode);
        set({ darkMode: initialMode });
    }
}));