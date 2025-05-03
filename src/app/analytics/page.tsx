"use client";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function AnalyticsPage() {
    const data = {
        labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
        datasets: [
            {
                label: "Kalori Terbakar",
                data: [320, 450, 280, 510, 490, 600, 420],
                borderColor: "#00bcd4",
                backgroundColor: "rgba(0, 188, 212, 0.2)",
                tension: 0.4,
            },
            {
                label: "Menit Latihan",
                data: [30, 45, 25, 50, 48, 60, 40],
                borderColor: "#ff7043",
                backgroundColor: "rgba(255, 112, 67, 0.2)",
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
        },
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h1 className="text-3xl font-bold mb-6">Real-time Analytics</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="glass-effect p-6 rounded-xl">
                    <h2 className="text-xl font-bold mb-4">Statistik Mingguan</h2>
                    <Line data={data} options={options} />
                </div>

                <div className="glass-effect p-6 rounded-xl">
                    <h2 className="text-xl font-bold mb-4">Pencapaian</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium">Latihan Terlama</h3>
                                <p className="text-gray-400">60 menit (Sabtu)</p>
                            </div>
                            <span className="text-2xl">🏆</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium">Kalori Tertinggi</h3>
                                <p className="text-gray-400">600 kcal (Sabtu)</p>
                            </div>
                            <span className="text-2xl">🔥</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="glass-effect p-6 rounded-xl">
                <h2 className="text-xl font-bold mb-4">Rekomendasi AI</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h3 className="font-bold text-blue-400">Latihan Kaki</h3>
                        <p className="text-sm text-gray-300">
                            Tingkatkan intensitas squat untuk hasil maksimal
                        </p>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h3 className="font-bold text-emerald-400">Istirahat</h3>
                        <p className="text-sm text-gray-300">
                            Tubuh membutuhkan 1 hari istirahat minggu ini
                        </p>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h3 className="font-bold text-amber-400">Nutrisi</h3>
                        <p className="text-sm text-gray-300">
                            Konsumsi lebih banyak protein untuk pemulihan otot
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}