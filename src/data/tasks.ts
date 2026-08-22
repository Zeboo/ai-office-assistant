export type TaskStatus =
  | "In Progress"
  | "Pending"
  | "Completed";

export type Task = {
  id: number;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  status: TaskStatus;
  date: string;
  assigned: string;
  ai: boolean;
};

export const tasks: Task[] = [
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