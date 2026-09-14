import { useEffect, useMemo, useState } from "react";
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

function AIAgents({ themeMode }: { themeMode: "dark" | "light" }) {
  const colors =
    themeMode === "dark" ? darkColors : lightColors;

  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<"All" | AgentStatus>("All");

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [showActivityModal, setShowActivityModal] =
    useState(false);

  const [showSettingsModal, setShowSettingsModal] =
    useState(false);

  const [selectedAgent, setSelectedAgent] =
    useState<Agent | null>(null);

  const [agentName, setAgentName] = useState("");
  const [agentRole, setAgentRole] = useState("");
  const [agentDescription, setAgentDescription] =
    useState("");

  const [editingAgent, setEditingAgent] =
    useState<Agent | null>(null);

  const API_URL = "http://localhost:3000/ai-agents";

  /* =========================
     LOAD AGENTS
  ========================= */

  const loadAgents = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to load AI agents");
      }

      const data: Agent[] = await response.json();

      setAgents(data);
    } catch (error) {
      console.error("Failed to load AI agents:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAgents();
  }, []);

  /* =========================
     FILTERING
  ========================= */

  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      const searchText = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        searchText === "" ||
        agent.name
          .toLowerCase()
          .includes(searchText) ||
        agent.role
          .toLowerCase()
          .includes(searchText) ||
        agent.description
          .toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        agent.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [agents, search, statusFilter]);

  /* =========================
     SUMMARY
  ========================= */

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
              total +
              Number.parseFloat(agent.accuracy),
            0,
          ) / agents.length
        ).toFixed(1)
      : "0.0";

  /* =========================
     FORM RESET
  ========================= */

  const resetForm = () => {
    setAgentName("");
    setAgentRole("");
    setAgentDescription("");
    setEditingAgent(null);
  };

  /* =========================
     CREATE AGENT
  ========================= */

  const handleCreateAgent = async () => {
    if (
      !agentName.trim() ||
      !agentRole.trim()
    ) {
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: agentName.trim(),
          role: agentRole.trim(),
          description:
            agentDescription.trim() ||
            "AI agent ready to assist with workspace operations.",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create AI agent");
      }

      const newAgent: Agent =
        await response.json();

      setAgents((currentAgents) => [
        ...currentAgents,
        newAgent,
      ]);

      resetForm();
      setShowCreateModal(false);
    } catch (error) {
      console.error(
        "Failed to create AI agent:",
        error,
      );
      alert(
        "Could not create AI Agent. Please check the backend.",
      );
    }
  };

  /* =========================
     EDIT AGENT
  ========================= */

  const handleEditAgent = async () => {
    if (
      !editingAgent ||
      !agentName.trim() ||
      !agentRole.trim()
    ) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/${editingAgent.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: agentName.trim(),
            role: agentRole.trim(),
            description:
              agentDescription.trim() ||
              editingAgent.description,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update AI agent");
      }

      const updatedAgent: Agent =
        await response.json();

      setAgents((currentAgents) =>
        currentAgents.map((agent) =>
          agent.id === updatedAgent.id
            ? updatedAgent
            : agent,
        ),
      );

      setSelectedAgent(updatedAgent);
      resetForm();
      setShowSettingsModal(false);
    } catch (error) {
      console.error(
        "Failed to update AI agent:",
        error,
      );

      alert(
        "Could not update AI Agent. Please check the backend.",
      );
    }
  };

  /* =========================
     DELETE AGENT
  ========================= */

  const handleDeleteAgent = async (
    id: number,
  ) => {
    const agent = agents.find(
      (item) => item.id === id,
    );

    if (!agent) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${agent.name}"?`,
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete AI agent");
      }

      setAgents((currentAgents) =>
        currentAgents.filter(
          (item) => item.id !== id,
        ),
      );

      setShowSettingsModal(false);
      setShowActivityModal(false);
      setSelectedAgent(null);
    } catch (error) {
      console.error(
        "Failed to delete AI agent:",
        error,
      );

      alert(
        "Could not delete AI Agent. Please check the backend.",
      );
    }
  };

  /* =========================
     TOGGLE STATUS
  ========================= */

  const handleToggleStatus = async (
    id: number,
  ) => {
    const agent = agents.find(
      (item) => item.id === id,
    );

    if (!agent) return;

    const newStatus: AgentStatus =
      agent.status === "Active"
        ? "Idle"
        : "Active";

    try {
      const response = await fetch(
        `${API_URL}/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(
          "Failed to update agent status",
        );
      }

      const updatedAgent: Agent =
        await response.json();

      setAgents((currentAgents) =>
        currentAgents.map((item) =>
          item.id === id
            ? updatedAgent
            : item,
        ),
      );

      setSelectedAgent((currentAgent) =>
        currentAgent?.id === id
          ? updatedAgent
          : currentAgent,
      );
    } catch (error) {
      console.error(
        "Failed to update AI agent status:",
        error,
      );

      alert(
        "Could not update AI Agent status. Please check the backend.",
      );
    }
  };

  /* =========================
     MODALS
  ========================= */

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

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <div
        className="min-h-[calc(100vh-80px)] p-8"
        style={{
          backgroundColor: colors.background,
          color: colors.text,
        }}
      >
        <div
          className="flex min-h-[400px] items-center justify-center rounded-2xl border"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          <div className="text-center">
            <div
              className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
              style={{
                backgroundColor: colors.primary,
                color: colors.black,
              }}
            >
              <Bot size={24} />
            </div>

            <p className="text-sm font-semibold">
              Loading AI Agents...
            </p>

            <p
              className="mt-1 text-xs"
              style={{
                color: colors.textMuted,
              }}
            >
              Connecting to your AI workforce
            </p>
          </div>
        </div>
      </div>
    );
  }

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
          className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition hover:scale-[1.02]"
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

          <p
            className="mt-2 text-3xl font-bold"
            style={{
              color: colors.primary,
            }}
          >
            {averageAccuracy}%
          </p>
        </div>
      </div>

      {/* SEARCH + FILTER */}

      <div className="mb-5 flex items-center gap-3">
        <div
          className="flex flex-1 items-center gap-3 rounded-xl border px-4 py-3"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          <Search
            size={18}
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
            className="w-full bg-transparent text-sm outline-none"
            style={{
              color: colors.text,
            }}
          />
        </div>

        <div
          className="flex items-center gap-1 rounded-xl border p-1"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          {(
            ["All", "Active", "Idle"] as const
          ).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() =>
                setStatusFilter(filter)
              }
              className="rounded-lg px-4 py-2 text-xs font-semibold"
              style={{
                backgroundColor:
                  statusFilter === filter
                    ? colors.primary
                    : "transparent",
                color:
                  statusFilter === filter
                    ? colors.black
                    : colors.textMuted,
              }}
            >
              {filter} Agents
            </button>
          ))}
        </div>
      </div>

      {/* OPERATIONAL STATUS */}

      <div
        className="mb-5 flex items-center gap-3 rounded-xl border px-4 py-3"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
        }}
      >
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{
            backgroundColor:
              "rgba(57,255,136,0.10)",
          }}
        >
          <CheckCircle2
            size={17}
            style={{
              color: colors.primary,
            }}
          />
        </div>

        <div>
          <p className="text-sm font-semibold">
            AI workforce is operational
          </p>

          <p
            className="text-xs"
            style={{
              color: colors.textMuted,
            }}
          >
            Showing {filteredAgents.length} of{" "}
            {agents.length} agents
          </p>
        </div>
      </div>

      {/* EMPTY */}

      {filteredAgents.length === 0 ? (
        <div
          className="rounded-2xl border p-12 text-center"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          <Bot
            size={42}
            className="mx-auto mb-4"
            style={{
              color: colors.textMuted,
            }}
          />

          <h3 className="text-lg font-semibold">
            No AI agents found
          </h3>

          <p
            className="mt-1 text-sm"
            style={{
              color: colors.textMuted,
            }}
          >
            Try another search or filter.
          </p>

          {(search || statusFilter !== "All") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatusFilter("All");
              }}
              className="mt-4 rounded-xl px-4 py-2 text-xs font-bold"
              style={{
                backgroundColor: colors.primary,
                color: colors.black,
              }}
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        /* AGENT GRID */

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              className="rounded-2xl border p-5"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
              }}
            >
              {/* CARD HEADER */}

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor:
                        "rgba(57,255,136,0.10)",
                    }}
                  >
                    <Bot
                      size={21}
                      style={{
                        color: colors.primary,
                      }}
                    />
                  </div>

                  <div>
                    <h3 className="text-base font-bold">
                      {agent.name}
                    </h3>

                    <p
                      className="text-xs"
                      style={{
                        color: colors.textMuted,
                      }}
                    >
                      {agent.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleToggleStatus(agent.id)
                    }
                    className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[10px] font-bold"
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
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      openSettings(agent)
                    }
                    className="rounded-lg p-2"
                    style={{
                      color: colors.textMuted,
                    }}
                  >
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </div>

              {/* AI POWERED */}

              <div className="mt-4 flex items-center gap-2">
                <Zap
                  size={14}
                  style={{
                    color: colors.primary,
                  }}
                />

                <span
                  className="text-[10px] font-bold"
                  style={{
                    color: colors.primary,
                  }}
                >
                  AI Powered
                </span>
              </div>

              {/* DESCRIPTION */}

              <p
                className="mt-3 min-h-[40px] text-sm leading-6"
                style={{
                  color: colors.textMuted,
                }}
              >
                {agent.description}
              </p>

              {/* STATS */}

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div
                  className="rounded-xl p-3"
                  style={{
                    backgroundColor:
                      colors.surfaceLight,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Activity
                      size={15}
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

                  <p className="mt-1 text-lg font-bold">
                    {agent.tasks}
                  </p>
                </div>

                <div
                  className="rounded-xl p-3"
                  style={{
                    backgroundColor:
                      colors.surfaceLight,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Brain
                      size={15}
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

                  <p className="mt-1 text-lg font-bold">
                    {agent.accuracy}
                  </p>
                </div>
              </div>

              {/* ACTIVITY */}

              <div className="mt-4 flex items-center gap-2">
                <Clock3
                  size={14}
                  style={{
                    color: colors.textMuted,
                  }}
                />

                <span
                  className="truncate text-xs"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  {agent.activity}
                </span>
              </div>

              {/* ACTIONS */}

              <div className="mt-5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    openActivity(agent)
                  }
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold"
                  style={{
                    backgroundColor:
                      colors.surfaceLight,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                >
                  <Activity size={15} />
                  View Activity
                </button>

                <button
                  type="button"
                  onClick={() =>
                    openSettings(agent)
                  }
                  className="flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold"
                  style={{
                    backgroundColor:
                      colors.primary,
                    color: colors.black,
                  }}
                >
                  <Settings size={15} />
                  Settings
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =========================
          CREATE / EDIT MODAL
      ========================= */}

      {(showCreateModal ||
        showSettingsModal) && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{
            backgroundColor:
              "rgba(0,0,0,0.65)",
          }}
          onClick={closeModals}
        >
          <div
            className="w-full max-w-lg rounded-2xl border p-6"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  {showCreateModal
                    ? "Create AI Agent"
                    : "AI Agent Settings"}
                </h2>

                <p
                  className="mt-1 text-xs"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  {showCreateModal
                    ? "Add a new intelligent agent to your workspace."
                    : "Update your AI agent configuration."}
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
                <X size={19} />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label
                  className="mb-2 block text-xs font-semibold"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Agent Name
                </label>

                <input
                  value={agentName}
                  onChange={(event) =>
                    setAgentName(
                      event.target.value,
                    )
                  }
                  placeholder="e.g. Marketing Agent"
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
                  style={{
                    backgroundColor:
                      colors.surfaceLight,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                />
              </div>

              <div>
                <label
                  className="mb-2 block text-xs font-semibold"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Role
                </label>

                <input
                  value={agentRole}
                  onChange={(event) =>
                    setAgentRole(
                      event.target.value,
                    )
                  }
                  placeholder="e.g. Marketing Specialist"
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
                  style={{
                    backgroundColor:
                      colors.surfaceLight,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                />
              </div>

              <div>
                <label
                  className="mb-2 block text-xs font-semibold"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Description
                </label>

                <textarea
                  value={agentDescription}
                  onChange={(event) =>
                    setAgentDescription(
                      event.target.value,
                    )
                  }
                  placeholder="Describe what this AI agent does..."
                  rows={4}
                  className="w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none"
                  style={{
                    backgroundColor:
                      colors.surfaceLight,
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
                className="rounded-xl border px-5 py-2.5 text-xs font-bold"
                style={{
                  borderColor: colors.border,
                  color: colors.textMuted,
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
                className="rounded-xl px-5 py-2.5 text-xs font-bold"
                style={{
                  backgroundColor:
                    colors.primary,
                  color: colors.black,
                }}
              >
                {showCreateModal
                  ? "Create Agent"
                  : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================
          ACTIVITY MODAL
      ========================= */}

      {showActivityModal &&
        selectedAgent && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{
              backgroundColor:
                "rgba(0,0,0,0.65)",
            }}
            onClick={closeModals}
          >
            <div
              className="w-full max-w-md rounded-2xl border p-6"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">
                    Agent Activity
                  </h2>

                  <p
                    className="mt-1 text-xs"
                    style={{
                      color: colors.textMuted,
                    }}
                  >
                    {selectedAgent.name}
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
                  <X size={19} />
                </button>
              </div>

              <div className="mt-6 space-y-3">
                <div
                  className="rounded-xl p-4"
                  style={{
                    backgroundColor:
                      colors.surfaceLight,
                  }}
                >
                  <p
                    className="text-[10px]"
                    style={{
                      color: colors.textMuted,
                    }}
                  >
                    Current Status
                  </p>

                  <p
                    className="mt-1 text-sm font-bold"
                    style={{
                      color:
                        selectedAgent.status ===
                        "Active"
                          ? colors.primary
                          : colors.text,
                    }}
                  >
                    {selectedAgent.status}
                  </p>
                </div>

                <div
                  className="rounded-xl p-4"
                  style={{
                    backgroundColor:
                      colors.surfaceLight,
                  }}
                >
                  <p
                    className="text-[10px]"
                    style={{
                      color: colors.textMuted,
                    }}
                  >
                    Current Activity
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {selectedAgent.activity}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div
                    className="rounded-xl p-4"
                    style={{
                      backgroundColor:
                        colors.surfaceLight,
                    }}
                  >
                    <p
                      className="text-[10px]"
                      style={{
                        color: colors.textMuted,
                      }}
                    >
                      Tasks Handled
                    </p>

                    <p className="mt-1 text-xl font-bold">
                      {selectedAgent.tasks}
                    </p>
                  </div>

                  <div
                    className="rounded-xl p-4"
                    style={{
                      backgroundColor:
                        colors.surfaceLight,
                    }}
                  >
                    <p
                      className="text-[10px]"
                      style={{
                        color: colors.textMuted,
                      }}
                    >
                      Accuracy
                    </p>

                    <p
                      className="mt-1 text-xl font-bold"
                      style={{
                        color: colors.primary,
                      }}
                    >
                      {selectedAgent.accuracy}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  handleToggleStatus(
                    selectedAgent.id,
                  )
                }
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-bold"
                style={{
                  backgroundColor:
                    colors.primary,
                  color: colors.black,
                }}
              >
                <Power size={15} />

                {selectedAgent.status ===
                "Active"
                  ? "Set Idle"
                  : "Activate Agent"}
              </button>
            </div>
          </div>
        )}

      {/* =========================
          SETTINGS ACTION MODAL
      ========================= */}

      {showSettingsModal &&
        selectedAgent && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-6"
            style={{
              backgroundColor:
                "rgba(0,0,0,0.65)",
            }}
            onClick={closeModals}
          >
            <div
              className="w-full max-w-lg rounded-2xl border p-6"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">
                    Agent Settings
                  </h2>

                  <p
                    className="mt-1 text-xs"
                    style={{
                      color: colors.textMuted,
                    }}
                  >
                    Manage {selectedAgent.name}
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
                  <X size={19} />
                </button>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={() =>
                    handleToggleStatus(
                      selectedAgent.id,
                    )
                  }
                  className="flex w-full items-center gap-3 rounded-xl border p-4 text-left"
                  style={{
                    backgroundColor:
                      colors.surfaceLight,
                    borderColor: colors.border,
                  }}
                >
                  <Power
                    size={18}
                    style={{
                      color: colors.primary,
                    }}
                  />

                  <div>
                    <p className="text-sm font-semibold">
                      {selectedAgent.status ===
                      "Active"
                        ? "Set Idle"
                        : "Activate Agent"}
                    </p>

                    <p
                      className="text-xs"
                      style={{
                        color: colors.textMuted,
                      }}
                    >
                      Change the current agent status.
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDeleteAgent(
                      selectedAgent.id,
                    )
                  }
                  className="flex w-full items-center gap-3 rounded-xl border p-4 text-left"
                  style={{
                    backgroundColor:
                      "rgba(255,80,80,0.06)",
                    borderColor:
                      "rgba(255,80,80,0.25)",
                  }}
                >
                  <Trash2
                    size={18}
                    style={{
                      color: "#ff5555",
                    }}
                  />

                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{
                        color: "#ff5555",
                      }}
                    >
                      Delete Agent
                    </p>

                    <p
                      className="text-xs"
                      style={{
                        color: colors.textMuted,
                      }}
                    >
                      Permanently remove this AI agent.
                    </p>
                  </div>
                </button>
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={closeModals}
                  className="rounded-xl border px-5 py-2.5 text-xs font-bold"
                  style={{
                    borderColor: colors.border,
                    color: colors.textMuted,
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default AIAgents;