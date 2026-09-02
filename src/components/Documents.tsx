import { useMemo, useRef, useState } from "react";
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
  Eye,
  Pencil,
  Trash2,
  X,
  Sparkles,
  Download,
  FolderPlus,
} from "lucide-react";
import { darkColors, lightColors } from "../theme/colors";

type DocumentItem = {
  id: number;
  name: string;
  type: string;
  category: string;
  size: string;
  updated: string;
  agent: string;
};

type FolderItem = {
  id: number;
  name: string;
  count: number;
};
function Documents({
  themeMode,
}: {
  themeMode: "dark" | "light";
}) {
  const colors =
    themeMode === "dark" ? darkColors : lightColors;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: 1,
      name: "AI Virtual Office Requirements",
      type: "PDF",
      category: "Project",
      size: "2.4 MB",
      updated: "Today",
      agent: "Document Agent",
    },
    {
      id: 2,
      name: "Project Proposal",
      type: "DOCX",
      category: "Business",
      size: "1.8 MB",
      updated: "Yesterday",
      agent: "Document Agent",
    },
    {
      id: 3,
      name: "Market Research Report",
      type: "PDF",
      category: "Research",
      size: "4.2 MB",
      updated: "Aug 18",
      agent: "Research Agent",
    },
    {
      id: 4,
      name: "Team Performance",
      type: "XLSX",
      category: "Reports",
      size: "856 KB",
      updated: "Aug 17",
      agent: "Manager Agent",
    },
    {
      id: 5,
      name: "Project Presentation",
      type: "PPTX",
      category: "Presentation",
      size: "6.5 MB",
      updated: "Aug 16",
      agent: "Document Agent",
    },
  ]);

  const [folders, setFolders] = useState<FolderItem[]>([
    { id: 1, name: "Projects", count: 24 },
    { id: 2, name: "Business", count: 18 },
    { id: 3, name: "Research", count: 16 },
    { id: 4, name: "Reports", count: 12 },
  ]);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedDocument, setSelectedDocument] =
    useState<DocumentItem | null>(null);

  const [menuDocumentId, setMenuDocumentId] =
    useState<number | null>(null);

  const [showNewDocument, setShowNewDocument] =
    useState(false);

  const [showNewFolder, setShowNewFolder] =
    useState(false);

  const [showAI, setShowAI] = useState(false);

  const [newDocumentName, setNewDocumentName] =
    useState("");

  const [newDocumentCategory, setNewDocumentCategory] =
    useState("Project");

  const [newFolderName, setNewFolderName] =
    useState("");

  const [aiMessage, setAiMessage] =
    useState("");

  const categories = [
    "All",
    "Project",
    "Business",
    "Research",
    "Reports",
    "Presentation",
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

  const filteredDocuments = useMemo(() => {
    return documents.filter((document) => {
      const matchesSearch =
        document.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        activeCategory === "All" ||
        document.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [documents, search, activeCategory]);

  const totalDocuments = documents.length;

  const recentDocuments = documents.filter(
    (document) =>
      document.updated === "Today" ||
      document.updated === "Yesterday"
  ).length;

  const aiProcessed = documents.filter(
    (document) =>
      document.agent === "Document Agent" ||
      document.agent === "Research Agent" ||
      document.agent === "Manager Agent"
  ).length;

  const handleCreateDocument = () => {
    if (!newDocumentName.trim()) {
      alert("Please enter a document name.");
      return;
    }

    const newDocument: DocumentItem = {
      id: Date.now(),
      name: newDocumentName.trim(),
      type: "DOCX",
      category: newDocumentCategory,
      size: "0 KB",
      updated: "Just now",
      agent: "Document Agent",
    };

    setDocuments((previous) => [
      newDocument,
      ...previous,
    ]);

    setNewDocumentName("");
    setNewDocumentCategory("Project");
    setShowNewDocument(false);
  };

  const handleDeleteDocument = (id: number) => {
    const document = documents.find(
      (item) => item.id === id
    );

    if (!document) return;

    const confirmed = window.confirm(
      `Delete "${document.name}"?`
    );

    if (!confirmed) return;

    setDocuments((previous) =>
      previous.filter((item) => item.id !== id)
    );

    setMenuDocumentId(null);
  };

  const handleRenameDocument = (id: number) => {
    const document = documents.find(
      (item) => item.id === id
    );

    if (!document) return;

    const newName = window.prompt(
      "Enter new document name:",
      document.name
    );

    if (!newName?.trim()) return;

    setDocuments((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              name: newName.trim(),
              updated: "Just now",
            }
          : item
      )
    );

    setMenuDocumentId(null);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const extension =
      file.name.split(".").pop()?.toUpperCase() || "FILE";

    const fileSize =
      file.size >= 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.max(
            1,
            Math.round(file.size / 1024)
          )} KB`;

    const uploadedDocument: DocumentItem = {
      id: Date.now(),
      name: file.name,
      type: extension,
      category: "Project",
      size: fileSize,
      updated: "Just now",
      agent: "Document Agent",
    };

    setDocuments((previous) => [
      uploadedDocument,
      ...previous,
    ]);

    event.target.value = "";
  };

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) {
      alert("Please enter a folder name.");
      return;
    }

    const newFolder: FolderItem = {
      id: Date.now(),
      name: newFolderName.trim(),
      count: 0,
    };

    setFolders((previous) => [
      ...previous,
      newFolder,
    ]);

    setNewFolderName("");
    setShowNewFolder(false);
  };

  
  const handleDownload = (document: DocumentItem) => {
    alert(
      `Download requested for "${document.name}". Backend file storage will be connected later.`
    );
  };

  return (
    <div
      className="min-h-[calc(100vh-80px)] p-8"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
      }}
      onClick={() => setMenuDocumentId(null)}
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
          {/* UPLOAD */}
          <button
            type="button"
            onClick={handleUploadClick}
            className="flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition hover:scale-[1.02]"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
              color: colors.text,
            }}
          >
            <Upload size={17} />
            Upload
          </button>

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileUpload}
          />

          {/* NEW DOCUMENT */}
          <button
            type="button"
            onClick={() => setShowNewDocument(true)}
            className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition hover:scale-[1.02]"
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
        {[
          {
            title: "Total Documents",
            value: totalDocuments,
          },
          {
            title: "Recent",
            value: recentDocuments,
          },
          {
            title: "AI Processed",
            value: aiProcessed,
          },
          {
            title: "Storage Used",
            value: "2.8 GB",
          },
        ].map((item) => (
          <div
            key={item.title}
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
              {item.title}
            </p>

            <p
              className="mt-2 text-3xl font-bold"
              style={{
                color:
                  item.title === "Recent"
                    ? colors.primary
                    : colors.text,
              }}
            >
              {item.value}
            </p>
          </div>
        ))}
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
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search documents..."
            className="flex-1 bg-transparent text-sm outline-none"
            style={{
              color: colors.text,
            }}
          />
        </div>

        <div className="flex items-center gap-2">
          {categories.map((category) => {
            const active =
              activeCategory === category;

            return (
              <button
                type="button"
                key={category}
                onClick={() =>
                  setActiveCategory(category)
                }
                className="rounded-lg px-3 py-2 text-xs font-medium transition hover:scale-[1.02]"
                style={{
                  backgroundColor: active
                    ? colors.primary
                    : colors.surfaceLight,
                  color: active
                    ? colors.black
                    : colors.textSecondary,
                }}
              >
                {category}
              </button>
            );
          })}
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

          {filteredDocuments.length === 0 ? (
            <div className="flex min-h-60 flex-col items-center justify-center p-8 text-center">
              <FileText
                size={36}
                style={{
                  color: colors.textMuted,
                }}
              />

              <p className="mt-3 text-sm font-semibold">
                No documents found
              </p>

              <p
                className="mt-1 text-xs"
                style={{
                  color: colors.textMuted,
                }}
              >
                Try another search or category.
              </p>
            </div>
          ) : (
            filteredDocuments.map((document) => (
              <div
                key={document.id}
                className="grid grid-cols-[2fr_0.8fr_1fr_0.8fr_1fr_40px] items-center gap-4 border-b px-5 py-5 last:border-b-0"
                style={{
                  borderColor: colors.border,
                }}
              >
                {/* NAME */}
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor:
                        "rgba(57,255,136,0.10)",
                    }}
                  >
                    {getFileIcon(document.type)}
                  </div>

                  <div className="min-w-0">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedDocument(document)
                      }
                      className="block max-w-full truncate text-left text-sm font-semibold hover:underline"
                    >
                      {document.name}
                    </button>

                    <div className="mt-1 flex items-center gap-1.5">
                      <Bot
                        size={11}
                        style={{
                          color: colors.primary,
                        }}
                      />

                      <span
                        className="truncate text-[9px]"
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
                    backgroundColor:
                      colors.surfaceLight,
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
                <div
                  className="relative"
                  onClick={(event) =>
                    event.stopPropagation()
                  }
                >
                  <button
                    type="button"
                    onClick={() =>
                      setMenuDocumentId(
                        menuDocumentId === document.id
                          ? null
                          : document.id
                      )
                    }
                    className="rounded-lg p-2 transition hover:scale-105"
                    style={{
                      color: colors.textMuted,
                    }}
                  >
                    <MoreHorizontal size={18} />
                  </button>

                  {menuDocumentId === document.id && (
                    <div
                      className="absolute right-0 top-10 z-20 w-44 rounded-xl border p-1 shadow-xl"
                      style={{
                        backgroundColor:
                          colors.surface,
                        borderColor: colors.border,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedDocument(document);
                          setMenuDocumentId(null);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs hover:opacity-70"
                      >
                        <Eye size={14} />
                        View
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleRenameDocument(
                            document.id
                          )
                        }
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs hover:opacity-70"
                      >
                        <Pencil size={14} />
                        Rename
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDownload(document)
                        }
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs hover:opacity-70"
                      >
                        <Download size={14} />
                        Download
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteDocument(
                            document.id
                          )
                        }
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs"
                        style={{
                          color: "#ef4444",
                        }}
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
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

              <button
                type="button"
                onClick={() => setShowNewFolder(true)}
                className="rounded-lg p-2 transition hover:scale-105"
                style={{
                  color: colors.primary,
                }}
                title="Create folder"
              >
                <FolderPlus size={17} />
              </button>
            </div>

            <div className="space-y-2">
              {folders.map((folder) => (
                <button
                  type="button"
                  key={folder.id}
                  onClick={() =>
                    setActiveCategory(folder.name)
                  }
                  className="flex w-full items-center justify-between rounded-xl p-3 text-left transition hover:scale-[1.01]"
                  style={{
                    backgroundColor:
                      colors.surfaceLight,
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
                      {folder.name}
                    </span>
                  </div>

                  <span
                    className="text-[10px]"
                    style={{
                      color: colors.textMuted,
                    }}
                  >
                    {folder.count} files
                  </span>
                </button>
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
              type="button"
              onClick={() => setShowAI(true)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition hover:scale-[1.01]"
              style={{
                backgroundColor:
                  colors.surfaceLight,
                color: colors.primary,
              }}
            >
              <Sparkles size={14} />
              Ask Document AI
            </button>

            {aiMessage && (
              <div
                className="mt-3 rounded-xl p-3 text-[10px] leading-4"
                style={{
                  backgroundColor:
                    "rgba(57,255,136,0.08)",
                  color: colors.textSecondary,
                }}
              >
                {aiMessage}
              </div>
            )}
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
                backgroundColor:
                  colors.surfaceLight,
              }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: "28%",
                  backgroundColor:
                    colors.primary,
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

      {/* NEW DOCUMENT MODAL */}
      {showNewDocument && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{
            backgroundColor: "rgba(0,0,0,0.65)",
          }}
          onClick={() =>
            setShowNewDocument(false)
          }
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
              <h2 className="text-lg font-bold">
                Create New Document
              </h2>

              <button
                type="button"
                onClick={() =>
                  setShowNewDocument(false)
                }
                style={{
                  color: colors.textMuted,
                }}
              >
                <X size={19} />
              </button>
            </div>

            <input
              value={newDocumentName}
              onChange={(event) =>
                setNewDocumentName(
                  event.target.value
                )
              }
              placeholder="Document name"
              className="mt-5 w-full rounded-xl border px-4 py-3 text-sm outline-none"
              style={{
                backgroundColor:
                  colors.background,
                borderColor: colors.border,
                color: colors.text,
              }}
            />

            <select
              value={newDocumentCategory}
              onChange={(event) =>
                setNewDocumentCategory(
                  event.target.value
                )
              }
              className="mt-3 w-full rounded-xl border px-4 py-3 text-sm outline-none"
              style={{
                backgroundColor:
                  colors.background,
                borderColor: colors.border,
                color: colors.text,
              }}
            >
              {categories
                .filter(
                  (category) => category !== "All"
                )
                .map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
            </select>

            <button
              type="button"
              onClick={handleCreateDocument}
              className="mt-5 w-full rounded-xl py-3 text-sm font-bold"
              style={{
                backgroundColor:
                  colors.primary,
                color: colors.black,
              }}
            >
              Create Document
            </button>
          </div>
        </div>
      )}

      {/* NEW FOLDER MODAL */}
      {showNewFolder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{
            backgroundColor: "rgba(0,0,0,0.65)",
          }}
          onClick={() =>
            setShowNewFolder(false)
          }
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
              <h2 className="text-lg font-bold">
                Create Folder
              </h2>

              <button
                type="button"
                onClick={() =>
                  setShowNewFolder(false)
                }
                style={{
                  color: colors.textMuted,
                }}
              >
                <X size={19} />
              </button>
            </div>

            <input
              value={newFolderName}
              onChange={(event) =>
                setNewFolderName(
                  event.target.value
                )
              }
              placeholder="Folder name"
              className="mt-5 w-full rounded-xl border px-4 py-3 text-sm outline-none"
              style={{
                backgroundColor:
                  colors.background,
                borderColor: colors.border,
                color: colors.text,
              }}
            />

            <button
              type="button"
              onClick={handleCreateFolder}
              className="mt-5 w-full rounded-xl py-3 text-sm font-bold"
              style={{
                backgroundColor:
                  colors.primary,
                color: colors.black,
              }}
            >
              Create Folder
            </button>
          </div>
        </div>
      )}

      {/* VIEW DOCUMENT MODAL */}
      {selectedDocument && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{
            backgroundColor: "rgba(0,0,0,0.65)",
          }}
          onClick={() =>
            setSelectedDocument(null)
          }
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
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor:
                      "rgba(57,255,136,0.10)",
                  }}
                >
                  {getFileIcon(
                    selectedDocument.type
                  )}
                </div>

                <div>
                  <h2 className="text-base font-bold">
                    {selectedDocument.name}
                  </h2>

                  <p
                    className="mt-1 text-xs"
                    style={{
                      color: colors.textMuted,
                    }}
                  >
                    {selectedDocument.type} •{" "}
                    {selectedDocument.size}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedDocument(null)
                }
                style={{
                  color: colors.textMuted,
                }}
              >
                <X size={19} />
              </button>
            </div>

            <div
              className="mt-5 space-y-3 rounded-xl p-4"
              style={{
                backgroundColor:
                  colors.surfaceLight,
              }}
            >
              <div className="flex justify-between text-xs">
                <span
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Category
                </span>

                <span>
                  {selectedDocument.category}
                </span>
              </div>

              <div className="flex justify-between text-xs">
                <span
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Updated
                </span>

                <span>
                  {selectedDocument.updated}
                </span>
              </div>

              <div className="flex justify-between text-xs">
                <span
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  AI Agent
                </span>

                <span>
                  {selectedDocument.agent}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                handleDownload(selectedDocument)
              }
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold"
              style={{
                backgroundColor:
                  colors.primary,
                color: colors.black,
              }}
            >
              <Download size={16} />
              Download Document
            </button>
          </div>
        </div>
      )}

      {/* AI MODAL */}
      {showAI && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{
            backgroundColor: "rgba(0,0,0,0.65)",
          }}
          onClick={() => setShowAI(false)}
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
              <div className="flex items-center gap-3">
                <Sparkles
                  size={20}
                  style={{
                    color: colors.primary,
                  }}
                />

                <h2 className="text-lg font-bold">
                  Document AI
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowAI(false)}
                style={{
                  color: colors.textMuted,
                }}
              >
                <X size={19} />
              </button>
            </div>

            <p
              className="mt-4 text-xs leading-5"
              style={{
                color: colors.textSecondary,
              }}
            >
              Choose an AI action for your workspace
              documents.
            </p>

            <div className="mt-5 space-y-2">
              {[
                "Summarize documents",
                "Extract important information",
                "Categorize documents",
                "Create a report",
              ].map((action) => (
                <button
                  type="button"
                  key={action}
                  onClick={() => {
                    setAiMessage(
                      `Document Agent selected: ${action}.`
                    );
                    setShowAI(false);
                  }}
                  className="w-full rounded-xl p-3 text-left text-xs font-semibold transition hover:scale-[1.01]"
                  style={{
                    backgroundColor:
                      colors.surfaceLight,
                    color: colors.text,
                  }}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Documents;