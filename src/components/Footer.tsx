import Image from "next/image";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-gray-800 bg-black text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src={logo}
            alt="FitLog"
            className="h-5 w-auto"
          />

          <span className="text-lg font-bold">
            FITLOG
          </span>
        </div>

        {/* Copyright */}
        <p className="text-right text-xs text-gray-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
