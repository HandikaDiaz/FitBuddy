export default function StatsCard({
    title,
    value,
    icon,
    trend,
    darkMode = true
}: {
    title: string;
    value: string;
    icon: string;
    trend: "up" | "down" | "neutral";
    darkMode?: boolean;
}) {
    return (
        <div className={`rounded-xl p-6 ${darkMode ? "bg-dark-card" : "bg-white shadow"
            }`}>
            <div className="flex justify-between items-start">
                <div>
                    <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>{title}</p>
                    <p className={`text-2xl font-bold mt-1 ${darkMode ? "text-white" : "text-gray-800"}`}>{value}</p>
                </div>
                <span className="text-3xl">{icon}</span>
            </div>
            <div className={`flex items-center mt-4 text-sm`}>
                {trend === "up" && "Increased"}
                {trend === "down" && "Decreased"}
                {trend === "neutral" && "No change"}
            </div>
        </div>
    );
}