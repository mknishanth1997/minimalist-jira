import React from "react";
import TaskBox from "./TaskBox";
import { useTask } from "@/context/TaskContext";

function TaskBoxContainer({ status }) {
  const { state } = useTask();

  const visibleTask = state.tasks
    .filter((t) => t.status === status)
    .filter((fD) => fD.title.startsWith("hi") || fD.id.startsWith("1"));

  return (
    <div
      className="
      flex
      flex-col
      flex-1
      rounded-lg
      bg-gray-100
      p-4
      dark:bg-gray-800/50
      min-h-0
    "
    >
      <h2 className="mb-4 font-semibold text-gray-600 dark:text-gray-400 uppercase text-xs tracking-wider">
        {`${status} (${visibleTask.length})`}
      </h2>

      <div
        className="
        flex-1
        min-h-0
        overflow-y-auto
        space-y-3
        pr-2
        no-scrollbar
      "
      >
        {visibleTask.map((t) => (
          <TaskBox key={t.id} task={t} />
        ))}
      </div>
    </div>
  );
}

export default TaskBoxContainer;
