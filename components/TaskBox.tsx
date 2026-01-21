"use client";

import React from "react";
import { Badge } from "flowbite-react";
import {
  HiOutlineArrowRight,
  HiOutlineArrowLeft,
  HiOutlineTrash,
} from "react-icons/hi";

export default function TaskBox({ task }) {
  const status = task.status;

  return (
    <div className="group bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md dark:bg-gray-800 dark:border-gray-700 transition-all">
      {/* 1. TOP INFO: ID & Assignee */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-[10px] font-bold text-gray-400 tracking-tighter">
          {task.id}
        </span>
        <div className="w-5 h-5 rounded-full bg-indigo-500 text-[9px] flex items-center justify-center text-white font-bold ring-2 ring-white dark:ring-gray-800">
          AZ
        </div>
      </div>

      {/* 2. TITLE */}
      <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-4 px-1">
        {task.title}
      </div>

      {/* 3. STATUS BADGE */}
      <div className="mb-3 px-1">
        <Badge
          size="sm"
          className="w-fit rounded"
          color={
            status === "todo"
              ? "failure"
              : status === "done"
                ? "success"
                : "warning"
          }
        >
          {status}
        </Badge>
      </div>

      {/* 4. ACTION BAR */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
        {/* Navigation Arrows */}
        <div className="flex gap-1">
          {(status === "in_progress" || status === "done") && (
            <button
              className="p-1.5 rounded-md text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 transition-colors"
              aria-label="Move Left"
            >
              <HiOutlineArrowLeft className="h-4 w-4" />
            </button>
          )}

          {(status === "todo" || status === "in_progress") && (
            <button
              className="p-1.5 rounded-md text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 transition-colors"
              aria-label="Move Right"
            >
              <HiOutlineArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Delete Button */}
        <button
          className="p-1.5 rounded-md text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors"
          aria-label="Delete Task"
        >
          <HiOutlineTrash className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
