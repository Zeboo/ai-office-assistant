import { useMemo, useState } from "react";
import {
  Workflow,
  Plus,
  Search,
  Play,
  Pause,
  CheckCircle2,
  
  Bot,
  MoreHorizontal,
  Zap,
  Activity,
  Pencil,
  Trash2,
  X,
  Power,
} from "lucide-react";

import { darkColors, lightColors } from "../theme/colors";

type WorkflowStatus = "Running" | "Paused" | "Completed";

type WorkflowItem = {
  id: number;
  name: string;
  description: string;
  status: WorkflowStatus;
  runs: number;
  success: string;
  agent: string;
  lastRun: string;
};

function Workflows({
  themeMode,
}: {
  themeMode: "dark" | "light";
}) {
  const colors = themeMode === "dark" ? darkColors : lightColors;

  const [workflows, setWorkflows] = useState<WorkflowItem[]>([
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
      id: 5,
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
      id: 6,
      name: "Client Follow-up",
      description:
        "Automatically prepare follow-up tasks after client meetings.",
      status: "Running",
      runs: 67,
      success: "96%",
      agent: "Workflow Agent",
      lastRun: "32 min ago",
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | WorkflowStatus
  >("All");

  const [showModal, setShowModal] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [selectedWorkflow, setSelectedWorkflow] =
    useState<WorkflowItem | null>(null);

  const [editingWorkflow, setEditingWorkflow] =
    useState<WorkflowItem | null>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    agent: "Manager Agent",
    status: "Running" as WorkflowStatus,
  });

  const filteredWorkflows = useMemo(() => {
    return workflows.filter((workflow) => {
      const matchesSearch =
        workflow.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        workflow.description
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        workflow.agent
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        workflow.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [workflows, search, statusFilter]);

  const runningCount = workflows.filter(
    (workflow) => workflow.status === "Running"
  ).length;

  const totalRuns = workflows.reduce(
    (total, workflow) => total + workflow.runs,
    0
  );

  const successRate = useMemo(() => {
    if (workflows.length === 0) return "0%";

    const total = workflows.reduce(
      (sum, workflow) =>
        sum + Number(workflow.success.replace("%", "")),
      0
    );

    return `${(total / workflows.length).toFixed(1)}%`;
  }, [workflows]);

  const openCreateModal = () => {
    setEditingWorkflow(null);

    setForm({
      name: "",
      description: "",
      agent: "Manager Agent",
      status: "Running",
    });

    setShowModal(true);
  };

  const openEditModal = (workflow: WorkflowItem) => {
    setEditingWorkflow(workflow);

    setForm({
      name: workflow.name,
      description: workflow.description,
      agent: workflow.agent,
      status: workflow.status,
    });

    setShowModal(true);
  };

  const saveWorkflow = () => {
    if (!form.name.trim()) {
      alert("Please enter workflow name.");
      return;
    }

    if (!form.description.trim()) {
      alert("Please enter workflow description.");
      return;
    }

    if (editingWorkflow) {
      setWorkflows((current) =>
        current.map((workflow) =>
          workflow.id === editingWorkflow.id
            ? {
                ...workflow,
                name: form.name,
                description: form.description,
                agent: form.agent,
                status: form.status,
              }
            : workflow
        )
      );
    } else {
      const newWorkflow: WorkflowItem = {
        id: Date.now(),
        name: form.name,
        description: form.description,
        status: form.status,
        runs: 0,
        success: "100%",
        agent: form.agent,
        lastRun: "Not run yet",
      };

      setWorkflows((current) => [
        newWorkflow,
        ...current,
      ]);
    }

    setShowModal(false);
  };

  const deleteWorkflow = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this workflow?"
    );

    if (!confirmed) return;

    setWorkflows((current) =>
      current.filter((workflow) => workflow.id !== id)
    );

    setShowSettings(false);
    setSelectedWorkflow(null);
  };

  const toggleWorkflow = (id: number) => {
    setWorkflows((current) =>
      current.map((workflow) =>
        workflow.id === id
          ? {
              ...workflow,
              status:
                workflow.status === "Running"
                  ? "Paused"
                  : "Running",
              lastRun:
                workflow.status === "Running"
                  ? workflow.lastRun
                  : "Just now",
            }
          : workflow
      )
    );
  };

  const openActivity = (workflow: WorkflowItem) => {
    setSelectedWorkflow(workflow);
    setShowActivity(true);
  };

  const openSettings = (workflow: WorkflowItem) => {
    setSelectedWorkflow(workflow);
    setShowSettings(true);
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
          onClick={openCreateModal}
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
            {workflows.length}
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
            {runningCount}
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
            {totalRuns}
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
            {successRate}
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
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search workflows..."
            className="flex-1 bg-transparent text-sm outline-none"
            style={{
              color: colors.text,
            }}
          />
        </div>

        <div className="flex items-center gap-2">
          {(["All", "Running", "Paused", "Completed"] as const).map(
            (status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className="rounded-lg px-3 py-2 text-xs font-semibold"
                style={{
                  backgroundColor:
                    statusFilter === status
                      ? colors.primary
                      : colors.surfaceLight,
                  color:
                    statusFilter === status
                      ? colors.black
                      : colors.textMuted,
                }}
              >
                {status}
              </button>
            )
          )}

          <div
            className="ml-3 flex items-center gap-2 text-xs"
            style={{
              color: colors.textMuted,
            }}
          >
            <Zap size={15} />
            Automated workflows are active
          </div>
        </div>
      </div>

      {/* WORKFLOWS */}
      {filteredWorkflows.length === 0 ? (
        <div
          className="rounded-2xl border p-10 text-center"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          <Workflow
            size={40}
            className="mx-auto mb-3"
            style={{
              color: colors.textMuted,
            }}
          />

          <p className="font-semibold">
            No workflows found
          </p>

          <p
            className="mt-1 text-sm"
            style={{
              color: colors.textMuted,
            }}
          >
            Try another search or create a new workflow.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5">
          {filteredWorkflows.map((workflow) => (
            <div
              key={workflow.id}
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
                        themeMode === "dark"
                          ? "rgba(57,255,136,0.10)"
                          : "rgba(22,163,74,0.10)",
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
                  onClick={() => openSettings(workflow)}
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
                        ? themeMode === "dark"
                          ? "rgba(57,255,136,0.10)"
                          : "rgba(22,163,74,0.10)"
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
                  onClick={() => openActivity(workflow)}
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
                  onClick={() => toggleWorkflow(workflow.id)}
                  className="flex items-center justify-center rounded-xl px-4"
                  style={{
                    backgroundColor: colors.surfaceLight,
                    color: colors.textMuted,
                  }}
                  title={
                    workflow.status === "Running"
                      ? "Pause workflow"
                      : "Run workflow"
                  }
                >
                  {workflow.status === "Running" ? (
                    <Pause size={15} />
                  ) : (
                    <Power size={15} />
                  )}
                </button>

                <button
                  onClick={() => openEditModal(workflow)}
                  className="flex items-center justify-center rounded-xl px-4"
                  style={{
                    backgroundColor: colors.surfaceLight,
                    color: colors.textMuted,
                  }}
                  title="Edit workflow"
                >
                  <Pencil size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
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
                  {editingWorkflow
                    ? "Edit Workflow"
                    : "Create Workflow"}
                </h2>

                <p
                  className="mt-1 text-xs"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Configure your automated workflow.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                style={{
                  color: colors.textMuted,
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  className="mb-1 block text-xs font-semibold"
                  style={{
                    color: colors.textSecondary,
                  }}
                >
                  Workflow Name
                </label>

                <input
                  value={form.name}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      name: event.target.value,
                    })
                  }
                  placeholder="e.g. Invoice Processing"
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
                  style={{
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                />
              </div>

              <div>
                <label
                  className="mb-1 block text-xs font-semibold"
                  style={{
                    color: colors.textSecondary,
                  }}
                >
                  Description
                </label>

                <textarea
                  value={form.description}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      description: event.target.value,
                    })
                  }
                  placeholder="Describe what this workflow should do..."
                  rows={4}
                  className="w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none"
                  style={{
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    className="mb-1 block text-xs font-semibold"
                    style={{
                      color: colors.textSecondary,
                    }}
                  >
                    AI Agent
                  </label>

                  <select
                    value={form.agent}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        agent: event.target.value,
                      })
                    }
                    className="w-full rounded-xl border px-3 py-3 text-sm outline-none"
                    style={{
                      backgroundColor: colors.background,
                      borderColor: colors.border,
                      color: colors.text,
                    }}
                  >
                    <option>Manager Agent</option>
                    <option>Document Agent</option>
                    <option>Research Agent</option>
                    <option>Meeting Agent</option>
                    <option>Analytics Agent</option>
                    <option>Workflow Agent</option>
                  </select>
                </div>

                <div>
                  <label
                    className="mb-1 block text-xs font-semibold"
                    style={{
                      color: colors.textSecondary,
                    }}
                  >
                    Status
                  </label>

                  <select
                    value={form.status}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        status: event.target.value as WorkflowStatus,
                      })
                    }
                    className="w-full rounded-xl border px-3 py-3 text-sm outline-none"
                    style={{
                      backgroundColor: colors.background,
                      borderColor: colors.border,
                      color: colors.text,
                    }}
                  >
                    <option>Running</option>
                    <option>Paused</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-xl px-4 py-2.5 text-xs font-semibold"
                style={{
                  backgroundColor: colors.surfaceLight,
                  color: colors.textMuted,
                }}
              >
                Cancel
              </button>

              <button
                onClick={saveWorkflow}
                className="rounded-xl px-5 py-2.5 text-xs font-bold"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.black,
                }}
              >
                {editingWorkflow
                  ? "Save Changes"
                  : "Create Workflow"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ACTIVITY MODAL */}
      {showActivity && selectedWorkflow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div
            className="w-full max-w-md rounded-2xl border p-6"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold">
                  Workflow Activity
                </h2>

                <p
                  className="mt-1 text-xs"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  {selectedWorkflow.name}
                </p>
              </div>

              <button
                onClick={() => setShowActivity(false)}
                style={{
                  color: colors.textMuted,
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-5 space-y-3">
              <div
                className="rounded-xl p-4"
                style={{
                  backgroundColor: colors.surfaceLight,
                }}
              >
                <p
                  className="text-xs"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Current Status
                </p>

                <p className="mt-1 font-bold">
                  {selectedWorkflow.status}
                </p>
              </div>

              <div
                className="rounded-xl p-4"
                style={{
                  backgroundColor: colors.surfaceLight,
                }}
              >
                <p
                  className="text-xs"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Total Runs
                </p>

                <p className="mt-1 font-bold">
                  {selectedWorkflow.runs}
                </p>
              </div>

              <div
                className="rounded-xl p-4"
                style={{
                  backgroundColor: colors.surfaceLight,
                }}
              >
                <p
                  className="text-xs"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Success Rate
                </p>

                <p
                  className="mt-1 font-bold"
                  style={{
                    color: colors.primary,
                  }}
                >
                  {selectedWorkflow.success}
                </p>
              </div>

              <div
                className="rounded-xl p-4"
                style={{
                  backgroundColor: colors.surfaceLight,
                }}
              >
                <p
                  className="text-xs"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Last Run
                </p>

                <p className="mt-1 font-bold">
                  {selectedWorkflow.lastRun}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                toggleWorkflow(selectedWorkflow.id);

                setSelectedWorkflow({
                  ...selectedWorkflow,
                  status:
                    selectedWorkflow.status === "Running"
                      ? "Paused"
                      : "Running",
                });
              }}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold"
              style={{
                backgroundColor: colors.primary,
                color: colors.black,
              }}
            >
              {selectedWorkflow.status === "Running" ? (
                <>
                  <Pause size={15} />
                  Pause Workflow
                </>
              ) : (
                <>
                  <Power size={15} />
                  Activate Workflow
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* SETTINGS MODAL */}
      {showSettings && selectedWorkflow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div
            className="w-full max-w-sm rounded-2xl border p-6"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">
                  Workflow Settings
                </h2>

                <p
                  className="mt-1 text-xs"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  {selectedWorkflow.name}
                </p>
              </div>

              <button
                onClick={() => setShowSettings(false)}
                style={{
                  color: colors.textMuted,
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-5 space-y-2">
              <button
                onClick={() => {
                  openEditModal(selectedWorkflow);
                  setShowSettings(false);
                }}
                className="flex w-full items-center gap-3 rounded-xl p-3 text-left text-sm font-semibold"
                style={{
                  backgroundColor: colors.surfaceLight,
                }}
              >
                <Pencil size={17} />
                Edit Workflow
              </button>

              <button
                onClick={() => {
                  toggleWorkflow(selectedWorkflow.id);
                  setShowSettings(false);
                }}
                className="flex w-full items-center gap-3 rounded-xl p-3 text-left text-sm font-semibold"
                style={{
                  backgroundColor: colors.surfaceLight,
                }}
              >
                <Power size={17} />
                {selectedWorkflow.status === "Running"
                  ? "Pause Workflow"
                  : "Activate Workflow"}
              </button>

              <button
                onClick={() =>
                  deleteWorkflow(selectedWorkflow.id)
                }
                className="flex w-full items-center gap-3 rounded-xl p-3 text-left text-sm font-semibold"
                style={{
                  backgroundColor: colors.surfaceLight,
                  color: "#EF4444",
                }}
              >
                <Trash2 size={17} />
                Delete Workflow
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Workflows;