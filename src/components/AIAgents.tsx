
import { useMemo, useState } from "react";
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
  X,
  
  Trash2,
  Power,
} from "lucide-react";

import { darkColors, lightColors } from "../theme/colors";

type AgentStatus = "Active" | "Idle";

type Agent = {
  id: number;
  name: string;
  role: string;
  description: string;
  status: AgentStatus;
  tasks: number;
  accuracy: string;
  activity: string;
};

function AIAgents({
  themeMode,
}: {
  themeMode: "dark" | "light";
}) {
  const colors = themeMode === "dark" ? darkColors : lightColors;

  const [agents, setAgents] = useState<Agent[]>([
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
      id: 5,
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
      id: 6,
      name: "Analytics Agent",
      role: "Data Analyst",
      description:
        "Analyzes workspace data and generates performance reports.",
      status: "Idle",
      tasks: 4,
      accuracy: "93%",
      activity: "Waiting for analysis",
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | AgentStatus>(
    "All",
  );

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const [agentName, setAgentName] = useState("");
  const [agentRole, setAgentRole] = useState("");
  const [agentDescription, setAgentDescription] = useState("");

  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);

  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      const matchesSearch =
        agent.name.toLowerCase().includes(search.toLowerCase()) ||
        agent.role.toLowerCase().includes(search.toLowerCase()) ||
        agent.description.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || agent.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [agents, search, statusFilter]);

  const activeAgents = agents.filter(
    (agent) => agent.status === "Active",
  ).length;

  const totalTasks = agents.reduce(
    (total, agent) => total + agent.tasks,
    0,
  );

  const averageAccuracy =
    agents.length > 0
      ? (
          agents.reduce(
            (total, agent) =>
              total + Number.parseFloat(agent.accuracy),
            0,
          ) / agents.length
        ).toFixed(1)
      : "0.0";

  const resetForm = () => {
    setAgentName("");
    setAgentRole("");
    setAgentDescription("");
    setEditingAgent(null);
  };

  const handleCreateAgent = () => {
    if (!agentName.trim() || !agentRole.trim()) {
      return;
    }

    const newAgent: Agent = {
      id: Date.now(),
      name: agentName.trim(),
      role: agentRole.trim(),
      description:
        agentDescription.trim() ||
        "AI agent ready to assist with workspace operations.",
      status: "Idle",
      tasks: 0,
      accuracy: "100%",
      activity: "Waiting for new requests",
    };

    setAgents((currentAgents) => [...currentAgents, newAgent]);

    resetForm();
    setShowCreateModal(false);
  };

  const handleEditAgent = () => {
    if (!editingAgent || !agentName.trim() || !agentRole.trim()) {
      return;
    }

    setAgents((currentAgents) =>
      currentAgents.map((agent) =>
        agent.id === editingAgent.id
          ? {
              ...agent,
              name: agentName.trim(),
              role: agentRole.trim(),
              description:
                agentDescription.trim() || agent.description,
            }
          : agent,
      ),
    );

    resetForm();
    setShowSettingsModal(false);
  };

  const handleDeleteAgent = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this AI Agent?",
    );

    if (!confirmed) {
      return;
    }

    setAgents((currentAgents) =>
      currentAgents.filter((agent) => agent.id !== id),
    );

    setShowSettingsModal(false);
    setSelectedAgent(null);
  };

  const handleToggleStatus = (id: number) => {
    setAgents((currentAgents) =>
      currentAgents.map((agent) => {
        if (agent.id !== id) {
          return agent;
        }

        const newStatus: AgentStatus =
          agent.status === "Active" ? "Idle" : "Active";

        return {
          ...agent,
          status: newStatus,
          activity:
            newStatus === "Active"
              ? "Ready for new tasks"
              : "Waiting for new requests",
        };
      }),
    );

    setSelectedAgent((currentAgent) => {
      if (!currentAgent || currentAgent.id !== id) {
        return currentAgent;
      }

      const newStatus: AgentStatus =
        currentAgent.status === "Active" ? "Idle" : "Active";

      return {
        ...currentAgent,
        status: newStatus,
        activity:
          newStatus === "Active"
            ? "Ready for new tasks"
            : "Waiting for new requests",
      };
    });
  };

  const openActivity = (agent: Agent) => {
    setSelectedAgent(agent);
    setShowActivityModal(true);
  };

  const openSettings = (agent: Agent) => {
    setSelectedAgent(agent);

    setAgentName(agent.name);
    setAgentRole(agent.role);
    setAgentDescription(agent.description);

    setEditingAgent(agent);
    setShowSettingsModal(true);
  };

  const closeModals = () => {
    setShowCreateModal(false);
    setShowActivityModal(false);
    setShowSettingsModal(false);
    setSelectedAgent(null);
    resetForm();
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
          type="button"
          onClick={() => {
            resetForm();
            setShowCreateModal(true);
          }}
          className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-opacity hover:opacity-90"
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
            {agents.length}
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
            {activeAgents}
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
            {totalTasks}
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
            {averageAccuracy}%
          </p>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div
        className="mb-5 flex items-center justify-between gap-4 rounded-2xl border p-4"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
        }}
      >
        <div className="flex items-center gap-3">
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
              placeholder="Search AI agents..."
              className="flex-1 bg-transparent text-sm outline-none"
              style={{
                color: colors.text,
              }}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value as "All" | AgentStatus,
              )
            }
            className="rounded-xl border px-4 py-2.5 text-sm outline-none"
            style={{
              backgroundColor: colors.background,
              borderColor: colors.border,
              color: colors.text,
            }}
          >
            <option value="All">All Agents</option>
            <option value="Active">Active</option>
            <option value="Idle">Idle</option>
          </select>
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

      {/* RESULT INFO */}
      <div className="mb-4 flex items-center justify-between">
        <p
          className="text-xs"
          style={{
            color: colors.textMuted,
          }}
        >
          Showing {filteredAgents.length} of {agents.length} agents
        </p>

        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="text-xs font-semibold"
            style={{
              color: colors.primary,
            }}
          >
            Clear search
          </button>
        )}
      </div>

      {/* AGENTS GRID */}
      {filteredAgents.length > 0 ? (
        <div className="grid grid-cols-2 gap-5">
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              className="rounded-2xl border p-6 transition-transform hover:-translate-y-0.5"
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
                        themeMode === "dark"
                          ? "rgba(57,255,136,0.10)"
                          : "rgba(22,163,74,0.10)",
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
                  type="button"
                  onClick={() => openSettings(agent)}
                  className="rounded-lg p-2 transition-opacity hover:opacity-70"
                  style={{
                    color: colors.textMuted,
                  }}
                  title="Agent settings"
                >
                  <MoreHorizontal size={18} />
                </button>
              </div>

              {/* STATUS */}
              <div className="mt-5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() =>
                    handleToggleStatus(agent.id)
                  }
                  className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[10px] font-semibold"
                  style={{
                    backgroundColor:
                      agent.status === "Active"
                        ? themeMode === "dark"
                          ? "rgba(57,255,136,0.10)"
                          : "rgba(22,163,74,0.10)"
                        : colors.surfaceLight,
                    color:
                      agent.status === "Active"
                        ? colors.primary
                        : colors.textMuted,
                  }}
                  title="Toggle agent status"
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
                </button>

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
                  type="button"
                  onClick={() => openActivity(agent)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition-opacity hover:opacity-80"
                  style={{
                    backgroundColor: colors.surfaceLight,
                    color: colors.text,
                  }}
                >
                  <Activity size={14} />
                  View Activity
                </button>

                <button
                  type="button"
                  onClick={() => openSettings(agent)}
                  className="flex items-center justify-center rounded-xl px-4 transition-opacity hover:opacity-80"
                  style={{
                    backgroundColor: colors.surfaceLight,
                    color: colors.textMuted,
                  }}
                  title="Settings"
                >
                  <Settings size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="rounded-2xl border p-12 text-center"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          <Bot
            size={35}
            className="mx-auto mb-3"
            style={{
              color: colors.textMuted,
            }}
          />

          <h3 className="text-sm font-bold">
            No AI agents found
          </h3>

          <p
            className="mt-2 text-xs"
            style={{
              color: colors.textMuted,
            }}
          >
            Try another search or create a new AI agent.
          </p>
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {(showCreateModal || showSettingsModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div
            className="w-full max-w-lg rounded-2xl border p-6 shadow-2xl"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">
                  {showCreateModal
                    ? "Create AI Agent"
                    : "Agent Settings"}
                </h2>

                <p
                  className="mt-1 text-xs"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  {showCreateModal
                    ? "Create a new AI worker for your office."
                    : "Update this AI agent's configuration."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModals}
                className="rounded-lg p-2"
                style={{
                  color: colors.textMuted,
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  className="mb-2 block text-xs font-semibold"
                  style={{
                    color: colors.textSecondary,
                  }}
                >
                  Agent Name
                </label>

                <input
                  value={agentName}
                  onChange={(event) =>
                    setAgentName(event.target.value)
                  }
                  placeholder="e.g. Email Agent"
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
                  className="mb-2 block text-xs font-semibold"
                  style={{
                    color: colors.textSecondary,
                  }}
                >
                  Role
                </label>

                <input
                  value={agentRole}
                  onChange={(event) =>
                    setAgentRole(event.target.value)
                  }
                  placeholder="e.g. Email Specialist"
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
                  className="mb-2 block text-xs font-semibold"
                  style={{
                    color: colors.textSecondary,
                  }}
                >
                  Description
                </label>

                <textarea
                  value={agentDescription}
                  onChange={(event) =>
                    setAgentDescription(event.target.value)
                  }
                  placeholder="Describe what this agent does..."
                  rows={4}
                  className="w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none"
                  style={{
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeModals}
                className="rounded-xl px-5 py-2.5 text-xs font-semibold"
                style={{
                  backgroundColor: colors.surfaceLight,
                  color: colors.text,
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  showCreateModal
                    ? handleCreateAgent
                    : handleEditAgent
                }
                disabled={
                  !agentName.trim() || !agentRole.trim()
                }
                className="rounded-xl px-5 py-2.5 text-xs font-bold disabled:cursor-not-allowed disabled:opacity-50"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.black,
                }}
              >
                {showCreateModal
                  ? "Create Agent"
                  : "Save Changes"}
              </button>
            </div>

            {/* DELETE + STATUS */}
            {showSettingsModal && selectedAgent && (
              <div
                className="mt-6 flex items-center justify-between border-t pt-5"
                style={{
                  borderColor: colors.border,
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    handleToggleStatus(selectedAgent.id)
                  }
                  className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold"
                  style={{
                    backgroundColor: colors.surfaceLight,
                    color: colors.text,
                  }}
                >
                  <Power size={14} />
                  {selectedAgent.status === "Active"
                    ? "Set Idle"
                    : "Activate"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDeleteAgent(selectedAgent.id)
                  }
                  className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold"
                  style={{
                    backgroundColor:
                      themeMode === "dark"
                        ? "rgba(239,68,68,0.12)"
                        : "rgba(239,68,68,0.08)",
                    color: "#EF4444",
                  }}
                >
                  <Trash2 size={14} />
                  Delete Agent
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ACTIVITY MODAL */}
      {showActivityModal && selectedAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div
            className="w-full max-w-lg rounded-2xl border p-6 shadow-2xl"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <div className="mb-6 flex items-start justify-between">
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
                  <Activity
                    size={20}
                    style={{
                      color: colors.primary,
                    }}
                  />
                </div>

                <div>
                  <h2 className="text-lg font-bold">
                    {selectedAgent.name}
                  </h2>

                  <p
                    className="text-xs"
                    style={{
                      color: colors.textMuted,
                    }}
                  >
                    Agent activity
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeModals}
                className="rounded-lg p-2"
                style={{
                  color: colors.textMuted,
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: colors.surfaceLight,
                borderColor: colors.border,
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-xs"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Current status
                </span>

                <span
                  className="rounded-lg px-3 py-1 text-[10px] font-semibold"
                  style={{
                    backgroundColor:
                      selectedAgent.status === "Active"
                        ? themeMode === "dark"
                          ? "rgba(57,255,136,0.10)"
                          : "rgba(22,163,74,0.10)"
                        : colors.background,
                    color:
                      selectedAgent.status === "Active"
                        ? colors.primary
                        : colors.textMuted,
                  }}
                >
                  {selectedAgent.status}
                </span>
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs"
                    style={{
                      color: colors.textMuted,
                    }}
                  >
                    Current activity
                  </span>

                  <span className="text-xs font-semibold">
                    {selectedAgent.activity}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className="text-xs"
                    style={{
                      color: colors.textMuted,
                    }}
                  >
                    Tasks handled
                  </span>

                  <span className="text-xs font-bold">
                    {selectedAgent.tasks}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className="text-xs"
                    style={{
                      color: colors.textMuted,
                    }}
                  >
                    Accuracy
                  </span>

                  <span
                    className="text-xs font-bold"
                    style={{
                      color: colors.primary,
                    }}
                  >
                    {selectedAgent.accuracy}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                handleToggleStatus(selectedAgent.id)
              }
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold"
              style={{
                backgroundColor: colors.primary,
                color: colors.black,
              }}
            >
              <Power size={15} />
              {selectedAgent.status === "Active"
                ? "Set Agent Idle"
                : "Activate Agent"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AIAgents;

