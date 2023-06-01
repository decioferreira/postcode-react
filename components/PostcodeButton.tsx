'use client';

import { MapPinIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function PostcodeButton({ value }: { value: string }) {
  return (
    <Link className="m-1 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" href={`/${encodeURIComponent(value)}`}>
      <MapPinIcon className="w-3 h-auto" />
      {value}
    </Link>
  );
}
