import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  Activity,
  Edit3,
  MoreHorizontal,
  Pause,
  Play,
  Plus,
  Search,
  Settings,
  Trash2,
  X,
  Zap,
} from "lucide-react";

import { darkColors, lightColors } from "../theme/colors";

type ThemeMode = "dark" | "light";

const API_URL = "http://localhost:3000";

type WorkflowStatus = "Running" | "Paused" | "Completed";

type WorkflowItem = {
  id: number;
  name: string;
  description: string;
  status: WorkflowStatus;
  runs: number;
  success: number;
  agent: string;
  lastRun: string;
};

type WorkflowApiItem = {
  id: number;
  name: string;
  description: string;
  status: string;
  steps: number;
  completedRuns: number;
  successRate: number;
  agent: string;
  activity: string;
  createdAt: string;
  updatedAt: string;
};

type WorkflowsProps = {
  themeMode: ThemeMode;
};

function mapWorkflow(item: WorkflowApiItem): WorkflowItem {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    status:
      item.status === "Active"
        ? "Running"
        : item.status === "Paused"
          ? "Paused"
          : "Completed",
    runs: item.completedRuns,
    success: item.successRate,
    agent: item.agent,
    lastRun: item.activity,
  };
}

export default function Workflows({
  themeMode,
}: WorkflowsProps) {
  const colors =
    themeMode === "dark" ? darkColors : lightColors;

  const [workflows, setWorkflows] = useState<WorkflowItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<
    "All" | "Running" | "Paused" | "Completed"
  >("All");

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [showActivityModal, setShowActivityModal] =
    useState(false);

  const [showSettingsModal, setShowSettingsModal] =
    useState(false);

  const [selectedWorkflow, setSelectedWorkflow] =
    useState<WorkflowItem | null>(null);

  const [editingWorkflow, setEditingWorkflow] =
    useState<WorkflowItem | null>(null);

  const [openMenuId, setOpenMenuId] =
    useState<number | null>(null);

  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] =
    useState("");
  const [newAgent, setNewAgent] =
    useState("Manager Agent");

  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] =
    useState("");
  const [editAgent, setEditAgent] =
    useState("Manager Agent");

  /* =========================
     LOAD WORKFLOWS
  ========================= */

  const loadWorkflows = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/workflows`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load workflows"
        );
      }

      const data: WorkflowApiItem[] =
        await response.json();

      setWorkflows(data.map(mapWorkflow));
    } catch (error) {
      console.error(
        "Workflow loading error:",
        error
      );

      alert(
        "Unable to load workflows. Please check the backend."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadWorkflows();
  }, []);

  /* =========================
     CHANGE WORKFLOW STATUS
     
     Running -> Paused
     Paused -> Active
     
     IMPORTANT:
     Both use PATCH /status.
     We do NOT use /run for activation.
  ========================= */

  const changeWorkflowStatus = async (
    workflow: WorkflowItem
  ) => {
    try {
      const nextStatus =
        workflow.status === "Running"
          ? "Paused"
          : "Active";

      const response = await fetch(
        `${API_URL}/workflows/${workflow.id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: nextStatus,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();

        console.error(
          "Workflow status update failed:",
          response.status,
          errorText
        );

        throw new Error(
          "Unable to change workflow status"
        );
      }

      const updatedWorkflow: WorkflowApiItem =
        await response.json();

      const mappedWorkflow =
        mapWorkflow(updatedWorkflow);

      setWorkflows((current) =>
        current.map((item) =>
          item.id === mappedWorkflow.id
            ? mappedWorkflow
            : item
        )
      );

      setSelectedWorkflow((current) =>
        current &&
        current.id === mappedWorkflow.id
          ? mappedWorkflow
          : current
      );

      setOpenMenuId(null);
    } catch (error) {
      console.error(
        "Workflow status error:",
        error
      );

      alert(
        "Unable to change workflow status. Please check the backend."
      );
    }
  };

  /* =========================
     CREATE WORKFLOW
  ========================= */

  const createWorkflow = async () => {
    if (!newName.trim()) {
      alert("Please enter workflow name.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/workflows`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newName.trim(),
            description:
              newDescription.trim() ||
              "AI-powered workspace automation workflow.",
            agent: newAgent,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to create workflow"
        );
      }

      const created: WorkflowApiItem =
        await response.json();

      setWorkflows((current) => [
        ...current,
        mapWorkflow(created),
      ]);

      setNewName("");
      setNewDescription("");
      setNewAgent("Manager Agent");
      setShowCreateModal(false);
    } catch (error) {
      console.error(
        "Create workflow error:",
        error
      );

      alert(
        "Unable to create workflow. Please check the backend."
      );
    }
  };

  /* =========================
     OPEN EDIT
  ========================= */

  const openEditModal = (
    workflow: WorkflowItem
  ) => {
    setEditingWorkflow(workflow);
    setEditName(workflow.name);
    setEditDescription(workflow.description);
    setEditAgent(workflow.agent);

    setShowEditModal(true);
    setOpenMenuId(null);
  };

  /* =========================
     UPDATE WORKFLOW
  ========================= */

  const updateWorkflow = async () => {
    if (!editingWorkflow) {
      return;
    }

    if (!editName.trim()) {
      alert("Please enter workflow name.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/workflows/${editingWorkflow.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editName.trim(),
            description:
              editDescription.trim(),
            agent: editAgent,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to update workflow"
        );
      }

      const updated: WorkflowApiItem =
        await response.json();

      const mappedWorkflow =
        mapWorkflow(updated);

      setWorkflows((current) =>
        current.map((item) =>
          item.id === mappedWorkflow.id
            ? mappedWorkflow
            : item
        )
      );

      setSelectedWorkflow((current) =>
        current &&
        current.id === mappedWorkflow.id
          ? mappedWorkflow
          : current
      );

      setShowEditModal(false);
      setEditingWorkflow(null);
    } catch (error) {
      console.error(
        "Update workflow error:",
        error
      );

      alert(
        "Unable to update workflow. Please check the backend."
      );
    }
  };

  /* =========================
     DELETE WORKFLOW
  ========================= */

  const deleteWorkflow = async (
    workflow: WorkflowItem
  ) => {
    const confirmed = window.confirm(
      `Delete "${workflow.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/workflows/${workflow.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to delete workflow"
        );
      }

      setWorkflows((current) =>
        current.filter(
          (item) => item.id !== workflow.id
        )
      );

      if (
        selectedWorkflow &&
        selectedWorkflow.id === workflow.id
      ) {
        setSelectedWorkflow(null);
      }

      setShowSettingsModal(false);
      setOpenMenuId(null);
    } catch (error) {
      console.error(
        "Delete workflow error:",
        error
      );

      alert(
        "Unable to delete workflow. Please check the backend."
      );
    }
  };

  /* =========================
     ACTIVITY
  ========================= */

  const openActivity = (
    workflow: WorkflowItem
  ) => {
    setSelectedWorkflow(workflow);
    setShowActivityModal(true);
    setOpenMenuId(null);
  };

  /* =========================
     SETTINGS
  ========================= */

  const openSettings = (
    workflow: WorkflowItem
  ) => {
    setSelectedWorkflow(workflow);
    setShowSettingsModal(true);
    setOpenMenuId(null);
  };

  /* =========================
     FILTER
  ========================= */

  const filteredWorkflows = useMemo(() => {
    return workflows.filter((workflow) => {
      const searchText =
        search.toLowerCase();

      const matchesSearch =
        workflow.name
          .toLowerCase()
          .includes(searchText) ||
        workflow.description
          .toLowerCase()
          .includes(searchText) ||
        workflow.agent
          .toLowerCase()
          .includes(searchText);

      const matchesFilter =
        filter === "All" ||
        workflow.status === filter;

      return (
        matchesSearch &&
        matchesFilter
      );
    });
  }, [workflows, search, filter]);

  /* =========================
     SUMMARY
  ========================= */

  const totalWorkflows =
    workflows.length;

  const runningWorkflows =
    workflows.filter(
      (workflow) =>
        workflow.status === "Running"
    ).length;

  const totalExecutions =
    workflows.reduce(
      (total, workflow) =>
        total + workflow.runs,
      0
    );

  const successRate =
    workflows.length === 0
      ? 0
      : Math.round(
          workflows.reduce(
            (total, workflow) =>
              total + workflow.success,
            0
          ) / workflows.length
        );

  return (
    <div
      style={{
        color: colors.text,
        minHeight: "100%",
      }}
    >
      {/* =========================
          HEADER
      ========================= */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            Workflows
          </h1>

          <p
            style={{
              marginTop: 8,
              marginBottom: 0,
              color: colors.textMuted,
              fontSize: 14,
            }}
          >
            Automate your workspace with
            AI-powered workflows
          </p>
        </div>

        <button
          onClick={() =>
            setShowCreateModal(true)
          }
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            border: "none",
            borderRadius: 10,
            padding: "11px 16px",
            background: colors.primary,
            color: "#fff",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          <Plus size={18} />
          Create Workflow
        </button>
      </div>

      {/* =========================
          SUMMARY CARDS
      ========================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, minmax(0, 1fr))",
          gap: 16,
          marginBottom: 22,
        }}
      >
        <SummaryCard
          title="Total Workflows"
          value={totalWorkflows}
          colors={colors}
        />

        <SummaryCard
          title="Running"
          value={runningWorkflows}
          colors={colors}
        />

        <SummaryCard
          title="Executions"
          value={totalExecutions}
          colors={colors}
        />

        <SummaryCard
          title="Success Rate"
          value={`${successRate}%`}
          colors={colors}
        />
      </div>

      {/* =========================
          SEARCH + FILTERS
      ========================= */}

      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 22,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            position: "relative",
            flex: 1,
            minWidth: 240,
          }}
        >
          <Search
            size={18}
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform:
                "translateY(-50%)",
              color: colors.textMuted,
            }}
          />

          <input
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search workflows..."
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding:
                "13px 14px 13px 42px",
              borderRadius: 12,
              outline: "none",
              background: colors.surface,
              color: colors.text,
              border: `1px solid ${colors.border}`,
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          {(
            [
              "All",
              "Running",
              "Paused",
              "Completed",
            ] as const
          ).map((item) => (
            <button
              key={item}
              onClick={() =>
                setFilter(item)
              }
              style={{
                padding: "10px 15px",
                borderRadius: 9,
                border: `1px solid ${
                  filter === item
                    ? colors.primary
                    : colors.border
                }`,
                background:
                  filter === item
                    ? `${colors.primary}18`
                    : colors.surface,
                color:
                  filter === item
                    ? colors.primary
                    : colors.textMuted,
                cursor: "pointer",
                fontWeight:
                  filter === item
                    ? 600
                    : 500,
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* =========================
          WORKFLOW LIST
      ========================= */}

      {loading ? (
        <div
          style={{
            padding: 40,
            textAlign: "center",
            color: colors.textMuted,
          }}
        >
          Loading workflows...
        </div>
      ) : filteredWorkflows.length ===
        0 ? (
        <div
          style={{
            padding: 40,
            textAlign: "center",
            border: `1px solid ${colors.border}`,
            borderRadius: 16,
            color: colors.textMuted,
          }}
        >
          No workflows found.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(2, minmax(0, 1fr))",
            gap: 18,
          }}
        >
          {filteredWorkflows.map(
            (workflow) => (
              <div
                key={workflow.id}
                style={{
                  position: "relative",
                  background:
                    colors.surface,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 16,
                  padding: 28,
                  minWidth: 0,
                }}
              >
                {/* CARD HEADER */}

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems:
                      "flex-start",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems:
                        "center",
                      gap: 13,
                      minWidth: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 54,
                        height: 54,
                        borderRadius: 14,
                        display: "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                        background:
                          `${colors.primary}18`,
                        color:
                          colors.primary,
                        flexShrink: 0,
                      }}
                    >
                      <Zap size={25} />
                    </div>

                    <div
                      style={{
                        minWidth: 0,
                      }}
                    >
                      <h3
                        style={{
                          margin: 0,
                          fontSize: 18,
                          fontWeight: 700,
                        }}
                      >
                        {workflow.name}
                      </h3>

                      <p
                        style={{
                          margin:
                            "6px 0 0",
                          color:
                            colors.textMuted,
                          fontSize: 13,
                        }}
                      >
                        AI automated
                        workflow
                      </p>
                    </div>
                  </div>

                  {/* THREE DOTS */}

                  <div
                    style={{
                      position:
                        "relative",
                    }}
                  >
                    <button
                      onClick={() =>
                        setOpenMenuId(
                          openMenuId ===
                            workflow.id
                            ? null
                            : workflow.id
                        )
                      }
                      style={{
                        border: "none",
                        background:
                          "transparent",
                        color:
                          colors.textMuted,
                        cursor:
                          "pointer",
                        padding: 5,
                      }}
                    >
                      <MoreHorizontal
                        size={20}
                      />
                    </button>

                    {openMenuId ===
                      workflow.id && (
                      <div
                        style={{
                          position:
                            "absolute",
                          right: 0,
                          top: 35,
                          zIndex: 20,
                          width: 190,
                          padding: 7,
                          borderRadius: 10,
                          background:
                            colors.surface,
                          border: `1px solid ${colors.border}`,
                          boxShadow:
                            "0 12px 30px rgba(0,0,0,0.25)",
                        }}
                      >
                        <MenuButton
                          icon={
                            workflow.status ===
                            "Running" ? (
                              <Pause
                                size={16}
                              />
                            ) : (
                              <Play
                                size={16}
                              />
                            )
                          }
                          label={
                            workflow.status ===
                            "Running"
                              ? "Pause Workflow"
                              : "Activate Workflow"
                          }
                          onClick={() =>
                            void changeWorkflowStatus(
                              workflow
                            )
                          }
                          colors={colors}
                        />

                        <MenuButton
                          icon={
                            <Edit3
                              size={16}
                            />
                          }
                          label="Edit Workflow"
                          onClick={() =>
                            openEditModal(
                              workflow
                            )
                          }
                          colors={colors}
                        />

                        <MenuButton
                          icon={
                            <Settings
                              size={16}
                            />
                          }
                          label="Settings"
                          onClick={() =>
                            openSettings(
                              workflow
                            )
                          }
                          colors={colors}
                        />

                        <MenuButton
                          icon={
                            <Trash2
                              size={16}
                            />
                          }
                          label="Delete Workflow"
                          onClick={() =>
                            void deleteWorkflow(
                              workflow
                            )
                          }
                          colors={colors}
                          danger
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* STATUS + AGENT */}

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems:
                      "center",
                    marginTop: 25,
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems:
                        "center",
                      gap: 7,
                      padding:
                        "7px 11px",
                      borderRadius: 8,
                      background:
                        workflow.status ===
                        "Running"
                          ? `${colors.primary}18`
                          : "rgba(128,128,128,0.10)",
                      color:
                        workflow.status ===
                        "Running"
                          ? colors.primary
                          : colors.textMuted,
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    {workflow.status ===
                    "Running" ? (
                      <Play size={14} />
                    ) : (
                      <Pause size={14} />
                    )}

                    {workflow.status}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems:
                        "center",
                      gap: 7,
                      color:
                        colors.textMuted,
                      fontSize: 13,
                    }}
                  >
                    <Zap size={15} />
                    {workflow.agent}
                  </div>
                </div>

                {/* DESCRIPTION */}

                <p
                  style={{
                    color:
                      colors.textMuted,
                    fontSize: 14,
                    lineHeight: 1.6,
                    minHeight: 45,
                    margin:
                      "20px 0 20px",
                  }}
                >
                  {workflow.description}
                </p>

                {/* STATS */}

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(3, 1fr)",
                    gap: 10,
                  }}
                >
                  <StatBox
                    title="Runs"
                    value={workflow.runs}
                    colors={colors}
                  />

                  <StatBox
                    title="Success"
                    value={`${workflow.success}%`}
                    success
                    colors={colors}
                  />

                  <StatBox
                    title="Last Run"
                    value={
                      workflow.lastRun
                    }
                    colors={colors}
                  />
                </div>

                {/* ACTION BUTTONS */}

                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    marginTop: 20,
                  }}
                >
                  <button
                    onClick={() =>
                      openActivity(
                        workflow
                      )
                    }
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems:
                        "center",
                      justifyContent:
                        "center",
                      gap: 8,
                      padding: 12,
                      borderRadius: 10,
                      border: `1px solid ${colors.border}`,
                      background:
                        "transparent",
                      color:
                        colors.text,
                      cursor:
                        "pointer",
                      fontWeight: 600,
                    }}
                  >
                    <Activity
                      size={17}
                    />
                    View Activity
                  </button>

                  {/* RUN / PAUSE */}

                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();

                      void changeWorkflowStatus(
                        workflow
                      );
                    }}
                    title={
                      workflow.status ===
                      "Running"
                        ? "Pause workflow"
                        : "Activate workflow"
                    }
                    style={{
                      width: 52,
                      display: "flex",
                      alignItems:
                        "center",
                      justifyContent:
                        "center",
                      borderRadius: 10,
                      border: `1px solid ${colors.border}`,
                      background:
                        "transparent",
                      color:
                        workflow.status ===
                        "Running"
                          ? "#f59e0b"
                          : colors.primary,
                      cursor:
                        "pointer",
                    }}
                  >
                    {workflow.status ===
                    "Running" ? (
                      <Pause size={18} />
                    ) : (
                      <Play size={18} />
                    )}
                  </button>

                  {/* EDIT */}

                  <button
                    onClick={() =>
                      openEditModal(
                        workflow
                      )
                    }
                    title="Edit workflow"
                    style={{
                      width: 52,
                      display: "flex",
                      alignItems:
                        "center",
                      justifyContent:
                        "center",
                      borderRadius: 10,
                      border: `1px solid ${colors.border}`,
                      background:
                        "transparent",
                      color:
                        colors.textMuted,
                      cursor:
                        "pointer",
                    }}
                  >
                    <Edit3 size={18} />
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* =========================
          CREATE MODAL
      ========================= */}

      {showCreateModal && (
        <Modal
          title="Create Workflow"
          onClose={() =>
            setShowCreateModal(
              false
            )
          }
          colors={colors}
        >
          <label style={labelStyle}>
            Workflow Name
          </label>

          <input
            value={newName}
            onChange={(event) =>
              setNewName(
                event.target.value
              )
            }
            placeholder="Enter workflow name"
            style={modalInputStyle(colors)}
          />

          <label style={labelStyle}>
            Description
          </label>

          <textarea
            value={newDescription}
            onChange={(event) =>
              setNewDescription(
                event.target.value
              )
            }
            placeholder="Describe what this workflow does"
            rows={4}
            style={{
              ...modalInputStyle(colors),
              resize: "vertical",
            }}
          />

          <label style={labelStyle}>
            AI Agent
          </label>

          <select
            value={newAgent}
            onChange={(event) =>
              setNewAgent(
                event.target.value
              )
            }
            style={modalInputStyle(colors)}
          >
            <option>
              Manager Agent
            </option>
            <option>
              Research Agent
            </option>
            <option>
              Document Agent
            </option>
            <option>
              Workflow Agent
            </option>
            <option>
              Meeting Agent
            </option>
            <option>
              Analytics Agent
            </option>
          </select>

          <div
            style={{
              display: "flex",
              justifyContent:
                "flex-end",
              gap: 10,
              marginTop: 24,
            }}
          >
            <button
              onClick={() =>
                setShowCreateModal(
                  false
                )
              }
              style={secondaryButton(
                colors
              )}
            >
              Cancel
            </button>

            <button
              onClick={() =>
                void createWorkflow()
              }
              style={primaryButton(
                colors
              )}
            >
              Create Workflow
            </button>
          </div>
        </Modal>
      )}

      {/* =========================
          EDIT MODAL
      ========================= */}

      {showEditModal &&
        editingWorkflow && (
          <Modal
            title="Edit Workflow"
            onClose={() =>
              setShowEditModal(
                false
              )
            }
            colors={colors}
          >
            <label style={labelStyle}>
              Workflow Name
            </label>

            <input
              value={editName}
              onChange={(event) =>
                setEditName(
                  event.target.value
                )
              }
              style={modalInputStyle(
                colors
              )}
            />

            <label style={labelStyle}>
              Description
            </label>

            <textarea
              value={editDescription}
              onChange={(event) =>
                setEditDescription(
                  event.target.value
                )
              }
              rows={4}
              style={{
                ...modalInputStyle(
                  colors
                ),
                resize: "vertical",
              }}
            />

            <label style={labelStyle}>
              AI Agent
            </label>

            <select
              value={editAgent}
              onChange={(event) =>
                setEditAgent(
                  event.target.value
                )
              }
              style={modalInputStyle(
                colors
              )}
            >
              <option>
                Manager Agent
              </option>
              <option>
                Research Agent
              </option>
              <option>
                Document Agent
              </option>
              <option>
                Workflow Agent
              </option>
              <option>
                Meeting Agent
              </option>
              <option>
                Analytics Agent
              </option>
            </select>

            <div
              style={{
                display: "flex",
                justifyContent:
                  "flex-end",
                gap: 10,
                marginTop: 24,
              }}
            >
              <button
                onClick={() =>
                  setShowEditModal(
                    false
                  )
                }
                style={secondaryButton(
                  colors
                )}
              >
                Cancel
              </button>

              <button
                onClick={() =>
                  void updateWorkflow()
                }
                style={primaryButton(
                  colors
                )}
              >
                Save Changes
              </button>
            </div>
          </Modal>
        )}

      {/* =========================
          ACTIVITY MODAL
      ========================= */}

      {showActivityModal &&
        selectedWorkflow && (
          <Modal
            title="Workflow Activity"
            onClose={() =>
              setShowActivityModal(
                false
              )
            }
            colors={colors}
          >
            <div
              style={{
                display: "flex",
                alignItems:
                  "center",
                gap: 12,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  background:
                    `${colors.primary}18`,
                  color:
                    colors.primary,
                }}
              >
                <Activity size={22} />
              </div>

              <div>
                <h3
                  style={{
                    margin: 0,
                  }}
                >
                  {
                    selectedWorkflow.name
                  }
                </h3>

                <p
                  style={{
                    margin:
                      "5px 0 0",
                    color:
                      colors.textMuted,
                    fontSize: 13,
                  }}
                >
                  {
                    selectedWorkflow.agent
                  }
                </p>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(3, 1fr)",
                gap: 10,
              }}
            >
              <StatBox
                title="Status"
                value={
                  selectedWorkflow.status
                }
                colors={colors}
              />

              <StatBox
                title="Runs"
                value={
                  selectedWorkflow.runs
                }
                colors={colors}
              />

              <StatBox
                title="Success"
                value={`${selectedWorkflow.success}%`}
                success
                colors={colors}
              />
            </div>

            <div
              style={{
                marginTop: 18,
                padding: 15,
                borderRadius: 10,
                background:
                  "rgba(128,128,128,0.08)",
                color:
                  colors.textMuted,
                fontSize: 14,
              }}
            >
              <strong
                style={{
                  color:
                    colors.text,
                }}
              >
                Latest Activity:
              </strong>{" "}
              {
                selectedWorkflow.lastRun
              }
            </div>

            <button
              onClick={() =>
                void changeWorkflowStatus(
                  selectedWorkflow
                )
              }
              style={{
                width: "100%",
                marginTop: 20,
                padding: 13,
                borderRadius: 10,
                border: "none",
                background:
                  selectedWorkflow.status ===
                  "Running"
                    ? "#f59e0b"
                    : colors.primary,
                color: "#fff",
                cursor:
                  "pointer",
                fontWeight: 600,
              }}
            >
              {selectedWorkflow.status ===
              "Running"
                ? "Pause Workflow"
                : "Activate Workflow"}
            </button>
          </Modal>
        )}

      {/* =========================
          SETTINGS MODAL
      ========================= */}

      {showSettingsModal &&
        selectedWorkflow && (
          <Modal
            title="Workflow Settings"
            onClose={() =>
              setShowSettingsModal(
                false
              )
            }
            colors={colors}
          >
            <div
              style={{
                marginBottom: 20,
              }}
            >
              <h3
                style={{
                  margin: 0,
                }}
              >
                {
                  selectedWorkflow.name
                }
              </h3>

              <p
                style={{
                  marginTop: 7,
                  color:
                    colors.textMuted,
                  fontSize: 14,
                }}
              >
                {
                  selectedWorkflow.description
                }
              </p>
            </div>

            <button
              onClick={() =>
                openEditModal(
                  selectedWorkflow
                )
              }
              style={{
                width: "100%",
                display: "flex",
                alignItems:
                  "center",
                gap: 10,
                padding: 13,
                marginBottom: 10,
                borderRadius: 10,
                border: `1px solid ${colors.border}`,
                background:
                  "transparent",
                color:
                  colors.text,
                cursor:
                  "pointer",
              }}
            >
              <Edit3 size={17} />
              Edit Workflow
            </button>

            <button
              onClick={() =>
                void changeWorkflowStatus(
                  selectedWorkflow
                )
              }
              style={{
                width: "100%",
                display: "flex",
                alignItems:
                  "center",
                gap: 10,
                padding: 13,
                marginBottom: 10,
                borderRadius: 10,
                border: `1px solid ${colors.border}`,
                background:
                  "transparent",
                color:
                  selectedWorkflow.status ===
                  "Running"
                    ? "#f59e0b"
                    : colors.primary,
                cursor:
                  "pointer",
              }}
            >
              {selectedWorkflow.status ===
              "Running" ? (
                <Pause size={17} />
              ) : (
                <Play size={17} />
              )}

              {selectedWorkflow.status ===
              "Running"
                ? "Pause Workflow"
                : "Activate Workflow"}
            </button>

            <button
              onClick={() =>
                void deleteWorkflow(
                  selectedWorkflow
                )
              }
              style={{
                width: "100%",
                display: "flex",
                alignItems:
                  "center",
                gap: 10,
                padding: 13,
                borderRadius: 10,
                border:
                  "1px solid rgba(239,68,68,0.3)",
                background:
                  "rgba(239,68,68,0.08)",
                color: "#ef4444",
                cursor:
                  "pointer",
              }}
            >
              <Trash2 size={17} />
              Delete Workflow
            </button>
          </Modal>
        )}
    </div>
  );
}

/* =========================
   SUMMARY CARD
========================= */

function SummaryCard({
  title,
  value,
  colors,
}: {
  title: string;
  value: string | number;
  colors: typeof darkColors;
}) {
  return (
    <div
      style={{
        background:
          colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: 14,
        padding: 20,
      }}
    >
      <div
        style={{
          color:
            colors.textMuted,
          fontSize: 13,
          marginBottom: 9,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: 27,
          fontWeight: 700,
        }}
      >
        {value}
      </div>
    </div>
  );
}

/* =========================
   STAT BOX
========================= */

function StatBox({
  title,
  value,
  colors,
  success = false,
}: {
  title: string;
  value: string | number;
  colors: typeof darkColors;
  success?: boolean;
}) {
  return (
    <div
      style={{
        background:
          "rgba(128,128,128,0.06)",
        borderRadius: 11,
        padding: 14,
        minWidth: 0,
      }}
    >
      <div
        style={{
          color:
            colors.textMuted,
          fontSize: 11,
          marginBottom: 8,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color: success
            ? colors.primary
            : colors.text,
          fontSize: 15,
          fontWeight: 700,
          overflow: "hidden",
          textOverflow:
            "ellipsis",
          whiteSpace:
            "nowrap",
        }}
      >
        {value}
      </div>
    </div>
  );
}

/* =========================
   MENU BUTTON
========================= */

function MenuButton({
  icon,
  label,
  onClick,
  colors,
  danger = false,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  colors: typeof darkColors;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        display: "flex",
        alignItems:
          "center",
        gap: 9,
        padding:
          "9px 10px",
        border: "none",
        borderRadius: 7,
        background:
          "transparent",
        color: danger
          ? "#ef4444"
          : colors.text,
        cursor:
          "pointer",
        textAlign:
          "left",
        fontSize: 13,
      }}
    >
      {icon}
      {label}
    </button>
  );
}

/* =========================
   MODAL
========================= */

function Modal({
  title,
  onClose,
  colors,
  children,
}: {
  title: string;
  onClose: () => void;
  colors: typeof darkColors;
  children: ReactNode;
}) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems:
          "center",
        justifyContent:
          "center",
        padding: 20,
        background:
          "rgba(0,0,0,0.65)",
      }}
    >
      <div
        onClick={(event) =>
          event.stopPropagation()
        }
        style={{
          width: "100%",
          maxWidth: 520,
          maxHeight: "90vh",
          overflowY:
            "auto",
          borderRadius: 16,
          padding: 24,
          background:
            colors.surface,
          color:
            colors.text,
          border: `1px solid ${colors.border}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems:
              "center",
            justifyContent:
              "space-between",
            marginBottom: 22,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 20,
            }}
          >
            {title}
          </h2>

          <button
            onClick={onClose}
            style={{
              border: "none",
              background:
                "transparent",
              color:
                colors.textMuted,
              cursor:
                "pointer",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

/* =========================
   LABEL
========================= */

const labelStyle = {
  display: "block",
  fontSize: 13,
  fontWeight: 600,
  marginBottom: 8,
  marginTop: 16,
};

/* =========================
   MODAL INPUT
========================= */

function modalInputStyle(
  colors: typeof darkColors
) {
  return {
    width: "100%",
    boxSizing:
      "border-box" as const,
    padding:
      "12px 13px",
    borderRadius: 9,
    outline: "none",
    background:
      colors.background,
    color:
      colors.text,
    border: `1px solid ${colors.border}`,
    fontSize: 14,
  };
}

/* =========================
   PRIMARY BUTTON
========================= */

function primaryButton(
  colors: typeof darkColors
) {
  return {
    padding:
      "11px 17px",
    borderRadius: 9,
    border: "none",
    background:
      colors.primary,
    color: "#fff",
    cursor:
      "pointer",
    fontWeight: 600,
  };
}

/* =========================
   SECONDARY BUTTON
========================= */

function secondaryButton(
  colors: typeof darkColors
) {
  return {
    padding:
      "11px 17px",
    borderRadius: 9,
    border: `1px solid ${colors.border}`,
    background:
      "transparent",
    color:
      colors.text,
    cursor:
      "pointer",
    fontWeight: 600,
  };
}