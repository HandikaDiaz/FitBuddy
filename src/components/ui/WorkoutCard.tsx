"use client";
import { motion } from "framer-motion";

export default function WorkoutCard({ workout }: { workout: any }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-gray-800 rounded-xl overflow-hidden"
        >
            <div className="p-5">
                <h3 className="text-xl font-bold">{workout.name}</h3>
                <p className="text-gray-400 mt-2">{workout.description}</p>
                <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-blue-400">
                        {workout.duration} mins
                    </span>
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg text-sm">
                        Start
                    </button>
                </div>
            </div>
        </motion.div>
    );
}