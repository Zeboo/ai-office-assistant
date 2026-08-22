import { useMemo, useState } from "react";
import {
  CheckSquare,
  Plus,
  Search,
  Filter,
  CalendarDays,
  User,
  Bot,
  Clock3,
  MoreHorizontal,
  Trash2,
  X,
} from "lucide-react";

import { colors } from "../theme/colors";

type TaskStatus = "In Progress" | "Pending" | "Completed";
type TaskPriority = "High" | "Medium" | "Low";

type Task = {
  id: number;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  date: string;
  assigned: string;
  ai: boolean;
};

const initialTasks: Task[] = [
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

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<"All" | TaskStatus>("All");
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPriority, setNewPriority] =
    useState<TaskPriority>("Medium");

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesFilter =
        filter === "All" || task.status === filter;

      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        searchText === "" ||
        task.title.toLowerCase().includes(searchText) ||
        task.description.toLowerCase().includes(searchText) ||
        task.assigned.toLowerCase().includes(searchText);

      return matchesFilter && matchesSearch;
    });
  }, [tasks, filter, search]);

  const totalTasks = tasks.length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const toggleTask = (id: number) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== id) {
          return task;
        }

        return {
          ...task,
          status:
            task.status === "Completed"
              ? "Pending"
              : "Completed",
        };
      })
    );
  };

  const deleteTask = (id: number) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );
  };

  const createTask = () => {
    const title = newTitle.trim();

    if (!title) {
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title,
      description:
        newDescription.trim() ||
        "New workspace task.",
      priority: newPriority,
      status: "Pending",
      date: "Today",
      assigned: "Palwasha",
      ai: false,
    };

    setTasks((currentTasks) => [
      newTask,
      ...currentTasks,
    ]);

    setNewTitle("");
    setNewDescription("");
    setNewPriority("Medium");
    setShowCreateModal(false);
  };

  return (
    <div
      className="min-h-[calc(100vh-80px)] p-8"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
      }}
    >
      {/* HEADER */}

      <div className="mb-7 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{
                backgroundColor: colors.primary,
                color: colors.black,
              }}
            >
              <CheckSquare size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                Tasks
              </h1>

              <p
                className="text-sm"
                style={{
                  color: colors.textMuted,
                }}
              >
                Manage your work and AI-generated tasks
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-opacity hover:opacity-80"
          style={{
            backgroundColor: colors.primary,
            color: colors.black,
          }}
        >
          <Plus size={18} />
          Create Task
        </button>
      </div>

      {/* STAT CARDS */}

      <div className="mb-6 grid grid-cols-4 gap-4">
        <StatCard
          title="Total Tasks"
          value={totalTasks}
        />

        <StatCard
          title="In Progress"
          value={inProgressTasks}
          highlight
        />

        <StatCard
          title="Pending"
          value={pendingTasks}
        />

        <StatCard
          title="Completed"
          value={completedTasks}
        />
      </div>

      {/* SEARCH + FILTER */}

      <div
        className="mb-5 flex items-center justify-between rounded-2xl border p-4"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
        }}
      >
        <div
          className="flex w-80 items-center gap-2 rounded-xl border px-3 py-2.5"
          style={{
            backgroundColor: colors.background,
            borderColor: colors.border,
          }}
        >
          <Search
            size={17}
            style={{
              color: colors.textMuted,
            }}
          />

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search tasks..."
            className="flex-1 bg-transparent text-sm outline-none"
            style={{
              color: colors.text,
            }}
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              style={{
                color: colors.textMuted,
              }}
            >
              <X size={15} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Filter
            size={16}
            style={{
              color: colors.textMuted,
            }}
          />

          {[
            "All",
            "In Progress",
            "Pending",
            "Completed",
          ].map((item) => (
            <button
              type="button"
              key={item}
              onClick={() =>
                setFilter(
                  item as "All" | TaskStatus
                )
              }
              className="rounded-lg px-3 py-2 text-xs font-medium"
              style={{
                backgroundColor:
                  filter === item
                    ? colors.primary
                    : colors.surfaceLight,
                color:
                  filter === item
                    ? colors.black
                    : colors.textSecondary,
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* SEARCH RESULT INFO */}

      <div
        className="mb-4 text-xs"
        style={{
          color: colors.textMuted,
        }}
      >
        Showing {filteredTasks.length} of {totalTasks}{" "}
        tasks
      </div>

      {/* TASK LIST */}

      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div
            className="rounded-2xl border p-10 text-center"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <CheckSquare
              size={35}
              className="mx-auto mb-3"
              style={{
                color: colors.textMuted,
              }}
            />

            <p className="text-sm font-semibold">
              No tasks found
            </p>

            <p
              className="mt-1 text-xs"
              style={{
                color: colors.textMuted,
              }}
            >
              Try changing your search or filter.
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={() => toggleTask(task.id)}
              onDelete={() => deleteTask(task.id)}
            />
          ))
        )}
      </div>

      {/* FOOTER INFO */}

      <div
        className="mt-5 flex items-center gap-2 text-xs"
        style={{
          color: colors.textMuted,
        }}
      >
        <Clock3 size={14} />

        <span>
          AI agents automatically update task progress
          and deadlines.
        </span>
      </div>

      {/* CREATE TASK MODAL */}

      {showCreateModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{
            backgroundColor: "rgba(0,0,0,0.65)",
          }}
        >
          <div
            className="w-full max-w-lg rounded-2xl border p-6"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">
                  Create New Task
                </h2>

                <p
                  className="mt-1 text-xs"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Add a new task to your workspace.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowCreateModal(false)
                }
                style={{
                  color: colors.textMuted,
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-semibold">
                  Task Title
                </label>

                <input
                  value={newTitle}
                  onChange={(event) =>
                    setNewTitle(event.target.value)
                  }
                  placeholder="Enter task title..."
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
                  style={{
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold">
                  Description
                </label>

                <textarea
                  value={newDescription}
                  onChange={(event) =>
                    setNewDescription(
                      event.target.value
                    )
                  }
                  placeholder="Enter task description..."
                  rows={4}
                  className="w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none"
                  style={{
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold">
                  Priority
                </label>

                <select
                  value={newPriority}
                  onChange={(event) =>
                    setNewPriority(
                      event.target
                        .value as TaskPriority
                    )
                  }
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
                  style={{
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                >
                  <option value="High">High</option>
                  <option value="Medium">
                    Medium
                  </option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() =>
                  setShowCreateModal(false)
                }
                className="rounded-xl px-4 py-3 text-sm font-semibold"
                style={{
                  backgroundColor:
                    colors.surfaceLight,
                  color: colors.textSecondary,
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={createTask}
                className="rounded-xl px-5 py-3 text-sm font-bold"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.black,
                }}
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* STAT CARD */

function StatCard({
  title,
  value,
  highlight = false,
}: {
  title: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div
      className="rounded-2xl border p-5"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
      }}
    >
      <p
        className="text-xs"
        style={{
          color: colors.textMuted,
        }}
      >
        {title}
      </p>

      <p
        className="mt-2 text-3xl font-bold"
        style={{
          color: highlight
            ? colors.primary
            : colors.text,
        }}
      >
        {value}
      </p>
    </div>
  );
}

/* TASK CARD */

function TaskCard({
  task,
  onToggle,
  onDelete,
}: {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      className="rounded-2xl border p-5"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
      }}
    >
      <div className="flex items-center gap-4">
        {/* CHECK */}

        <button
          type="button"
          onClick={onToggle}
          aria-label="Toggle task completion"
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border"
          style={{
            borderColor:
              task.status === "Completed"
                ? colors.primary
                : colors.border,
            backgroundColor:
              task.status === "Completed"
                ? colors.primary
                : "transparent",
          }}
        >
          {task.status === "Completed" && (
            <CheckSquare
              size={14}
              style={{
                color: colors.black,
              }}
            />
          )}
        </button>

        {/* TASK INFO */}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3
              className="text-sm font-semibold"
              style={{
                textDecoration:
                  task.status === "Completed"
                    ? "line-through"
                    : "none",
              }}
            >
              {task.title}
            </h3>

            {task.ai && (
              <span
                className="flex items-center gap-1 rounded-md px-2 py-1 text-[9px] font-bold"
                style={{
                  backgroundColor:
                    "rgba(57,255,136,0.10)",
                  color: colors.primary,
                }}
              >
                <Bot size={10} />
                AI
              </span>
            )}
          </div>

          <p
            className="mt-1 text-xs"
            style={{
              color: colors.textMuted,
            }}
          >
            {task.description}
          </p>
        </div>

        {/* PRIORITY */}

        <span
          className="rounded-lg px-3 py-1.5 text-[10px] font-semibold"
          style={{
            backgroundColor:
              task.priority === "High"
                ? "rgba(255,80,80,0.12)"
                : task.priority === "Medium"
                ? "rgba(255,190,60,0.12)"
                : "rgba(57,255,136,0.10)",
            color:
              task.priority === "High"
                ? "#ff6b6b"
                : task.priority === "Medium"
                ? "#ffbe3c"
                : colors.primary,
          }}
        >
          {task.priority}
        </span>

        {/* STATUS */}

        <span
          className="rounded-lg px-3 py-1.5 text-[10px] font-semibold"
          style={{
            backgroundColor:
              task.status === "Completed"
                ? "rgba(57,255,136,0.10)"
                : task.status === "In Progress"
                ? "rgba(80,160,255,0.12)"
                : "rgba(255,190,60,0.12)",
            color:
              task.status === "Completed"
                ? colors.primary
                : task.status === "In Progress"
                ? "#66aaff"
                : "#ffbe3c",
          }}
        >
          {task.status}
        </span>

        {/* DATE */}

        <div
          className="flex items-center gap-1.5 text-xs"
          style={{
            color: colors.textMuted,
          }}
        >
          <CalendarDays size={14} />
          {task.date}
        </div>

        {/* ASSIGNED */}

        <div
          className="flex w-32 items-center gap-2 text-xs"
          style={{
            color: colors.textSecondary,
          }}
        >
          {task.ai ? (
            <Bot size={15} />
          ) : (
            <User size={15} />
          )}

          <span className="truncate">
            {task.assigned}
          </span>
        </div>

        {/* MENU */}

        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setShowMenu((current) => !current)
            }
            className="rounded-lg p-2"
            style={{
              color: colors.textMuted,
            }}
          >
            <MoreHorizontal size={18} />
          </button>

          {showMenu && (
            <div
              className="absolute right-0 top-10 z-20 w-36 rounded-xl border p-1 shadow-xl"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
              }}
            >
              <button
                type="button"
                onClick={() => {
                  onDelete();
                  setShowMenu(false);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs"
                style={{
                  color: "#ff6b6b",
                }}
              >
                <Trash2 size={14} />
                Delete Task
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tasks;