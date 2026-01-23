import TaskBoxContainer from "./TaskBoxContainer";
import { fetchFromBackend } from "@/backend/backend";
import { useTask } from "@/context/TaskContext";
import { FlowBtnGrp } from "./FlowBtnGrp";
import { useEffect } from "react";
import { Action } from "@/types/types";
import { Spinner } from "flowbite-react";
import ErrorState from "./ErrorState";
import { stat } from "fs";
type AppDispatch = React.Dispatch<Action>;
function ProjectBoard() {
  const { state, dispatch } = useTask();
  useEffect(() => {
    handleFetch(dispatch);
    console.log("useEffect");
  }, [dispatch]);

  return (
    // h-full makes it fill the remaining space provided by the layout
    <div className="flex h-full flex-col gap-6 ">
      {/* Optional: Board Sub-header (e.g., Breadcrumbs or Board Name) */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{`Project Board (${state.tasks.length})`}</h1>
        <FlowBtnGrp></FlowBtnGrp>
        {/* <button
          className="bg-blue-500 p-4 rounded-2xl"
          onClick={() => handleFetch(dispatch)}
        >
          Fetch Data
        </button> */}
      </div>

      {/* THE BOARD CONTAINER */}

      <div
        className="
    flex
    flex-col
    md:flex-row
    flex-1
    gap-6
    min-h-0
    justify-center
  "
      >
        {state.status === "error" && (
          <ErrorState message={state.error}></ErrorState>
        )}
        {state.status === "loading" && (
          <Spinner
            color="success"
            aria-label="Success spinner example"
            className="flex-1 h-full"
          />
        )}
        {state.currentFilter === "all" && state.status === "idle" && (
          <>
            {" "}
            <TaskBoxContainer status={"todo"}></TaskBoxContainer>
            <TaskBoxContainer status={"in_progress"}></TaskBoxContainer>
            <TaskBoxContainer status={"done"}></TaskBoxContainer>
          </>
        )}
        {["todo", "in_progress", "done"].includes(state.currentFilter) &&
          state.status === "idle" && (
            <TaskBoxContainer status={state.currentFilter} />
          )}
      </div>
    </div>
  );
}

export default ProjectBoard;

async function handleFetch(dispatch: AppDispatch) {
  try {
    dispatch({ type: "FETCH_TASKS_START" });
    const data = await fetchFromBackend(500, true);
    dispatch({ type: "FETCH_TASKS_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    dispatch({ type: "FETCH_TASKS_ERROR", payload: message });
  }
}
