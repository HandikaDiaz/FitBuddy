"use client";
import NutritionChart from "@/components/ui/NutritionChart";
import { useDarkModeStore } from "@/store/darkModeStore";

export default function NutritionPage() {
    const { darkMode } = useDarkModeStore();

    const macronutrients = [
        {
            name: "Protein",
            value: "128g",
            progress: "+12%",
            status: "above",
            gradient: darkMode
                ? "from-green-500 to-emerald-600"
                : "from-green-400 to-emerald-500",
            bgColor: darkMode ? "bg-gray-800" : "bg-gray-50",
            textColor: darkMode ? "text-white" : "text-gray-900"
        },
        {
            name: "Carbs",
            value: "210g",
            progress: "-5%",
            status: "below",
            gradient: darkMode
                ? "from-amber-500 to-orange-600"
                : "from-amber-400 to-orange-500",
            bgColor: darkMode ? "bg-gray-800" : "bg-gray-50",
            textColor: darkMode ? "text-white" : "text-gray-900"
        },
        {
            name: "Fat",
            value: "56g",
            progress: "On target",
            status: "target",
            gradient: darkMode
                ? "from-blue-500 to-cyan-600"
                : "from-blue-400 to-cyan-500",
            bgColor: darkMode ? "bg-gray-800" : "bg-gray-50",
            textColor: darkMode ? "text-white" : "text-gray-900"
        }
    ];

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 dark:text-white text-gray-900">
                Nutrition Tracker
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {macronutrients.map((nutrient, index) => (
                    <div
                        key={index}
                        className={`bg-gradient-to-br ${nutrient.gradient} p-0.5 rounded-xl shadow-lg`}
                    >
                        <div className={`rounded-xl p-6 ${nutrient.bgColor}`}>
                            <h3 className={`text-xl font-bold mb-2 ${nutrient.textColor}`}>
                                {nutrient.name}
                            </h3>
                            <p className={`text-4xl font-bold ${nutrient.textColor}`}>
                                {nutrient.value}
                            </p>
                            <p className={`mt-2 font-medium ${nutrient.status === "above"
                                ? "text-green-600 dark:text-green-400"
                                : nutrient.status === "below"
                                    ? "text-amber-600 dark:text-amber-400"
                                    : "text-blue-600 dark:text-blue-400"
                                }`}>
                                {nutrient.progress}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className={`p-6 rounded-xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                <NutritionChart />
            </div>

            <div className={`mt-8 p-6 rounded-xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                <h2 className={`text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    Recent Meals
                </h2>
                <div className="space-y-4">
                    {[
                        {
                            name: "Chicken Salad",
                            time: "Lunch - 12:30 PM",
                            calories: "420 kcal",
                            protein: "32g"
                        },
                        {
                            name: "Protein Shake",
                            time: "Snack - 3:45 PM",
                            calories: "240 kcal",
                            protein: "24g"
                        },
                        {
                            name: "Grilled Salmon",
                            time: "Dinner - 7:15 PM",
                            calories: "380 kcal",
                            protein: "28g"
                        }
                    ].map((meal, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-lg flex justify-between items-center transition-colors border ${darkMode
                                    ? "bg-gray-700 hover:bg-gray-600 border-gray-600"
                                    : "bg-gray-50 hover:bg-gray-100 border-gray-200"
                                }`}
                        >
                            <div>
                                <h3 className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                                    {meal.name}
                                </h3>
                                <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                    {meal.time}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                                    {meal.calories}
                                </p>
                                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                                    {meal.protein} protein
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}