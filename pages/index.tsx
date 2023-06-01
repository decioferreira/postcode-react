'use client';

import { useRouter } from 'next/router';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import PostcodeButton from '../components/PostcodeButton';
import { useState } from 'react';
import debounce from 'lodash.debounce';

export default function Home() {
  const router = useRouter();
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);

  function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (!disabled) {
      router.push(`/${e.target.postcode.value}`);
    }
  }

  function onChange(e: React.FormEvent<HTMLInputElement>) {
    setDisabled(true);
    setError(null);

    if (e.target.value !== '') {
      fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(e.target.value)}/validate`)
        .then(res => res.json())
        .then((res) => {
          if (res.status === 200) {
            setDisabled(!res.result);
            setError(res.result ? null : "Invalid postcode");
          } else {
            setDisabled(true);
            setError(null);
          }
        }, (error) => {
          console.error(error);

          setDisabled(true);
          setError(null);
        });
    }
  }

  const debouncedOnChange = debounce(onChange, 300);

  return (
    <main className="relative overflow-hidden">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-800 dark:text-gray-200">
            Postcodes
          </h1>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Query and show details for a given UK postcode.
          </p>

          <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
            <form onSubmit={onSubmit}>
              <div className="relative z-10 flex space-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-900/[.2]">
                <div className="flex-[1_0_0%]">
                  <label htmlFor="hs-search-postcode" className="block text-sm text-gray-700 font-medium dark:text-white"><span className="sr-only">Search postcode</span></label>
                  <input type="text" onChange={debouncedOnChange} name="postcode" id="hs-search-postcode" className="p-3 block w-full border-transparent rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-400" placeholder="Search postcode" />
                  {error &&
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      {error}
                    </span>
                  }
                </div>
                <div className="flex-[0_0_auto]">
                  <button type="submit" disabled={disabled} className="disabled:opacity-50 p-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                    <MagnifyingGlassIcon width="16" height="16" />
                  </button>
                </div>
              </div>
            </form>

            <div className="hidden md:block absolute top-0 right-0 -translate-y-12 translate-x-20">
              <svg className="w-16 h-auto text-orange-500" width="121" height="135" viewBox="0 0 121 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
                <path d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
                <path d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
              </svg>
            </div>

            <div className="hidden md:block absolute bottom-0 left-0 translate-y-10 -translate-x-32">
              <svg className="w-40 h-auto text-cyan-500" width="347" height="188" viewBox="0 0 347 188" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <div className="mt-10 sm:mt-20">
            <PostcodeButton value="CB4 0GF" />
            <PostcodeButton value="OX49 5NU" />
            <PostcodeButton value="M32 0JG" />
            <PostcodeButton value="NE30 1DP" />
          </div>
        </div>
      </div>
    </main>
  );
}
