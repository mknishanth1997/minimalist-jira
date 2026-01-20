"use client";

import { HiReply, HiRefresh, HiPlus } from "react-icons/hi"; // Using icons for a pro look

export function JiraHeader() {
  return (
    <header className="h-20 shrink-0 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="flex h-full items-center justify-between px-8">
        {" "}
        {/* Increased height and horizontal padding */}
        {/* LEFT: Search Input with max-width to keep it clean */}
        <div className="flex-1 max-w-2xl">
          <input
            type="text"
            placeholder="Search issues, boards, projects…"
            className="
              h-11
              w-full
              rounded-lg
              bg-[#f3f1e7] dark:bg-gray-800
              px-5
              text-base
              border-none
              placeholder:text-gray-500
              focus:ring-2
              focus:ring-blue-500
              transition-all
            "
          />
        </div>
        {/* RIGHT: Action Group */}
        <div className="flex items-center gap-4 ml-4">
          {/* Undo/Redo - Joined together as a single unit */}
          <div className="flex -space-x-px">
            <button
              className="
              h-11 px-4
              rounded-l-lg
              border border-gray-300 dark:border-gray-700
              hover:bg-gray-100 dark:hover:bg-gray-800
              text-gray-600 dark:text-gray-400
              transition-colors
            "
              title="Undo"
            >
              <HiReply className="text-lg" />
            </button>
            <button
              className="
              h-11 px-4
              rounded-r-lg
              border border-gray-300 dark:border-gray-700
              hover:bg-gray-100 dark:hover:bg-gray-800
              text-gray-600 dark:text-gray-400
              transition-colors
            "
              title="Redo"
            >
              <HiRefresh className="text-lg" />
            </button>
          </div>

          {/* Create Task - Separated slightly for emphasis */}
          <button
            className="
            h-11
            px-6
            rounded-lg
            bg-blue-600
            text-white
            text-sm
            font-semibold
            hover:bg-blue-700
            shadow-sm
            transition
            flex items-center gap-2
          "
          >
            <HiPlus className="text-lg" />
            <span>Create</span>
          </button>
        </div>
      </div>
    </header>
  );
}
