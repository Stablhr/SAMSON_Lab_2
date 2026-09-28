const STORAGE_KEY = 'todo.tasks.v1';

function isTask(value) {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof value.text === 'string' &&
    value.text.trim() !== ''
  );
}

export function loadTasks() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(isTask)
      .map((task, index) => ({
        id: typeof task.id === 'number' || typeof task.id === 'string' ? task.id : index,
        text: task.text,
        done: task.done === true,
      }));
  } catch {
    return [];
  }
}

export function saveTasks(tasks) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // Storage unavailable (private mode, quota, disabled) — the app still works in memory.
  }
}
