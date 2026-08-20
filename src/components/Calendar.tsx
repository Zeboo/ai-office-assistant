import {
  CalendarDays,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Users,
  Bot,
  Video,
} from "lucide-react";

import { colors } from "../theme/colors";

function Calendar() {
  const days = [
    { day: "Mon", date: "17" },
    { day: "Tue", date: "18" },
    { day: "Wed", date: "19", active: true },
    { day: "Thu", date: "20" },
    { day: "Fri", date: "21" },
    { day: "Sat", date: "22" },
    { day: "Sun", date: "23" },
  ];

  const events = [
    {
      time: "10:00 AM",
      title: "Team Standup",
      description: "Daily project progress meeting",
      people: "15 members",
      type: "Team",
      ai: false,
    },
    {
      time: "12:30 PM",
      title: "Client Meeting",
      description: "Discuss project requirements",
      people: "4 participants",
      type: "Client",
      ai: false,
    },
    {
      time: "03:00 PM",
      title: "AI Office Review",
      description: "Review AI agents and workflows",
      people: "3 participants",
      type: "AI",
      ai: true,
    },
    {
      time: "05:00 PM",
      title: "Project Planning",
      description: "Plan upcoming development tasks",
      people: "6 members",
      type: "Planning",
      ai: true,
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
            <CalendarDays size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              Calendar
            </h1>

            <p
              className="text-sm"
              style={{
                color: colors.textMuted,
              }}
            >
              Manage meetings, events and AI schedules
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
          Add Event
        </button>
      </div>

      {/* CALENDAR + UPCOMING */}
      <div className="grid grid-cols-3 gap-6">

        {/* CALENDAR */}
        <section
          className="col-span-2 rounded-2xl border p-6"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          {/* MONTH HEADER */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                August 2026
              </h2>

              <p
                className="mt-1 text-xs"
                style={{
                  color: colors.textMuted,
                }}
              >
                Your workspace calendar
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="rounded-lg border p-2"
                style={{
                  borderColor: colors.border,
                  color: colors.textMuted,
                }}
              >
                <ChevronLeft size={16} />
              </button>

              <button
                className="rounded-lg border p-2"
                style={{
                  borderColor: colors.border,
                  color: colors.textMuted,
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* DAYS */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((item) => (
              <div
                key={item.date}
                className="rounded-xl p-3 text-center"
                style={{
                  backgroundColor: item.active
                    ? colors.primary
                    : colors.surfaceLight,
                  color: item.active
                    ? colors.black
                    : colors.text,
                }}
              >
                <p className="text-[10px] font-medium">
                  {item.day}
                </p>

                <p className="mt-1 text-lg font-bold">
                  {item.date}
                </p>

                {item.active && (
                  <div className="mx-auto mt-1 h-1 w-1 rounded-full bg-black" />
                )}
              </div>
            ))}
          </div>

          {/* TIME LINE */}
          <div
            className="mt-6 border-t pt-5"
            style={{
              borderColor: colors.border,
            }}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold">
                  Wednesday, August 19
                </h3>

                <p
                  className="mt-1 text-xs"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  4 events scheduled
                </p>
              </div>

              <span
                className="rounded-lg px-3 py-1.5 text-[10px] font-semibold"
                style={{
                  backgroundColor:
                    "rgba(57,255,136,0.10)",
                  color: colors.primary,
                }}
              >
                Today
              </span>
            </div>

            {/* EVENTS */}
            <div className="space-y-3">
              {events.map((event) => (
                <div
                  key={event.title}
                  className="flex items-center gap-4 rounded-xl p-4"
                  style={{
                    backgroundColor:
                      colors.surfaceLight,
                  }}
                >
                  {/* TIME */}
                  <div className="w-20 shrink-0">
                    <p
                      className="text-xs font-semibold"
                      style={{
                        color: colors.primary,
                      }}
                    >
                      {event.time}
                    </p>
                  </div>

                  {/* EVENT */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold">
                        {event.title}
                      </h4>

                      {event.ai && (
                        <span
                          className="flex items-center gap-1 rounded-md px-2 py-1 text-[9px] font-bold"
                          style={{
                            backgroundColor:
                              "rgba(57,255,136,0.10)",
                            color: colors.primary,
                          }}
                        >
                          <Bot size={10} />
                          AI
                        </span>
                      )}
                    </div>

                    <p
                      className="mt-1 text-xs"
                      style={{
                        color: colors.textMuted,
                      }}
                    >
                      {event.description}
                    </p>
                  </div>

                  {/* PEOPLE */}
                  <div
                    className="flex items-center gap-1.5 text-xs"
                    style={{
                      color: colors.textMuted,
                    }}
                  >
                    <Users size={14} />
                    {event.people}
                  </div>

                  {/* TYPE */}
                  <span
                    className="rounded-lg px-3 py-1.5 text-[10px]"
                    style={{
                      backgroundColor:
                        colors.background,
                      color: colors.textSecondary,
                    }}
                  >
                    {event.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RIGHT PANEL */}
        <div className="space-y-5">

          {/* UPCOMING */}
          <section
            className="rounded-2xl border p-5"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold">
                  Upcoming
                </h2>

                <p
                  className="mt-1 text-xs"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Next scheduled events
                </p>
              </div>

              <Clock3
                size={17}
                style={{
                  color: colors.primary,
                }}
              />
            </div>

            <div className="space-y-3">
              {[
                ["10:00 AM", "Team Standup"],
                ["12:30 PM", "Client Meeting"],
                ["03:00 PM", "AI Office Review"],
              ].map(([time, title]) => (
                <div
                  key={title}
                  className="rounded-xl p-3"
                  style={{
                    backgroundColor:
                      colors.surfaceLight,
                  }}
                >
                  <p
                    className="text-[10px]"
                    style={{
                      color: colors.primary,
                    }}
                  >
                    {time}
                  </p>

                  <p className="mt-1 text-xs font-semibold">
                    {title}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* AI SCHEDULER */}
          <section
            className="rounded-2xl border p-5"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{
                  backgroundColor:
                    "rgba(57,255,136,0.10)",
                }}
              >
                <Bot
                  size={18}
                  style={{
                    color: colors.primary,
                  }}
                />
              </div>

              <div>
                <h2 className="text-sm font-semibold">
                  AI Scheduler
                </h2>

                <p
                  className="text-[10px]"
                  style={{
                    color: colors.primary,
                  }}
                >
                  Active
                </p>
              </div>
            </div>

            <p
              className="mt-4 text-xs leading-5"
              style={{
                color: colors.textSecondary,
              }}
            >
              Your AI assistant can automatically find
              suitable meeting times and schedule events
              based on your availability.
            </p>

            <button
              className="mt-4 w-full rounded-xl py-2.5 text-xs font-semibold"
              style={{
                backgroundColor: colors.surfaceLight,
                color: colors.primary,
              }}
            >
              Ask AI to Schedule
            </button>
          </section>

          {/* MEETING INFO */}
          <section
            className="rounded-2xl border p-5"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <h2 className="text-sm font-semibold">
              Meeting Tools
            </h2>

            <div className="mt-4 space-y-2">
              <button
                className="flex w-full items-center gap-3 rounded-xl p-3 text-left text-xs"
                style={{
                  backgroundColor:
                    colors.surfaceLight,
                  color: colors.textSecondary,
                }}
              >
                <Video
                  size={15}
                  style={{
                    color: colors.primary,
                  }}
                />
                Start Video Meeting
              </button>

              <button
                className="flex w-full items-center gap-3 rounded-xl p-3 text-left text-xs"
                style={{
                  backgroundColor:
                    colors.surfaceLight,
                  color: colors.textSecondary,
                }}
              >
                <Users
                  size={15}
                  style={{
                    color: colors.primary,
                  }}
                />
                Manage Participants
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Calendar;