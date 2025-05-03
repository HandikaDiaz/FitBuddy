"use client";

import StatsCard from "@/components/ui/StatsCard";
import { useDarkModeStore } from "@/store/darkModeStore";

export default function Dashboard() {
    const { darkMode } = useDarkModeStore();

    return (
        <div
            className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
                }`}
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatsCard
                    title="Workouts"
                    value="12"
                    icon="💪"
                    trend="up"
                    darkMode={darkMode}
                />
                <StatsCard
                    title="Calories"
                    value="1,240"
                    icon="🔥"
                    trend="up"
                    darkMode={darkMode}
                />
                <StatsCard
                    title="Streak"
                    value="7 days"
                    icon="⚡"
                    trend="neutral"
                    darkMode={darkMode}
                />
            </div>

            <div
                className={`rounded-xl p-6 transition-colors duration-300 ${darkMode
                        ? "bg-gray-800 text-gray-100"
                        : "bg-white text-gray-900 shadow"
                    }`}
            >
                <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                <ul className="space-y-2 text-sm">
                    <li>- Completed Full Body Workout</li>
                    <li>- Burned 450 calories</li>
                    <li>- Maintained 7-day streak</li>
                </ul>
            </div>
        </div>
    );
}
