import WorkoutActions from "@/components/WorkoutActions";

type Props = {
  params: Promise<{ id: string }>;
};

const WorkoutDetailsPage = async ({ params }: Props) => {
  const { id } = await params;

  const res = await fetch(
    `https://api.abcz.workers.dev/api/fitlog/${id}`
  );

  const workout = await res.json();

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 text-white">
      <div className="grid gap-10 lg:grid-cols-2">

        {/* Image */}
        <div>
          <img
            src={workout.image}
            alt={workout.name}
            className="w-full rounded-3xl"
          />
        </div>

        {/* Details */}
        <div>

          {/* Category & Difficulty */}
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#ccff00] px-4 py-2 text-sm font-bold text-black">
              {workout.category}
            </span>

            <span className="rounded-full border border-gray-700 px-4 py-2 text-sm">
              {workout.difficulty}
            </span>
          </div>

          {/* Name */}
          <h1 className="text-4xl font-extrabold">
            {workout.name}
          </h1>

          {/* Description */}
          <p className="mt-5 text-gray-400">
            {workout.description}
          </p>

          {/* Workout Info */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">

            <div className="rounded-2xl bg-emerald-950 p-4">
              <p className="text-sm text-gray-400">
                Equipment
              </p>
              <p className="mt-2 font-bold">
                {workout.equipment}
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-950 p-4">
              <p className="text-sm text-gray-400">
                Duration
              </p>
              <p className="mt-2 font-bold">
                {workout.duration} min
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-950 p-4">
              <p className="text-sm text-gray-400">
                Calories
              </p>
              <p className="mt-2 font-bold">
                {workout.calories} kcal
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-950 p-4">
              <p className="text-sm text-gray-400">
                Rating
              </p>
              <p className="mt-2 font-bold">
                ⭐ {workout.rating}
              </p>
            </div>

          </div>

          {/* Instructions */}
          <div className="mt-8">
            <h2 className="mb-4 text-2xl font-bold">
              Instructions
            </h2>

            <p className="text-gray-400">
              {workout.instructions}
            </p>
          </div>

          {/* Action Buttons */}
          <WorkoutActions workoutId={workout.id} />

        </div>
      </div>
    </div>
  );
};

export default WorkoutDetailsPage;