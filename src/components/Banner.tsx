import Image from "next/image";
import Link from "next/link";
import banner from "@/assets/banner.png";

const Banner = () => {
  return (
    <section className="bg-black text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-10 px-6 py-20">

        {/* Left Content */}
        <div className="max-w-xl">
          <p className="mb-4 text-sm font-semibold tracking-[0.3em] text-[#ccff00]">
            WORKOUT LIBRARY
          </p>

          <h1 className="text-5xl font-extrabold leading-tight">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          <p className="mt-6 text-lg text-gray-400">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today's plan, and watch the week's work add up.
          </p>

          <Link
            href="#library"
            className="mt-8 inline-block rounded-full bg-[#ccff00] px-6 py-3 font-bold text-black"
          >
            Browse Workouts
          </Link>
        </div>

        {/* Right Image */}
        <div>
          <Image
            src={banner}
            alt="Workout Banner"
          />
        </div>

      </div>
    </section>
  );
};

export default Banner;

