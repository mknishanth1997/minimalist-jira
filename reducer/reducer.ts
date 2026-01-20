import { State, Action } from "@/types/types";

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    // Initial Task Fetching:
    case "FETCH_TASKS_START":
      return {
        ...state,
        status: "loading",
        error: null,
      };
    case "FETCH_TASKS_SUCCESS":
      return {
        ...state,
        status: "idle",
        tasks: action.payload,
        error: null,
        past: [], // Reset history on fresh load
        future: [], // Reset redo on fresh load
      };
    case "FETCH_TASKS_ERROR":
      return {
        ...state,
        status: "error",
        error: action.payload,
      };

    // Task Adding:
    case "ADD_TASK_START":
      return {
        ...state,
        isAdding: true,
        error: null,
      };
    case "ADD_TASK_SUCCESS":
      return {
        ...state,
        isAdding: false,
        past: [...state.past, state.tasks],
        tasks: [...state.tasks, action.payload],
        future: [],
        error: null,
      };
    case "ADD_TASK_ERROR":
      return {
        ...state,
        isAdding: false,
        error: action.payload,
      };

    //  Task Updating:
    case "UPDATE_TASK_START":
      return {
        ...state,
        isUpdating: action.payload.id,
        error: null,
      };
    case "UPDATE_TASK_SUCCESS":
      return {
        ...state,
        past: [...state.past, state.tasks],
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? action.payload : t,
        ),
        future: [],
        isUpdating: null,
        error: null,
      };
    case "UPDATE_TASK_ERROR":
      return {
        ...state,
        isUpdating: null,
        error: action.payload,
      };

    // Task Deletion:
    case "DELETE_TASK_START":
      return {
        ...state,
        isDeleting: action.payload,
        error: null,
      };
    case "DELETE_TASK_SUCCESS":
      return {
        ...state,
        past: [...state.past, state.tasks],
        tasks: state.tasks.filter((t) => t.id !== action.payload),
        future: [],
        isDeleting: null,
        error: null,
      };
    case "DELETE_TASK_ERROR":
      return {
        ...state,
        isDeleting: null,
        error: action.payload,
      };

    // SET UI Filter:
    case "SET_UI_FILTER":
      return {
        ...state,
        currentFilter: action.payload,
      };

    // Undo and Redo:

    case "UNDO": {
      if (state.past.length === 0) return state; // Nothing to undo

      const previous = state.past[state.past.length - 1];
      const newPast = state.past.slice(0, state.past.length - 1);
      return {
        ...state,
        past: newPast,
        tasks: previous, // Move the last "past" to "present"
        future: [state.tasks, ...state.future], // Push current "present" to "future"
      };
    }
    case "REDO": {
      if (state.future.length === 0) return state; // Nothing to redo

      const next = state.future[0];
      const newFuture = state.future.slice(1);

      return {
        ...state,
        past: [...state.past, state.tasks], // Move current "present" to "past"
        tasks: next, // Move the first "future" to "present"
        future: newFuture,
      };
    }

    default:
      return state;
  }
}
