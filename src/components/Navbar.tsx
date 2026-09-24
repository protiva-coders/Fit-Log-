import React from "react";
import Link from "next/link";
import logo from "@/assets/logo.png";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="border-b border-gray-800 bg-black text-white">
      <div className="flex flex-col gap-5 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6 md:py-5">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="Fit Log" />
          <span className="text-2xl font-bold">FITLOG</span>
        </Link>

        {/* Navigation */}
        <div className="flex gap-6 md:gap-8">
          <Link href="/">Workouts</Link>
          <Link href="/my-plan">My Plan</Link>
        </div>

        {/* Badges */}
        <div className="flex gap-3">
          <Link
            href="/my-plan"
            className="rounded-full bg-[#ccff00] px-4 py-2 text-sm font-bold text-black"
          >
            Plan 0
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-[#ccff00] px-4 py-2 text-sm font-bold"
          >
            Saved 0
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;