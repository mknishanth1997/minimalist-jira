"use client";

import React from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

type ErrorStateProps = {
  message: string;
};

export default function ErrorState({ message }: ErrorStateProps) {
  if (!message) return null;

  return (
    <div className="flex items-center justify-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-300 flex-1">
      <HiOutlineExclamationCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />

      <div className="flex flex-col">
        <span className="text-sm font-semibold">Something went wrong</span>
        <span className="text-sm opacity-90">{message}</span>
      </div>
    </div>
  );
}
