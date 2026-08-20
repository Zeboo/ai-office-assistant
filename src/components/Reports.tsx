import {
  BarChart3,
  Download,
  FileText,
  TrendingUp,
  CheckCircle2,
  Clock3,
  Bot,
  CalendarDays,
} from "lucide-react";

import { colors } from "../theme/colors";

function Reports() {
  const reports = [
    {
      title: "Weekly Productivity Report",
      type: "Productivity",
      date: "Aug 18, 2026",
      status: "Ready",
      agent: "Analytics Agent",
    },
    {
      title: "Project Performance Report",
      type: "Project",
      date: "Aug 17, 2026",
      status: "Ready",
      agent: "Manager Agent",
    },
    {
      title: "AI Agent Activity Report",
      type: "AI Analytics",
      date: "Aug 16, 2026",
      status: "Ready",
      agent: "Analytics Agent",
    },
    {
      title: "Team Performance Report",
      type: "Team",
      date: "Aug 15, 2026",
      status: "Processing",
      agent: "Manager Agent",
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
            <BarChart3 size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              Reports
            </h1>

            <p
              className="text-sm"
              style={{
                color: colors.textMuted,
              }}
            >
              Analyze your workspace performance and activity
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
          <Download size={17} />
          Export Report
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
            Total Reports
          </p>

          <p className="mt-2 text-3xl font-bold">
            32
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
            Generated
          </p>

          <p
            className="mt-2 text-3xl font-bold"
            style={{
              color: colors.primary,
            }}
          >
            28
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
            This Week
          </p>

          <p className="mt-2 text-3xl font-bold">
            7
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
            Growth
          </p>

          <p
            className="mt-2 flex items-center gap-2 text-3xl font-bold"
            style={{
              color: colors.primary,
            }}
          >
            +18%
            <TrendingUp size={20} />
          </p>
        </div>
      </div>

      {/* PERFORMANCE */}
      <div className="mb-6 grid grid-cols-3 gap-5">
        <div
          className="col-span-2 rounded-2xl border p-6"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold">
                Productivity Overview
              </h2>

              <p
                className="mt-1 text-xs"
                style={{
                  color: colors.textMuted,
                }}
              >
                Workspace activity during the week
              </p>
            </div>

            <CalendarDays
              size={18}
              style={{
                color: colors.primary,
              }}
            />
          </div>

          <div className="flex h-48 items-end justify-between gap-5 px-3">
            {[
              ["Mon", 55],
              ["Tue", 72],
              ["Wed", 64],
              ["Thu", 86],
              ["Fri", 78],
              ["Sat", 48],
              ["Sun", 35],
            ].map(([day, value]) => (
              <div
                key={day}
                className="flex h-full flex-1 flex-col items-center justify-end gap-2"
              >
                <div
                  className="w-full max-w-[42px] rounded-t-lg"
                  style={{
                    height: `${value}%`,
                    backgroundColor: colors.primary,
                    opacity: 0.8,
                  }}
                />

                <span
                  className="text-[10px]"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  {day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SCORE */}
        <div
          className="rounded-2xl border p-6"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          <h2 className="text-sm font-semibold">
            Workspace Score
          </h2>

          <p
            className="mt-1 text-xs"
            style={{
              color: colors.textMuted,
            }}
          >
            Overall productivity
          </p>

          <div className="mt-8 text-center">
            <div
              className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border-[10px]"
              style={{
                borderColor: colors.primary,
              }}
            >
              <div>
                <p className="text-3xl font-bold">
                  92
                </p>

                <p
                  className="text-[10px]"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Excellent
                </p>
              </div>
            </div>
          </div>

          <div className="mt-7 flex items-center justify-between">
            <span
              className="text-xs"
              style={{
                color: colors.textMuted,
              }}
            >
              Previous score
            </span>

            <span
              className="text-xs font-semibold"
              style={{
                color: colors.primary,
              }}
            >
              86 → 92
            </span>
          </div>
        </div>
      </div>

      {/* REPORT LIST */}
      <section
        className="overflow-hidden rounded-2xl border"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
        }}
      >
        <div
          className="flex items-center justify-between border-b px-6 py-5"
          style={{
            borderColor: colors.border,
          }}
        >
          <div>
            <h2 className="text-sm font-semibold">
              Recent Reports
            </h2>

            <p
              className="mt-1 text-xs"
              style={{
                color: colors.textMuted,
              }}
            >
              AI-generated workspace reports
            </p>
          </div>

          <Bot
            size={18}
            style={{
              color: colors.primary,
            }}
          />
        </div>

        {reports.map((report) => (
          <div
            key={report.title}
            className="flex items-center justify-between border-b px-6 py-5 last:border-b-0"
            style={{
              borderColor: colors.border,
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  backgroundColor:
                    "rgba(57,255,136,0.10)",
                }}
              >
                <FileText
                  size={19}
                  style={{
                    color: colors.primary,
                  }}
                />
              </div>

              <div>
                <h3 className="text-sm font-semibold">
                  {report.title}
                </h3>

                <div className="mt-1 flex items-center gap-3">
                  <span
                    className="text-[10px]"
                    style={{
                      color: colors.textMuted,
                    }}
                  >
                    {report.type}
                  </span>

                  <span
                    className="flex items-center gap-1 text-[10px]"
                    style={{
                      color: colors.textMuted,
                    }}
                  >
                    <CalendarDays size={11} />
                    {report.date}
                  </span>

                  <span
                    className="flex items-center gap-1 text-[10px]"
                    style={{
                      color: colors.textMuted,
                    }}
                  >
                    <Bot size={11} />
                    {report.agent}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[10px] font-semibold"
                style={{
                  backgroundColor:
                    report.status === "Ready"
                      ? "rgba(57,255,136,0.10)"
                      : colors.surfaceLight,
                  color:
                    report.status === "Ready"
                      ? colors.primary
                      : colors.textMuted,
                }}
              >
                {report.status === "Ready" ? (
                  <CheckCircle2 size={12} />
                ) : (
                  <Clock3 size={12} />
                )}

                {report.status}
              </span>

              <button
                className="rounded-xl px-4 py-2 text-xs font-semibold"
                style={{
                  backgroundColor: colors.surfaceLight,
                  color: colors.text,
                }}
              >
                View
              </button>

              <button
                className="rounded-xl p-2"
                style={{
                  backgroundColor: colors.surfaceLight,
                  color: colors.textMuted,
                }}
              >
                <Download size={15} />
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Reports;