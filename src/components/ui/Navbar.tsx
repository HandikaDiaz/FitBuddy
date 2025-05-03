"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useDarkModeStore } from "@/store/darkModeStore";

export default function Navbar() {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith("/dashboard");
    const isHome = pathname === "/";
    const { darkMode, toggleDarkMode } = useDarkModeStore();

    return (
        <nav className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-200 ${darkMode
            ? "bg-dark-bg/80 border-dark-card"
            : "bg-light-bg/80 border-gray-200"
            }`}>
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex-1">
                    <Link
                        href="/"
                        className={`text-2xl font-bold ${darkMode
                            ? "text-dark-primary hover:text-dark-accent"
                            : "text-light-primary hover:text-light-accent"
                            } transition-colors inline-block`}
                    >
                        FitBuddy
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleDarkMode}
                        className={`p-2 rounded-full ${darkMode
                            ? "bg-dark-card text-dark-accent hover:bg-gray-800"
                            : "bg-light-card text-light-accent hover:bg-gray-100"
                            }`}
                    >
                        {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                    </button>

                    {(isDashboard || !isHome) && (
                        <Link
                            href="/"
                            className={`px-4 py-2 rounded-lg transition-colors ${darkMode
                                ? "bg-dark-card hover:bg-gray-700 text-white"
                                : "bg-light-card hover:bg-gray-200 text-gray-900"
                                }`}
                        >
                            ← Back to Home
                        </Link>
                    )}
                    {isHome && (
                        <Link
                            href="/dashboard"
                            className={`px-4 py-2 rounded-lg transition-colors ${darkMode
                                ? "bg-gradient-to-r from-dark-primary to-dark-accent hover:from-blue-700 hover:to-blue-800 text-white"
                                : "bg-gradient-to-r from-light-primary to-light-accent hover:from-blue-500 hover:to-blue-600 text-white"
                                }`}
                        >
                            Go to Dashboard
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}