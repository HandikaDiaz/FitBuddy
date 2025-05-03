"use client";
import Profile from "@/components/ui/Profile";
import { Switch } from "@/components/ui/Switch";
import { useDarkModeStore } from "@/store/darkModeStore";
import { useState } from "react";

export default function SettingsPage() {
    const { darkMode, toggleDarkMode } = useDarkModeStore();
    const [notifications, setNotifications] = useState(true);

    return (
        <div className={`p-6 min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    Settings
                </h1>

                <Profile darkMode={darkMode} />

                <div className={`p-6 rounded-xl space-y-6 ${darkMode ? "bg-gray-800" : "bg-white shadow"
                    }`}>
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                                Dark Mode
                            </h3>
                            <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
                                Switch between light and dark theme
                            </p>
                        </div>
                        <Switch checked={darkMode} onChange={toggleDarkMode} />
                    </div>

                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                                Notifications
                            </h3>
                            <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
                                Enable workout reminders
                            </p>
                        </div>
                        <Switch checked={notifications} onChange={setNotifications} />
                    </div>

                    <div className={`pt-4 border-t ${darkMode ? "border-gray-700" : "border-gray-200"
                        }`}>
                        <button className={`px-6 py-3 rounded-lg font-bold w-full transition-colors ${darkMode
                                ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                                : "bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600"
                            } text-white`}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}