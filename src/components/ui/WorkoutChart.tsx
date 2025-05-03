"use client";
import { useDarkModeStore } from "@/store/darkModeStore";
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function WorkoutChart() {
    const { darkMode } = useDarkModeStore();

    const data = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                label: "Workout Minutes",
                data: [30, 45, 28, 60, 35, 50, 40],
                borderColor: darkMode ? "#00bcd4" : "#2563eb",
                backgroundColor: darkMode ? "rgba(0, 188, 212, 0.2)" : "rgba(37, 99, 235, 0.2)",
                tension: 0.3,
                borderWidth: 2,
                pointBackgroundColor: darkMode ? "#00bcd4" : "#2563eb",
                pointRadius: 4,
                pointHoverRadius: 6
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top" as const,
                labels: {
                    color: darkMode ? "#e5e7eb" : "#374151",
                }
            },
            tooltip: {
                backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                titleColor: darkMode ? "#ffffff" : "#111827",
                bodyColor: darkMode ? "#e5e7eb" : "#374151",
                borderColor: darkMode ? "#4b5563" : "#d1d5db",
                borderWidth: 1
            }
        },
        scales: {
            x: {
                grid: {
                    color: darkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                },
                ticks: {
                    color: darkMode ? "#9ca3af" : "#6b7280",
                }
            },
            y: {
                grid: {
                    color: darkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                },
                ticks: {
                    color: darkMode ? "#9ca3af" : "#6b7280",
                }
            }
        }
    };

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <div className="h-80 flex items-center justify-center">Loading chart...</div>;
    }

    return (
        <div className="h-80">
            <Line data={data} options={options} />
        </div>
    );
}