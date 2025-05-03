"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDarkModeStore } from '@/store/darkModeStore';

interface CustomNotificationOptions extends NotificationOptions {
    vibrate: number[];
}

export default function WorkoutPlanner() {
    const { darkMode } = useDarkModeStore();
    const [schedule, setSchedule] = useState<Array<{
        day: string;
        workout: string;
        time: string;
        completed: boolean;
    }>>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [notificationPermission, setNotificationPermission] = useState('default');

    useEffect(() => {
        if ('Notification' in window) {
            setNotificationPermission(Notification.permission);
        }

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('ServiceWorker registered:', registration.scope);
                })
                .catch(err => {
                    console.log('ServiceWorker registration failed:', err);
                });
        }
    }, []);

    const requestNotificationPermission = async () => {
        try {
            const permission = await Notification.requestPermission();
            setNotificationPermission(permission);
            return permission === 'granted';
        } catch (error) {
            console.error('Error requesting notification permission:', error);
            return false;
        }
    };

    const scheduleNotification = async (workout: string, time: string) => {
        if (!('Notification' in window)) {
            alert('Browser tidak mendukung notifikasi');
            return;
        }

        if (notificationPermission !== 'granted') {
            const granted = await requestNotificationPermission();
            if (!granted) return;
        }

        try {
            const registration = await navigator.serviceWorker.ready;
            await registration.showNotification('Waktunya Latihan!', {
                body: `${workout} pada ${time}`,
                icon: '/icons/icon-192.png',
                vibrate: [200, 100, 200],
                data: { url: '/planner' }
            } as CustomNotificationOptions);

            new Notification('Pengingat Jadwal', {
                body: `Pengingat untuk ${workout} telah diaktifkan`,
                icon: '/icons/icon-192.png'
            });

        } catch (error) {
            console.error('Error scheduling notification:', error);
        }
    };

    const generateSchedule = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setSchedule([
                { day: "Senin", workout: "Upper Body Strength", time: "07:00", completed: false },
                { day: "Selasa", workout: "Cardio & Core", time: "18:30", completed: false },
                { day: "Rabu", workout: "Yoga & Recovery", time: "07:00", completed: false },
                { day: "Kamis", workout: "Lower Body Strength", time: "18:30", completed: false },
                { day: "Jumat", workout: "HIIT", time: "07:00", completed: false },
                { day: "Sabtu", workout: "Active Recovery", time: "09:00", completed: false }
            ]);
            setIsGenerating(false);
        }, 1500);
    };

    const toggleComplete = (index: number) => {
        const newSchedule = [...schedule];
        newSchedule[index].completed = !newSchedule[index].completed;
        setSchedule(newSchedule);
    };

    return (
        <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white shadow-lg'}`}
                >
                    <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                        AI Workout Planner
                    </h1>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                        Jadwal latihan pintar yang disesuaikan dengan preferensi dan progress Anda
                    </p>

                    <div className="mt-8">
                        {schedule.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-5xl mb-4">📅</div>
                                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                    Belum ada jadwal
                                </h3>
                                <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Biarkan AI membuatkan jadwal latihan mingguan untuk Anda
                                </p>
                                <button
                                    onClick={generateSchedule}
                                    disabled={isGenerating}
                                    className={`px-6 py-3 rounded-full font-medium ${darkMode
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                        : 'bg-gradient-to-r from-purple-400 to-pink-400 text-white'
                                        } ${isGenerating ? 'opacity-70' : ''}`}
                                >
                                    {isGenerating ? 'Generating...' : 'Buat Jadwal Otomatis'}
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} mb-6`}>
                                    <h3 className={`font-semibold mb-2 ${darkMode ? 'text-green-300' : 'text-green-600'}`}>
                                        🎯 Jadwal Minggu Ini
                                    </h3>
                                    <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                                        AI telah membuatkan jadwal optimal berdasarkan level dan tujuan Anda
                                    </p>
                                </div>


                                {schedule.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ scale: 1.02 }}
                                        className={`p-4 rounded-lg flex items-center ${darkMode ? 'bg-gray-700' : 'bg-white shadow'} border ${item.completed
                                            ? (darkMode ? 'border-green-500/30' : 'border-green-400/50')
                                            : (darkMode ? 'border-gray-600' : 'border-gray-200')
                                            }`}>
                                        <button
                                            onClick={() => toggleComplete(index)}
                                            className={`w-6 h-6 rounded-full mr-4 flex items-center justify-center ${item.completed
                                                ? (darkMode ? 'bg-green-500' : 'bg-green-400')
                                                : (darkMode ? 'bg-gray-600' : 'bg-gray-200')
                                                }`}
                                        >
                                            {item.completed && '✓'}
                                        </button>
                                        <div className="flex-1">
                                            <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                                {item.workout}
                                            </h3>
                                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                {item.day} • {item.time}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => scheduleNotification(item.workout, `${item.day} ${item.time}`)}
                                            className={`px-3 py-1 rounded-full text-sm ${darkMode
                                                ? 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30'
                                                : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                                                } transition-colors`}>
                                            Remind Me
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>

                {schedule.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`mt-6 p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white shadow-lg'}`}
                    >
                        <h3 className={`font-bold text-lg mb-4 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                            ⚙️ Personalisasi Jadwal
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Waktu Latihan Favorit
                                </label>
                                <select className={`w-full p-3 rounded-lg ${darkMode
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-800'
                                    } border`}>
                                    <option>Pagi (06:00 - 09:00)</option>
                                    <option>Siang (12:00 - 14:00)</option>
                                    <option>Sore (16:00 - 18:00)</option>
                                    <option>Malam (19:00 - 21:00)</option>
                                </select>
                            </div>
                            <div>
                                <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Intensitas Latihan
                                </label>
                                <select className={`w-full p-3 rounded-lg ${darkMode
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-800'
                                    } border`}>
                                    <option>Pemula</option>
                                    <option>Menengah</option>
                                    <option>Lanjutan</option>
                                </select>
                            </div>
                        </div>
                        <button className={`mt-6 w-full py-3 rounded-lg font-medium ${darkMode
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                            : 'bg-gradient-to-r from-purple-400 to-pink-400 text-white'
                            }`}>
                            Simpan Preferensi
                        </button>
                    </motion.div>
                )}
                {notificationPermission !== 'granted' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} border ${darkMode ? 'border-blue-800' : 'border-blue-200'}`}
                    >
                        <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-full ${darkMode ? 'bg-blue-800/50' : 'bg-blue-100'}`}>
                                🔔
                            </div>
                            <div>
                                <h4 className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                                    Aktifkan Notifikasi
                                </h4>
                                <p className={`text-sm mt-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                                    Dapatkan pengingat jadwal latihan langsung ke perangkat Anda
                                </p>
                                <button
                                    onClick={requestNotificationPermission}
                                    className={`mt-2 px-4 py-2 rounded-lg text-sm font-medium ${darkMode
                                        ? 'bg-blue-600 hover:bg-blue-500 text-white'
                                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                                        } transition-colors`}
                                >
                                    Izinkan Notifikasi
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}