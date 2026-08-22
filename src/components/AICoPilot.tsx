
import { useState, type KeyboardEvent } from "react";
import {
  Bot,
  Send,
  Sparkles,
  User,
  Clock3,
  Trash2,
  Loader2,
} from "lucide-react";

import { colors } from "../theme/colors";

type Message = {
  id: number;
  role: "user" | "ai";
  text: string;
  time: string;
};

type AICopilotProps = {
  initialMessage?: string;
};

function AICopilot({ initialMessage }: AICopilotProps) {
  const [input, setInput] = useState("");

  const [isThinking, setIsThinking] = useState(false);

  const [messages, setMessages] = useState<Message[]>(() => {
    const initialMessages: Message[] = [
      {
        id: 1,
        role: "ai",
        text: "Hello Palwasha! I'm your AI Co-Pilot. How can I help you today?",
        time: "Now",
      },
    ];

    if (initialMessage && initialMessage.trim() !== "") {
      initialMessages.push({
        id: 2,
        role: "user",
        text: initialMessage,
        time: "Now",
      });

      initialMessages.push({
        id: 3,
        role: "ai",
        text: getAIResponse(initialMessage),
        time: "Now",
      });
    }

    return initialMessages;
  });

  const sendMessage = (customMessage?: string) => {
    const messageText = (customMessage ?? input).trim();

    if (!messageText || isThinking) {
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      text: messageText,
      time: getCurrentTime(),
    };

    setMessages((oldMessages) => [
      ...oldMessages,
      userMessage,
    ]);

    setInput("");
    setIsThinking(true);

    window.setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        role: "ai",
        text: getAIResponse(messageText),
        time: getCurrentTime(),
      };

      setMessages((oldMessages) => [
        ...oldMessages,
        aiMessage,
      ]);

      setIsThinking(false);
    }, 700);
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        role: "ai",
        text: "Chat cleared. How can I help you?",
        time: "Now",
      },
    ]);

    setInput("");
    setIsThinking(false);
  };

  const runSuggestion = (text: string) => {
    sendMessage(text);
  };

  return (
    <div
      className="min-h-screen p-6 md:p-8"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
      }}
    >
      {/* PAGE HEADER */}

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl"
            style={{
              backgroundColor: colors.primary,
              color: colors.black,
            }}
          >
            <Sparkles size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              AI Co-Pilot
            </h1>

            <p
              className="mt-1 text-sm"
              style={{
                color: colors.textMuted,
              }}
            >
              Your intelligent workspace assistant
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={clearChat}
          className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-opacity hover:opacity-80"
          style={{
            backgroundColor: colors.surface,
            color: colors.textMuted,
            border: "1px solid " + colors.border,
          }}
        >
          <Trash2 size={15} />
          Clear Chat
        </button>
      </div>

      {/* AI STATUS */}

      <div
        className="mb-5 flex items-center justify-between rounded-2xl p-4"
        style={{
          backgroundColor: colors.surface,
          border: "1px solid " + colors.border,
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{
              backgroundColor: "rgba(57, 255, 136, 0.10)",
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
            <p className="text-sm font-semibold">
              AI Co-Pilot
            </p>

            <p
              className="mt-0.5 text-[10px]"
              style={{
                color: colors.primary,
              }}
            >
              ● Online and ready
            </p>
          </div>
        </div>

        <div
          className="flex items-center gap-2 text-[10px]"
          style={{
            color: colors.textMuted,
          }}
        >
          <Clock3 size={13} />
          Available 24/7
        </div>
      </div>

      {/* CHAT CONTAINER */}

      <div
        className="flex h-[calc(100vh-270px)] min-h-[500px] flex-col overflow-hidden rounded-2xl"
        style={{
          backgroundColor: colors.surface,
          border: "1px solid " + colors.border,
        }}
      >
        {/* CHAT TOP BAR */}

        <div
          className="flex items-center gap-3 px-6 py-4"
          style={{
            borderBottom: "1px solid " + colors.border,
          }}
        >
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{
              backgroundColor: colors.surfaceLight,
              color: colors.primary,
            }}
          >
            <Bot size={17} />
          </div>

          <div>
            <p className="text-sm font-semibold">
              Workspace Assistant
            </p>

            <p
              className="mt-0.5 text-[10px]"
              style={{
                color: colors.textMuted,
              }}
            >
              Ask questions, manage tasks or get workspace insights.
            </p>
          </div>
        </div>

        {/* CHAT MESSAGES */}

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-5">
            {messages.map((message) => {
              const isUser = message.role === "user";

              return (
                <div
                  key={message.id}
                  className={
                    isUser
                      ? "flex justify-end"
                      : "flex justify-start"
                  }
                >
                  <div
                    className={
                      isUser
                        ? "flex max-w-[75%] flex-row-reverse items-end gap-3"
                        : "flex max-w-[75%] items-end gap-3"
                    }
                  >
                    {/* AVATAR */}

                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                      style={{
                        backgroundColor: isUser
                          ? colors.primary
                          : colors.surfaceLight,
                        color: isUser
                          ? colors.black
                          : colors.primary,
                      }}
                    >
                      {isUser ? (
                        <User size={16} />
                      ) : (
                        <Bot size={16} />
                      )}
                    </div>

                    {/* MESSAGE */}

                    <div
                      className={
                        isUser
                          ? "flex flex-col items-end"
                          : "flex flex-col items-start"
                      }
                    >
                      <div
                        className="rounded-2xl px-4 py-3 text-sm leading-6"
                        style={{
                          backgroundColor: isUser
                            ? colors.primary
                            : colors.surfaceLight,
                          color: isUser
                            ? colors.black
                            : colors.text,
                        }}
                      >
                        {message.text}
                      </div>

                      <span
                        className="mt-1 px-1 text-[9px]"
                        style={{
                          color: colors.textMuted,
                        }}
                      >
                        {message.time}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* THINKING INDICATOR */}

            {isThinking && (
              <div className="flex justify-start">
                <div className="flex items-end gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: colors.surfaceLight,
                      color: colors.primary,
                    }}
                  >
                    <Bot size={16} />
                  </div>

                  <div
                    className="flex items-center gap-2 rounded-2xl px-4 py-3 text-xs"
                    style={{
                      backgroundColor: colors.surfaceLight,
                      color: colors.textMuted,
                    }}
                  >
                    <Loader2
                      size={14}
                      className="animate-spin"
                      style={{
                        color: colors.primary,
                      }}
                    />

                    AI is thinking...
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* INPUT SECTION */}

        <div
          className="p-5"
          style={{
            borderTop: "1px solid " + colors.border,
            backgroundColor: colors.surface,
          }}
        >
          {/* INPUT */}

          <div className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ask your AI Co-Pilot anything..."
              className="h-12 flex-1 rounded-xl px-4 text-sm outline-none"
              style={{
                backgroundColor: colors.background,
                border: "1px solid " + colors.border,
                color: colors.text,
              }}
            />

            <button
              type="button"
              onClick={() => {
                sendMessage();
              }}
              disabled={isThinking || !input.trim()}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
              style={{
                backgroundColor: colors.primary,
                color: colors.black,
              }}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>

          {/* SUGGESTIONS */}

          <div className="mt-3 flex flex-wrap gap-2">
            <Suggestion
              text="Summarize my tasks"
              onClick={() => {
                runSuggestion("Summarize my tasks");
              }}
            />

            <Suggestion
              text="Show project status"
              onClick={() => {
                runSuggestion("Show project status");
              }}
            />

            <Suggestion
              text="Plan my day"
              onClick={() => {
                runSuggestion("Plan my day");
              }}
            />

            <Suggestion
              text="Show today's schedule"
              onClick={() => {
                runSuggestion("Show today's schedule");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* SUGGESTION BUTTON */

function Suggestion({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg px-3 py-2 text-[10px] transition-opacity hover:opacity-80"
      style={{
        backgroundColor: colors.surfaceLight,
        color: colors.textMuted,
      }}
    >
      {text}
    </button>
  );
}

/* CURRENT TIME */

function getCurrentTime(): string {
  return new Date().toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

/* FRONTEND AI COMMAND HANDLER */

function getAIResponse(question: string): string {
  const lowerQuestion = question.toLowerCase().trim();

  /* TASKS */

  if (
    lowerQuestion.includes("task") ||
    lowerQuestion.includes("todo") ||
    lowerQuestion.includes("to-do")
  ) {
    if (
      lowerQuestion.includes("complete") ||
      lowerQuestion.includes("completed")
    ) {
      return "You currently have 6 completed tasks. Keep going — there are 24 active tasks remaining in the workspace.";
    }

    if (
      lowerQuestion.includes("pending") ||
      lowerQuestion.includes("waiting")
    ) {
      return "You currently have 10 pending tasks. I recommend reviewing their priorities and deadlines first.";
    }

    return "You currently have 24 active tasks: 8 in progress, 10 pending, and 6 completed. I can help you organize or prioritize them.";
  }

  /* PROJECTS */

  if (
    lowerQuestion.includes("project") ||
    lowerQuestion.includes("projects")
  ) {
    if (
      lowerQuestion.includes("status") ||
      lowerQuestion.includes("progress")
    ) {
      return "You currently have 12 projects. Three projects are due soon. Your AI Office MVP is currently one of the main priorities.";
    }

    return "You currently have 12 projects in your workspace. I can help you review project status, priorities, and upcoming deadlines.";
  }

  /* CALENDAR / SCHEDULE */

  if (
    lowerQuestion.includes("calendar") ||
    lowerQuestion.includes("schedule") ||
    lowerQuestion.includes("meeting") ||
    lowerQuestion.includes("appointment")
  ) {
    return "Today's schedule has 3 activities: Team Standup at 10:00 AM, Client Meeting at 12:30 PM, and Project Review at 3:00 PM.";
  }

  /* DAY PLANNING */

  if (
    lowerQuestion.includes("plan my day") ||
    lowerQuestion.includes("my day") ||
    lowerQuestion.includes("today")
  ) {
    return "Here's a suggested plan: start with your highest-priority tasks, attend the 10:00 AM Team Standup, prepare for the 12:30 PM Client Meeting, and finish the day with the 3:00 PM Project Review.";
  }

  /* REPORTS / PERFORMANCE */

  if (
    lowerQuestion.includes("report") ||
    lowerQuestion.includes("performance") ||
    lowerQuestion.includes("productivity") ||
    lowerQuestion.includes("score")
  ) {
    return "Your current productivity score is 1,820 and your weekly productivity is 82%. Your workspace performance is trending positively.";
  }

  /* DOCUMENTS */

  if (
    lowerQuestion.includes("document") ||
    lowerQuestion.includes("file") ||
    lowerQuestion.includes("report file")
  ) {
    return "You currently have documents available in the workspace. I can help you organize documents or prepare a project report. Actual file searching will be connected later through the backend.";
  }

  /* AI AGENTS */

  if (
    lowerQuestion.includes("agent") ||
    lowerQuestion.includes("agents") ||
    lowerQuestion.includes("ai team")
  ) {
    return "Your AI workspace currently includes 8 agents. The main agents include Manager, Research, Document, Workflow, and Meeting agents.";
  }

  /* WORKFLOWS */

  if (
    lowerQuestion.includes("workflow") ||
    lowerQuestion.includes("automation") ||
    lowerQuestion.includes("automate")
  ) {
    return "Your workspace can use automated workflows for repetitive office tasks. Workflow execution and real automation will be connected to the backend later.";
  }

  /* GREETING */

  if (
    lowerQuestion === "hi" ||
    lowerQuestion === "hello" ||
    lowerQuestion.includes("hey")
  ) {
    return "Hello! I'm ready to help with your tasks, projects, schedule, documents, reports, and AI workspace.";
  }

  /* HELP */

  if (
    lowerQuestion.includes("help") ||
    lowerQuestion.includes("what can you do")
  ) {
    return "I can currently help with workspace tasks, projects, schedules, daily planning, reports, documents, AI agents, and workflows. Real AI reasoning and external system actions will be connected through the backend later.";
  }

  /* DEFAULT RESPONSE */

  return (
    "I understand your request: \"" +
    question +
    "\". I can currently process common workspace commands such as tasks, projects, schedules, reports, documents, agents, and workflows. For completely open-ended AI conversations, we'll connect the real AI backend in the next phase."
  );
}

export default AICopilot;
