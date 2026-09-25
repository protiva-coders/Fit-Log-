"use client";

import { useEffect, useState } from "react";
import Banner from "@/components/Banner";
import WorkoutLibrary from "@/components/WorkoutLibrary";

const Page = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center text-white">
        <p className="text-lg text-gray-400">
          Loading workouts…
        </p>
      </div>
    );
  }

  return (
    <>
      <Banner />
      <WorkoutLibrary />
    </>
  );
};

export default Page;