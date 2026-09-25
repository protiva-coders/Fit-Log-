"use client";

import { useEffect, useState } from "react";
import WorkoutCard from "@/components/WorkoutCard";
import type { IWorkout } from "@/types/WorkoutTypes";

const WorkoutLibrary = () => {
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);
  const [sortBy, setSortBy] = useState("duration");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWorkouts = async () => {
      const res = await fetch(
        "https://api.abcz.workers.dev/api/fitlog"
      );

      const data = await res.json();

      setWorkouts(data);
      setLoading(false);
    };

    getWorkouts();
  }, []);

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return a.calories - b.calories;
    }

    if (sortBy === "rating") {
      return b.rating - a.rating;
    }

    return 0;
  });

  return (
    <section id="library" className="px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">

        {/* Heading + Sort */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-3xl font-bold">
            Workout Library
          </h2>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-full border border-gray-700 bg-black px-5 py-3 text-sm text-white outline-none"
          >
            <option value="duration">
              Duration
            </option>

            <option value="calories">
              Calories
            </option>

            <option value="rating">
              Rating
            </option>
          </select>
        </div>

        {/* Loading */}
        {loading && (
          <p className="py-10 text-center text-gray-400">
            Loading workouts…
          </p>
        )}

        {/* Workout Cards */}
        {!loading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedWorkouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default WorkoutLibrary;

