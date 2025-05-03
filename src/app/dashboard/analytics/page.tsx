"use client";

import WorkoutChart from "@/components/ui/WorkoutChart";
import CaloriesChart from "@/components/ui/CaloriesChart";
import { useDarkModeStore } from "@/store/darkModeStore";

export default function Analytics() {
    const { darkMode } = useDarkModeStore();

    const baseCardClass = "p-6 rounded-xl transition-all duration-300";
    const cardStyle = darkMode
        ? "bg-dark-card text-gray-100 shadow-none"
        : "bg-white text-gray-900 shadow";

    const badgeBase = "px-4 py-2 rounded-full text-sm";
    const recentWorkoutCard = darkMode
        ? "bg-gray-800 text-white"
        : "bg-gray-100 text-gray-900";

    return (
        <div className={`min-h-screen px-4 sm:px-6 md:px-8 py-6 transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
            <h1 className="text-3xl font-bold mb-8">Your Progress</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className={`${baseCardClass} ${cardStyle}`}>
                    <h3 className="text-xl font-bold mb-4">Weekly Activity</h3>
                    <WorkoutChart />
                </div>

                <div className={`${baseCardClass} ${cardStyle}`}>
                    <h3 className="text-xl font-bold mb-4">Calories Burned</h3>
                    <CaloriesChart />
                </div>

                <div className={`${baseCardClass} ${cardStyle}`}>
                    <h3 className="text-xl font-bold mb-4">Achievements</h3>
                    <div className="flex flex-wrap gap-4">
                        <div className={`${badgeBase} ${darkMode ? "bg-yellow-400/10 text-yellow-300" : "bg-yellow-500/10 text-yellow-600"}`}>
                            🏆 5 Workouts
                        </div>
                        <div className={`${badgeBase} ${darkMode ? "bg-blue-400/10 text-blue-300" : "bg-blue-500/10 text-blue-600"}`}>
                            🔥 10k Calories
                        </div>
                        <div className={`${badgeBase} ${darkMode ? "bg-green-400/10 text-green-300" : "bg-green-500/10 text-green-600"}`}>
                            ⚡ 7-Day Streak
                        </div>
                    </div>
                </div>

                <div className={`${baseCardClass} ${cardStyle}`}>
                    <h3 className="text-xl font-bold mb-4">Recent Workouts</h3>
                    <div className="space-y-4">
                        {[
                            { name: "Full Body HIIT", date: "Today", duration: "45 min" },
                            { name: "Yoga Flow", date: "Yesterday", duration: "30 min" },
                            { name: "Upper Body", date: "2 days ago", duration: "35 min" }
                        ].map((workout, index) => (
                            <div
                                key={index}
                                className={`flex justify-between items-center p-3 rounded-lg ${recentWorkoutCard}`}
                            >
                                <div>
                                    <h4 className="font-medium">{workout.name}</h4>
                                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{workout.date}</p>
                                </div>
                                <span className={`${darkMode ? "text-emerald-400" : "text-emerald-600"}`}>
                                    {workout.duration}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
