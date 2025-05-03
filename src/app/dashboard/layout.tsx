"use client";
import DashboardNav from "@/components/ui/DashboardNav";
import { useDarkModeStore } from "@/store/darkModeStore";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { darkMode } = useDarkModeStore();

    return (
        <div className="min-h-screen flex">
            <DashboardNav />
            <main
                className={`flex-1 overflow-y-auto p-6 md:p-8 transition-colors duration-300 ${
                    darkMode ? "bg-gray-900" : "bg-gray-50"
                }`}
            >
                {children}
            </main>
        </div>
    );
}
