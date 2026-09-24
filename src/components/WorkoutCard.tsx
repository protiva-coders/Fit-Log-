import { IWorkout } from "@/types/WorkoutTypes";
import Image from "next/image";
import Link from "next/link";

type WorkoutCardProps = {
  workout: IWorkout;
};

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="overflow-hidden rounded-2xl bg-emerald-950"
    >
      <div className="relative h-60 w-full">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-5">
        <div className="mb-3 flex gap-2">
          <span className="rounded-full bg-black px-3 py-1 text-xs">
            {workout.category}
          </span>

          <span className="rounded-full border border-gray-700 px-3 py-1 text-xs">
            {workout.difficulty}
          </span>
        </div>

        <h3 className="mb-2 text-xl font-bold">
          {workout.name}
        </h3>

        <p className="mb-4 text-sm text-gray-400">
          {workout.equipment}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-300">
          <span>{workout.duration} min</span>
          <span>{workout.calories} kcal</span>
          <span>⭐ {workout.rating}</span>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;