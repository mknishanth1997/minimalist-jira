import { useTask } from "@/context/TaskContext";
import { Button, ButtonGroup } from "flowbite-react";

export function FlowBtnGrp() {
  const { state } = useTask();
  const className = "bg-gray-100 dark:bg-gray-700";
  return (
    <ButtonGroup outline>
      <Button className={`${state.currentFilter === "all" && className}`}>
        All
      </Button>
      <Button className={`${state.currentFilter === "todo" && className}`}>
        Todo
      </Button>
      <Button
        className={`${state.currentFilter === "in_progress" && className}`}
      >
        In-Progress
      </Button>
      <Button className={`${state.currentFilter === "done" && className}`}>
        Done
      </Button>
    </ButtonGroup>
  );
}
