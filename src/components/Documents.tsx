import { useEffect, useMemo, useRef, useState } from "react";
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
  Loader2,
} from "lucide-react";
import { darkColors, lightColors } from "../theme/colors";

const API_URL = "http://localhost:3000";

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

type BackendDocument = {
  id: number;
  name: string;
  type: string;
  category: string;
  size: string;
  agent: string;
  filePath: string | null;
  createdAt: string;
  updatedAt: string;
};

type BackendFolder = {
  id: number;
  name: string;
  count: number;
  createdAt: string;
  updatedAt: string;
};

type DocumentAIResponse = {
  success: boolean;
  documentId: number;
  documentName: string;
  result: string;
};

function Documents({
  themeMode,
}: {
  themeMode: "dark" | "light";
}) {
  const colors =
    themeMode === "dark" ? darkColors : lightColors;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [folders, setFolders] = useState<FolderItem[]>([]);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const [selectedDocument, setSelectedDocument] =
    useState<DocumentItem | null>(null);

const [viewDocument, setViewDocument] =
  useState<DocumentItem | null>(null);

  const [menuDocumentId, setMenuDocumentId] =
    useState<number | null>(null);

  const [showNewDocument, setShowNewDocument] =
    useState(false);

  const [showNewFolder, setShowNewFolder] =
    useState(false);

  const [showAI, setShowAI] = useState(false);
  const [showAIResult, setShowAIResult] = useState(false);

  const [newDocumentName, setNewDocumentName] =
    useState("");

  const [newDocumentCategory, setNewDocumentCategory] =
    useState("Project");

  const [newFolderName, setNewFolderName] =
    useState("");

  const [aiMessage, setAiMessage] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState("");
  const [aiDocumentName, setAiDocumentName] = useState("");

  const categories = [
    "All",
    "Project",
    "Business",
    "Research",
    "Reports",
    "Presentation",
  ];

  const formatUpdatedDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();

    const diffMs = now.getTime() - date.getTime();

    const diffHours = Math.floor(
      diffMs / (1000 * 60 * 60)
    );

    if (diffHours < 24) {
      return "Today";
    }

    if (diffHours < 48) {
      return "Yesterday";
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const loadDocuments = async () => {
    try {
      const response = await fetch(
        `${API_URL}/documents`
      );

      if (!response.ok) {
        throw new Error("Failed to load documents");
      }

      const data: BackendDocument[] =
        await response.json();

      const mappedDocuments: DocumentItem[] =
        data.map((document) => ({
          id: document.id,
          name: document.name,
          type: document.type,
          category: document.category,
          size: document.size,
          updated: formatUpdatedDate(
            document.updatedAt
          ),
          agent: document.agent,
        }));

      setDocuments(mappedDocuments);
    } catch (error) {
      console.error(
        "Failed to load documents:",
        error
      );
    }
  };

  const loadFolders = async () => {
    try {
      const response = await fetch(
        `${API_URL}/documents/folders/list`
      );

      if (!response.ok) {
        throw new Error("Failed to load folders");
      }

      const data: BackendFolder[] =
        await response.json();

      setFolders(
        data.map((folder) => ({
          id: folder.id,
          name: folder.name,
          count: folder.count,
        }))
      );
    } catch (error) {
      console.error(
        "Failed to load folders:",
        error
      );
    }
  };

  useEffect(() => {
    loadDocuments();
    loadFolders();
  }, []);

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

  const handleCreateDocument = async () => {
    if (!newDocumentName.trim()) {
      alert("Please enter a document name.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/documents`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newDocumentName.trim(),
            type: "DOCX",
            category: newDocumentCategory,
            size: "0 KB",
            agent: "Document Agent",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to create document"
        );
      }

      await loadDocuments();
      await loadFolders();

      setNewDocumentName("");
      setNewDocumentCategory("Project");
      setShowNewDocument(false);
    } catch (error) {
      console.error(
        "Failed to create document:",
        error
      );

      alert("Failed to create document.");
    }
  };

  const handleDeleteDocument = async (id: number) => {
    const document = documents.find(
      (item) => item.id === id
    );

    if (!document) return;

    const confirmed = window.confirm(
      `Delete "${document.name}"?`
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API_URL}/documents/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to delete document"
        );
      }

      setDocuments((previous) =>
        previous.filter(
          (item) => item.id !== id
        )
      );

      await loadFolders();

      setMenuDocumentId(null);

      if (selectedDocument?.id === id) {
        setSelectedDocument(null);
      }
    } catch (error) {
      console.error(
        "Failed to delete document:",
        error
      );

      alert("Failed to delete document.");
    }
  };

  const handleRenameDocument = async (id: number) => {
    const document = documents.find(
      (item) => item.id === id
    );

    if (!document) return;

    const newName = window.prompt(
      "Enter new document name:",
      document.name
    );

    if (!newName?.trim()) return;

    try {
      const response = await fetch(
        `${API_URL}/documents/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newName.trim(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to rename document"
        );
      }

      await loadDocuments();

      setMenuDocumentId(null);

      if (selectedDocument?.id === id) {
        setSelectedDocument((previous) =>
          previous
            ? {
                ...previous,
                name: newName.trim(),
                updated: "Today",
              }
            : null
        );
      }
    } catch (error) {
      console.error(
        "Failed to rename document:",
        error
      );

      alert("Failed to rename document.");
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch(
        `${API_URL}/documents/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to upload document"
        );
      }

      await response.json();

      await loadDocuments();
      await loadFolders();

      event.target.value = "";
    } catch (error) {
      console.error(
        "Failed to upload document:",
        error
      );

      alert("Failed to upload document.");

      event.target.value = "";
    }
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) {
      alert("Please enter a folder name.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/documents/folders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newFolderName.trim(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to create folder"
        );
      }

      await loadFolders();

      setNewFolderName("");
      setShowNewFolder(false);
    } catch (error) {
      console.error(
        "Failed to create folder:",
        error
      );

      alert("Failed to create folder.");
    }
  };

  const handleDownload = (
    document: DocumentItem
  ) => {
    const downloadUrl =
      `${API_URL}/documents/${document.id}/download`;

    window.open(downloadUrl, "_blank");
  };

  // REAL DOCUMENT AI
  const handleDocumentAI = async () => {
    if (!selectedDocument) {
      setShowAI(false);

      setAiMessage(
        "Please select a document first."
      );

      return;
    }

    if (
      selectedDocument.type.toUpperCase() !==
      "PDF"
    ) {
      setShowAI(false);

      setAiMessage(
        "Document AI currently supports PDF files."
      );

      return;
    }

    setAiLoading(true);
    setAiResult("");
    setAiDocumentName(
      selectedDocument.name
    );

    setShowAI(false);
    setShowAIResult(true);

    try {
      const response = await fetch(
        `${API_URL}/documents/${selectedDocument.id}/analyze`,
        {
          method: "POST",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Document AI analysis failed."
        );
      }

      const result: DocumentAIResponse =
        data;

      setAiResult(result.result);

      setAiMessage(
        `Document AI analyzed "${result.documentName}".`
      );
    } catch (error) {
      console.error(
        "Document AI error:",
        error
      );

      setAiResult(
        error instanceof Error
          ? error.message
          : "Document AI analysis failed."
      );
    } finally {
      setAiLoading(false);
    }
  };

  const getAISection = (
    heading: string
  ) => {
    if (!aiResult) return "";

    const upperResult =
      aiResult.toUpperCase();

    const headingIndex =
      upperResult.indexOf(
        heading.toUpperCase()
      );

    if (headingIndex === -1) {
      return "";
    }

    const contentStart =
      headingIndex + heading.length;

    const remaining =
      aiResult.substring(contentStart);

    const nextHeadings = [
      "SUMMARY:",
      "KEY POINTS:",
      "IMPORTANT INFORMATION:",
    ].filter(
      (item) =>
        item.toUpperCase() !==
        heading.toUpperCase()
    );

    let endIndex =
      remaining.length;

    nextHeadings.forEach(
      (nextHeading) => {
        const index =
          remaining
            .toUpperCase()
            .indexOf(nextHeading);

        if (
          index !== -1 &&
          index < endIndex
        ) {
          endIndex = index;
        }
      }
    );

    return remaining
      .substring(0, endIndex)
      .trim();
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
              backgroundColor:
                colors.primary,
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
              Store, organize and manage your
              workspace documents
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleUploadClick}
            className="flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition hover:scale-[1.02]"
            style={{
              backgroundColor:
                colors.surface,
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

          <button
            type="button"
            onClick={() =>
              setShowNewDocument(true)
            }
            className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition hover:scale-[1.02]"
            style={{
              backgroundColor:
                colors.primary,
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
              backgroundColor:
                colors.surface,
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
          backgroundColor:
            colors.surface,
          borderColor: colors.border,
        }}
      >
        <div
          className="flex w-80 items-center gap-2 rounded-xl border px-3 py-2.5"
          style={{
            backgroundColor:
              colors.background,
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
            backgroundColor:
              colors.surface,
            borderColor: colors.border,
          }}
        >
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
            filteredDocuments.map(
              (document) => (
                
<div
  key={document.id}
  onClick={() => setSelectedDocument(document)}
  className="grid grid-cols-[2fr_0.8fr_1fr_0.8fr_1fr_40px] items-center gap-4 border-b px-5 py-5 last:border-b-0 cursor-pointer"

                  style={{
                    borderColor:
                      colors.border,
                    backgroundColor:
                      selectedDocument?.id ===
                      document.id
                        ? "rgba(57,255,136,0.05)"
                        : "transparent",
                  }}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor:
                          "rgba(57,255,136,0.10)",
                      }}
                    >
                      {getFileIcon(
                        document.type
                      )}
                    </div>

                    <div className="min-w-0">
                    <div
  onClick={(event) => {
    event.stopPropagation();
    setSelectedDocument(document);
  }}
  className="block max-w-full cursor-pointer truncate text-left text-sm font-semibold hover:underline"
>
  {document.name}
</div>
                      <div className="mt-1 flex items-center gap-1.5">
                        <Bot
                          size={11}
                          style={{
                            color:
                              colors.primary,
                          }}
                        />

                        <span
                          className="truncate text-[9px]"
                          style={{
                            color:
                              colors.textMuted,
                          }}
                        >
                          {document.agent}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span
                    className="w-fit rounded-md px-2 py-1 text-[9px] font-semibold"
                    style={{
                      backgroundColor:
                        colors.surfaceLight,
                      color:
                        colors.textSecondary,
                    }}
                  >
                    {document.type}
                  </span>

                  <span
                    className="text-xs"
                    style={{
                      color:
                        colors.textSecondary,
                    }}
                  >
                    {document.category}
                  </span>

                  <span
                    className="text-xs"
                    style={{
                      color:
                        colors.textMuted,
                    }}
                  >
                    {document.size}
                  </span>

                  <div
                    className="flex items-center gap-1.5 text-xs"
                    style={{
                      color:
                        colors.textMuted,
                    }}
                  >
                    <Clock3 size={13} />
                    {document.updated}
                  </div>

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
                          menuDocumentId ===
                            document.id
                            ? null
                            : document.id
                        )
                      }
                      className="rounded-lg p-2 transition hover:scale-105"
                      style={{
                        color:
                          colors.textMuted,
                      }}
                    >
                      <MoreHorizontal
                        size={18}
                      />
                    </button>

                    {menuDocumentId ===
                      document.id && (
                      <div
                        className="absolute right-0 top-10 z-20 w-44 rounded-xl border p-1 shadow-xl"
                        style={{
                          backgroundColor:
                            colors.surface,
                          borderColor:
                            colors.border,
                        }}
                      >
                        <button
                          type="button"
                        
onClick={() => {
  setViewDocument(document);
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
                            handleDownload(
                              document
                            )
                          }
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs hover:opacity-70"
                        >
                          <Download
                            size={14}
                          />
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
              )
            )
          )}
        </section>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-5">
          {/* FOLDERS */}
          <section
            className="rounded-2xl border p-5"
            style={{
              backgroundColor:
                colors.surface,
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
                    color:
                      colors.textMuted,
                  }}
                >
                  Organize your files
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowNewFolder(true)
                }
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
                  onClick={() => {
                    const matchingCategory =
                      folder.name ===
                      "Projects"
                        ? "Project"
                        : folder.name;

                    if (
                      categories.includes(
                        matchingCategory
                      )
                    ) {
                      setActiveCategory(
                        matchingCategory
                      );
                    }
                  }}
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
                        color:
                          colors.primary,
                      }}
                    />

                    <span className="text-xs font-medium">
                      {folder.name}
                    </span>
                  </div>

                  <span
                    className="text-[10px]"
                    style={{
                      color:
                        colors.textMuted,
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
              backgroundColor:
                colors.surface,
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
                color:
                  colors.textSecondary,
              }}
            >
              AI can summarize documents,
              extract important information,
              categorize files and create
              reports automatically.
            </p>

            <button
              type="button"
              onClick={() => {
                if (!selectedDocument) {
                  setAiMessage(
                    "Please select a document first."
                  );
                  return;
                }

                setShowAI(true);
              }}
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

            {selectedDocument && (
              <p
                className="mt-2 text-center text-[9px]"
                style={{
                  color:
                    colors.textMuted,
                }}
              >
                Selected:{" "}
                {selectedDocument.name}
              </p>
            )}

            {aiMessage && (
              <div
                className="mt-3 rounded-xl p-3 text-[10px] leading-4"
                style={{
                  backgroundColor:
                    "rgba(57,255,136,0.08)",
                  color:
                    colors.textSecondary,
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
              backgroundColor:
                colors.surface,
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
                  color:
                    colors.textMuted,
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
                color:
                  colors.textMuted,
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
            backgroundColor:
              "rgba(0,0,0,0.65)",
          }}
          onClick={() =>
            setShowNewDocument(false)
          }
        >
          <div
            className="w-full max-w-md rounded-2xl border p-6"
            style={{
              backgroundColor:
                colors.surface,
              borderColor:
                colors.border,
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
                  color:
                    colors.textMuted,
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
                borderColor:
                  colors.border,
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
                borderColor:
                  colors.border,
                color: colors.text,
              }}
            >
              {categories
                .filter(
                  (category) =>
                    category !== "All"
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
              onClick={
                handleCreateDocument
              }
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
            backgroundColor:
              "rgba(0,0,0,0.65)",
          }}
          onClick={() =>
            setShowNewFolder(false)
          }
        >
          <div
            className="w-full max-w-md rounded-2xl border p-6"
            style={{
              backgroundColor:
                colors.surface,
              borderColor:
                colors.border,
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
                  color:
                    colors.textMuted,
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
                borderColor:
                  colors.border,
                color: colors.text,
              }}
            />

            <button
              type="button"
              onClick={
                handleCreateFolder
              }
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
      {viewDocument && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{
            backgroundColor: "rgba(0,0,0,0.65)",
          }}
          onClick={() => setViewDocument(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border p-6"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: "rgba(57,255,136,0.10)",
                  }}
                >
                  {getFileIcon(viewDocument.type)}
                </div>

                <div>
                  <h2 className="text-base font-bold">
                    {viewDocument.name}
                  </h2>

                  <p
                    className="mt-1 text-xs"
                    style={{
                      color: colors.textMuted,
                    }}
                  >
                    {viewDocument.type} • {viewDocument.size}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setViewDocument(null)}
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
                backgroundColor: colors.surfaceLight,
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

                <span>{viewDocument.category}</span>
              </div>

              <div className="flex justify-between text-xs">
                <span
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Updated
                </span>

                <span>{viewDocument.updated}</span>
              </div>

              <div className="flex justify-between text-xs">
                <span
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  AI Agent
                </span>

                <span>{viewDocument.agent}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleDownload(viewDocument)}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold"
              style={{
                backgroundColor: colors.primary,
                color: colors.black,
              }}
            >
              <Download size={16} />
              Download Document
            </button>
          </div>
        </div>
      )}
      {/* AI ACTION MODAL */}
      {showAI && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{
            backgroundColor:
              "rgba(0,0,0,0.65)",
          }}
          onClick={() =>
            setShowAI(false)
          }
        >
          <div
            className="w-full max-w-md rounded-2xl border p-6"
            style={{
              backgroundColor:
                colors.surface,
              borderColor:
                colors.border,
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
                    color:
                      colors.primary,
                  }}
                />

                <h2 className="text-lg font-bold">
                  Document AI
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowAI(false)
                }
                style={{
                  color:
                    colors.textMuted,
                }}
              >
                <X size={19} />
              </button>
            </div>

            <p
              className="mt-4 text-xs leading-5"
              style={{
                color:
                  colors.textSecondary,
              }}
            >
              {selectedDocument
                ? `Ask AI to analyze "${selectedDocument.name}".`
                : "Please select a document first."}
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
                  disabled={
                    aiLoading ||
                    !selectedDocument
                  }
                  onClick={() =>
                    handleDocumentAI()
                  }
                  className="flex w-full items-center justify-between rounded-xl p-3 text-left text-xs font-semibold transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
                  style={{
                    backgroundColor:
                      colors.surfaceLight,
                    color: colors.text,
                  }}
                >
                  <span>{action}</span>

                  <Sparkles
                    size={14}
                    style={{
                      color:
                        colors.primary,
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* AI RESULT MODAL */}
      {showAIResult && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{
            backgroundColor:
              "rgba(0,0,0,0.65)",
          }}
          onClick={() => {
            if (!aiLoading) {
              setShowAIResult(false);
            }
          }}
        >
          <div
            className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border p-6"
            style={{
              backgroundColor:
                colors.surface,
              borderColor:
                colors.border,
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
                  <Sparkles
                    size={21}
                    style={{
                      color:
                        colors.primary,
                    }}
                  />
                </div>

                <div>
                  <h2 className="text-lg font-bold">
                    Document AI Result
                  </h2>

                  <p
                    className="mt-1 text-xs"
                    style={{
                      color:
                        colors.textMuted,
                    }}
                  >
                    {aiDocumentName}
                  </p>
                </div>
              </div>

              <button
                type="button"
                disabled={aiLoading}
                onClick={() =>
                  setShowAIResult(false)
                }
                style={{
                  color:
                    colors.textMuted,
                }}
              >
                <X size={19} />
              </button>
            </div>

            {/* LOADING */}
            {aiLoading && (
              <div className="flex min-h-60 flex-col items-center justify-center text-center">
                <Loader2
                  size={34}
                  className="animate-spin"
                  style={{
                    color:
                      colors.primary,
                  }}
                />

                <p className="mt-4 text-sm font-semibold">
                  Analyzing document...
                </p>

                <p
                  className="mt-2 max-w-sm text-xs leading-5"
                  style={{
                    color:
                      colors.textMuted,
                  }}
                >
                  Document AI is reading the
                  PDF and extracting the
                  important information.
                </p>
              </div>
            )}

            {/* ERROR */}
            {!aiLoading &&
              aiResult &&
              !aiResult.includes(
                "SUMMARY:"
              ) &&
              !aiResult.includes(
                "KEY POINTS:"
              ) && (
                <div
                  className="mt-5 rounded-xl p-4 text-sm"
                  style={{
                    backgroundColor:
                      "rgba(239,68,68,0.10)",
                    color:
                      colors.textSecondary,
                  }}
                >
                  {aiResult}
                </div>
              )}

            {/* AI RESULT */}
            {!aiLoading &&
              aiResult &&
              (aiResult.includes(
                "SUMMARY:"
              ) ||
                aiResult.includes(
                  "KEY POINTS:"
                )) && (
                <div className="mt-5 space-y-4">
                  {/* SUMMARY */}
                  <div
                    className="rounded-xl border p-4"
                    style={{
                      backgroundColor:
                        colors.surfaceLight,
                      borderColor:
                        colors.border,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <FileText
                        size={16}
                        style={{
                          color:
                            colors.primary,
                        }}
                      />

                      <h3 className="text-sm font-bold">
                        Summary
                      </h3>
                    </div>

                    <p
                      className="mt-3 whitespace-pre-line text-xs leading-5"
                      style={{
                        color:
                          colors.textSecondary,
                      }}
                    >
                      {getAISection(
                        "SUMMARY:"
                      ) ||
                        "No summary returned."}
                    </p>
                  </div>

                  {/* KEY POINTS */}
                  <div
                    className="rounded-xl border p-4"
                    style={{
                      backgroundColor:
                        colors.surfaceLight,
                      borderColor:
                        colors.border,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles
                        size={16}
                        style={{
                          color:
                            colors.primary,
                        }}
                      />

                      <h3 className="text-sm font-bold">
                        Key Points
                      </h3>
                    </div>

                    <div
                      className="mt-3 whitespace-pre-line text-xs leading-5"
                      style={{
                        color:
                          colors.textSecondary,
                      }}
                    >
                      {getAISection(
                        "KEY POINTS:"
                      ) ||
                        "No key points returned."}
                    </div>
                  </div>

                  {/* IMPORTANT INFORMATION */}
                  <div
                    className="rounded-xl border p-4"
                    style={{
                      backgroundColor:
                        colors.surfaceLight,
                      borderColor:
                        colors.border,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Bot
                        size={16}
                        style={{
                          color:
                            colors.primary,
                        }}
                      />

                      <h3 className="text-sm font-bold">
                        Important Information
                      </h3>
                    </div>

                    <div
                      className="mt-3 whitespace-pre-line text-xs leading-5"
                      style={{
                        color:
                          colors.textSecondary,
                      }}
                    >
                      {getAISection(
                        "IMPORTANT INFORMATION:"
                      ) ||
                        "No important information returned."}
                    </div>
                  </div>
                </div>
              )}

            {!aiLoading && (
              <button
                type="button"
                onClick={() =>
                  setShowAIResult(false)
                }
                className="mt-5 w-full rounded-xl py-3 text-sm font-bold"
                style={{
                  backgroundColor:
                    colors.primary,
                  color: colors.black,
                }}
              >
                Done
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Documents;