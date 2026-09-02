
import { useMemo, useState } from "react";
import {
  CalendarDays,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Users,
  Bot,
  Video,
  Pencil,
  Trash2,
  Search,
  X,
} from "lucide-react";

import { darkColors, lightColors } from "../theme/colors";

type CalendarEvent = {
  id: number;
  time: string;
  title: string;
  description: string;
  people: string;
  type: string;
  ai: boolean;
  date: string;
};
function Calendar({
  themeMode,
}: {
  themeMode: "dark" | "light";
}) {
 // Theme
const theme = themeMode === "dark" ? darkColors : lightColors;
const dark = themeMode === "dark";

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(7);
  const [currentYear, setCurrentYear] = useState(2026);

  const [selectedDate, setSelectedDate] = useState("19");

  const [search, setSearch] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);

  const [editingEvent, setEditingEvent] =
    useState<CalendarEvent | null>(null);

  const [aiMessage, setAiMessage] = useState("");

  const [meetingMessage, setMeetingMessage] = useState("");

  const [newEvent, setNewEvent] = useState({
    time: "10:00 AM",
    title: "",
    description: "",
    people: "1 participant",
    type: "Meeting",
    ai: false,
  });

  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: 1,
      time: "10:00 AM",
      title: "Team Standup",
      description: "Daily project progress meeting",
      people: "15 members",
      type: "Team",
      ai: false,
      date: "19",
    },
    {
      id: 2,
      time: "12:30 PM",
      title: "Client Meeting",
      description: "Discuss project requirements",
      people: "4 participants",
      type: "Client",
      ai: false,
      date: "19",
    },
    {
      id: 3,
      time: "03:00 PM",
      title: "AI Office Review",
      description: "Review AI agents and workflows",
      people: "3 participants",
      type: "AI",
      ai: true,
      date: "19",
    },
    {
      id: 4,
      time: "05:00 PM",
      title: "Project Planning",
      description: "Plan upcoming development tasks",
      people: "6 members",
      type: "Planning",
      ai: true,
      date: "19",
    },
  ]);

  const days = [
    { day: "Mon", date: "17" },
    { day: "Tue", date: "18" },
    { day: "Wed", date: "19" },
    { day: "Thu", date: "20" },
    { day: "Fri", date: "21" },
    { day: "Sat", date: "22" },
    { day: "Sun", date: "23" },
  ];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const selectedEvents = useMemo(() => {
    return events.filter(
      (event) =>
        event.date === selectedDate &&
        (event.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
          event.description
            .toLowerCase()
            .includes(search.toLowerCase()))
    );
  }, [events, selectedDate, search]);

  const openAddEvent = () => {
    setNewEvent({
      time: "10:00 AM",
      title: "",
      description: "",
      people: "1 participant",
      type: "Meeting",
      ai: false,
    });

    setEditingEvent(null);
    setShowAddModal(true);
  };

  const saveEvent = () => {
    if (!newEvent.title.trim()) {
      alert("Please enter an event title.");
      return;
    }

    if (editingEvent) {
      setEvents((current) =>
        current.map((event) =>
          event.id === editingEvent.id
            ? {
                ...event,
                ...newEvent,
                title: newEvent.title.trim(),
                description:
                  newEvent.description.trim() ||
                  "Calendar event",
                date: selectedDate,
              }
            : event
        )
      );
    } else {
      const event: CalendarEvent = {
        id: Date.now(),
        ...newEvent,
        title: newEvent.title.trim(),
        description:
          newEvent.description.trim() ||
          "Calendar event",
        date: selectedDate,
      };

      setEvents((current) => [...current, event]);
    }

    setShowAddModal(false);
    setEditingEvent(null);
  };

  const editEvent = (event: CalendarEvent) => {
    setEditingEvent(event);

    setNewEvent({
      time: event.time,
      title: event.title,
      description: event.description,
      people: event.people,
      type: event.type,
      ai: event.ai,
    });

    setShowAddModal(true);
  };

  const deleteEvent = (id: number) => {
    setEvents((current) =>
      current.filter((event) => event.id !== id)
    );
  };

  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((year) => year - 1);
    } else {
      setCurrentMonth((month) => month - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((year) => year + 1);
    } else {
      setCurrentMonth((month) => month + 1);
    }
  };

  const askAI = () => {
    setAiMessage(
      "AI Scheduler is analyzing your availability and preparing suitable meeting times."
    );
  };

  const startVideoMeeting = () => {
    setMeetingMessage(
      "Video meeting is ready to start."
    );
  };

  const manageParticipants = () => {
    setMeetingMessage(
      "Participant management is ready."
    );
  };

  return (
    <div
      className="min-h-[calc(100vh-80px)] p-8 transition-colors duration-300"
      style={{
        backgroundColor: theme.background,
        color: theme.text,
      }}
    >
      {/* HEADER */}
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl"
            style={{
              backgroundColor: theme.primary,
              color: dark ? theme.black : "#FFFFFF",
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
                color: theme.textMuted,
              }}
            >
              Manage meetings, events and AI schedules
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          

          <button
            type="button"
            onClick={openAddEvent}
            className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition hover:scale-[1.02]"
            style={{
              backgroundColor: theme.primary,
              color: dark ? theme.black : "#FFFFFF",
            }}
          >
            <Plus size={18} />
            Add Event
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* CALENDAR */}
        <section
          className="rounded-2xl border p-6 xl:col-span-2"
          style={{
            backgroundColor: theme.surface,
            borderColor: theme.border,
          }}
        >
          {/* MONTH HEADER */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                {monthNames[currentMonth]} {currentYear}
              </h2>

              <p
                className="mt-1 text-xs"
                style={{
                  color: theme.textMuted,
                }}
              >
                Your workspace calendar
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={previousMonth}
                className="rounded-lg border p-2 transition hover:scale-105"
                style={{
                  borderColor: theme.border,
                  color: theme.textMuted,
                }}
              >
                <ChevronLeft size={16} />
              </button>

              <button
                type="button"
                onClick={nextMonth}
                className="rounded-lg border p-2 transition hover:scale-105"
                style={{
                  borderColor: theme.border,
                  color: theme.textMuted,
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* SEARCH */}
          <div
            className="mb-5 flex items-center gap-2 rounded-xl border px-3 py-2.5"
            style={{
              backgroundColor: theme.surfaceLight,
              borderColor: theme.border,
            }}
          >
            <Search
              size={16}
              style={{
                color: theme.textMuted,
              }}
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events..."
              className="w-full bg-transparent text-xs outline-none"
              style={{
                color: theme.text,
              }}
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                style={{
                  color: theme.textMuted,
                }}
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* DAYS */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((item) => {
              const active = selectedDate === item.date;

              const dayEventCount = events.filter(
                (event) => event.date === item.date
              ).length;

              return (
                <button
                  type="button"
                  key={item.date}
                  onClick={() =>
                    setSelectedDate(item.date)
                  }
                  className="rounded-xl p-3 text-center transition hover:scale-[1.02]"
                  style={{
                    backgroundColor: active
                      ? theme.primary
                      : theme.surfaceLight,
                    color: active
                      ? dark
                        ? theme.black
                        : "#FFFFFF"
                      : theme.text,
                  }}
                >
                  <p className="text-[10px] font-medium">
                    {item.day}
                  </p>

                  <p className="mt-1 text-lg font-bold">
                    {item.date}
                  </p>

                  {dayEventCount > 0 && (
                    <div className="mx-auto mt-1 flex justify-center gap-1">
                      {Array.from({
                        length: Math.min(
                          dayEventCount,
                          3
                        ),
                      }).map((_, index) => (
                        <span
                          key={index}
                          className="h-1 w-1 rounded-full"
                          style={{
                            backgroundColor: active
                              ? dark
                                ? theme.black
                                : "#FFFFFF"
                              : theme.primary,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* EVENTS */}
          <div
            className="mt-6 border-t pt-5"
            style={{
              borderColor: theme.border,
            }}
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold">
                  {days.find(
                    (day) => day.date === selectedDate
                  )?.day || "Selected Day"}
                  , August {selectedDate}
                </h3>

                <p
                  className="mt-1 text-xs"
                  style={{
                    color: theme.textMuted,
                  }}
                >
                  {selectedEvents.length} events scheduled
                </p>
              </div>

              <span
                className="rounded-lg px-3 py-1.5 text-[10px] font-semibold"
                style={{
                  backgroundColor: dark
                    ? "rgba(57,255,136,0.10)"
                    : "rgba(22,163,74,0.10)",
                  color: theme.primary,
                }}
              >
                Today
              </span>
            </div>

            <div className="space-y-3">
              {selectedEvents.length === 0 ? (
                <div
                  className="rounded-xl p-6 text-center"
                  style={{
                    backgroundColor: theme.surfaceLight,
                  }}
                >
                  <CalendarDays
                    size={28}
                    className="mx-auto mb-2"
                    style={{
                      color: theme.textMuted,
                    }}
                  />

                  <p className="text-xs font-semibold">
                    No events found
                  </p>

                  <p
                    className="mt-1 text-[10px]"
                    style={{
                      color: theme.textMuted,
                    }}
                  >
                    Add a new event to this day.
                  </p>
                </div>
              ) : (
                selectedEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex flex-col gap-4 rounded-xl p-4 transition lg:flex-row lg:items-center"
                    style={{
                      backgroundColor:
                        theme.surfaceLight,
                    }}
                  >
                    <div className="w-20 shrink-0">
                      <p
                        className="text-xs font-semibold"
                        style={{
                          color: theme.primary,
                        }}
                      >
                        {event.time}
                      </p>
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-semibold">
                          {event.title}
                        </h4>

                        {event.ai && (
                          <span
                            className="flex items-center gap-1 rounded-md px-2 py-1 text-[9px] font-bold"
                            style={{
                              backgroundColor: dark
                                ? "rgba(57,255,136,0.10)"
                                : "rgba(22,163,74,0.10)",
                              color: theme.primary,
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
                          color: theme.textMuted,
                        }}
                      >
                        {event.description}
                      </p>
                    </div>

                    <div
                      className="flex items-center gap-1.5 text-xs"
                      style={{
                        color: theme.textMuted,
                      }}
                    >
                      <Users size={14} />
                      {event.people}
                    </div>

                    <span
                      className="rounded-lg px-3 py-1.5 text-[10px]"
                      style={{
                        backgroundColor: theme.background,
                        color: theme.textSecondary,
                      }}
                    >
                      {event.type}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => editEvent(event)}
                        className="rounded-lg p-2 transition hover:scale-105"
                        style={{
                          color: theme.primary,
                          backgroundColor:
                            theme.background,
                        }}
                      >
                        <Pencil size={14} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          deleteEvent(event.id)
                        }
                        className="rounded-lg p-2 transition hover:scale-105"
                        style={{
                          color: "#ef4444",
                          backgroundColor:
                            theme.background,
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* RIGHT SIDE */}
        <div className="space-y-5">
          {/* UPCOMING */}
          <section
            className="rounded-2xl border p-5"
            style={{
              backgroundColor: theme.surface,
              borderColor: theme.border,
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
                    color: theme.textMuted,
                  }}
                >
                  Next scheduled events
                </p>
              </div>

              <Clock3
                size={17}
                style={{
                  color: theme.primary,
                }}
              />
            </div>

            <div className="space-y-3">
              {events.slice(0, 3).map((event) => (
                <button
                  type="button"
                  key={event.id}
                  onClick={() =>
                    setSelectedDate(event.date)
                  }
                  className="w-full rounded-xl p-3 text-left transition hover:scale-[1.01]"
                  style={{
                    backgroundColor:
                      theme.surfaceLight,
                  }}
                >
                  <p
                    className="text-[10px]"
                    style={{
                      color: theme.primary,
                    }}
                  >
                    {event.time}
                  </p>

                  <p className="mt-1 text-xs font-semibold">
                    {event.title}
                  </p>

                  <p
                    className="mt-1 text-[9px]"
                    style={{
                      color: theme.textMuted,
                    }}
                  >
                    August {event.date}
                  </p>
                </button>
              ))}
            </div>
          </section>

          {/* AI SCHEDULER */}
          <section
            className="rounded-2xl border p-5"
            style={{
              backgroundColor: theme.surface,
              borderColor: theme.border,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: dark
                    ? "rgba(57,255,136,0.10)"
                    : "rgba(22,163,74,0.10)",
                }}
              >
                <Bot
                  size={18}
                  style={{
                    color: theme.primary,
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
                    color: theme.primary,
                  }}
                >
                  Active
                </p>
              </div>
            </div>

            <p
              className="mt-4 text-xs leading-5"
              style={{
                color: theme.textSecondary,
              }}
            >
              Your AI assistant can automatically find
              suitable meeting times and schedule events
              based on your availability.
            </p>

            <button
              type="button"
              onClick={askAI}
              className="mt-4 w-full rounded-xl py-2.5 text-xs font-semibold transition hover:scale-[1.01]"
              style={{
                backgroundColor: theme.surfaceLight,
                color: theme.primary,
              }}
            >
              Ask AI to Schedule
            </button>

            {aiMessage && (
              <div
                className="mt-3 rounded-xl p-3 text-[10px] leading-5"
                style={{
                  backgroundColor: dark
                    ? "rgba(57,255,136,0.08)"
                    : "rgba(22,163,74,0.08)",
                  color: theme.textSecondary,
                }}
              >
                {aiMessage}
              </div>
            )}
          </section>

          {/* MEETING TOOLS */}
          <section
            className="rounded-2xl border p-5"
            style={{
              backgroundColor: theme.surface,
              borderColor: theme.border,
            }}
          >
            <h2 className="text-sm font-semibold">
              Meeting Tools
            </h2>

            <div className="mt-4 space-y-2">
              <button
                type="button"
                onClick={startVideoMeeting}
                className="flex w-full items-center gap-3 rounded-xl p-3 text-left text-xs transition hover:scale-[1.01]"
                style={{
                  backgroundColor:
                    theme.surfaceLight,
                  color: theme.textSecondary,
                }}
              >
                <Video
                  size={15}
                  style={{
                    color: theme.primary,
                  }}
                />
                Start Video Meeting
              </button>

              <button
                type="button"
                onClick={manageParticipants}
                className="flex w-full items-center gap-3 rounded-xl p-3 text-left text-xs transition hover:scale-[1.01]"
                style={{
                  backgroundColor:
                    theme.surfaceLight,
                  color: theme.textSecondary,
                }}
              >
                <Users
                  size={15}
                  style={{
                    color: theme.primary,
                  }}
                />
                Manage Participants
              </button>
            </div>

            {meetingMessage && (
              <div
                className="mt-3 rounded-xl p-3 text-[10px]"
                style={{
                  backgroundColor: dark
                    ? "rgba(57,255,136,0.08)"
                    : "rgba(22,163,74,0.08)",
                  color: theme.textSecondary,
                }}
              >
                {meetingMessage}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div
            className="w-full max-w-lg rounded-2xl border p-6 shadow-2xl"
            style={{
              backgroundColor: theme.surface,
              borderColor: theme.border,
            }}
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">
                  {editingEvent
                    ? "Edit Event"
                    : "Add Event"}
                </h2>

                <p
                  className="mt-1 text-xs"
                  style={{
                    color: theme.textMuted,
                  }}
                >
                  Event for August {selectedDate}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                style={{
                  color: theme.textMuted,
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold">
                  Event Title
                </label>

                <input
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      title: e.target.value,
                    })
                  }
                  placeholder="e.g. Client Meeting"
                  className="w-full rounded-xl border px-3 py-2.5 text-xs outline-none"
                  style={{
                    backgroundColor:
                      theme.surfaceLight,
                    borderColor: theme.border,
                    color: theme.text,
                  }}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold">
                  Time
                </label>

                <input
                  value={newEvent.time}
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      time: e.target.value,
                    })
                  }
                  placeholder="10:00 AM"
                  className="w-full rounded-xl border px-3 py-2.5 text-xs outline-none"
                  style={{
                    backgroundColor:
                      theme.surfaceLight,
                    borderColor: theme.border,
                    color: theme.text,
                  }}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold">
                  Description
                </label>

                <textarea
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      description: e.target.value,
                    })
                  }
                  placeholder="Event details..."
                  rows={3}
                  className="w-full resize-none rounded-xl border px-3 py-2.5 text-xs outline-none"
                  style={{
                    backgroundColor:
                      theme.surfaceLight,
                    borderColor: theme.border,
                    color: theme.text,
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold">
                    Participants
                  </label>

                  <input
                    value={newEvent.people}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        people: e.target.value,
                      })
                    }
                    placeholder="4 participants"
                    className="w-full rounded-xl border px-3 py-2.5 text-xs outline-none"
                    style={{
                      backgroundColor:
                        theme.surfaceLight,
                      borderColor: theme.border,
                      color: theme.text,
                    }}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold">
                    Type
                  </label>

                  <select
                    value={newEvent.type}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        type: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border px-3 py-2.5 text-xs outline-none"
                    style={{
                      backgroundColor:
                        theme.surfaceLight,
                      borderColor: theme.border,
                      color: theme.text,
                    }}
                  >
                    <option value="Meeting">
                      Meeting
                    </option>
                    <option value="Team">
                      Team
                    </option>
                    <option value="Client">
                      Client
                    </option>
                    <option value="Planning">
                      Planning
                    </option>
                    <option value="AI">
                      AI
                    </option>
                  </select>
                </div>
              </div>

              <label
                className="flex cursor-pointer items-center gap-2 rounded-xl p-3 text-xs"
                style={{
                  backgroundColor:
                    theme.surfaceLight,
                }}
              >
                <input
                  type="checkbox"
                  checked={newEvent.ai}
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      ai: e.target.checked,
                    })
                  }
                />

                <Bot
                  size={14}
                  style={{
                    color: theme.primary,
                  }}
                />

                Mark as AI-assisted event
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded-xl px-4 py-2.5 text-xs font-semibold"
                style={{
                  backgroundColor:
                    theme.surfaceLight,
                  color: theme.textSecondary,
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={saveEvent}
                className="rounded-xl px-5 py-2.5 text-xs font-bold"
                style={{
                  backgroundColor: theme.primary,
                  color: dark
                    ? theme.black
                    : "#FFFFFF",
                }}
              >
                {editingEvent
                  ? "Save Changes"
                  : "Add Event"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
