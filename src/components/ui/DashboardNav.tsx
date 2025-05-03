"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useDarkModeStore } from "@/store/darkModeStore";

const navItems = [
    { name: "Workouts", path: "/dashboard", icon: "💪" },
    { name: "Analytics", path: "/dashboard/analytics", icon: "📊" },
    {
        name: "Nutrition",
        path: "/dashboard/nutrition",
        icon: "🥗",
        activeBg: "bg-gradient-to-r from-green-500 to-emerald-600",
        inactiveBg: "bg-gradient-to-r from-green-400 to-emerald-500"
    },
    { name: "Settings", path: "/dashboard/settings", icon: "⚙️" },
];

const navVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            damping: 20,
            stiffness: 250,
            when: "beforeChildren",
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 150
        }
    }
};

export default function DashboardNav() {
    const pathname = usePathname();
    const darkMode = useDarkModeStore(state => state.darkMode);

    return (
        <motion.nav
            initial="hidden"
            animate="visible"
            variants={navVariants}
            className={`sticky top-0 h-screen w-64 p-6 hidden md:block overflow-y-auto ${darkMode
                ? "bg-gray-800/90 border-r border-gray-700"
                : "bg-white/90 border-r border-gray-200"
                }`}
        >
            <motion.div variants={itemVariants} className="mb-10">
                <motion.h1
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`text-2xl font-bold bg-clip-text text-transparent ${darkMode
                        ? "bg-gradient-to-r from-blue-300 to-emerald-300"
                        : "bg-gradient-to-r from-blue-500 to-emerald-500"
                        }`}
                >
                    Dashboard
                </motion.h1>
            </motion.div>

            <motion.ul
                variants={{
                    visible: {
                        transition: {
                            staggerChildren: 0.1,
                            delayChildren: 0.3
                        }
                    }
                }}
                className="space-y-2"
            >
                {navItems.map((item) => (
                    <motion.li
                        key={item.name}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link
                            href={item.path}
                            className={`flex items-center p-3 rounded-lg transition-all ${pathname === item.path
                                ? darkMode
                                    ? "bg-gray-700 text-white"
                                    : "bg-gray-100 text-gray-900"
                                : darkMode
                                    ? "text-gray-300 hover:bg-gray-700/50"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <motion.span
                                className="text-xl mr-3"
                                whileHover={{ rotate: [0, 10, -10, 0] }}
                            >
                                {item.icon}
                            </motion.span>
                            <span className="font-medium">
                                {item.name}
                            </span>
                            {pathname === item.path && (
                                <motion.span
                                    className={`ml-auto h-2 w-2 rounded-full ${darkMode ? "bg-emerald-300" : "bg-emerald-500"
                                        }`}
                                    layoutId="activeIndicator"
                                    transition={{ type: "spring", stiffness: 500 }}
                                />
                            )}
                        </Link>
                    </motion.li>
                ))}
            </motion.ul>

            <motion.div
                variants={itemVariants}
                className={`mt-auto pt-6 border-t ${darkMode ? "border-gray-700" : "border-gray-200"
                    }`}
            >
                <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"
                    }`}>
                    © {new Date().getFullYear()} FitBuddy AI
                </div>
            </motion.div>
        </motion.nav>
    );
}