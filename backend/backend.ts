import { FAKE_TASKS } from "@/data/fake-tasks-100";
import { Task, TaskStatus } from "@/types/types";

export const fetchFromBackend = (
  delay: number = 1000,
  shouldSucceed: boolean = true,
): Promise<typeof FAKE_TASKS> => {
  return new Promise((resolve, reject) => {
    // 1. Simulate network latency using the provided delay
    setTimeout(() => {
      if (shouldSucceed) {
        // 2. Simulate a successful 200 OK response
        console.log(`Successfully fetched ${FAKE_TASKS.length} tasks.`);
        resolve([...FAKE_TASKS]);
      } else {
        // 3. Simulate a 500 Internal Server Error or 404
        reject(
          new Error("Failed to fetch data from the server. Please try again."),
        );
      }
    }, delay);
  });
};

export const updateTaskFromBackend = (
  id: string,
  status: TaskStatus,
  delay: number = 1000,
  shouldSucceed: boolean = true,
): Promise<Task> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate server failure
      if (!shouldSucceed) {
        reject("Server error: failed to update task");
        return;
      }

      const taskIndex = FAKE_TASKS.findIndex((task) => task.id === id);

      // Simulate 404
      if (taskIndex === -1) {
        reject(`Task with id ${id} not found`);
        return;
      }

      const updatedTask: Task = {
        ...FAKE_TASKS[taskIndex],
        status,
      };

      // 🔥 mutate fake DB (just like real backend state)
      FAKE_TASKS[taskIndex] = updatedTask;

      console.log(`[BACKEND] Task ${id} updated → ${status}`);

      resolve(updatedTask);
    }, delay);
  });
};

export const deleteTaskFromBackend = (
  id: string,
  delay: number = 1000,
  shouldSucceed: boolean = true,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate server failure
      if (!shouldSucceed) {
        reject("Server error: failed to delete task");
        return;
      }

      const taskIndex = FAKE_TASKS.findIndex((task) => task.id === id);

      // Simulate 404
      if (taskIndex === -1) {
        reject(`Task with id ${id} not found`);
        return;
      }

      // 🔥 mutate fake DB
      FAKE_TASKS.splice(taskIndex, 1);

      console.log(`[BACKEND] Task ${id} deleted`);

      resolve(id);
    }, delay);
  });
};

export const addTaskToBackend = (
  title: string,
  delay: number = 1000,
  shouldSucceed: boolean = true,
): Promise<Task> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate server failure
      if (!shouldSucceed) {
        reject("Server error: failed to add task");
        return;
      }

      const newTask: Task = {
        id: crypto.randomUUID(),
        title,
        status: "todo",
      };

      // 🔥 mutate fake DB
      FAKE_TASKS.push(newTask);

      console.log(`[BACKEND] Task added → ${newTask.id}`);

      resolve(newTask);
    }, delay);
  });
};
