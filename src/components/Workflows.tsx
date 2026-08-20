import {
  Workflow,
  Plus,
  Search,
  Play,
  Pause,
  CheckCircle2,
  Clock3,
  Bot,
  MoreHorizontal,
  Zap,
  Activity,
} from "lucide-react";

import { colors } from "../theme/colors";

function Workflows() {
  const workflows = [
    {
      name: "Daily Task Management",
      description:
        "Automatically organize and assign daily tasks to the right team members.",
      status: "Running",
      runs: 128,
      success: "98%",
      agent: "Manager Agent",
      lastRun: "2 min ago",
    },
    {
      name: "Document Processing",
      description:
        "Process uploaded documents, extract information and generate summaries.",
      status: "Running",
      runs: 86,
      success: "97%",
      agent: "Document Agent",
      lastRun: "8 min ago",
    },
    {
      name: "Market Research",
      description:
        "Collect research data and prepare structured market analysis reports.",
      status: "Running",
      runs: 54,
      success: "95%",
      agent: "Research Agent",
      lastRun: "18 min ago",
    },
    {
      name: "Meeting Scheduler",
      description:
        "Find suitable meeting times and automatically schedule team meetings.",
      status: "Paused",
      runs: 42,
      success: "99%",
      agent: "Meeting Agent",
      lastRun: "Yesterday",
    },
    {
      name: "Weekly Performance Report",
      description:
        "Generate weekly productivity and project performance reports.",
      status: "Completed",
      runs: 31,
      success: "100%",
      agent: "Analytics Agent",
      lastRun: "Aug 18",
    },
    {
      name: "Client Follow-up",
      description:
        "Automatically prepare follow-up tasks after client meetings.",
      status: "Running",
      runs: 67,
      success: "96%",
      agent: "Workflow Agent",
      lastRun: "32 min ago",
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
            <Workflow size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              Workflows
            </h1>

            <p
              className="text-sm"
              style={{
                color: colors.textMuted,
              }}
            >
              Automate tasks and manage intelligent workflows
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
          Create Workflow
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
            style={{ color: colors.textMuted }}
          >
            Total Workflows
          </p>

          <p className="mt-2 text-3xl font-bold">
            18
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
            Running
          </p>

          <p
            className="mt-2 text-3xl font-bold"
            style={{ color: colors.primary }}
          >
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
            Executions
          </p>

          <p className="mt-2 text-3xl font-bold">
            408
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
            Success Rate
          </p>

          <p className="mt-2 text-3xl font-bold">
            97.5%
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
            placeholder="Search workflows..."
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
          <Zap size={15} />
          Automated workflows are active
        </div>
      </div>

      {/* WORKFLOWS */}
      <div className="grid grid-cols-2 gap-5">
        {workflows.map((workflow) => (
          <div
            key={workflow.name}
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
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor:
                      "rgba(57,255,136,0.10)",
                  }}
                >
                  <Workflow
                    size={20}
                    style={{
                      color: colors.primary,
                    }}
                  />
                </div>

                <div>
                  <h3 className="text-sm font-bold">
                    {workflow.name}
                  </h3>

                  <p
                    className="mt-1 text-[10px]"
                    style={{
                      color: colors.textMuted,
                    }}
                  >
                    AI automated workflow
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
                    workflow.status === "Running"
                      ? "rgba(57,255,136,0.10)"
                      : colors.surfaceLight,
                  color:
                    workflow.status === "Running"
                      ? colors.primary
                      : colors.textMuted,
                }}
              >
                {workflow.status === "Running" ? (
                  <Play size={11} />
                ) : workflow.status === "Paused" ? (
                  <Pause size={11} />
                ) : (
                  <CheckCircle2 size={11} />
                )}

                {workflow.status}
              </span>

              <span
                className="flex items-center gap-1 text-[10px]"
                style={{
                  color: colors.textMuted,
                }}
              >
                <Bot size={12} />
                {workflow.agent}
              </span>
            </div>

            {/* DESCRIPTION */}
            <p
              className="mt-5 text-xs leading-5"
              style={{
                color: colors.textSecondary,
              }}
            >
              {workflow.description}
            </p>

            {/* STATS */}
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div
                className="rounded-xl p-3"
                style={{
                  backgroundColor: colors.surfaceLight,
                }}
              >
                <p
                  className="text-[9px]"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Runs
                </p>

                <p className="mt-1 text-base font-bold">
                  {workflow.runs}
                </p>
              </div>

              <div
                className="rounded-xl p-3"
                style={{
                  backgroundColor: colors.surfaceLight,
                }}
              >
                <p
                  className="text-[9px]"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Success
                </p>

                <p
                  className="mt-1 text-base font-bold"
                  style={{
                    color: colors.primary,
                  }}
                >
                  {workflow.success}
                </p>
              </div>

              <div
                className="rounded-xl p-3"
                style={{
                  backgroundColor: colors.surfaceLight,
                }}
              >
                <p
                  className="text-[9px]"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Last Run
                </p>

                <p className="mt-1 text-[11px] font-semibold">
                  {workflow.lastRun}
                </p>
              </div>
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
                <Clock3 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workflows;