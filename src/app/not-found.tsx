import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6 text-center text-white">
      <div>
        <p className="text-7xl font-extrabold text-[#ccff00]">404</p>

        <h1 className="mt-4 text-3xl font-bold">
          Workout Not Found
        </h1>

        <p className="mt-3 text-gray-400">
          Sorry, the workout you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-[#ccff00] px-6 py-3 font-bold text-black"
        >
          Back to Workouts
        </Link>
      </div>
    </div>
  );
};

export default NotFound;