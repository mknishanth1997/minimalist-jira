import { FAKE_TASKS } from "@/data/fake-tasks-100";

/**
 * Simulates a backend API call to fetch tasks.
 * @param delay - Time in milliseconds to wait before resolving (default: 1000ms)
 * @param shouldSucceed - Boolean flag to simulate success or failure (default: true)
 * @returns A promise that resolves with FAKE_TASKS or rejects with an error
 */
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
        resolve(FAKE_TASKS);
      } else {
        // 3. Simulate a 500 Internal Server Error or 404
        reject(
          new Error("Failed to fetch data from the server. Please try again."),
        );
      }
    }, delay);
  });
};
