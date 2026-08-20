import {
  FolderKanban,
  Plus,
  Search,
  Users,
  CalendarDays,
  Bot,
  MoreHorizontal,
  ArrowUpRight,
} from "lucide-react";

import { colors } from "../theme/colors";

function Projects() {
  const projects = [
    {
      name: "AI Virtual Office",
      description:
        "Private AI-powered workspace for managing business operations.",
      status: "Active",
      progress: 72,
      deadline: "Sep 15",
      members: 5,
      agent: "Manager Agent",
    },
    {
      name: "Client Automation",
      description:
        "Automate client communication, tasks, and daily workflows.",
      status: "Active",
      progress: 54,
      deadline: "Sep 28",
      members: 4,
      agent: "Workflow Agent",
    },
    {
      name: "Market Research",
      description:
        "AI-powered research and analysis for upcoming projects.",
      status: "Planning",
      progress: 28,
      deadline: "Oct 05",
      members: 3,
      agent: "Research Agent",
    },
    {
      name: "Document Management",
      description:
        "Centralized document organization and intelligent processing.",
      status: "Active",
      progress: 86,
      deadline: "Aug 30",
      members: 4,
      agent: "Document Agent",
    },
    {
      name: "Team Productivity",
      description:
        "Track team performance and improve overall productivity.",
      status: "Completed",
      progress: 100,
      deadline: "Aug 18",
      members: 6,
      agent: "Manager Agent",
    },
  ];

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
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl"
            style={{
              backgroundColor: colors.primary,
              color: colors.black,
            }}
          >
            <FolderKanban size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              Projects
            </h1>

            <p
              className="text-sm"
              style={{
                color: colors.textMuted,
              }}
            >
              Manage projects and AI-powered workflows
            </p>
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
          Create Project
        </button>
      </div>

      {/* SUMMARY CARDS */}
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
            Total Projects
          </p>

          <p className="mt-2 text-3xl font-bold">
            12
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
            Active
          </p>

          <p
            className="mt-2 text-3xl font-bold"
            style={{ color: colors.primary }}
          >
            7
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
            Planning
          </p>

          <p className="mt-2 text-3xl font-bold">
            3
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
            2
          </p>
        </div>
      </div>

      {/* SEARCH */}
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
            placeholder="Search projects..."
            className="flex-1 bg-transparent text-sm outline-none"
            style={{
              color: colors.text,
            }}
          />
        </div>

        <p
          className="text-xs"
          style={{
            color: colors.textMuted,
          }}
        >
          12 projects in workspace
        </p>
      </div>

      {/* PROJECT GRID */}
      <div className="grid grid-cols-2 gap-5">
        {projects.map((project) => (
          <div
            key={project.name}
            className="rounded-2xl border p-6"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            {/* PROJECT HEADER */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor:
                      "rgba(57,255,136,0.10)",
                  }}
                >
                  <FolderKanban
                    size={19}
                    style={{
                      color: colors.primary,
                    }}
                  />
                </div>

                <div>
                  <h3 className="text-sm font-semibold">
                    {project.name}
                  </h3>

                  <p
                    className="mt-1 text-[11px]"
                    style={{
                      color: colors.textMuted,
                    }}
                  >
                    AI-powered project
                  </p>
                </div>
              </div>

              <button
                className="rounded-lg p-2"
                style={{
                  color: colors.textMuted,
                }}
              >
                <MoreHorizontal size={18} />
              </button>
            </div>

            {/* DESCRIPTION */}
            <p
              className="mt-5 text-xs leading-5"
              style={{
                color: colors.textSecondary,
              }}
            >
              {project.description}
            </p>

            {/* STATUS */}
            <div className="mt-5 flex items-center justify-between">
              <span
                className="rounded-lg px-3 py-1.5 text-[10px] font-semibold"
                style={{
                  backgroundColor:
                    project.status === "Completed"
                      ? "rgba(57,255,136,0.10)"
                      : project.status === "Active"
                      ? "rgba(57,255,136,0.10)"
                      : "rgba(255,190,60,0.12)",
                  color:
                    project.status === "Planning"
                      ? "#ffbe3c"
                      : colors.primary,
                }}
              >
                {project.status}
              </span>

              <span
                className="text-xs font-semibold"
                style={{
                  color: colors.primary,
                }}
              >
                {project.progress}%
              </span>
            </div>

            {/* PROGRESS */}
            <div
              className="mt-3 h-2 rounded-full"
              style={{
                backgroundColor: colors.surfaceLight,
              }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${project.progress}%`,
                  backgroundColor: colors.primary,
                }}
              />
            </div>

            {/* PROJECT INFO */}
            <div
              className="mt-5 flex items-center justify-between border-t pt-4"
              style={{
                borderColor: colors.border,
              }}
            >
              <div
                className="flex items-center gap-1.5 text-xs"
                style={{
                  color: colors.textMuted,
                }}
              >
                <CalendarDays size={14} />
                {project.deadline}
              </div>

              <div
                className="flex items-center gap-1.5 text-xs"
                style={{
                  color: colors.textMuted,
                }}
              >
                <Users size={14} />
                {project.members} members
              </div>
            </div>

            {/* AI AGENT */}
            <div
              className="mt-3 flex items-center gap-2 rounded-xl p-3"
              style={{
                backgroundColor: colors.surfaceLight,
              }}
            >
              <Bot
                size={15}
                style={{
                  color: colors.primary,
                }}
              />

              <div className="flex-1">
                <p
                  className="text-[10px]"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  AI Agent
                </p>

                <p className="text-xs font-semibold">
                  {project.agent}
                </p>
              </div>

              <ArrowUpRight
                size={15}
                style={{
                  color: colors.textMuted,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;