import { useState } from "react";
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
} from "lucide-react";

import { colors } from "../theme/colors";

function Tasks() {
  const [filter, setFilter] = useState("All");

  const tasks = [
    {
      title: "Complete AI Virtual Office UI",
      description: "Finish the main dashboard and workspace screens.",
      priority: "High",
      status: "In Progress",
      date: "Today",
      assigned: "Palwasha",
      ai: false,
    },
    {
      title: "Prepare project documentation",
      description: "Generate technical documentation for the project.",
      priority: "Medium",
      status: "Pending",
      date: "Tomorrow",
      assigned: "Document Agent",
      ai: true,
    },
    {
      title: "Research AI productivity tools",
      description: "Analyze useful AI tools for the virtual office.",
      priority: "Medium",
      status: "In Progress",
      date: "Aug 21",
      assigned: "Research Agent",
      ai: true,
    },
    {
      title: "Review client requirements",
      description: "Check the latest requirements and update the project.",
      priority: "Low",
      status: "Completed",
      date: "Aug 18",
      assigned: "Palwasha",
      ai: false,
    },
    {
      title: "Schedule team meeting",
      description: "Arrange the next project progress meeting.",
      priority: "High",
      status: "Pending",
      date: "Aug 22",
      assigned: "Manager Agent",
      ai: true,
    },
  ];

  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((task) => task.status === filter);

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
          className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold"
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
        <div
          className="rounded-2xl border p-5"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          <p
            className="text-xs"
            style={{ color: colors.textMuted }}
          >
            Total Tasks
          </p>

          <p className="mt-2 text-3xl font-bold">
            24
          </p>
        </div>

        <div
          className="rounded-2xl border p-5"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          <p
            className="text-xs"
            style={{ color: colors.textMuted }}
          >
            In Progress
          </p>

          <p
            className="mt-2 text-3xl font-bold"
            style={{ color: colors.primary }}
          >
            8
          </p>
        </div>

        <div
          className="rounded-2xl border p-5"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          <p
            className="text-xs"
            style={{ color: colors.textMuted }}
          >
            Pending
          </p>

          <p className="mt-2 text-3xl font-bold">
            10
          </p>
        </div>

        <div
          className="rounded-2xl border p-5"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          <p
            className="text-xs"
            style={{ color: colors.textMuted }}
          >
            Completed
          </p>

          <p className="mt-2 text-3xl font-bold">
            6
          </p>
        </div>
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
            style={{ color: colors.textMuted }}
          />

          <input
            placeholder="Search tasks..."
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: colors.text }}
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter
            size={16}
            style={{ color: colors.textMuted }}
          />

          {["All", "In Progress", "Pending", "Completed"].map(
            (item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
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
            )
          )}
        </div>
      </div>

      {/* TASK LIST */}
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <div
            key={task.title}
            className="rounded-2xl border p-5"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <div className="flex items-center gap-4">

              {/* CHECK */}
              <button
                className="flex h-6 w-6 items-center justify-center rounded-md border"
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
                    style={{ color: colors.black }}
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
              <button
                className="rounded-lg p-2"
                style={{
                  color: colors.textMuted,
                }}
              >
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>
        ))}
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
    </div>
  );
}

export default Tasks;