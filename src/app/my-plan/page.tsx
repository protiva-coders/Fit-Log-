"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Workout = {
  id: number;
  name: string;
  category: string;
  difficulty: string;
  equipment: string;
  duration: number;
  calories: number;
  rating: number;
  image: string;
};

const MyPlanPage = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedPlan = localStorage.getItem("fitlog-plan");
        const savedIds = localStorage.getItem("fitlog-saved");
        const completed = localStorage.getItem("fitlog-completed");

        const planIds: number[] = savedPlan
          ? JSON.parse(savedPlan)
          : [];

        const savedIdsArray: number[] = savedIds
          ? JSON.parse(savedIds)
          : [];

        const completedArray: number[] = completed
          ? JSON.parse(completed)
          : [];

        const planData = await Promise.all(
          planIds.map(async (id) => {
            const res = await fetch(
              `https://api.abcz.workers.dev/api/fitlog/${id}`
            );

            return res.json();
          })
        );

        const savedData = await Promise.all(
          savedIdsArray.map(async (id) => {
            const res = await fetch(
              `https://api.abcz.workers.dev/api/fitlog/${id}`
            );

            return res.json();
          })
        );

        setWorkouts(planData);
        setSavedWorkouts(savedData);
        setCompletedIds(completedArray);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleRemove = (id: number) => {
    const updatedWorkouts = workouts.filter(
      (workout) => workout.id !== id
    );

    setWorkouts(updatedWorkouts);

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(
        updatedWorkouts.map((workout) => workout.id)
      )
    );
  };

  const handleRemoveSaved = (id: number) => {
    const updatedSaved = savedWorkouts.filter(
      (workout) => workout.id !== id
    );

    setSavedWorkouts(updatedSaved);

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(
        updatedSaved.map((workout) => workout.id)
      )
    );
  };

  const handleMarkAsDone = (id: number) => {
    if (!completedIds.includes(id)) {
      const updatedCompleted = [...completedIds, id];

      setCompletedIds(updatedCompleted);

      localStorage.setItem(
        "fitlog-completed",
        JSON.stringify(updatedCompleted)
      );
    }
  };

  const currentWorkouts =
    activeTab === "plan" ? workouts : savedWorkouts;

  return (
    <main className="min-h-screen px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <h1 className="text-4xl font-extrabold">
          My Plan
        </h1>

        <p className="mt-3 text-gray-400">
          Your saved workouts and today’s training plan.
        </p>

        {/* Metrics */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="rounded-2xl bg-emerald-950 p-6">
            <p className="text-sm text-gray-400">
              Exercises
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {workouts.length}
            </h2>
          </div>

          <div className="rounded-2xl bg-emerald-950 p-6">
            <p className="text-sm text-gray-400">
              Minutes
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {workouts.reduce(
                (total, workout) =>
                  total + workout.duration,
                0
              )}
            </h2>
          </div>

          <div className="rounded-2xl bg-emerald-950 p-6">
            <p className="text-sm text-gray-400">
              Calories
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {workouts.reduce(
                (total, workout) =>
                  total + workout.calories,
                0
              )}
            </h2>
          </div>

        </div>

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap gap-3">

          <button
            onClick={() => setActiveTab("plan")}
            className={`rounded-full px-5 py-2 font-bold ${
              activeTab === "plan"
                ? "bg-[#ccff00] text-black"
                : "border border-[#ccff00]"
            }`}
          >
            Today’s Plan
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`rounded-full px-5 py-2 font-bold ${
              activeTab === "saved"
                ? "bg-[#ccff00] text-black"
                : "border border-[#ccff00]"
            }`}
          >
            Saved
          </button>

        </div>

        {/* Loading */}
        {loading ? (
          <p className="mt-10 text-center text-lg text-gray-400">
            Loading workouts…
          </p>
        ) : currentWorkouts.length === 0 ? (

          /* Empty State */
          <div className="mt-10 rounded-3xl bg-emerald-950 px-6 py-16 text-center">
            <h2 className="text-2xl font-bold">
              No workouts here yet
            </h2>

            <p className="mt-3 text-gray-400">
              {activeTab === "plan"
                ? "Add a workout to your plan to get started."
                : "Save workouts here to find them later."}
            </p>

            <Link
              href="/"
              className="mt-6 inline-block rounded-full bg-[#ccff00] px-6 py-3 font-bold text-black"
            >
              Browse Workouts
            </Link>
          </div>

        ) : (

          /* Workout Cards */
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

            {currentWorkouts.map((workout) => {
              const isCompleted = completedIds.includes(
                workout.id
              );

              return (
                <div
                  key={workout.id}
                  className={`overflow-hidden rounded-2xl bg-emerald-950 ${
                    isCompleted ? "opacity-60" : ""
                  }`}
                >

                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="h-60 w-full object-cover"
                  />

                  <div className="p-5">

                    <h2 className="text-xl font-bold">
                      {workout.name}
                    </h2>

                    <p className="mt-2 text-sm text-gray-400">
                      {workout.category} • {workout.duration} min •{" "}
                      {workout.calories} kcal
                    </p>

                    {isCompleted && (
                      <p className="mt-3 font-bold text-[#ccff00]">
                        ✓ Completed
                      </p>
                    )}

                    <div className="mt-5 flex flex-wrap gap-3">

                      <Link
                        href={`/workouts/${workout.id}`}
                        className="rounded-full bg-[#ccff00] px-4 py-2 text-sm font-bold text-black"
                      >
                        View Details
                      </Link>

                      {activeTab === "plan" && (
                        <button
                          onClick={() =>
                            handleMarkAsDone(workout.id)
                          }
                          disabled={isCompleted}
                          className="rounded-full border border-[#ccff00] px-4 py-2 text-sm font-bold disabled:cursor-not-allowed"
                        >
                          {isCompleted
                            ? "Done"
                            : "Mark as Done"}
                        </button>
                      )}

                      <button
                        onClick={() => {
                          if (activeTab === "plan") {
                            handleRemove(workout.id);
                          } else {
                            handleRemoveSaved(workout.id);
                          }
                        }}
                        className="rounded-full border border-gray-600 px-4 py-2 text-sm"
                      >
                        Remove
                      </button>

                    </div>

                  </div>
                </div>
              );
            })}

          </div>
        )}

      </div>
    </main>
  );
};

export default MyPlanPage;

