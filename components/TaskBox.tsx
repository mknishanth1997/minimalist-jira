"use client";
import { Toaster } from "react-hot-toast";
import { Badge } from "flowbite-react";
import { Spinner } from "flowbite-react";
import {
  HiOutlineArrowRight,
  HiOutlineArrowLeft,
  HiOutlineTrash,
} from "react-icons/hi";
import { TaskStatus } from "@/types/types";
import { useTask } from "@/context/TaskContext";
import {
  deleteTaskFromBackend,
  updateTaskFromBackend,
} from "@/backend/backend";
import { NpmToaster } from "./NpmToaster";
import { useState } from "react";

export default function TaskBox({
  task,
}: {
  task: { id: string; title: string; status: TaskStatus };
}) {
  const { state, dispatch } = useTask();
  const [error, setError] = useState(false);
  const status = task.status;

  async function handleUpdate(direction: string) {
    try {
      setError(false);
      const newStatus =
        direction === "up"
          ? getNextStatus(task.status)
          : getPrevStatus(task.status);
      let toastShown = false;

      if (state.isUpdating !== null) {
        if (!toastShown) {
          NpmToaster("A Task is being updated. Wait for it to finish", "error");
          toastShown = true;
        }
        return;
      }

      // 🔹 start loading first
      dispatch({ type: "UPDATE_TASK_START", payload: task });
      // 🔹 wait for backend confirmation
      const updatedTask = await updateTaskFromBackend(
        task.id,
        newStatus,
        2000,
        true,
      );

      // 🔹 update state ONLY after backend success
      dispatch({ type: "UPDATE_TASK_SUCCESS", payload: updatedTask });
    } catch (error) {
      dispatch({ type: "UPDATE_TASK_ERROR", payload: String(error) });
      setError(true);
    }
  }

  async function handleDelete() {
    try {
      let toastShow = false;
      if (state.isDeleting !== null) {
        if (!toastShow) {
          NpmToaster("Wait for the other task to get Delted.", "error");
          toastShow = true;
        }
        return;
      }
      dispatch({ type: "DELETE_TASK_START", payload: task.id });
      const deletedId = await deleteTaskFromBackend(task.id, 1000, true);
      dispatch({ type: "DELETE_TASK_SUCCESS", payload: deletedId });
    } catch (error) {
      dispatch({ type: "DELETE_TASK_ERROR", payload: String(error) });
    }
  }

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
          {state.isUpdating !== task.id && state.isDeleting !== task.id && (
            <>
              {(status === "in_progress" || status === "done") && (
                <button
                  className="p-1.5 rounded-md text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 transition-colors"
                  aria-label="Move Left"
                  onClick={() => handleUpdate("down")}
                >
                  <HiOutlineArrowLeft className="h-4 w-4" />
                </button>
              )}

              {(status === "todo" || status === "in_progress") && (
                <button
                  className="p-1.5 rounded-md text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 transition-colors"
                  aria-label="Move Right"
                  onClick={() => handleUpdate("up")}
                >
                  <HiOutlineArrowRight className="h-4 w-4" />
                </button>
              )}

              <p className="text-red-500">
                {error && "Server Error. Try again"}
              </p>
            </>
          )}
        </div>
        {(state.isUpdating === task.id || state.isDeleting === task.id) && (
          <Spinner color="failure" aria-label="Loading spinner" />
        )}

        {/* Delete Button */}
        <button
          className="p-1.5 rounded-md text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors"
          aria-label="Delete Task"
          onClick={handleDelete}
        >
          <HiOutlineTrash className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

const STATUS_FLOW = ["todo", "in_progress", "done"];
function getNextStatus(status: TaskStatus) {
  const index = STATUS_FLOW.indexOf(status);
  if (index === -1 || index === STATUS_FLOW.length - 1) return status;
  return STATUS_FLOW[index + 1];
}

function getPrevStatus(status: TaskStatus) {
  const index = STATUS_FLOW.indexOf(status);
  if (index <= 0) return status;
  return STATUS_FLOW[index - 1];
}
