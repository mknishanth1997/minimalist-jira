"use client";

import { addTaskToBackend } from "@/backend/backend";
import { useTask } from "@/context/TaskContext";
import { FAKE_TASKS } from "@/data/fake-tasks-100";
import { useState } from "react";
import { HiSearch, HiPlus, HiReply, HiRefresh } from "react-icons/hi";

export function JiraHeader() {
  const { state, dispatch } = useTask();
  console.log("Jira:", state.tasks);
  console.log("Are they the same reference?", state.tasks === FAKE_TASKS);
  const [query, setQuery] = useState("");
  console.log("Handle Add function Activated");
  async function handleAddTask() {
    if (query === "") return;
    try {
      dispatch({ type: "ADD_TASK_START" });
      const addedTask = await addTaskToBackend(query, 1000, true);
      console.log(addedTask);
      dispatch({
        type: "ADD_TASK_SUCCESS",
        payload: addedTask,
      });
    } catch (error) {
      dispatch({ type: "ADD_TASK_ERROR", payload: String(error) });
    }
  }

  return (
    <header className="min-h-[5rem] lg:h-20 shrink-0 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 lg:px-8 py-3 lg:py-0">
      <div className="flex flex-wrap lg:flex-nowrap h-full items-center gap-4">
        {/* 1. SEARCH BAR WITH BUTTON INSIDE */}
        <div className="order-2 lg:order-1 flex-1 min-w-[300px] relative group">
          <input
            type="text"
            placeholder="Search issues..."
            className="
              h-11 w-full rounded-lg pl-5 pr-12
              bg-[#f3f1e7] dark:bg-gray-800
              text-slate-900 dark:text-slate-100
              border-none focus:ring-2 focus:ring-blue-500
              transition-all
            "
            value={query}
            onChange={(e) => {
              const value = e.target.value;
              setQuery(value);
              dispatch({
                type: "SET_CURRENT_UI_Filter",
                payload: value || null,
              });
            }}
          />
          <button
            className="absolute right-1 top-1 h-9 w-9 flex items-center justify-center rounded-md bg-white dark:bg-gray-700 text-gray-500 hover:text-blue-600 shadow-sm transition-colors"
            title="Search"
          >
            <HiSearch className="text-xl" />
          </button>
        </div>

        {/* 2. ACTION GROUP (Create, Undo, Redo) */}
        <div className="order-1 lg:order-2 flex items-center justify-between w-full lg:w-auto gap-3">
          {/* Create Task Button */}
          <button
            className="
            flex-1 lg:flex-none h-11 px-5 rounded-lg
            bg-blue-600 hover:bg-blue-700
            text-white text-sm font-semibold
            flex items-center justify-center gap-2
            shadow-md active:scale-95 transition-all
          "
            onClick={() => {
              handleAddTask();
              setQuery("");
              console.log(FAKE_TASKS);
            }}
          >
            <HiPlus className="text-lg" />
            <span className="whitespace-nowrap">Create Task</span>
          </button>

          {/* Connected Undo/Redo Unit */}
          <div className="flex -space-x-px">
            <button
              onClick={() => dispatch({ type: "UNDO" })}
              className="
              h-11 px-4 rounded-l-lg
              border border-gray-300 dark:border-gray-700
              bg-white dark:bg-gray-900
              text-gray-600 dark:text-gray-400
              hover:bg-gray-50 dark:hover:bg-gray-800
              transition-colors
            "
              title="Undo"
            >
              <HiReply />
            </button>
            <button
              onClick={() => dispatch({ type: "REDO" })}
              className="
              h-11 px-4 rounded-r-lg
              border border-gray-300 dark:border-gray-700
              bg-white dark:bg-gray-900
              text-gray-600 dark:text-gray-400
              hover:bg-gray-50 dark:hover:bg-gray-800
              transition-colors
            "
              title="Redo"
            >
              <HiRefresh />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
