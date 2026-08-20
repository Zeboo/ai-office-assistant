import {
  Users,
  Plus,
  Search,
  
  MoreHorizontal,
  Bot,
  Activity,
  ShieldCheck,
} from "lucide-react";

import { colors } from "../theme/colors";

function Team() {
  const members = [
    {
      name: "Palwasha Khan",
      role: "Administrator",
      type: "Human",
      status: "Online",
      activity: "Working on AI Virtual Office",
      tasks: 8,
      avatar: "PK",
    },
    {
      name: "Manager Agent",
      role: "AI Manager",
      type: "AI Agent",
      status: "Active",
      activity: "Managing team workflows",
      tasks: 12,
      avatar: "MA",
    },
    {
      name: "Research Agent",
      role: "Research Specialist",
      type: "AI Agent",
      status: "Active",
      activity: "Researching project data",
      tasks: 6,
      avatar: "RA",
    },
    {
      name: "Document Agent",
      role: "Document Specialist",
      type: "AI Agent",
      status: "Active",
      activity: "Processing documents",
      tasks: 9,
      avatar: "DA",
    },
    {
      name: "Sarah Ahmed",
      role: "Project Manager",
      type: "Human",
      status: "Offline",
      activity: "Last active 2 hours ago",
      tasks: 5,
      avatar: "SA",
    },
    {
      name: "Ali Raza",
      role: "Developer",
      type: "Human",
      status: "Online",
      activity: "Working on backend",
      tasks: 7,
      avatar: "AR",
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
            <Users size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              Team
            </h1>

            <p
              className="text-sm"
              style={{
                color: colors.textMuted,
              }}
            >
              Manage your team members and AI agents
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
          Invite Member
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
            Total Members
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
            Online
          </p>

          <p
            className="mt-2 text-3xl font-bold"
            style={{ color: colors.primary }}
          >
            14
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
            AI Agents
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
            style={{ color: colors.textMuted }}
          >
            Active Tasks
          </p>

          <p className="mt-2 text-3xl font-bold">
            42
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
            placeholder="Search team members..."
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
          Team activity is being monitored
        </div>
      </div>

      {/* TEAM LIST */}
      <div
        className="overflow-hidden rounded-2xl border"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
        }}
      >
        {/* TABLE HEADER */}
        <div
          className="grid grid-cols-[2fr_1.4fr_1fr_2fr_0.8fr_40px] gap-4 border-b px-5 py-4 text-[10px] font-semibold uppercase tracking-wider"
          style={{
            borderColor: colors.border,
            color: colors.textMuted,
          }}
        >
          <span>Member</span>
          <span>Role</span>
          <span>Status</span>
          <span>Current Activity</span>
          <span>Tasks</span>
          <span></span>
        </div>

        {members.map((member) => (
          <div
            key={member.name}
            className="grid grid-cols-[2fr_1.4fr_1fr_2fr_0.8fr_40px] items-center gap-4 border-b px-5 py-5 last:border-b-0"
            style={{
              borderColor: colors.border,
            }}
          >
            {/* MEMBER */}
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold"
                style={{
                  backgroundColor: member.type === "AI Agent"
                    ? "rgba(57,255,136,0.10)"
                    : colors.surfaceLight,
                  color: colors.primary,
                }}
              >
                {member.type === "AI Agent" ? (
                  <Bot size={18} />
                ) : (
                  member.avatar
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">
                    {member.name}
                  </p>

                  {member.type === "AI Agent" && (
                    <span
                      className="rounded-md px-2 py-1 text-[8px] font-bold"
                      style={{
                        backgroundColor:
                          "rgba(57,255,136,0.10)",
                        color: colors.primary,
                      }}
                    >
                      AI
                    </span>
                  )}
                </div>

                <p
                  className="mt-1 text-[10px]"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  {member.type}
                </p>
              </div>
            </div>

            {/* ROLE */}
            <div
              className="text-xs"
              style={{
                color: colors.textSecondary,
              }}
            >
              {member.role}
            </div>

            {/* STATUS */}
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor:
                    member.status === "Online" ||
                    member.status === "Active"
                      ? colors.primary
                      : colors.textMuted,
                }}
              />

              <span
                className="text-xs"
                style={{
                  color:
                    member.status === "Online" ||
                    member.status === "Active"
                      ? colors.primary
                      : colors.textMuted,
                }}
              >
                {member.status}
              </span>
            </div>

            {/* ACTIVITY */}
            <div
              className="text-xs"
              style={{
                color: colors.textSecondary,
              }}
            >
              {member.activity}
            </div>

            {/* TASKS */}
            <div>
              <span
                className="rounded-lg px-3 py-1.5 text-xs font-semibold"
                style={{
                  backgroundColor: colors.surfaceLight,
                  color: colors.text,
                }}
              >
                {member.tasks}
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
        ))}
      </div>

      {/* SECURITY INFO */}
      <div
        className="mt-5 flex items-center gap-3 rounded-2xl border p-4"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
        }}
      >
        <ShieldCheck
          size={19}
          style={{
            color: colors.primary,
          }}
        />

        <div>
          <p className="text-xs font-semibold">
            Secure Team Workspace
          </p>

          <p
            className="mt-1 text-[10px]"
            style={{
              color: colors.textMuted,
            }}
          >
            Team permissions and workspace access are
            protected.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;