"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
    darkMode: boolean;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [darkMode, setDarkMode] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem("fitbuddy-theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setDarkMode(savedTheme ? savedTheme === "dark" : prefersDark);
    }, []);

    useEffect(() => {
        if (mounted) {
            document.documentElement.classList.toggle("dark", darkMode);
            localStorage.setItem("fitbuddy-theme", darkMode ? "dark" : "light");
        }
    }, [darkMode, mounted]);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    if (!mounted) {
        return (
            <div className="dark:bg-dark-bg bg-light-bg" style={{ visibility: 'hidden' }}>
                {children}
            </div>
        );
    }

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            <div className={darkMode ? "dark" : ""}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};