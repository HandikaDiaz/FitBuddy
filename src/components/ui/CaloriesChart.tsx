"use client";
import { useDarkModeStore } from "@/store/darkModeStore";
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function CaloriesChart() {
    const { darkMode } = useDarkModeStore();

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Calories Burned",
                data: [3200, 4100, 3800, 5200, 4900, 6100],
                backgroundColor: darkMode ? "rgba(16, 185, 129, 0.7)" : "rgba(5, 150, 105, 0.7)",
                borderColor: darkMode ? "#10b981" : "#059669",
                borderWidth: 1,
                borderRadius: 4
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
            <Bar data={data} options={options} />
        </div>
    );
}