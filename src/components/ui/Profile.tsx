"use client";
import AvatarUpload from "@/components/ui/AvatarUpload";

interface ProfileProps {
    darkMode: boolean;
}

export default function Profile({ darkMode }: ProfileProps) {
    return (
        <div className={`p-6 rounded-xl mb-8 ${darkMode ? "bg-gray-800" : "bg-white shadow"
            }`}>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0">
                    <AvatarUpload />
                    <h2 className={`text-2xl font-bold mt-4 ${darkMode ? "text-white" : "text-gray-900"
                        }`}>
                        Alexa
                    </h2>
                    <p className={darkMode ? "text-gray-300" : "text-gray-500"}>
                        Alex@gmail.com
                    </p>
                </div>

                <div className="flex-1 space-y-6">
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"
                            }`}>
                            Name
                        </label>
                        <input
                            type="text"
                            defaultValue="Alexa"
                            className={`w-full rounded-lg p-3 ${darkMode
                                    ? "bg-gray-700 text-white border-gray-600"
                                    : "bg-gray-50 text-gray-900 border-gray-200"
                                } border`}
                        />
                    </div>

                    <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"
                            }`}>
                            Email
                        </label>
                        <input
                            type="email"
                            defaultValue="Alex@gmail.com"
                            className={`w-full rounded-lg p-3 ${darkMode
                                    ? "bg-gray-700 text-gray-300 border-gray-600"
                                    : "bg-gray-50 text-gray-500 border-gray-200"
                                } border`}
                            disabled
                        />
                    </div>

                    <button className={`px-6 py-3 rounded-lg font-bold ${darkMode
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                            : "bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600"
                        } text-white`}>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}