import {
  Bot,
  Plus,
  Search,
  Activity,
  Brain,
  Settings,
  MoreHorizontal,
  CheckCircle2,
  Clock3,
  Zap,
} from "lucide-react";

import { colors } from "../theme/colors";

function AIAgents() {
  const agents = [
    {
      name: "Manager Agent",
      role: "Workspace Manager",
      description:
        "Manages projects, tasks, team activity and overall workspace workflows.",
      status: "Active",
      tasks: 12,
      accuracy: "96%",
      activity: "Managing 8 active workflows",
    },
    {
      name: "Research Agent",
      role: "Research Specialist",
      description:
        "Researches information, analyzes data and prepares useful summaries.",
      status: "Active",
      tasks: 6,
      accuracy: "94%",
      activity: "Analyzing market research",
    },
    {
      name: "Document Agent",
      role: "Document Specialist",
      description:
        "Processes documents, creates summaries and extracts important information.",
      status: "Active",
      tasks: 9,
      accuracy: "98%",
      activity: "Processing 4 documents",
    },
    {
      name: "Workflow Agent",
      role: "Automation Specialist",
      description:
        "Automates repetitive tasks and manages business workflows.",
      status: "Active",
      tasks: 15,
      accuracy: "95%",
      activity: "Running 5 automations",
    },
    {
      name: "Meeting Agent",
      role: "Scheduling Assistant",
      description:
        "Schedules meetings and manages calendars based on availability.",
      status: "Idle",
      tasks: 3,
      accuracy: "97%",
      activity: "Waiting for new requests",
    },
    {
      name: "Analytics Agent",
      role: "Data Analyst",
      description:
        "Analyzes workspace data and generates performance reports.",
      status: "Idle",
      tasks: 4,
      accuracy: "93%",
      activity: "Waiting for analysis",
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
            <Bot size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              AI Agents
            </h1>

            <p
              className="text-sm"
              style={{
                color: colors.textMuted,
              }}
            >
              Manage your intelligent AI workforce
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
          Create AI Agent
        </button>
      </div>

      {/* SUMMARY */}
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
            style={{
              color: colors.textMuted,
            }}
          >
            Total Agents
          </p>

          <p className="mt-2 text-3xl font-bold">
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
            style={{
              color: colors.textMuted,
            }}
          >
            Active
          </p>

          <p
            className="mt-2 text-3xl font-bold"
            style={{
              color: colors.primary,
            }}
          >
            6
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
            style={{
              color: colors.textMuted,
            }}
          >
            Tasks Running
          </p>

          <p className="mt-2 text-3xl font-bold">
            49
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
            style={{
              color: colors.textMuted,
            }}
          >
            Avg. Accuracy
          </p>

          <p className="mt-2 text-3xl font-bold">
            95.5%
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
            placeholder="Search AI agents..."
            className="flex-1 bg-transparent text-sm outline-none"
            style={{
              color: colors.text,
            }}
          />
        </div>

        <div
          className="flex items-center gap-2 text-xs"
          style={{
            color: colors.textMuted,
          }}
        >
          <Activity size={15} />
          AI workforce is operational
        </div>
      </div>

      {/* AGENTS GRID */}
      <div className="grid grid-cols-2 gap-5">
        {agents.map((agent) => (
          <div
            key={agent.name}
            className="rounded-2xl border p-6"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            {/* TOP */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor:
                      "rgba(57,255,136,0.10)",
                  }}
                >
                  <Bot
                    size={23}
                    style={{
                      color: colors.primary,
                    }}
                  />
                </div>

                <div>
                  <h3 className="text-sm font-bold">
                    {agent.name}
                  </h3>

                  <p
                    className="mt-1 text-[10px]"
                    style={{
                      color: colors.textMuted,
                    }}
                  >
                    {agent.role}
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

            {/* STATUS */}
            <div className="mt-5 flex items-center justify-between">
              <span
                className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[10px] font-semibold"
                style={{
                  backgroundColor:
                    agent.status === "Active"
                      ? "rgba(57,255,136,0.10)"
                      : colors.surfaceLight,
                  color:
                    agent.status === "Active"
                      ? colors.primary
                      : colors.textMuted,
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor:
                      agent.status === "Active"
                        ? colors.primary
                        : colors.textMuted,
                  }}
                />

                {agent.status}
              </span>

              <span
                className="flex items-center gap-1 text-[10px]"
                style={{
                  color: colors.textMuted,
                }}
              >
                <Brain size={13} />
                AI Powered
              </span>
            </div>

            {/* DESCRIPTION */}
            <p
              className="mt-5 text-xs leading-5"
              style={{
                color: colors.textSecondary,
              }}
            >
              {agent.description}
            </p>

            {/* STATS */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div
                className="rounded-xl p-3"
                style={{
                  backgroundColor: colors.surfaceLight,
                }}
              >
                <div className="flex items-center gap-2">
                  <Zap
                    size={14}
                    style={{
                      color: colors.primary,
                    }}
                  />

                  <span
                    className="text-[10px]"
                    style={{
                      color: colors.textMuted,
                    }}
                  >
                    Tasks
                  </span>
                </div>

                <p className="mt-2 text-lg font-bold">
                  {agent.tasks}
                </p>
              </div>

              <div
                className="rounded-xl p-3"
                style={{
                  backgroundColor: colors.surfaceLight,
                }}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={14}
                    style={{
                      color: colors.primary,
                    }}
                  />

                  <span
                    className="text-[10px]"
                    style={{
                      color: colors.textMuted,
                    }}
                  >
                    Accuracy
                  </span>
                </div>

                <p className="mt-2 text-lg font-bold">
                  {agent.accuracy}
                </p>
              </div>
            </div>

            {/* ACTIVITY */}
            <div
              className="mt-4 flex items-center gap-2 rounded-xl p-3"
              style={{
                backgroundColor: colors.surfaceLight,
              }}
            >
              <Clock3
                size={14}
                style={{
                  color: colors.primary,
                }}
              />

              <span
                className="text-[10px]"
                style={{
                  color: colors.textSecondary,
                }}
              >
                {agent.activity}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="mt-5 flex gap-2">
              <button
                className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold"
                style={{
                  backgroundColor: colors.surfaceLight,
                  color: colors.text,
                }}
              >
                <Activity size={14} />
                View Activity
              </button>

              <button
                className="flex items-center justify-center rounded-xl px-4"
                style={{
                  backgroundColor: colors.surfaceLight,
                  color: colors.textMuted,
                }}
              >
                <Settings size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AIAgents;