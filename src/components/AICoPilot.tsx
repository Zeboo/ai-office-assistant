import { useState, type KeyboardEvent } from "react";
import {
  Bot,
  Send,
  Sparkles,
  User,
  Clock3,
  Trash2,
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
  }

  return initialMessages;
});
  

  const sendMessage = () => {
    const messageText = input.trim();

    if (messageText === "") {
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      text: messageText,
      time: "Now",
    };

    setMessages((oldMessages) => [
      ...oldMessages,
      userMessage,
    ]);

    setInput("");

    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        role: "ai",
        text: getAIResponse(messageText),
        time: "Now",
      };

      setMessages((oldMessages) => [
        ...oldMessages,
        aiMessage,
      ]);
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
  };

  const useSuggestion = (text: string) => {
    setInput(text);
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
          className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold"
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
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div
                  className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: colors.surfaceLight,
                    color: colors.primary,
                  }}
                >
                  <Bot size={25} />
                </div>

                <p className="text-sm font-semibold">
                  Start a conversation
                </p>

                <p
                  className="mt-1 text-xs"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Ask your AI Co-Pilot anything.
                </p>
              </div>
            </div>
          ) : (
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
            </div>
          )}
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
              onClick={sendMessage}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-opacity hover:opacity-80"
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
                useSuggestion("Summarize my tasks");
              }}
            />

            <Suggestion
              text="Show project status"
              onClick={() => {
                useSuggestion("Show project status");
              }}
            />

            <Suggestion
              text="Plan my day"
              onClick={() => {
                useSuggestion("Plan my day");
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

/* DEMO AI RESPONSE */

function getAIResponse(question: string): string {
  const lowerQuestion = question.toLowerCase();

  if (
    lowerQuestion.includes("task") ||
    lowerQuestion.includes("tasks")
  ) {
    return "You currently have 24 active workspace tasks. I can help you organize, prioritize, or summarize them.";
  }

  if (
    lowerQuestion.includes("project") ||
    lowerQuestion.includes("projects")
  ) {
    return "You currently have 12 projects in your workspace. I can help you review their progress and priorities.";
  }

  if (
    lowerQuestion.includes("day") ||
    lowerQuestion.includes("schedule")
  ) {
    return "I can help you plan your day. Start by reviewing your active tasks and today's schedule.";
  }

  if (
    lowerQuestion.includes("report") ||
    lowerQuestion.includes("performance")
  ) {
    return "Your workspace performance is currently strong. The latest productivity score is 92.";
  }

  return (
    'I understand your request about "' +
    question +
    '". I am currently running in demo mode. The next step will be connecting me to the real AI backend.'
  );
}

export default AICopilot;