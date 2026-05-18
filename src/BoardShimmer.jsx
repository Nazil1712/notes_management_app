import React from 'react';

const CardShimmer = () => (
  <div className="bg-white p-4 rounded-2xl shadow-sm border space-y-3 animate-pulse">
    <div className="flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <div className="h-5 w-12 bg-gray-200 rounded-full"></div>
        <div className="h-4 w-4 bg-gray-200 rounded"></div>
      </div>
      <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
    </div>
    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
    <div className="flex justify-between">
      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
      <div className="h-3 bg-gray-200 rounded w-10"></div>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2"></div>
    <div className="flex justify-between text-sm text-gray-500">
      <div className="flex -space-x-2">
        <div className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white"></div>
        <div className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white"></div>
        <div className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white"></div>
      </div>
      <div className="flex gap-4">
        <div className="h-4 w-6 bg-gray-200 rounded"></div>
        <div className="h-4 w-6 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

const RowShimmer = () => (
  <div className="grid grid-cols-[0.3fr_2fr_1fr_1fr_1fr_1fr_1fr_2fr] items-center px-4 py-3 border-b text-sm animate-pulse bg-white">
    <div className="h-4 w-4 bg-gray-200 rounded"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    <div className="h-5 w-12 bg-gray-200 rounded-full"></div>
    <div className="h-6 w-20 bg-gray-200 rounded"></div>
    <div className="w-full bg-gray-200 rounded-full h-2"></div>
    <div className="h-4 w-6 bg-gray-200 rounded ml-20"></div>
    <div className="h-4 w-6 bg-gray-200 rounded"></div>
    <div className="flex justify-between">
      <div className="flex -space-x-2">
        <div className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white"></div>
        <div className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white"></div>
      </div>
      <div className="flex gap-2">
        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  </div>
);

export default function BoardShimmer({ view }) {
  if (view === "list") {
    return (
      <div className="bg-white p-7">
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((col) => (
            <div key={col} className="w-[90vw] md:w-[29vw] flex-shrink-0 bg-background-card-background p-4 rounded-xl border border-gray-200 space-y-4">
              <div className="flex justify-between items-center mb-4 animate-pulse">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-gray-200 rounded-full"></div>
                  <div className="h-6 w-24 bg-gray-200 rounded"></div>
                  <div className="h-6 w-8 bg-gray-200 rounded"></div>
                </div>
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              </div>
              <div className="space-y-4">
                <CardShimmer />
                <CardShimmer />
                <CardShimmer />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (view === "row") {
    return (
      <div className="bg-white p-7">
        <div className="flex items-baseline mb-5 gap-5 animate-pulse">
          <div className="h-8 w-32 bg-gray-200 rounded"></div>
          <div className="h-8 w-24 bg-gray-200 rounded"></div>
        </div>
        <div className="w-full border rounded-md overflow-hidden">
          <div className="grid grid-cols-[0.3fr_2fr_1fr_1fr_1fr_1fr_1fr_2fr] bg-gray-100 text-sm font-semibold px-4 py-2 border-b animate-pulse">
            <div></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 ml-10"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div>
            {[1, 2, 3, 4, 5].map((row) => (
              <RowShimmer key={row} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-7">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-gray-200 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-gray-200 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-gray-200 rounded col-span-2"></div>
              <div className="h-2 bg-gray-200 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
