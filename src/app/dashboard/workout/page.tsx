import WorkoutCard from "@/components/ui/WorkoutCard";
import { workouts } from "@/lib/constants";

export default function Workouts() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Your Workouts</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {workouts.map((workout) => (
                    <WorkoutCard key={workout.id} workout={workout} />
                ))}
            </div>
        </div>
    );
}