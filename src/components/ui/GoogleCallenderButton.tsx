'use client';

import { useState } from 'react';
import { google } from 'googleapis';
import { FcGoogle } from 'react-icons/fc';
import { useDarkModeStore } from '@/store/darkModeStore';

// Definisikan tipe ScheduleItem
interface ScheduleItem {
    day: string;
    time: string;
    workout: string;
}

export default function GoogleCalendarButton({ schedule }: { schedule: Array<ScheduleItem> }) {
    const { darkMode } = useDarkModeStore();
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated] = useState(false);

    const handleAuth = async () => {
        setIsLoading(true);
        try {
            const authClient = new google.auth.OAuth2(
                process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
                `${window.location.origin}/api/auth/callback/google`
            );

            const url = authClient.generateAuthUrl({
                access_type: 'offline',
                scope: ['https://www.googleapis.com/auth/calendar'],
            });

            window.location.href = url;
        } catch (error) {
            console.error('Auth error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const addToCalendar = async () => {
        if (!schedule.length) return;

        setIsLoading(true);
        try {
            const authClient = new google.auth.OAuth2(
                process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
                `${window.location.origin}/api/auth/callback/google`
            );

            const token = localStorage.getItem('google_access_token');
            if (!token) {
                await handleAuth();
                return;
            }

            authClient.setCredentials({ access_token: token });

            const calendar = google.calendar({ version: 'v3', auth: authClient });

            const promises = schedule.map(item => {
                const [hours, minutes] = item.time.split(':').map(Number);
                const startDate = new Date();
                const endDate = new Date();

                const dayMap: Record<string, number> = {
                    'Senin': 1, 'Selasa': 2, 'Rabu': 3,
                    'Kamis': 4, 'Jumat': 5, 'Sabtu': 6, 'Minggu': 0
                };

                const dayDiff = dayMap[item.day] - startDate.getDay();
                startDate.setDate(startDate.getDate() + dayDiff);
                endDate.setDate(endDate.getDate() + dayDiff);

                startDate.setHours(hours, minutes, 0);
                endDate.setHours(hours + 1, minutes, 0);

                return calendar.events.insert({
                    calendarId: 'primary',
                    requestBody: {
                        summary: `Workout: ${item.workout}`,
                        description: `Workout session generated by FitBuddy AI\nType: ${item.workout}`,
                        start: {
                            dateTime: startDate.toISOString(),
                            timeZone: 'Asia/Jakarta',
                        },
                        end: {
                            dateTime: endDate.toISOString(),
                            timeZone: 'Asia/Jakarta',
                        },
                        reminders: {
                            useDefault: false,
                            overrides: [
                                { method: 'popup', minutes: 30 },
                                { method: 'email', minutes: 24 * 60 },
                            ],
                        },
                    },
                });
            });

            await Promise.all(promises);
            alert('Jadwal berhasil ditambahkan ke Google Calendar!');
        } catch (error) {
            console.error('Error adding to calendar:', error);
            alert('Gagal menambahkan ke Google Calendar');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={isAuthenticated ? addToCalendar : handleAuth}
            disabled={isLoading}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border ${darkMode
                ? 'bg-gray-800 border-gray-600 hover:bg-gray-700'
                : 'bg-white border-gray-300 hover:bg-gray-50'
                } transition-colors`}
        >
            <FcGoogle size={20} />
            {isLoading ? 'Processing...' :
                isAuthenticated ? 'Tambahkan ke Google Calendar' : 'Login dengan Google'}
        </button>
    );
}
