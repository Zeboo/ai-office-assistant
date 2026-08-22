export type TaskStatus = "In Progress" | "Pending" | "Completed";
export type TaskPriority = "High" | "Medium" | "Low";

export type Task = {
  id: number;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  date: string;
  assigned: string;
  ai: boolean;
};

const STORAGE_KEY = "ai-virtual-office-tasks";

const defaultTasks: Task[] = [
  {
    id: 1,
    title: "Complete AI Virtual Office UI",
    description: "Finish the main dashboard and workspace screens.",
    priority: "High",
    status: "In Progress",
    date: "Today",
    assigned: "Palwasha",
    ai: false,
  },
  {
    id: 2,
    title: "Prepare project documentation",
    description: "Generate technical documentation for the project.",
    priority: "Medium",
    status: "Pending",
    date: "Tomorrow",
    assigned: "Document Agent",
    ai: true,
  },
  {
    id: 3,
    title: "Research AI productivity tools",
    description: "Analyze useful AI tools for the virtual office.",
    priority: "Medium",
    status: "In Progress",
    date: "Aug 21",
    assigned: "Research Agent",
    ai: true,
  },
  {
    id: 4,
    title: "Review client requirements",
    description: "Check the latest requirements and update the project.",
    priority: "Low",
    status: "Completed",
    date: "Aug 18",
    assigned: "Palwasha",
    ai: false,
  },
  {
    id: 5,
    title: "Schedule team meeting",
    description: "Arrange the next project progress meeting.",
    priority: "High",
    status: "Pending",
    date: "Aug 22",
    assigned: "Manager Agent",
    ai: true,
  },
];

export function getTasks(): Task[] {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);

    if (!savedTasks) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(defaultTasks)
      );

      return defaultTasks;
    }

    return JSON.parse(savedTasks) as Task[];
  } catch {
    return defaultTasks;
  }
}

export function saveTasks(tasks: Task[]) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(tasks)
  );

  window.dispatchEvent(new Event("tasks-updated"));
}

export function addTask(task: Task) {
  const tasks = getTasks();

  saveTasks([...tasks, task]);
}

export function updateTask(
  taskId: number,
  updates: Partial<Task>
) {
  const tasks = getTasks();

  const updatedTasks = tasks.map((task) =>
    task.id === taskId
      ? { ...task, ...updates }
      : task
  );

  saveTasks(updatedTasks);

  return updatedTasks;
}

export function deleteTask(taskId: number) {
  const tasks = getTasks();

  const updatedTasks = tasks.filter(
    (task) => task.id !== taskId
  );

  saveTasks(updatedTasks);

  return updatedTasks;
}

export function resetTasks() {
  saveTasks(defaultTasks);

  return defaultTasks;
}