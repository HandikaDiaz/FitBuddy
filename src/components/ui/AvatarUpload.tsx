"use client";
import { useState } from "react";
import { useDarkModeStore } from "@/store/darkModeStore";

export default function AvatarUpload() {
    const [avatar, setAvatar] = useState<string | null>(null);
    const { darkMode } = useDarkModeStore();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setAvatar(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="relative w-32 h-32">
            <div className={`w-full h-full rounded-full overflow-hidden flex items-center justify-center border-2 ${darkMode
                    ? "bg-gray-700 border-gray-600"
                    : "bg-gray-100 border-gray-300"
                }`}>
                {avatar ? (
                    <img
                        src={avatar}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span className={`text-4xl ${darkMode ? "text-gray-400" : "text-gray-500"
                        }`}>
                        👤
                    </span>
                )}
            </div>

            <label className={`absolute bottom-0 right-0 p-2 rounded-full cursor-pointer shadow-md transition-all ${darkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}>
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
            </label>
        </div>
    );
}