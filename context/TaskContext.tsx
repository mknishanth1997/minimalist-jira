"use client";
import { initialState } from "@/data/fake-tasks-100";
import { reducer } from "@/reducer/reducer";
import { TaskContextType } from "@/types/types";
import { createContext, ReactNode, useContext, useReducer } from "react";

// Context Creation:
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Context Provider:
export function TaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within TaskProvider");
  return context;
}
