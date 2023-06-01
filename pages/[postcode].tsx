'use client';

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

export default function Postcode() {
  const router = useRouter();
  const defaultData = { country: null, region: null, admin_county: null, admin_district: null };
  const [data, setData] = useState(defaultData);
  const [nearest, setNearest] = useState([]);

  useEffect(() => {
    if (router.query.postcode) {
      fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(router.query.postcode)}`)
        .then(res => res.json())
        .then((res) => {
          if (res.status === 200) {
            setData(res.result);
          } else {
            setData(defaultData);
          }
        }, (error) => {
          console.error(error);
          setData(defaultData);
        });

      fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(router.query.postcode)}/nearest`)
        .then(res => res.json())
        .then((res) => {
          if (res.status === 200) {
            setNearest(res.result);
          } else {
            setNearest([]);
          }
        }, (error) => {
          console.error(error);
          setNearest([]);
        });
    }
  }, [router.query.postcode]);

  const nearestItems = nearest.map(nearestPostcode =>
    <tr>
      <td className="h-px w-px whitespace-nowrap">
        <div className="px-6 py-3">
          <span className="text-sm text-gray-500">{nearestPostcode.postcode}</span>
        </div>
      </td>
      <td className="h-px w-px whitespace-nowrap">
        <div className="px-6 py-3">
          <span className="text-sm text-gray-500">{nearestPostcode.country}</span>
        </div>
      </td>
      <td className="h-px w-px whitespace-nowrap">
        <div className="px-6 py-3">
          <span className="text-sm text-gray-500">{nearestPostcode.region}</span>
        </div>
      </td>
      <td className="h-px w-px whitespace-nowrap">
        <div className="px-6 py-1.5">
          <a className="inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 hover:underline font-medium" href={`/${encodeURIComponent(nearestPostcode.postcode)}`}>
            View
          </a>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 className="text-2xl font-bold md:text-3xl md:leading-tight text-gray-800 dark:text-gray-200">
          {router.query.postcode}
        </h2>

        <a href="/" className="mt-2 p-2 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
          <ChevronLeftIcon className="w-2.5 h-2.5" />
          Back to search
        </a>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-2 gap-6 md:gap-12">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Country
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {data.country || "-"}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Region
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {data.region || "-"}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              County
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {data.admin_county || "-"}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              District
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {data.admin_district || "-"}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">

                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                      Nearest postcodes
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Nearest postcodes for {router.query.postcode}
                    </p>
                  </div>
                </div>

                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-slate-800">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Postcode
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Country
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Region
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-right"></th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {nearestItems}
                  </tbody>
                </table>

                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{nearest.length}</span> results
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}