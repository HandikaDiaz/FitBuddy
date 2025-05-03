"use client";
import { useDarkModeStore } from "@/store/darkModeStore";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function NutritionChart() {
    const { darkMode } = useDarkModeStore();

    const data = {
        labels: ["Protein", "Carbs", "Fat", "Fiber"],
        datasets: [
            {
                data: [128, 210, 56, 32],
                backgroundColor: [
                    darkMode ? "#10b981" : "#059669", 
                    darkMode ? "#f59e0b" : "#d97706",
                    darkMode ? "#3b82f6" : "#2563eb",
                    darkMode ? "#8b5cf6" : "#7c3aed",
                ],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right' as const,
                labels: {
                    color: darkMode ? '#e5e7eb' : '#374151',
                    font: {
                        size: 14
                    }
                }
            },
            tooltip: {
                backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                titleColor: darkMode ? '#ffffff' : '#111827',
                bodyColor: darkMode ? '#e5e7eb' : '#374151',
                borderColor: darkMode ? '#4b5563' : '#d1d5db',
                borderWidth: 1
            }
        },
        cutout: '70%',
    };

    return (
        <div className="h-96">
            <Doughnut data={data} options={options} />
        </div>
    );
}