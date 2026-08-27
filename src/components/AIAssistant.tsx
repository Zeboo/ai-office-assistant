
import { useEffect, useRef, useState } from "react";
import {
  Brain,
  Bot,
  CheckCircle2,
  Circle,
  Headphones,
  Mic,
  MicOff,
  Network,
  Send,
  Settings2,
  Sparkles,
  Volume2,
  Zap,
} from "lucide-react";

type AssistantStatus =
  | "IDLE"
  | "LISTENING"
  | "THINKING"
  | "WORKING"
  | "REPORTING"
  | "ERROR";

type WorkerTask = {
  id: number;
  agent: string;
  task: string;
  priority: "Low" | "Medium" | "High";
  status: "Assigned" | "Working" | "Completed" | "Failed";
  result?: string;
};

type AssistantColors = {
  background: string;
  surface: string;
  surfaceLight: string;
  primary: string;
  black: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
};

type Props = {
  colors: AssistantColors;
};

interface SpeechRecognitionResultEventLike {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
    length: number;
  };
}

interface SpeechRecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;

  onresult:
    | ((event: SpeechRecognitionResultEventLike) => void)
    | null;

  onend: (() => void) | null;

  onerror: (() => void) | null;

  start: () => void;

  stop: () => void;
}

type SpeechRecognitionConstructor =
  new () => SpeechRecognitionLike;

type SpeechWindow = Window & {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
};

/*
|--------------------------------------------------------------------------
| Developer Agent API
|--------------------------------------------------------------------------
|
| Later this endpoint will connect to your NestJS backend.
|
| Frontend:
| AI Assistant
|       ↓
| Manager
|       ↓
| Developer Agent API
|       ↓
| OpenAI
|       ↓
| Developer result
|
*/

const DEVELOPER_AGENT_URL =
  "http://localhost:3000/ai/developer";

function AIAssistant({ colors }: Props) {
  const [status, setStatus] =
    useState<AssistantStatus>("IDLE");

  const [command, setCommand] =
    useState("");

  const [currentTask, setCurrentTask] =
    useState(
      "Waiting for your command..."
    );

  const [tasks, setTasks] =
    useState<WorkerTask[]>([]);

  const [report, setReport] =
    useState(
      "I'm ready. Activate me and give me a command."
    );

  const [isListening, setIsListening] =
    useState(false);

  const recognitionRef =
    useRef<SpeechRecognitionLike | null>(null);

  const isListeningRef =
    useRef(false);

  const taskCounterRef =
    useRef(1);

  const statusLabels: Record<
    AssistantStatus,
    string
  > = {
    IDLE: "Idle",
    LISTENING: "Listening",
    THINKING: "Thinking",
    WORKING: "Working",
    REPORTING: "Reporting",
    ERROR: "Error",
  };

  /* =========================================================
     TEXT TO SPEECH
  ========================================================= */

  const speak = (text: string) => {
    if (!("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();

    const speech =
      new SpeechSynthesisUtterance(text);

    speech.rate = 0.95;
    speech.pitch = 1;
    speech.volume = 1;

    window.speechSynthesis.speak(speech);
  };

  /* =========================================================
     AGENT ROUTER
  ========================================================= */

  const getAgentForCommand = (
    text: string
  ) => {
    const value =
      text.toLowerCase();

    /*
     * Developer
     */

    if (
      value.includes("developer") ||
      value.includes("develop") ||
      value.includes("website") ||
      value.includes("web app") ||
      value.includes("application") ||
      value.includes(" app ") ||
      value.startsWith("app ") ||
      value.includes("code") ||
      value.includes("coding") ||
      value.includes("program") ||
      value.includes("software") ||
      value.includes("bug") ||
      value.includes("fix") ||
      value.includes("build")
    ) {
      return "Developer Agent";
    }

    /*
     * Designer
     */

    if (
      value.includes("design") ||
      value.includes("designer") ||
      value.includes("ui") ||
      value.includes("ux") ||
      value.includes("interface") ||
      value.includes("prototype") ||
      value.includes("figma")
    ) {
      return "Design Agent";
    }

    /*
     * Research
     */

    if (
      value.includes("research") ||
      value.includes("market") ||
      value.includes("competitor") ||
      value.includes("analysis") ||
      value.includes("analyze")
    ) {
      return "Research Agent";
    }

    /*
     * Document
     */

    if (
      value.includes("document") ||
      value.includes("report") ||
      value.includes("file") ||
      value.includes("pdf") ||
      value.includes("proposal")
    ) {
      return "Document Agent";
    }

    /*
     * Calendar
     */

    if (
      value.includes("meeting") ||
      value.includes("calendar") ||
      value.includes("schedule") ||
      value.includes("appointment") ||
      value.includes("event")
    ) {
      return "Calendar Agent";
    }

    /*
     * Email
     */

    if (
      value.includes("email") ||
      value.includes("mail") ||
      value.includes("send an email")
    ) {
      return "Email Agent";
    }

    /*
     * Workflow
     */

    if (
      value.includes("workflow") ||
      value.includes("automate") ||
      value.includes("automation")
    ) {
      return "Workflow Agent";
    }

    return "Manager Agent";
  };

  /* =========================================================
     VIRTUAL OFFICE EVENT
  ========================================================= */

  const notifyVirtualOffice = (
    agent: string,
    task: string,
    taskStatus:
      | "Working"
      | "Completed"
      | "Failed"
  ) => {
    window.dispatchEvent(
      new CustomEvent(
        "ai-office-task",
        {
          detail: {
            agent,
            task,
            status: taskStatus,
          },
        }
      )
    );
  };

  /* =========================================================
     REAL DEVELOPER AGENT REQUEST
  ========================================================= */

  const callDeveloperAgent = async (
    task: string
  ) => {
    const response =
      await fetch(
        DEVELOPER_AGENT_URL,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            task,
            requestedBy:
              "AI Manager Assistant",
          }),
        }
      );

    if (!response.ok) {
      throw new Error(
        `Developer Agent returned ${response.status}`
      );
    }

    const data =
      await response.json();

    return (
      data.result ||
      data.message ||
      data.output ||
      "Developer Agent completed the task."
    );
  };

  /* =========================================================
     DEMO DEVELOPER RESULT
  ========================================================= */

  const createDemoDeveloperResult = (
    task: string
  ) => {
    return (
      "Developer Agent completed the request.\n\n" +
      "Task:\n" +
      task +
      "\n\n" +
      "Progress Report:\n" +
      "• Requirement analyzed\n" +
      "• Development plan prepared\n" +
      "• Implementation structure prepared\n" +
      "• Code generation requested\n" +
      "• Final result prepared for review\n\n" +
      "Note: Connect the NestJS Developer Agent API " +
      "to replace this demo result with real AI-generated code."
    );
  };

  /* =========================================================
     PROCESS COMMAND
  ========================================================= */

  const processCommand = async (
    value: string
  ) => {
    const cleanCommand =
      value.trim();

    if (!cleanCommand) {
      return;
    }

    setStatus("THINKING");

    setCurrentTask(
      "Understanding your command..."
    );

    setReport("");

    /*
     * Manager thinks.
     */

    await new Promise(
      (resolve) =>
        setTimeout(resolve, 700)
    );

    const agent =
      getAgentForCommand(
        cleanCommand
      );

    const taskId =
      taskCounterRef.current++;

    const newTask: WorkerTask = {
      id: taskId,

      agent,

      task: cleanCommand,

      priority: "Medium",

      status: "Assigned",
    };

    /*
     * Add assignment.
     */

    setTasks(
      (oldTasks) => [
        newTask,
        ...oldTasks,
      ]
    );

    /*
     * Manager delegates.
     */

    setStatus("WORKING");

    setCurrentTask(
      `${agent} is working on your request.`
    );

    notifyVirtualOffice(
      agent,
      cleanCommand,
      "Working"
    );

    setTasks(
      (oldTasks) =>
        oldTasks.map(
          (item) =>
            item.id === taskId
              ? {
                  ...item,
                  status:
                    "Working",
                }
              : item
        )
    );

    speak(
      `Understood. I am assigning this task to ${agent}.`
    );

    try {
      let result = "";

      /*
       * REAL DEVELOPER AGENT
       */

      if (
        agent ===
        "Developer Agent"
      ) {
        try {
          result =
            await callDeveloperAgent(
              cleanCommand
            );
        } catch {
          /*
           * Backend isn't connected yet.
           *
           * Keep the UI working instead
           * of showing an application crash.
           */

          result =
            createDemoDeveloperResult(
              cleanCommand
            );
        }
      } else {
        /*
         * Temporary result for other agents.
         *
         * These agents will later receive
         * their own backend APIs.
         */

        await new Promise(
          (resolve) =>
            setTimeout(
              resolve,
              2500
            )
        );

        result =
          `${agent} completed the assigned task successfully.`;
      }

      /*
       * Mark task completed.
       */

      setTasks(
        (oldTasks) =>
          oldTasks.map(
            (item) =>
              item.id === taskId
                ? {
                    ...item,
                    status:
                      "Completed",
                    result,
                  }
                : item
          )
      );

      /*
       * Update virtual office.
       */

      notifyVirtualOffice(
        agent,
        cleanCommand,
        "Completed"
      );

      /*
       * Assistant report.
       */

      const finalReport =
        `${agent} has completed the assigned task.\n\n` +
        result;

      setStatus(
        "REPORTING"
      );

      setCurrentTask(
        "Task completed successfully."
      );

      setReport(
        finalReport
      );

      speak(
        `${agent} has completed the task.`
      );

      /*
       * Return to idle/listening.
       */

      setTimeout(() => {
        if (
          isListeningRef.current
        ) {
          setStatus(
            "LISTENING"
          );

          setCurrentTask(
            "I'm listening for your next command..."
          );
        } else {
          setStatus(
            "IDLE"
          );

          setCurrentTask(
            "Waiting for your next command..."
          );
        }
      }, 2500);
    } catch (error) {
      console.error(
        "AI Agent Error:",
        error
      );

      setTasks(
        (oldTasks) =>
          oldTasks.map(
            (item) =>
              item.id === taskId
                ? {
                    ...item,
                    status:
                      "Failed",
                  }
                : item
          )
      );

      notifyVirtualOffice(
        agent,
        cleanCommand,
        "Failed"
      );

      setStatus("ERROR");

      setCurrentTask(
        "The assigned employee could not complete the task."
      );

      setReport(
        `${agent} was unable to complete the task. Please try again.`
      );

      speak(
        `${agent} could not complete the task.`
      );
    }
  };

  /* =========================================================
     VOICE START
  ========================================================= */

  const startListening = () => {
    const speechWindow =
      window as SpeechWindow;

    const SpeechRecognition =
      speechWindow.SpeechRecognition ||
      speechWindow.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Voice recognition is not supported in this browser. Please use Google Chrome."
      );

      return;
    }

    if (!recognitionRef.current) {
      const recognition =
        new SpeechRecognition();

      recognition.continuous =
        true;

      recognition.interimResults =
        false;

      recognition.lang =
        "en-US";

      recognition.onresult =
        (event) => {
          const lastResult =
            event.results[
              event.results.length -
                1
            ];

          const transcript =
            lastResult[0]
              .transcript
              .trim();

          if (transcript) {
            setCommand(
              transcript
            );

            processCommand(
              transcript
            );
          }
        };

      recognition.onerror =
        () => {
          if (
            isListeningRef.current
          ) {
            setStatus(
              "LISTENING"
            );
          }
        };

      recognition.onend =
        () => {
          if (
            isListeningRef.current
          ) {
            try {
              recognition.start();
            } catch {
              // Already running.
            }
          }
        };

      recognitionRef.current =
        recognition;
    }

    isListeningRef.current =
      true;

    setIsListening(true);

    setStatus(
      "LISTENING"
    );

    setCurrentTask(
      "I'm listening. Tell me what you need."
    );

    try {
      recognitionRef.current.start();
    } catch {
      // Already running.
    }

    speak(
      "I'm listening. Tell me what you need."
    );
  };

  /* =========================================================
     VOICE STOP
  ========================================================= */

  const stopListening = () => {
    isListeningRef.current =
      false;

    setIsListening(false);

    setStatus("IDLE");

    setCurrentTask(
      "Assistant is paused."
    );

    if (
      recognitionRef.current
    ) {
      recognitionRef.current.stop();
    }

    if (
      "speechSynthesis" in
      window
    ) {
      window.speechSynthesis.cancel();
    }
  };

  /* =========================================================
     TOGGLE
  ========================================================= */

  const toggleListening =
    () => {
      if (isListening) {
        stopListening();
      } else {
        startListening();
      }
    };

  /* =========================================================
     CLEANUP
  ========================================================= */

  useEffect(() => {
    return () => {
      isListeningRef.current =
        false;

      if (
        recognitionRef.current
      ) {
        recognitionRef.current.stop();
      }

      if (
        "speechSynthesis" in
        window
      ) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  /* =========================================================
     STATUS COLOR
  ========================================================= */

  const statusColor =
    status ===
    "LISTENING"
      ? colors.primary
      : status ===
        "WORKING"
      ? "#60A5FA"
      : status ===
        "THINKING"
      ? "#FBBF24"
      : status ===
        "REPORTING"
      ? "#A78BFA"
      : status ===
        "ERROR"
      ? "#FF6B6B"
      : colors.textMuted;

  return (
    <section
      className="mb-7 overflow-hidden rounded-3xl border"
      style={{
        backgroundColor:
          colors.surface,
        borderColor:
          colors.border,
      }}
    >
      {/* TOP */}

      <div
        className="border-b p-6"
        style={{
          borderColor:
            colors.border,
        }}
      >
        <div className="flex items-start justify-between gap-6">

          <div className="flex items-center gap-4">

            <div
              className="relative flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{
                backgroundColor:
                  "rgba(57,255,136,0.10)",
              }}
            >

              <Sparkles
                size={25}
                style={{
                  color:
                    colors.primary,
                }}
              />

              {isListening && (
                <span
                  className="absolute inset-0 animate-ping rounded-2xl border-2"
                  style={{
                    borderColor:
                      colors.primary,
                  }}
                />
              )}

            </div>

            <div>

              <div className="flex items-center gap-2">

                <h2 className="text-xl font-bold">
                  AI Manager Assistant
                </h2>

                <span
                  className="rounded-full px-2.5 py-1 text-[9px] font-bold uppercase"
                  style={{
                    backgroundColor:
                      "rgba(57,255,136,0.10)",
                    color:
                      colors.primary,
                  }}
                >
                  Manager
                </span>

              </div>

              <p
                className="mt-1 text-xs"
                style={{
                  color:
                    colors.textMuted,
                }}
              >
                Listen → Understand → Delegate → Execute → Report
              </p>

            </div>

          </div>

          {/* STATUS */}

          <div
            className="flex items-center gap-2 rounded-full border px-3 py-2 text-[10px] font-bold"
            style={{
              borderColor:
                colors.border,
              color:
                statusColor,
            }}
          >

            <span
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor:
                  statusColor,
              }}
            />

            {statusLabels[
              status
            ]}

          </div>

        </div>
      </div>

      {/* BODY */}

      <div className="grid grid-cols-12 gap-6 p-6">

        {/* LEFT */}

        <div className="col-span-3 space-y-3">

          <InfoCard
            icon={
              <Brain size={17} />
            }
            title="MEMORY"
            value={`${tasks.length} events logged`}
            colors={colors}
          />

          <InfoCard
            icon={
              <Zap size={17} />
            }
            title="SKILLS"
            value="Delegation, Prioritization"
            colors={colors}
          />

          <InfoCard
            icon={
              <Network size={17} />
            }
            title="SOUL"
            value="Strategic Manager"
            colors={colors}
          />

          <InfoCard
            icon={
              <Settings2 size={17} />
            }
            title="SETTING"
            value="Department routing"
            colors={colors}
          />

        </div>

        {/* CENTER */}

        <div className="col-span-5 flex flex-col items-center justify-center">

          <div
            className="relative flex h-44 w-44 items-center justify-center rounded-full border"
            style={{
              borderColor:
                `${statusColor}55`,
              background:
                `radial-gradient(circle, ${statusColor}25 0%, transparent 65%)`,
              boxShadow:
                `0 0 70px ${statusColor}18`,
            }}
          >

            <div
              className="absolute h-3 w-3 rounded-full"
              style={{
                backgroundColor:
                  statusColor,
                boxShadow:
                  `0 0 25px ${statusColor}`,
              }}
            />

            <div className="absolute inset-6 rounded-full border border-dashed opacity-40" />

            <div className="absolute inset-0 flex items-center justify-center">

              {status ===
              "LISTENING" ? (
                <Mic
                  size={38}
                  style={{
                    color:
                      colors.primary,
                  }}
                />
              ) : status ===
                "WORKING" ? (
                <Bot
                  size={38}
                  style={{
                    color:
                      statusColor,
                  }}
                />
              ) : status ===
                "REPORTING" ? (
                <Volume2
                  size={38}
                  style={{
                    color:
                      statusColor,
                  }}
                />
              ) : status ===
                "THINKING" ? (
                <Brain
                  size={38}
                  style={{
                    color:
                      statusColor,
                  }}
                />
              ) : (
                <Sparkles
                  size={38}
                  style={{
                    color:
                      statusColor,
                  }}
                />
              )}

            </div>

          </div>

          <p
            className="mt-5 text-sm font-semibold"
            style={{
              color:
                statusColor,
            }}
          >
            {statusLabels[
              status
            ]}
          </p>

          <p
            className="mt-1 text-center text-xs"
            style={{
              color:
                colors.textMuted,
            }}
          >
            {currentTask}
          </p>

        </div>

        {/* RIGHT */}

        <div className="col-span-4">

          <div
            className="rounded-2xl border p-4"
            style={{
              backgroundColor:
                colors.surfaceLight,
              borderColor:
                colors.border,
            }}
          >

            <div className="mb-3 flex items-center gap-2">

              <Headphones
                size={16}
                style={{
                  color:
                    colors.primary,
                }}
              />

              <span className="text-xs font-semibold">
                Assistant Command
              </span>

            </div>

            <textarea
              value={command}
              onChange={(
                event
              ) =>
                setCommand(
                  event.target.value
                )
              }
              placeholder="Tell the assistant what to do..."
              rows={4}
              className="w-full resize-none rounded-xl border p-3 text-xs outline-none"
              style={{
                backgroundColor:
                  colors.background,
                borderColor:
                  colors.border,
                color:
                  colors.text,
              }}
            />

            <div className="mt-3 flex gap-2">

              <button
                type="button"
                onClick={
                  toggleListening
                }
                className="flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold"
                style={{
                  backgroundColor:
                    isListening
                      ? "#2A1515"
                      : colors.primary,
                  color:
                    isListening
                      ? "#FF6B6B"
                      : colors.black,
                }}
              >

                {isListening ? (
                  <>
                    <MicOff
                      size={15}
                    />
                    Stop
                  </>
                ) : (
                  <>
                    <Mic
                      size={15}
                    />
                    Activate
                  </>
                )}

              </button>

              <button
                type="button"
                onClick={() => {
                  processCommand(
                    command
                  );

                  setCommand("");
                }}
                className="flex items-center justify-center rounded-xl px-4"
                style={{
                  backgroundColor:
                    colors.background,
                  border:
                    `1px solid ${colors.border}`,
                  color:
                    colors.primary,
                }}
              >
                <Send
                  size={15}
                />
              </button>

            </div>

          </div>

          {/* REPORT */}

          <div
            className="mt-3 rounded-2xl border p-4"
            style={{
              backgroundColor:
                colors.surfaceLight,
              borderColor:
                colors.border,
              maxHeight:
                "220px",
              overflowY:
                "auto",
            }}
          >

            <div className="mb-2 flex items-center gap-2">

              <Volume2
                size={15}
                style={{
                  color:
                    "#A78BFA",
                }}
              />

              <span className="text-xs font-semibold">
                Assistant Report
              </span>

            </div>

            <p
              className="whitespace-pre-line text-xs leading-5"
              style={{
                color:
                  colors.textSecondary,
              }}
            >
              {report ||
                "Working on your request..."}
            </p>

          </div>

        </div>

      </div>

      {/* WORKERS */}

      <div
        className="border-t px-6 py-5"
        style={{
          borderColor:
            colors.border,
        }}
      >

        <div className="mb-4 flex items-center justify-between">

          <div>

            <h3 className="text-sm font-semibold">
              Worker Assignments
            </h3>

            <p
              className="mt-1 text-[11px]"
              style={{
                color:
                  colors.textMuted,
              }}
            >
              Tasks delegated by your AI Manager
            </p>

          </div>

          <Bot
            size={18}
            style={{
              color:
                colors.primary,
            }}
          />

        </div>

        {tasks.length ===
        0 ? (
          <div
            className="rounded-xl border border-dashed p-5 text-center"
            style={{
              borderColor:
                colors.border,
            }}
          >

            <Circle
              size={18}
              className="mx-auto mb-2"
              style={{
                color:
                  colors.textMuted,
              }}
            />

            <p
              className="text-xs"
              style={{
                color:
                  colors.textMuted,
              }}
            >
              No worker assignments yet.
            </p>

          </div>
        ) : (
          <div className="space-y-2">

            {tasks
              .slice(0, 6)
              .map(
                (task) => (
                  <div
                    key={
                      task.id
                    }
                    className="rounded-xl p-3"
                    style={{
                      backgroundColor:
                        colors.surfaceLight,
                    }}
                  >

                    <div className="flex items-center gap-3">

                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                        style={{
                          backgroundColor:
                            "rgba(57,255,136,0.10)",
                        }}
                      >

                        {task.status ===
                        "Completed" ? (
                          <CheckCircle2
                            size={
                              16
                            }
                            style={{
                              color:
                                colors.primary,
                            }}
                          />
                        ) : task.status ===
                          "Failed" ? (
                          <Circle
                            size={
                              16
                            }
                            style={{
                              color:
                                "#FF6B6B",
                            }}
                          />
                        ) : (
                          <Bot
                            size={
                              16
                            }
                            style={{
                              color:
                                colors.primary,
                            }}
                          />
                        )}

                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="text-xs font-semibold">
                          {
                            task.agent
                          }
                        </p>

                        <p
                          className="mt-1 truncate text-[10px]"
                          style={{
                            color:
                              colors.textMuted,
                          }}
                        >
                          {
                            task.task
                          }
                        </p>

                      </div>

                      <span
                        className="rounded-full px-2 py-1 text-[9px] font-semibold"
                        style={{
                          backgroundColor:
                            task.status ===
                            "Completed"
                              ? "rgba(57,255,136,0.10)"
                              : task.status ===
                                "Failed"
                              ? "rgba(255,92,92,0.10)"
                              : "rgba(96,165,250,0.10)",

                          color:
                            task.status ===
                            "Completed"
                              ? colors.primary
                              : task.status ===
                                "Failed"
                              ? "#FF6B6B"
                              : "#60A5FA",
                        }}
                      >
                        {
                          task.status
                        }
                      </span>

                    </div>

                    {task.result && (
                      <div
                        className="mt-3 rounded-lg border p-3"
                        style={{
                          borderColor:
                            colors.border,
                        }}
                      >

                        <p
                          className="whitespace-pre-line text-[10px] leading-4"
                          style={{
                            color:
                              colors.textSecondary,
                          }}
                        >
                          {
                            task.result
                          }
                        </p>

                      </div>
                    )}

                  </div>
                )
              )}

          </div>
        )}

      </div>

    </section>
  );
}

/* ========================================================= */
/* INFO CARD */
/* ========================================================= */

function InfoCard({
  icon,
  title,
  value,
  colors,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  colors: AssistantColors;
}) {
  return (
    <div
      className="rounded-xl border p-3"
      style={{
        backgroundColor:
          colors.surfaceLight,
        borderColor:
          colors.border,
      }}
    >

      <div className="flex items-center gap-2">

        <span
          style={{
            color:
              colors.primary,
          }}
        >
          {icon}
        </span>

        <span className="text-[10px] font-bold">
          {title}
        </span>

      </div>

      <p
        className="mt-1 pl-7 text-[9px]"
        style={{
          color:
            colors.textMuted,
        }}
      >
        {value}
      </p>

    </div>
  );
}

export default AIAssistant;
