import {
  FileText,
  Plus,
  Search,
  Upload,
  Folder,
  File,
  FileSpreadsheet,
  Presentation,
  Bot,
  MoreHorizontal,
  Clock3,
} from "lucide-react";

import { colors } from "../theme/colors";

function Documents() {
  const documents = [
    {
      name: "AI Virtual Office Requirements",
      type: "PDF",
      category: "Project",
      size: "2.4 MB",
      updated: "Today",
      agent: "Document Agent",
    },
    {
      name: "Project Proposal",
      type: "DOCX",
      category: "Business",
      size: "1.8 MB",
      updated: "Yesterday",
      agent: "Document Agent",
    },
    {
      name: "Market Research Report",
      type: "PDF",
      category: "Research",
      size: "4.2 MB",
      updated: "Aug 18",
      agent: "Research Agent",
    },
    {
      name: "Team Performance",
      type: "XLSX",
      category: "Reports",
      size: "856 KB",
      updated: "Aug 17",
      agent: "Manager Agent",
    },
    {
      name: "Project Presentation",
      type: "PPTX",
      category: "Presentation",
      size: "6.5 MB",
      updated: "Aug 16",
      agent: "Document Agent",
    },
  ];

  const getFileIcon = (type: string) => {
    if (type === "XLSX") {
      return (
        <FileSpreadsheet
          size={20}
          style={{ color: colors.primary }}
        />
      );
    }

    if (type === "PPTX") {
      return (
        <Presentation
          size={20}
          style={{ color: colors.primary }}
        />
      );
    }

    if (type === "PDF") {
      return (
        <FileText
          size={20}
          style={{ color: colors.primary }}
        />
      );
    }

    return (
      <File
        size={20}
        style={{ color: colors.primary }}
      />
    );
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
            <FileText size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              Documents
            </h1>

            <p
              className="text-sm"
              style={{
                color: colors.textMuted,
              }}
            >
              Store, organize and manage your workspace documents
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
              color: colors.text,
            }}
          >
            <Upload size={17} />
            Upload
          </button>

          <button
            className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold"
            style={{
              backgroundColor: colors.primary,
              color: colors.black,
            }}
          >
            <Plus size={18} />
            New Document
          </button>
        </div>
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
            Total Documents
          </p>

          <p className="mt-2 text-3xl font-bold">
            86
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
            Recent
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
            AI Processed
          </p>

          <p className="mt-2 text-3xl font-bold">
            42
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
            Storage Used
          </p>

          <p className="mt-2 text-3xl font-bold">
            2.8 GB
          </p>
        </div>
      </div>

      {/* SEARCH + CATEGORIES */}
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
            placeholder="Search documents..."
            className="flex-1 bg-transparent text-sm outline-none"
            style={{
              color: colors.text,
            }}
          />
        </div>

        <div className="flex items-center gap-2">
          {[
            "All",
            "Project",
            "Business",
            "Research",
            "Reports",
          ].map((category, index) => (
            <button
              key={category}
              className="rounded-lg px-3 py-2 text-xs font-medium"
              style={{
                backgroundColor:
                  index === 0
                    ? colors.primary
                    : colors.surfaceLight,
                color:
                  index === 0
                    ? colors.black
                    : colors.textSecondary,
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-3 gap-6">

        {/* DOCUMENT LIST */}
        <section
          className="col-span-2 overflow-hidden rounded-2xl border"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          {/* HEADER */}
          <div
            className="grid grid-cols-[2fr_0.8fr_1fr_0.8fr_1fr_40px] gap-4 border-b px-5 py-4 text-[10px] font-semibold uppercase tracking-wider"
            style={{
              borderColor: colors.border,
              color: colors.textMuted,
            }}
          >
            <span>Document</span>
            <span>Type</span>
            <span>Category</span>
            <span>Size</span>
            <span>Updated</span>
            <span></span>
          </div>

          {documents.map((document) => (
            <div
              key={document.name}
              className="grid grid-cols-[2fr_0.8fr_1fr_0.8fr_1fr_40px] items-center gap-4 border-b px-5 py-5 last:border-b-0"
              style={{
                borderColor: colors.border,
              }}
            >
              {/* NAME */}
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor:
                      "rgba(57,255,136,0.10)",
                  }}
                >
                  {getFileIcon(document.type)}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {document.name}
                  </p>

                  <div className="mt-1 flex items-center gap-1.5">
                    <Bot
                      size={11}
                      style={{
                        color: colors.primary,
                      }}
                    />

                    <span
                      className="text-[9px]"
                      style={{
                        color: colors.textMuted,
                      }}
                    >
                      {document.agent}
                    </span>
                  </div>
                </div>
              </div>

              {/* TYPE */}
              <span
                className="w-fit rounded-md px-2 py-1 text-[9px] font-semibold"
                style={{
                  backgroundColor: colors.surfaceLight,
                  color: colors.textSecondary,
                }}
              >
                {document.type}
              </span>

              {/* CATEGORY */}
              <span
                className="text-xs"
                style={{
                  color: colors.textSecondary,
                }}
              >
                {document.category}
              </span>

              {/* SIZE */}
              <span
                className="text-xs"
                style={{
                  color: colors.textMuted,
                }}
              >
                {document.size}
              </span>

              {/* UPDATED */}
              <div
                className="flex items-center gap-1.5 text-xs"
                style={{
                  color: colors.textMuted,
                }}
              >
                <Clock3 size={13} />
                {document.updated}
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
        </section>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-5">

          {/* FOLDERS */}
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
                  Folders
                </h2>

                <p
                  className="mt-1 text-xs"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Organize your files
                </p>
              </div>

              <Folder
                size={17}
                style={{
                  color: colors.primary,
                }}
              />
            </div>

            <div className="space-y-2">
              {[
                ["Projects", "24 files"],
                ["Business", "18 files"],
                ["Research", "16 files"],
                ["Reports", "12 files"],
              ].map(([name, count]) => (
                <div
                  key={name}
                  className="flex items-center justify-between rounded-xl p-3"
                  style={{
                    backgroundColor: colors.surfaceLight,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Folder
                      size={15}
                      style={{
                        color: colors.primary,
                      }}
                    />

                    <span className="text-xs font-medium">
                      {name}
                    </span>
                  </div>

                  <span
                    className="text-[10px]"
                    style={{
                      color: colors.textMuted,
                    }}
                  >
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* AI DOCUMENT AGENT */}
          <section
            className="rounded-2xl border p-5"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  backgroundColor:
                    "rgba(57,255,136,0.10)",
                }}
              >
                <Bot
                  size={19}
                  style={{
                    color: colors.primary,
                  }}
                />
              </div>

              <div>
                <h2 className="text-sm font-semibold">
                  Document Agent
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
              AI can summarize documents, extract important
              information, categorize files and create
              reports automatically.
            </p>

            <button
              className="mt-4 w-full rounded-xl py-2.5 text-xs font-semibold"
              style={{
                backgroundColor: colors.surfaceLight,
                color: colors.primary,
              }}
            >
              Ask Document AI
            </button>
          </section>

          {/* STORAGE */}
          <section
            className="rounded-2xl border p-5"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold">
                Storage
              </span>

              <span
                className="text-xs"
                style={{
                  color: colors.textMuted,
                }}
              >
                2.8 / 10 GB
              </span>
            </div>

            <div
              className="mt-3 h-2 rounded-full"
              style={{
                backgroundColor: colors.surfaceLight,
              }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: "28%",
                  backgroundColor: colors.primary,
                }}
              />
            </div>

            <p
              className="mt-2 text-[10px]"
              style={{
                color: colors.textMuted,
              }}
            >
              7.2 GB remaining
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Documents;