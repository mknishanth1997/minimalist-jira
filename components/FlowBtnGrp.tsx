import { useTask } from "@/context/TaskContext";
import { Button, ButtonGroup } from "flowbite-react";

export function FlowBtnGrp() {
  const { state, dispatch } = useTask();
  const setCurrentFilter = (f: "all" | "todo" | "in_progress" | "done") =>
    dispatch({ type: "SET_UI_FILTER", payload: f });
  const className = "bg-gray-100 dark:bg-gray-700";
  return (
    <ButtonGroup outline>
      <Button
        className={`${state.currentFilter === "all" && className}`}
        onClick={() => setCurrentFilter("all")}
      >
        All
      </Button>
      <Button
        className={`${state.currentFilter === "todo" && className}`}
        onClick={() => setCurrentFilter("todo")}
      >
        Todo
      </Button>
      <Button
        className={`${state.currentFilter === "in_progress" && className}`}
        onClick={() => setCurrentFilter("in_progress")}
      >
        In-Progress
      </Button>
      <Button
        className={`${state.currentFilter === "done" && className}`}
        onClick={() => setCurrentFilter("done")}
      >
        Done
      </Button>
    </ButtonGroup>
  );
}
