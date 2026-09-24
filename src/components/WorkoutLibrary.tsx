import { IWorkout } from "@/types/WorkoutTypes";
import WorkoutCard from "./WorkoutCard";

const WorkoutLibrary = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/fitlog"
  );

  const workouts = await res.json();

  return (
    <section id="library" className="px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-3xl font-bold">
          Workout Library
        </h2>
         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout: IWorkout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
            />
          ))}
        </div>
        </div>
    </section>
  );
};

export default WorkoutLibrary;