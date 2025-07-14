'use client';

import Link from 'next/link';
import { FaHome } from 'react-icons/fa';
import { MdOutlineTravelExplore } from 'react-icons/md';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-6">
      <h1 className="text-[8rem] font-extrabold text-[#D29022] leading-none">404</h1>
      <h2 className="text-3xl font-semibold text-[#610E07] mt-2">Lost on the trail?</h2>
      <p className="mt-4 text-gray-600 text-base max-w-md">
        Looks like you've taken a wrong turn. The page you're looking for isn’t part of this adventure.
      </p>

      <div className="mt-6 flex gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#D29022] hover:bg-[#c17f1c] text-white font-medium py-2 px-4 rounded-lg transition"
        >
          <FaHome className="text-lg" />
          Back to Home
        </Link>

        <Link
          href="/explore"
          className="inline-flex items-center gap-2 border border-[#610E07] text-[#610E07] hover:bg-[#610E07] hover:text-white font-medium py-2 px-4 rounded-lg transition"
        >
          <MdOutlineTravelExplore className="text-lg" />
          Explore Stays
        </Link>
      </div>
    </div>
  );
}
