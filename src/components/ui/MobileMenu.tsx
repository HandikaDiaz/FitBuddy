"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useDarkModeStore } from "@/store/darkModeStore";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navItems = [
    { name: "Workouts", path: "/dashboard", icon: "💪" },
    { name: "Analytics", path: "/dashboard/analytics", icon: "📊" },
    {
        name: "Nutrition",
        path: "/dashboard/nutrition",
        icon: "🥗",
    },
    { name: "Settings", path: "/dashboard/settings", icon: "⚙️" },
];

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { darkMode } = useDarkModeStore();

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="md:hidden">
            <button
                onClick={toggleMenu}
                className={`p-2 rounded-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
                <Bars3Icon className="h-6 w-6" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: -300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -300 }}
                        transition={{ type: "spring", damping: 20, stiffness: 250 }}
                        className={`fixed inset-0 z-50 h-screen w-64 ${darkMode
                            ? "bg-gray-800/90 border-r border-gray-700"
                            : "bg-white/90 border-r border-gray-200"
                            }`}
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-10">
                                <h1 className={`text-2xl font-bold bg-clip-text text-transparent ${darkMode
                                    ? "bg-gradient-to-r from-blue-300 to-emerald-300"
                                    : "bg-gradient-to-r from-blue-500 to-emerald-500"
                                    }`}
                                >
                                    Dashboard
                                </h1>
                                <button
                                    onClick={toggleMenu}
                                    className={`p-2 rounded-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                                >
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                            </div>

                            <ul className="space-y-2">
                                {navItems.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.path}
                                            onClick={toggleMenu}
                                            className={`flex items-center p-3 rounded-lg transition-all ${pathname === item.path
                                                ? darkMode
                                                    ? "bg-gray-700 text-white"
                                                    : "bg-gray-100 text-gray-900"
                                                : darkMode
                                                    ? "text-gray-300 hover:bg-gray-700/50"
                                                    : "text-gray-600 hover:bg-gray-100"
                                                }`}
                                        >
                                            <span className="text-xl mr-3">
                                                {item.icon}
                                            </span>
                                            <span className="font-medium">
                                                {item.name}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <div className={`mt-auto pt-6 border-t ${darkMode ? "border-gray-700" : "border-gray-200"
                                }`}
                            >
                                <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"
                                    }`}>
                                    © {new Date().getFullYear()} FitBuddy AI
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}