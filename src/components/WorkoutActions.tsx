"use client";

import { toast } from "react-toastify";

type Props = {
  workoutId: number;
};

const WorkoutActions = ({ workoutId }: Props) => {
  const handleAddToPlan = () => {
    const savedPlan = localStorage.getItem("fitlog-plan");

    const plan: number[] = savedPlan
      ? JSON.parse(savedPlan)
      : [];

    if (!plan.includes(workoutId)) {
      plan.push(workoutId);

      localStorage.setItem(
        "fitlog-plan",
        JSON.stringify(plan)
      );

      toast.success("Workout added to today's plan!");
    } else {
      toast.info("This workout is already in your plan!");
    }
  };

  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
      <button
        onClick={handleAddToPlan}
        className="rounded-full bg-[#ccff00] px-6 py-3 font-bold text-black"
      >
        Add to Today’s Plan
      </button>

      <button className="rounded-full border border-[#ccff00] px-6 py-3 font-bold text-white">
        Save for Later
      </button>
    </div>
  );
};

export default WorkoutActions;