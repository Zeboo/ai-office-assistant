import { useMemo, useState } from "react";
import {
  FolderKanban,
  Plus,
  Search,
  Users,
  CalendarDays,
  Bot,
  MoreHorizontal,
  ArrowUpRight,
  X,
  Pencil,
  Trash2,
} from "lucide-react";

import { darkColors } from "../theme/colors";
type Project = {
  id: number;
  name: string;
  description: string;
  status: "Active" | "Planning" | "Completed";
  progress: number;
  deadline: string;
  members: number;
  agent: string;
};

function Projects({
  colors,
}: {
  colors: typeof darkColors;
}) {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
      id: 5,
      name: "Team Productivity",
      description:
        "Track team performance and improve overall productivity.",
      status: "Completed",
      progress: 100,
      deadline: "Aug 18",
      members: 6,
      agent: "Manager Agent",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] =
    useState<Project | null>(null);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "Planning" as Project["status"],
    progress: 0,
    deadline: "",
    members: 1,
    agent: "Manager Agent",
  });

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      status: "Planning",
      progress: 0,
      deadline: "",
      members: 1,
      agent: "Manager Agent",
    });

    setEditingProject(null);
  };

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleSubmit = () => {
    if (!form.name.trim()) {
      alert("Please enter a project name.");
      return;
    }

    if (!form.description.trim()) {
      alert("Please enter a project description.");
      return;
    }

    if (!form.deadline) {
      alert("Please select a deadline.");
      return;
    }

    if (editingProject) {
      setProjects((oldProjects) =>
        oldProjects.map((project) =>
          project.id === editingProject.id
            ? {
                ...project,
                name: form.name,
                description: form.description,
                status: form.status,
                progress: Number(form.progress),
                deadline: form.deadline,
                members: Number(form.members),
                agent: form.agent,
              }
            : project
        )
      );
    } else {
      const newProject: Project = {
        id: Date.now(),
        name: form.name,
        description: form.description,
        status: form.status,
        progress: Number(form.progress),
        deadline: form.deadline,
        members: Number(form.members),
        agent: form.agent,
      };

      setProjects((oldProjects) => [
        newProject,
        ...oldProjects,
      ]);
    }

    closeModal();
  };

  const editProject = (project: Project) => {
    setEditingProject(project);

    setForm({
      name: project.name,
      description: project.description,
      status: project.status,
      progress: project.progress,
      deadline: project.deadline,
      members: project.members,
      agent: project.agent,
    });

    setOpenMenu(null);
    setShowModal(true);
  };

  const deleteProject = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) {
      return;
    }

    setProjects((oldProjects) =>
      oldProjects.filter((project) => project.id !== id)
    );

    setOpenMenu(null);
  };

  const filteredProjects = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return projects;
    }

    return projects.filter(
      (project) =>
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.status.toLowerCase().includes(query) ||
        project.agent.toLowerCase().includes(query)
    );
  }, [projects, search]);

  const totalProjects = projects.length;

  const activeProjects = projects.filter(
    (project) => project.status === "Active"
  ).length;

  const planningProjects = projects.filter(
    (project) => project.status === "Planning"
  ).length;

  const completedProjects = projects.filter(
    (project) => project.status === "Completed"
  ).length;

  return (
    <div
      className="min-h-screen p-8"
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
          type="button"
          onClick={openCreateModal}
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
        <SummaryCard
          title="Total Projects"
          value={totalProjects}
          colors={colors}
        />

        <SummaryCard
          title="Active"
          value={activeProjects}
          primary
          colors={colors}
        />

        <SummaryCard
          title="Planning"
          value={planningProjects}
          colors={colors}
        />

        <SummaryCard
          title="Completed"
          value={completedProjects}
          colors={colors}
        />
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
            onChange={(event) => {
              setSearch(event.target.value);
            }}
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
          {filteredProjects.length} projects in workspace
        </p>
      </div>

      {/* PROJECT GRID */}

      {filteredProjects.length === 0 ? (
        <div
          className="rounded-2xl border p-12 text-center"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          <FolderKanban
            size={40}
            className="mx-auto mb-3"
            style={{
              color: colors.textMuted,
            }}
          />

          <p className="font-semibold">
            No projects found
          </p>

          <p
            className="mt-1 text-sm"
            style={{
              color: colors.textMuted,
            }}
          >
            Try another search or create a new project.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
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

                {/* MORE MENU */}

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenMenu(
                        openMenu === project.id
                          ? null
                          : project.id
                      );
                    }}
                    className="rounded-lg p-2"
                    style={{
                      color: colors.textMuted,
                    }}
                  >
                    <MoreHorizontal size={18} />
                  </button>

                  {openMenu === project.id && (
                    <div
                      className="absolute right-0 top-10 z-20 w-32 rounded-xl border p-1 shadow-xl"
                      style={{
                        backgroundColor: colors.surface,
                        borderColor: colors.border,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          editProject(project);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs"
                        style={{
                          color: colors.text,
                        }}
                      >
                        <Pencil size={13} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          deleteProject(project.id);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs"
                        style={{
                          color: "#ff6b6b",
                        }}
                      >
                        <Trash2 size={13} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
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
                      project.status === "Planning"
                        ? "rgba(255,190,60,0.12)"
                        : "rgba(57,255,136,0.10)",
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
      )}

      {/* CREATE / EDIT MODAL */}

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{
            backgroundColor: "rgba(0,0,0,0.65)",
          }}
        >
          <div
            className="w-full max-w-xl rounded-2xl border p-6 shadow-2xl"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            {/* MODAL HEADER */}

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  {editingProject
                    ? "Edit Project"
                    : "Create Project"}
                </h2>

                <p
                  className="mt-1 text-xs"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  {editingProject
                    ? "Update project information"
                    : "Add a new project to your workspace"}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-2"
                style={{
                  color: colors.textMuted,
                }}
              >
                <X size={19} />
              </button>
            </div>

            {/* PROJECT NAME */}

            <label className="block">
              <span className="mb-2 block text-xs font-semibold">
                Project Name
              </span>

              <input
                value={form.name}
                onChange={(event) => {
                  setForm({
                    ...form,
                    name: event.target.value,
                  });
                }}
                placeholder="e.g. AI Virtual Office"
                className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
                style={{
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  color: colors.text,
                }}
              />
            </label>

            {/* DESCRIPTION */}

            <label className="mt-4 block">
              <span className="mb-2 block text-xs font-semibold">
                Description
              </span>

              <textarea
                value={form.description}
                onChange={(event) => {
                  setForm({
                    ...form,
                    description: event.target.value,
                  });
                }}
                placeholder="Describe your project..."
                rows={3}
                className="w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none"
                style={{
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  color: colors.text,
                }}
              />
            </label>

            {/* STATUS + PROGRESS */}

            <div className="mt-4 grid grid-cols-2 gap-4">
              <label>
                <span className="mb-2 block text-xs font-semibold">
                  Status
                </span>

                <select
                  value={form.status}
                  onChange={(event) => {
                    setForm({
                      ...form,
                      status:
                        event.target.value as Project["status"],
                    });
                  }}
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
                  style={{
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                >
                  <option value="Planning">
                    Planning
                  </option>

                  <option value="Active">
                    Active
                  </option>

                  <option value="Completed">
                    Completed
                  </option>
                </select>
              </label>

              <label>
                <span className="mb-2 block text-xs font-semibold">
                  Progress %
                </span>

                <input
                  type="number"
                  min="0"
                  max="100"
                  value={form.progress}
                  onChange={(event) => {
                    setForm({
                      ...form,
                      progress: Math.min(
                        100,
                        Math.max(
                          0,
                          Number(event.target.value)
                        )
                      ),
                    });
                  }}
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
                  style={{
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                />
              </label>
            </div>

            {/* DEADLINE + MEMBERS */}

            <div className="mt-4 grid grid-cols-2 gap-4">
              <label>
                <span className="mb-2 block text-xs font-semibold">
                  Deadline
                </span>

                <input
                  type="date"
                  value={form.deadline}
                  onChange={(event) => {
                    setForm({
                      ...form,
                      deadline: event.target.value,
                    });
                  }}
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
                  style={{
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                />
              </label>

              <label>
                <span className="mb-2 block text-xs font-semibold">
                  Members
                </span>

                <input
                  type="number"
                  min="1"
                  value={form.members}
                  onChange={(event) => {
                    setForm({
                      ...form,
                      members: Math.max(
                        1,
                        Number(event.target.value)
                      ),
                    });
                  }}
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
                  style={{
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                />
              </label>
            </div>

            {/* AI AGENT */}

            <label className="mt-4 block">
              <span className="mb-2 block text-xs font-semibold">
                Assigned AI Agent
              </span>

              <select
                value={form.agent}
                onChange={(event) => {
                  setForm({
                    ...form,
                    agent: event.target.value,
                  });
                }}
                className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
                style={{
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  color: colors.text,
                }}
              >
                <option>Manager Agent</option>
                <option>Research Agent</option>
                <option>Document Agent</option>
                <option>Workflow Agent</option>
                <option>Meeting Agent</option>
              </select>
            </label>

            {/* BUTTONS */}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl border px-5 py-3 text-sm font-semibold"
                style={{
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  color: colors.textSecondary,
                }}
              >
                Cancel / Back
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="rounded-xl px-6 py-3 text-sm font-bold"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.black,
                }}
              >
                {editingProject
                  ? "Save Changes"
                  : "Create Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* SUMMARY CARD */

function SummaryCard({
  title,
  value,
  primary = false,
  colors,
}: {
  title: string;
  value: number;
  primary?: boolean;
  colors: typeof import("../theme/colors").colors;
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
          color: primary ? colors.primary : colors.text,
        }}
      >
        {value}
      </p>
    </div>
  );
}

export default Projects;