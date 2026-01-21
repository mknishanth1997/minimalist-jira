export type FilterType = "all" | "todo" | "in_progress" | "done";
export type TaskStatus = "todo" | "in_progress" | "done";

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
};
export type State = {
  // History
  past: Task[][]; // Array of Snapshots: [ [t1, t2], [t1, t2, t3] ]
  tasks: Task[]; // This is your "Present"
  future: Task[][]; // For Redo

  // Statuses
  status: "idle" | "loading" | "error";
  isAdding: boolean;
  isUpdating: string | null;
  isDeleting: string | null;

  currentFilter: FilterType;
  error: string | null; // One central place for error messages
};

export type Action =
  | { type: "FETCH_TASKS_START" }
  | { type: "FETCH_TASKS_SUCCESS"; payload: Task[] }
  | { type: "FETCH_TASKS_ERROR"; payload: string }
  | { type: "ADD_TASK_START" }
  | { type: "ADD_TASK_SUCCESS"; payload: Task }
  | { type: "ADD_TASK_ERROR"; payload: string }
  | { type: "UPDATE_TASK_START"; payload: Task }
  | { type: "UPDATE_TASK_SUCCESS"; payload: Task }
  | { type: "UPDATE_TASK_ERROR"; payload: string }
  | { type: "DELETE_TASK_START"; payload: string }
  | { type: "DELETE_TASK_SUCCESS"; payload: string }
  | { type: "DELETE_TASK_ERROR"; payload: string }
  | { type: "SET_UI_FILTER"; payload: FilterType }
  | { type: "UNDO" }
  | { type: "REDO" };

export interface TaskContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}
