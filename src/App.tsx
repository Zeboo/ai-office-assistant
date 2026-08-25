
import { useState } from "react";
import {
  LayoutDashboard,
  Sparkles,
  CheckSquare,
  FolderKanban,
  CalendarDays,
  Users,
  FileText,
  Bot,
  Workflow,
  BarChart3,
  Settings as SettingsIcon,
  Bell,
  Search,
  ChevronDown,
  ArrowUpRight,
  Clock3,
  Target,
  Activity,
} from "lucide-react";

import { darkColors, lightColors } from "./theme/colors";
import AICoPilot from "./components/AICoPilot";
import Tasks from "./components/Tasks";
import Projects from "./components/Projects";
import Calendar from "./components/Calendar";
import Team from "./components/Team";
import Documents from "./components/Documents";
import Workflows from "./components/Workflows";
import Reports from "./components/Reports";
import Settings from "./components/Settings";
import AIAgents from "./components/AIAgents";
import AIAssistant from "./components/AIAssistant";

function App() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const [themeMode, setThemeMode] = useState<"dark" | "light">("dark");
  const colors = themeMode === "dark" ? darkColors : lightColors;
  const [aiCommand, setAiCommand] = useState("");

  const [showNotifications, setShowNotifications] = useState(false);

const [notifications, setNotifications] = useState([
  {
    id: 1,
    title: "Research Agent completed task",
    message: "Market research has been completed.",
    time: "2m ago",
    unread: true,
  },
  {
    id: 2,
    title: "Document Agent generated report",
    message: "Project report is ready.",
    time: "8m ago",
    unread: true,
  },
  {
    id: 3,
    title: "Calendar Agent scheduled meeting",
    message: "Client meeting has been scheduled.",
    time: "15m ago",
    unread: false,
  },
]);

  const [copilotMessage, setCopilotMessage] = useState("");

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "AI Co-Pilot", icon: Sparkles },
    { name: "Tasks", icon: CheckSquare },
    { name: "Projects", icon: FolderKanban },
    { name: "Calendar", icon: CalendarDays },
    { name: "Team", icon: Users },
    { name: "Documents", icon: FileText },
    { name: "AI Agents", icon: Bot },
    { name: "Workflows", icon: Workflow },
    { name: "Reports", icon: BarChart3 },
  ];

  const stats = [
    {
      title: "Current Score",
      value: "1,820",
      change: "+12.5%",
      icon: Target,
    },
    {
      title: "Active Tasks",
      value: "24",
      change: "+4 today",
      icon: CheckSquare,
    },
    {
      title: "AI Agents",
      value: "8",
      change: "6 active",
      icon: Bot,
    },
    {
      title: "Projects",
      value: "12",
      change: "3 due soon",
      icon: FolderKanban,
    },
  ];

  const openCopilot = () => {
    const message = aiCommand.trim();

    if (!message) {
      setCopilotMessage("");
    } else {
      setCopilotMessage(message);
    }

    setAiCommand("");
    setActiveMenu("AI Co-Pilot");
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
      }}
    >
      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <aside
          className="flex w-64 flex-col border-r p-5"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          {/* LOGO */}
          <div className="mb-8 flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{
                backgroundColor: colors.primary,
                color: colors.black,
              }}
            >
              <Sparkles size={21} />
            </div>

            <div>
              <h1 className="text-base font-bold">
                AI Virtual Office
              </h1>

              <p
                className="text-xs"
                style={{
                  color: colors.textMuted,
                }}
              >
                Private AI Workspace
              </p>
            </div>
          </div>

          {/* MENU */}
          <nav className="flex-1 space-y-1">
            <p
              className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest"
              style={{
                color: colors.textMuted,
              }}
            >
              Workspace
            </p>

            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = activeMenu === item.name;

              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    setActiveMenu(item.name);
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition"
                  style={{
                    backgroundColor: active
                      ? colors.primary
                      : "transparent",
                    color: active
                      ? colors.black
                      : colors.textSecondary,
                  }}
                >
                  <Icon size={18} />

                  <span className="flex-1">
                    {item.name}
                  </span>

                  {item.name === "AI Co-Pilot" && (
                    <span
                      className="rounded-md px-1.5 py-0.5 text-[9px] font-bold"
                      style={{
                        backgroundColor: active
                          ? "rgba(0,0,0,0.15)"
                          : colors.surfaceLight,
                        color: active
                          ? colors.black
                          : colors.primary,
                      }}
                    >
                      AI
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* SETTINGS */}
          <div
            className="border-t pt-4"
            style={{
              borderColor: colors.border,
            }}
          >
            <button
              type="button"
              onClick={() => {
                setActiveMenu("Settings");
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm"
              style={{
                color:
                  activeMenu === "Settings"
                    ? colors.primary
                    : colors.textSecondary,
              }}
            >
              <SettingsIcon size={18} />
              <span>Settings</span>
            </button>

            {/* PROFILE */}
            <div
              className="mt-4 flex items-center gap-3 rounded-xl p-3"
              style={{
                backgroundColor: colors.surfaceLight,
              }}
            >
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.black,
                }}
              >
                PK
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">
                  Palwasha Khan
                </p>

                <p
                  className="text-[11px]"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Premium User
                </p>
              </div>

              <ChevronDown
                size={15}
                style={{
                  color: colors.textMuted,
                }}
              />
            </div>
          </div>
        </aside>

        {/* MAIN AREA */}
        <main className="flex-1">

          {/* AI CO-PILOT */}
         {activeMenu === "AI Co-Pilot" ? (
 <AICoPilot
  initialMessage={copilotMessage}
  themeMode={themeMode}
/>

         ) : activeMenu === "Tasks" ? (
 <Tasks themeMode={themeMode} />

) : activeMenu === "Projects" ? (
            <Projects colors={colors} />

          ) : activeMenu === "Calendar" ? (
            <Calendar />

          ) : activeMenu === "Team" ? (
            <Team />

          ) : activeMenu === "Documents" ? (
            <Documents />

          ) : activeMenu === "AI Agents" ? (
            <AIAgents />

          ) : activeMenu === "Workflows" ? (
            <Workflows />

                    ) : activeMenu === "Reports" ? (
            <Reports />

          ) : activeMenu === "Settings" ? (
            <Settings
              themeMode={themeMode}
              onThemeChange={setThemeMode}
            />

          ) : (
            

            /* DASHBOARD */
            <>

           <AIAssistant colors={colors} />

              {/* TOP BAR */}
              <header
                className="flex h-20 items-center justify-between border-b px-8"
                style={{
                  borderColor: colors.border,
                }}
              >
                <div>
                  <p
                    className="text-xs"
                    style={{
                      color: colors.textMuted,
                    }}
                  >
                    Workspace
                  </p>

                  <h2 className="text-lg font-semibold">
                    {activeMenu}
                  </h2>
                </div>

                <div className="flex items-center gap-4">

                  {/* SEARCH */}
                  <div
                    className="flex items-center gap-2 rounded-xl border px-3 py-2"
                    style={{
                      backgroundColor: colors.surface,
                      borderColor: colors.border,
                    }}
                  >
                    <Search
                      size={16}
                      style={{
                        color: colors.textMuted,
                      }}
                    />

                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-40 bg-transparent text-sm outline-none"
                      style={{
                        color: colors.text,
                      }}
                    />
                  </div>

                  {/* NOTIFICATION */}
                  
<div className="relative">
  <button
    type="button"
    onClick={() =>
      setShowNotifications((current) => !current)
    }
    className="relative rounded-xl border p-2.5"
    style={{
      backgroundColor: colors.surface,
      borderColor: colors.border,
    }}
  >
    <Bell size={18} />

    {notifications.some((item) => item.unread) && (
      <span
        className="absolute right-1 top-1 h-2 w-2 rounded-full"
        style={{
          backgroundColor: colors.primary,
        }}
      />
    )}
  </button>

  {showNotifications && (
    <div
      className="absolute right-0 top-12 z-50 w-80 rounded-2xl border p-4 shadow-2xl"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
      }}
    >
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold">
            Notifications
          </h3>

          <p
            className="mt-1 text-[10px]"
            style={{
              color: colors.textMuted,
            }}
          >
            Recent AI activity
          </p>
        </div>

        <button
          type="button"
         onClick={() => {
  setNotifications((current) =>
    current.map((item) => ({
      ...item,
      unread: false,
    }))
  );

  setShowNotifications(false);
}}
          className="text-[10px] font-semibold"
          style={{
            color: colors.primary,
          }}
        >
          Mark all read
        </button>
      </div>

      <div className="space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="rounded-xl p-3"
            style={{
              backgroundColor:
                notification.unread
                  ? "rgba(57,255,136,0.08)"
                  : colors.surfaceLight,
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                style={{
                  backgroundColor:
                    "rgba(57,255,136,0.10)",
                }}
              >
                <Bot
                  size={14}
                  style={{
                    color: colors.primary,
                  }}
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold">
                  {notification.title}
                </p>

                <p
                  className="mt-1 text-[10px]"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  {notification.message}
                </p>

                <p
                  className="mt-1 text-[9px]"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  {notification.time}
                </p>
              </div>

              {notification.unread && (
                <span
                  className="mt-1 h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: colors.primary,
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )}
</div>

                </div>
              </header>

              {/* DASHBOARD CONTENT */}
              <div className="p-8">

                {/* WELCOME */}
                <div className="mb-7">
                  <p
                    className="text-sm"
                    style={{
                      color: colors.textMuted,
                    }}
                  >
                    Wednesday, August 19
                  </p>

                  <div className="mt-1 flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold">
                        Good morning, Palwasha
                      </h2>

                      <p
                        className="mt-2"
                        style={{
                          color: colors.textSecondary,
                        }}
                      >
                        Your AI-powered office is ready to work.
                      </p>
                    </div>

                    <div
                      className="rounded-xl border px-4 py-2 text-sm"
                      style={{
                        backgroundColor: colors.surface,
                        borderColor: colors.border,
                      }}
                    >
                      <span
                        style={{
                          color: colors.primary,
                        }}
                      >
                        ●
                      </span>{" "}
                      All systems operational
                    </div>
                  </div>
                </div>

                {/* AI COMMAND */}
                <div
                  className="mb-7 rounded-2xl border p-5"
                  style={{
                    backgroundColor: colors.surface,
                    borderColor: "rgba(57,255,136,0.22)",
                  }}
                >
                  <div className="mb-4 flex items-center gap-2">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor:
                          "rgba(57,255,136,0.12)",
                      }}
                    >
                      <Sparkles
                        size={17}
                        style={{
                          color: colors.primary,
                        }}
                      />
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        AI Co-Pilot
                      </p>

                      <p
                        className="text-xs"
                        style={{
                          color: colors.textMuted,
                        }}
                      >
                        Tell me what you need
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={aiCommand}
                      onChange={(event) => {
                        setAiCommand(event.target.value);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          openCopilot();
                        }
                      }}
                      placeholder="e.g. Prepare today's pending tasks..."
                      className="flex-1 rounded-xl border px-4 py-3 text-sm outline-none"
                      style={{
                        backgroundColor: colors.background,
                        borderColor: colors.border,
                        color: colors.text,
                      }}
                    />

                    <button
                      type="button"
                      onClick={openCopilot}
                      className="rounded-xl px-7 py-3 text-sm font-bold"
                      style={{
                        backgroundColor: colors.primary,
                        color: colors.black,
                      }}
                    >
                      Ask AI
                    </button>
                  </div>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-4 gap-4">
                  {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                      <div
                        key={stat.title}
                        onClick={() => {
                          if (stat.title === "Active Tasks") {
                            setActiveMenu("Tasks");
                          } else if (
                            stat.title === "AI Agents"
                          ) {
                            setActiveMenu("AI Agents");
                          } else if (
                            stat.title === "Projects"
                          ) {
                            setActiveMenu("Projects");
                          } else if (
                            stat.title === "Current Score"
                          ) {
                            setActiveMenu("Reports");
                          }
                        }}
                        className="cursor-pointer rounded-2xl border p-5 transition hover:scale-[1.01]"
                        style={{
                          backgroundColor: colors.surface,
                          borderColor: colors.border,
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <p
                            className="text-sm"
                            style={{
                              color: colors.textMuted,
                            }}
                          >
                            {stat.title}
                          </p>

                          <Icon
                            size={18}
                            style={{
                              color: colors.primary,
                            }}
                          />
                        </div>

                        <p className="mt-3 text-3xl font-bold">
                          {stat.value}
                        </p>

                        <div className="mt-2 flex items-center gap-1 text-xs">
                          <ArrowUpRight
                            size={13}
                            style={{
                              color: colors.primary,
                            }}
                          />

                          <span
                            style={{
                              color: colors.primary,
                            }}
                          >
                            {stat.change}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* MIDDLE */}
                <div className="mt-6 grid grid-cols-3 gap-6">

                  {/* SCHEDULE */}
                  <section
                    className="col-span-2 rounded-2xl border p-6"
                    style={{
                      backgroundColor: colors.surface,
                      borderColor: colors.border,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">
                          Today's Schedule
                        </h3>

                        <p
                          className="mt-1 text-xs"
                          style={{
                            color: colors.textMuted,
                          }}
                        >
                          Your upcoming activities
                        </p>
                      </div>

                      <CalendarDays
                        size={19}
                        style={{
                          color: colors.primary,
                        }}
                      />
                    </div>

                    <div className="mt-6 space-y-3">
                      {[
                        [
                          "10:00 AM",
                          "Team Standup",
                          "15 members",
                        ],
                        [
                          "12:30 PM",
                          "Client Meeting",
                          "ABC Project",
                        ],
                        [
                          "03:00 PM",
                          "Project Review",
                          "AI Office",
                        ],
                      ].map(([time, title, detail]) => (
                        <div
                          key={title}
                          className="flex items-center gap-4 rounded-xl p-4"
                          style={{
                            backgroundColor:
                              colors.surfaceLight,
                          }}
                        >
                          <div className="w-20">
                            <p
                              className="text-xs font-semibold"
                              style={{
                                color: colors.primary,
                              }}
                            >
                              {time}
                            </p>
                          </div>

                          <div className="flex-1">
                            <p className="text-sm font-semibold">
                              {title}
                            </p>

                            <p
                              className="mt-1 text-xs"
                              style={{
                                color: colors.textMuted,
                              }}
                            >
                              {detail}
                            </p>
                          </div>

                          <Clock3
                            size={16}
                            style={{
                              color: colors.textMuted,
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* GROWTH */}
                  <section
                    className="rounded-2xl border p-6"
                    style={{
                      backgroundColor: colors.surface,
                      borderColor: colors.border,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">
                        Growth Points
                      </h3>

                      <BarChart3
                        size={19}
                        style={{
                          color: colors.primary,
                        }}
                      />
                    </div>

                    <p
                      className="mt-6 text-4xl font-bold"
                      style={{
                        color: colors.primary,
                      }}
                    >
                      82%
                    </p>

                    <p
                      className="mt-1 text-xs"
                      style={{
                        color: colors.textMuted,
                      }}
                    >
                      Productivity this week
                    </p>

                    <div
                      className="mt-5 h-2 overflow-hidden rounded-full"
                      style={{
                        backgroundColor:
                          colors.surfaceLight,
                      }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: "82%",
                          backgroundColor:
                            colors.primary,
                        }}
                      />
                    </div>

                    <p
                      className="mt-4 text-xs"
                      style={{
                        color: colors.textSecondary,
                      }}
                    >
                      You're performing better than last week.
                    </p>
                  </section>
                </div>

                {/* BOTTOM */}
                <div className="mt-6 grid grid-cols-2 gap-6">

                  {/* GOALS */}
                  <section
                    className="rounded-2xl border p-6"
                    style={{
                      backgroundColor: colors.surface,
                      borderColor: colors.border,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">
                          Active Goals
                        </h3>

                        <p
                          className="mt-1 text-xs"
                          style={{
                            color: colors.textMuted,
                          }}
                        >
                          Current priorities
                        </p>
                      </div>

                      <Target
                        size={19}
                        style={{
                          color: colors.primary,
                        }}
                      />
                    </div>

                    <div className="mt-5 space-y-4">
                      {[
                        [
                          "Complete AI Office MVP",
                          "75%",
                        ],
                        [
                          "Client Onboarding",
                          "60%",
                        ],
                        [
                          "Improve Productivity",
                          "90%",
                        ],
                      ].map(([goal, progress]) => (
                        <div key={goal}>
                          <div className="mb-2 flex justify-between">
                            <span className="text-sm">
                              {goal}
                            </span>

                            <span
                              className="text-xs"
                              style={{
                                color: colors.primary,
                              }}
                            >
                              {progress}
                            </span>
                          </div>

                          <div
                            className="h-1.5 rounded-full"
                            style={{
                              backgroundColor:
                                colors.surfaceLight,
                            }}
                          >
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: progress,
                                backgroundColor:
                                  colors.primary,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* AI ACTIVITY */}
                  <section
                    className="rounded-2xl border p-6"
                    style={{
                      backgroundColor: colors.surface,
                      borderColor: colors.border,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">
                          Recent AI Activity
                        </h3>

                        <p
                          className="mt-1 text-xs"
                          style={{
                            color: colors.textMuted,
                          }}
                        >
                          What your AI team has done
                        </p>
                      </div>

                      <Activity
                        size={19}
                        style={{
                          color: colors.primary,
                        }}
                      />
                    </div>

                    <div className="mt-5 space-y-3">
                      {[
                        [
                          "Research Agent",
                          "Completed market research",
                          "2m ago",
                        ],
                        [
                          "Document Agent",
                          "Generated project report",
                          "8m ago",
                        ],
                        [
                          "Calendar Agent",
                          "Scheduled client meeting",
                          "15m ago",
                        ],
                      ].map(([agent, action, time]) => (
                        <div
                          key={agent}
                          className="flex items-center gap-3 rounded-xl p-3"
                          style={{
                            backgroundColor:
                              colors.surfaceLight,
                          }}
                        >
                          <div
                            className="flex h-8 w-8 items-center justify-center rounded-lg"
                            style={{
                              backgroundColor:
                                "rgba(57,255,136,0.10)",
                            }}
                          >
                            <Bot
                              size={15}
                              style={{
                                color: colors.primary,
                              }}
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold">
                              {agent}
                            </p>

                            <p
                              className="truncate text-xs"
                              style={{
                                color: colors.textMuted,
                              }}
                            >
                              {action}
                            </p>
                          </div>

                          <span
                            className="text-[10px]"
                            style={{
                              color: colors.textMuted,
                            }}
                          >
                            {time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;

