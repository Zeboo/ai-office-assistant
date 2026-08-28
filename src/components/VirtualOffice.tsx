import { useState } from "react";
type AssistantLog = {
  command: string;
  understood: string;
  assignedTo: string;
  response: string;
  systemControl: "Active" | "Inactive";
};

type VirtualOfficeProps = {
  themeMode: "dark" | "light";
};

type Employee = {
  id: number;
  name: string;
  role: string;
  department: string;
  status: "Working" | "Available" | "Idle";
  avatar: string;
};

const initialEmployees: Employee[] = [
  {
    id: 1,
    name: "Manager",
    role: "AI Manager",
    department: "Management",
    status: "Working",
    avatar: "👩🏻‍💼",
  },
  {
    id: 2,
    name: "Developer",
    role: "Developer Agent",
    department: "Development",
    status: "Working",
    avatar: "👨🏻‍💻",
  },
  {
    id: 3,
    name: "Researcher",
    role: "Research Agent",
    department: "Research",
    status: "Idle",
    avatar: "👩🏻‍🔬",
  },
  {
    id: 4,
    name: "Designer",
    role: "Design Agent",
    department: "Creative",
    status: "Working",
    avatar: "👩🏻‍🎨",
  },
  {
    id: 5,
    name: "HR",
    role: "HR Agent",
    department: "HR",
    status: "Available",
    avatar: "👨🏻‍💼",
  },
];

const avatarOptions = [
  "👨🏻‍💻",
  "👩🏻‍💻",
  "👨🏻‍🎨",
  "👩🏻‍🎨",
  "👨🏻‍🔬",
  "👩🏻‍🔬",
  "👨🏻‍💼",
  "👩🏻‍💼",
  "🧑🏻‍💻",
  "🧑🏻‍💼",
];

function VirtualOffice({ themeMode }: VirtualOfficeProps) {
  const dark = themeMode === "dark";

  const [employees, setEmployees] =
    useState<Employee[]>(initialEmployees);

  const [showHireForm, setShowHireForm] = useState(false);

  const [selectedEmployee, setSelectedEmployee] =
    useState<Employee | null>(null);

  const [name, setName] = useState("");
  const [role, setRole] =
    useState("Developer Agent");

  const [department, setDepartment] =
    useState("Development");

  const [status, setStatus] =
    useState<Employee["status"]>("Available");
    const [assistantCommand, setAssistantCommand] = useState("");



const [assistantLog, setAssistantLog] =
    useState<AssistantLog>({
      command: "No command yet",
      understood: "Waiting for your instruction",
      assignedTo: "Not assigned",
      response: "No response yet",
      systemControl: "Inactive",
    });

const [isAssistantListening, setIsAssistantListening] =
    useState(false);

const runAssistant = () => {

  if (assistantLog.systemControl === "Inactive") {
  alert("Please activate System Control first.");
  return;
}
  if (!assistantCommand.trim()) {

    
    return;
  }


  setIsAssistantListening(true);
  setAssistantLog((current) => ({
  ...current,
  systemControl: "Active",
}));

  setTimeout(() => {
    const command = assistantCommand.trim();

    let assignedTo = "AI Manager";
  let understood = "General office command";
    let response = "Task received and processed.";

    if (
    command.includes("website") ||
command.includes("web site") ||
command.includes("code") ||
command.includes("developer") ||
command.includes("ویب سائٹ") ||
command.includes("کوڈ")
    ) {
      assignedTo = "Developer Agent";
      understood = "Website development task";
      response =
        "Developer Agent received the task and is working on it.";
    } else if (
      
command.includes("research") ||
command.includes("search") ||
command.includes("ریسرچ") ||
command.includes("تحقیق") ||
command.includes("تلاش")

    ) {
      assignedTo = "Research Agent";
      understood = "Research and information gathering task";
      response =
        "Research Agent received the task and started processing.";
    } else if (
     
command.includes("design") ||
command.includes("ui") ||
command.includes("ڈیزائن") ||
command.includes("یو آئی")

    ) {
      assignedTo = "Design Agent";
      understood = "UI / creative design task";
      response =
        "Design Agent received the task and started working.";
    } else if (
    
command.includes("employee") ||
command.includes("hr") ||
command.includes("hire") ||
command.includes("ملازم") ||
command.includes("بھرتی") ||
command.includes("نیا ملازم")

    ) {
      assignedTo = "HR Agent";
      understood = "Employee / HR related task";
      response =
        "HR Agent received the task and is processing it.";
        }
        else if (
  command.includes("finance") ||
  command.includes("money") ||
  command.includes("payment") ||
  command.includes("budget") ||
  command.includes("فنانس") ||
  command.includes("پیسے") ||
  command.includes("ادائیگی") ||
  command.includes("بجٹ")
) {
  assignedTo = "Finance Agent";
  understood = "Finance / payment related task";
  response =
    "Finance Agent received the task and is processing it.";
}

else if (
  command.includes("calendar") ||
  command.includes("meeting") ||
  command.includes("schedule") ||
  command.includes("appointment") ||
  command.includes("کیلنڈر") ||
  command.includes("میٹنگ") ||
  command.includes("شیڈول") ||
  command.includes("ملاقات")
) {
  assignedTo = "Calendar Agent";
  understood = "Meeting / calendar scheduling task";
  response =
    "Calendar Agent received the task and is processing it.";
}

else if (
  command.includes("email") ||
  command.includes("mail") ||
  command.includes("ای میل") ||
  command.includes("میل") ||
  command.includes("ایمیل")
) {
  assignedTo = "Email Agent";
  understood = "Email related task";
  response =
    "Email Agent received the task and is processing it.";
}

else if (
  command.includes("social media") ||
  command.includes("social") ||
  command.includes("facebook") ||
  command.includes("instagram") ||
  command.includes("سوشل میڈیا") ||
  command.includes("سوشل") ||
  command.includes("فیس بک") ||
  command.includes("انسٹاگرام")
) {
  assignedTo = "Social Media Agent";
  understood = "Social media related task";
  response =
    "Social Media Agent received the task and is processing it.";
}

else if (
  command.includes("manager") ||
  command.includes("manage") ||
  command.includes("manager agent") ||
  command.includes("منیجر") ||
  command.includes("انتظام")
) {
  assignedTo = "AI Manager";
  understood = "Office management and task coordination";
  response =
    "AI Manager received the task and is coordinating it.";
}

    setAssistantLog({
      command,
      understood,
      assignedTo,
      response,
      systemControl: "Active",
    });

    setIsAssistantListening(false);
  }, 800);
};


const startVoiceCommand = () => {

if (assistantLog.systemControl === "Inactive") {
  alert("System Control is Inactive. Please activate it first.");
  return;
}

  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert(
      "Voice recognition is not supported in this browser. Please use Google Chrome."
    );
    return;
  }

  const recognition = new SpeechRecognition();
recognition.lang = "ur-PK";
  recognition.continuous = false;
  recognition.interimResults = false;

  setIsAssistantListening(true);

  recognition.onresult = (event: any) => {
  const spokenText =
    event.results[0][0].transcript.trim();

  const command = spokenText.toLowerCase();

  setAssistantCommand(spokenText);

  let assignedTo = "AI Manager";
  let understood = "General office command";
  let response = "AI Manager received your command.";

  if (
    command.includes("website") ||
    command.includes("code") ||
    command.includes("developer") ||
    command.includes("ویب سائٹ") ||
    command.includes("کوڈ") ||
    command.includes("ڈیویلپر")
  ) {
    assignedTo = "Developer Agent";
    understood = "Website / development command";
    response =
      "Developer Agent has received the voice command.";
  } else if (
    command.includes("research") ||
    command.includes("search") ||
    command.includes("ریسرچ") ||
    command.includes("تلاش") ||
    command.includes("تحقیق")
  ) {
    assignedTo = "Research Agent";
    understood = "Research and information gathering command";
    response =
      "Research Agent has received the voice command.";
  } else if (
    command.includes("design") ||
    command.includes("ui") ||
    command.includes("ڈیزائن")
  ) {
    assignedTo = "Design Agent";
    understood = "UI / design command";
    response =
      "Design Agent has received the voice command.";
  } else if (
    command.includes("employee") ||
    command.includes("hr") ||
    command.includes("ملازم") ||
    command.includes("ایچ آر")
  ) {
    assignedTo = "HR Agent";
    understood = "Employee / HR command";
    response =
      "HR Agent has received the voice command.";
  }

  setAssistantLog({
    command: spokenText,
    understood,
    assignedTo,
    response,
    systemControl: "Active",
  });

  setIsAssistantListening(false);
};

  recognition.onerror = () => {
    setIsAssistantListening(false);
  };

  recognition.onend = () => {
    setIsAssistantListening(false);
  };

  recognition.start();
};


  const hireEmployee = () => {

    
    if (!name.trim()) {
      return;
    }

    const newEmployee: Employee = {
      id: Date.now(),
      name: name.trim(),
      role,
      department,
      status,
      avatar:
        avatarOptions[
          employees.length % avatarOptions.length
        ],
    };

    setEmployees((current) => [
      ...current,
      newEmployee,
    ]);

    setName("");
    setRole("Developer Agent");
    setDepartment("Development");
    setStatus("Available");
    setShowHireForm(false);
  };

  const fireEmployee = (id: number) => {
    setEmployees((current) =>
      current.filter(
        (employee) => employee.id !== id
      )
    );

    setSelectedEmployee(null);
  };

  const updateStatus = (
    id: number,
    newStatus: Employee["status"]
  ) => {
    setEmployees((current) =>
      current.map((employee) =>
        employee.id === id
          ? {
              ...employee,
              status: newStatus,
            }
          : employee
      )
    );

    setSelectedEmployee((current) =>
      current && current.id === id
        ? {
            ...current,
            status: newStatus,
          }
        : current
    );
  };

  const workingCount = employees.filter(
    (employee) =>
      employee.status === "Working"
  ).length;

  const availableCount = employees.filter(
    (employee) =>
      employee.status === "Available"
  ).length;

  const idleCount = employees.filter(
    (employee) => employee.status === "Idle"
  ).length;

  const getDepartmentEmployees = (
    departmentName: string
  ) =>
    employees.filter(
      (employee) =>
        employee.department === departmentName
    );

  
  
  

  return (
    <div
      className="min-h-screen overflow-hidden p-6"
      style={{
        backgroundColor: dark
          ? "#080a09"
          : "#e9eeeb",
        color: dark
          ? "#ffffff"
          : "#17201b",
      }}
    >
      {/* ========================= */}
      {/* MOVEMENT ANIMATIONS */}
      {/* ========================= */}

      <style>
        {`
          @keyframes walkAround1 {
            0% {
              transform: translate(0px, 0px);
            }
            25% {
              transform: translate(24px, 8px);
            }
            50% {
              transform: translate(12px, 30px);
            }
            75% {
              transform: translate(-18px, 18px);
            }
            100% {
              transform: translate(0px, 0px);
            }
          }

          @keyframes walkAround2 {
            0% {
              transform: translate(0px, 0px);
            }
            25% {
              transform: translate(-22px, 10px);
            }
            50% {
              transform: translate(-8px, 30px);
            }
            75% {
              transform: translate(20px, 15px);
            }
            100% {
              transform: translate(0px, 0px);
            }
          }

          @keyframes walkAround3 {
            0% {
              transform: translate(0px, 0px);
            }
            20% {
              transform: translate(15px, -8px);
            }
            40% {
              transform: translate(28px, 18px);
            }
            60% {
              transform: translate(4px, 34px);
            }
            80% {
              transform: translate(-20px, 12px);
            }
            100% {
              transform: translate(0px, 0px);
            }
          }

          @keyframes walkAround4 {
            0% {
              transform: translate(0px, 0px);
            }
            25% {
              transform: translate(-16px, -6px);
            }
            50% {
              transform: translate(-30px, 22px);
            }
            75% {
              transform: translate(8px, 32px);
            }
            100% {
              transform: translate(0px, 0px);
            }
          }

          @keyframes idleBounce {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-3px);
            }
            100% {
              transform: translateY(0px);
            }
          }

          .office-walker {
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
          }

          .office-walker:hover {
            animation-play-state: paused;
          }

          .employee-shadow {
            box-shadow:
              0 5px 10px rgba(0,0,0,0.22);
          }
        `}
      </style>

        
      

     
{/* ========================= */}
{/* VOICE ASSISTANT */}
{/* ========================= */}

<div
  className="mb-5 rounded-3xl border p-5"
  style={{
    backgroundColor: dark
      ? "#111412"
      : "#ffffff",
    borderColor: dark
      ? "#303a35"
      : "#c7d1cb",
    boxShadow: dark
      ? "0 20px 50px rgba(0,0,0,0.25)"
      : "0 12px 35px rgba(0,0,0,0.08)",
  }}
>
  <div className="mb-4 flex items-center justify-between">
    <div>
      <h2 className="text-base font-bold">
        🎙️ AI Voice Assistant
      </h2>

      <p
        className="mt-1 text-[10px]"
        style={{
          color: dark
            ? "#7f8b84"
            : "#6b756f",
        }}
      >
        Give a command and let the AI Manager assign it to the right agent.
      </p>
    </div>

       <button
      type="button"
      onClick={() =>
        setAssistantLog((current) => ({
          ...current,
          systemControl:
            current.systemControl === "Active"
              ? "Inactive"
              : "Active",
        }))
      }
      className="rounded-full px-3 py-1 text-[9px] font-semibold transition hover:scale-105"
      style={{
        backgroundColor:
          assistantLog.systemControl === "Active"
            ? dark
              ? "#12301f"
              : "#e2f8ea"
            : dark
            ? "#1a1f1c"
            : "#eef2ef",
        color:
          assistantLog.systemControl === "Active"
            ? "#39ff88"
            : dark
            ? "#89958d"
            : "#69756e",
      }}
    >
      ● System Control: {assistantLog.systemControl}
    </button>
  </div>

 

  <div className="flex gap-3">
    
      <input
  type="text"
  value={assistantCommand}
  onChange={(e) => setAssistantCommand(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      runAssistant();
    }
  }}
  placeholder="e.g. Create a new website for the company"
  className="flex-1 rounded-xl border px-4 py-3 text-xs outline-none"
  style={{
    backgroundColor: dark
      ? "#0b0e0c"
      : "#f5f7f6",
    borderColor: dark
      ? "#303a35"
      : "#d1d9d4",
    color: dark
      ? "#ffffff"
      : "#17201b",
  }}
/>
     

    <button
      type="button"
     onClick={startVoiceCommand}
      disabled={isAssistantListening}
      className="rounded-xl px-5 py-3 text-xs font-bold transition hover:scale-[1.02]"
      style={{
        backgroundColor: "#39ff88",
        color: "#061009",
        opacity: isAssistantListening ? 0.6 : 1,
      }}
    >
      {isAssistantListening
        ? "Processing..."
        : "🎤 Send Command"}
    </button>

    <button
      type="button"
      onClick={startVoiceCommand}
      disabled={isAssistantListening}
      className="rounded-xl px-5 py-3 text-xs font-bold transition hover:scale-[1.02]"
      style={{
        backgroundColor: "#39ff88",
        color: "#061009",
        opacity: isAssistantListening ? 0.6 : 1,
      }}
    >
      {isAssistantListening ? "Listening..." : "🎙️ Voice Command"}
    </button>

  </div>

   {/* ASSISTANT ACTIVITY */}

  <div className="mt-5 grid gap-3 md:grid-cols-4">

    {/* YOU SAID */}

    <div
      className="rounded-2xl border p-4"
      style={{
        backgroundColor: dark
          ? "#151b18"
          : "#f6f8f7",
        borderColor: dark
          ? "#303a35"
          : "#d7ded9",
      }}
    >
      <p className="text-[10px] font-semibold text-blue-400">
        🎤 YOU SAID
      </p>

      <p className="mt-2 text-xs">
        {assistantLog.command ||
          "Waiting for command..."}
      </p>
    </div>

    {/* UNDERSTOOD */}

    <div
      className="rounded-2xl border p-4"
      style={{
        backgroundColor: dark
          ? "#151b18"
          : "#f6f8f7",
        borderColor: dark
          ? "#303a35"
          : "#d7ded9",
      }}
    >
      <p className="text-[10px] font-semibold text-purple-400">
        🧠 UNDERSTOOD
      </p>

      <p className="mt-2 text-xs">
        {assistantLog.understood ||
          "Waiting for command..."}
      </p>
    </div>

    {/* ASSIGNED TO */}

    <div
      className="rounded-2xl border p-4"
      style={{
        backgroundColor: dark
          ? "#151b18"
          : "#f6f8f7",
        borderColor: dark
          ? "#303a35"
          : "#d7ded9",
      }}
    >
      <p className="text-[10px] font-semibold text-green-400">
        🤖 ASSIGNED TO
      </p>

      <p className="mt-2 text-xs font-semibold">
        {assistantLog.assignedTo ||
          "No agent assigned"}
      </p>
    </div>

    {/* AGENT REPLY */}

    <div
      className="rounded-2xl border p-4"
      style={{
        backgroundColor: dark
          ? "#151b18"
          : "#f6f8f7",
        borderColor: dark
          ? "#303a35"
          : "#d7ded9",
      }}
    >
      <p className="text-[10px] font-semibold text-yellow-400">
        ✅ AGENT REPLY
      </p>

      <p className="mt-2 text-xs">
        {assistantLog.response ||
          "No task completed yet."}
      </p>
    </div>

  </div>
</div>


 {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <div
        className="relative mb-5 flex items-center justify-between rounded-2xl border px-5 py-4"
        style={{
          backgroundColor: dark
            ? "#111412"
            : "#ffffff",
          borderColor: dark
            ? "#26302b"
            : "#d7ded9",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg"
            style={{
              backgroundColor: "#39ff88",
              color: "#061009",
            }}
          >
            ✦
          </div>

          <div>
            <h1 className="text-lg font-bold">
              AI Virtual Office
            </h1>

            <p
              className="text-xs"
              style={{
                color: dark
                  ? "#7f8b84"
                  : "#6b756f",
              }}
            >
              Live AI workforce environment
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="rounded-lg border px-3 py-2 text-xs"
            style={{
              backgroundColor: dark
                ? "#151a17"
                : "#f5f7f6",
              borderColor: dark
                ? "#26302b"
                : "#d7ded9",
            }}
          >
            <span
              style={{
                color: "#39ff88",
              }}
            >
              ●
            </span>{" "}
            Office Online
          </div>

          <button
            type="button"
            onClick={() =>
              setShowHireForm(true)
            }
            className="rounded-lg px-4 py-2 text-xs font-semibold"
            style={{
              backgroundColor: "#39ff88",
              color: "#061009",
            }}
          >
            + Hire Employee
          </button>
        </div>

        {/* ========================= */}
        {/* HIRE FORM */}
        {/* ========================= */}

        {showHireForm && (
          <div
            className="absolute right-5 top-16 z-50 w-80 rounded-2xl border p-5 shadow-2xl"
            style={{
              backgroundColor: dark
                ? "#111412"
                : "#ffffff",
              borderColor: dark
                ? "#39443e"
                : "#d1d9d4",
            }}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold">
                  Hire New Employee
                </h2>

                <p
                  className="mt-1 text-[10px]"
                  style={{
                    color: dark
                      ? "#7f8b84"
                      : "#6b756f",
                  }}
                >
                  Add a new AI worker to your office
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowHireForm(false)
                }
                className="text-lg"
                style={{
                  color: dark
                    ? "#7f8b84"
                    : "#6b756f",
                }}
              >
                ×
              </button>
            </div>

            <label className="mb-1 block text-[10px] font-semibold">
              Employee Name
            </label>

            <input
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="e.g. Alex"
              className="mb-3 w-full rounded-lg border px-3 py-2 text-xs outline-none"
              style={{
                backgroundColor: dark
                  ? "#0b0e0c"
                  : "#f5f7f6",
                borderColor: dark
                  ? "#303a35"
                  : "#d1d9d4",
                color: dark
                  ? "#ffffff"
                  : "#17201b",
              }}
            />

            <label className="mb-1 block text-[10px] font-semibold">
              Role
            </label>

            <select
              value={role}
              onChange={(event) =>
                setRole(event.target.value)
              }
              className="mb-3 w-full rounded-lg border px-3 py-2 text-xs outline-none"
              style={{
                backgroundColor: dark
                  ? "#0b0e0c"
                  : "#f5f7f6",
                borderColor: dark
                  ? "#303a35"
                  : "#d1d9d4",
                color: dark
                  ? "#ffffff"
                  : "#17201b",
              }}
            >
              <option>
                Developer Agent
              </option>
              <option>
                Design Agent
              </option>
              <option>
                Research Agent
              </option>
              <option>HR Agent</option>
              <option>
                Finance Agent
              </option>
              <option>
                Marketing Agent
              </option>
            </select>

            <label className="mb-1 block text-[10px] font-semibold">
              Department
            </label>

            <select
              value={department}
              onChange={(event) =>
                setDepartment(event.target.value)
              }
              className="mb-3 w-full rounded-lg border px-3 py-2 text-xs outline-none"
              style={{
                backgroundColor: dark
                  ? "#0b0e0c"
                  : "#f5f7f6",
                borderColor: dark
                  ? "#303a35"
                  : "#d1d9d4",
                color: dark
                  ? "#ffffff"
                  : "#17201b",
              }}
            >
              <option>Management</option>
              <option>Development</option>
              <option>Research</option>
              <option>Creative</option>
              <option>HR</option>
            </select>

            <label className="mb-1 block text-[10px] font-semibold">
              Status
            </label>

            <select
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target.value as Employee["status"]
                )
              }
              className="mb-4 w-full rounded-lg border px-3 py-2 text-xs outline-none"
              style={{
                backgroundColor: dark
                  ? "#0b0e0c"
                  : "#f5f7f6",
                borderColor: dark
                  ? "#303a35"
                  : "#d1d9d4",
                color: dark
                  ? "#ffffff"
                  : "#17201b",
              }}
            >
              <option>Available</option>
              <option>Working</option>
              <option>Idle</option>
            </select>

            <button
              type="button"
              onClick={hireEmployee}
              className="w-full rounded-lg px-4 py-2.5 text-xs font-bold"
              style={{
                backgroundColor: "#39ff88",
                color: "#061009",
              }}
            >
              Hire Employee
            </button>
          </div>
        )}
      </div>


      {/* ========================= */}
      {/* OFFICE */}
      {/* ========================= */}

      <div
        className="relative overflow-hidden rounded-3xl border"
        style={{
          height: "650px",
          backgroundColor: dark
            ? "#151b19"
            : "#dce5df",
          borderColor: dark
            ? "#303a35"
            : "#c5d0c9",
          boxShadow: dark
            ? "0 30px 80px rgba(0,0,0,0.45)"
            : "0 20px 50px rgba(0,0,0,0.12)",
        }}
      >
        {/* FLOOR GRID */}

        <div
          className="absolute inset-0"
          style={{
            backgroundImage: dark
              ? `
                linear-gradient(
                  rgba(255,255,255,0.025) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(255,255,255,0.025) 1px,
                  transparent 1px
                )
              `
              : `
                linear-gradient(
                  rgba(0,0,0,0.035) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(0,0,0,0.035) 1px,
                  transparent 1px
                )
              `,
            backgroundSize: "32px 32px",
          }}
        />

        {/* DECORATIVE PATHS */}

        <div
          className="absolute left-[31%] top-[18%] h-[26%] w-[1px]"
          style={{
            backgroundColor: dark
              ? "#344039"
              : "#b7c3bc",
          }}
        />

        <div
          className="absolute left-[65%] top-[18%] h-[26%] w-[1px]"
          style={{
            backgroundColor: dark
              ? "#344039"
              : "#b7c3bc",
          }}
        />

        {/* MANAGEMENT */}

        <OfficeRoom
          title="Management"
          department="Management"
          employees={getDepartmentEmployees(
            "Management"
          )}
          dark={dark}
          onEmployeeClick={setSelectedEmployee}
          animationOffset={0}
        />

        {/* DEVELOPMENT */}

        <OfficeRoom
          title="Development Lab"
          department="Development"
          employees={getDepartmentEmployees(
            "Development"
          )}
          dark={dark}
          onEmployeeClick={setSelectedEmployee}
          animationOffset={1}
        />

        {/* RESEARCH */}

        <OfficeRoom
          title="Research Department"
          department="Research"
          employees={getDepartmentEmployees(
            "Research"
          )}
          dark={dark}
          onEmployeeClick={setSelectedEmployee}
          animationOffset={2}
        />

        {/* ========================= */}
        {/* CORRIDOR */}
        {/* ========================= */}

        <div
          className="absolute left-0 right-0 top-[45%]"
          style={{
            height: "10%",
            backgroundColor: dark
              ? "#0d110f"
              : "#cfd9d3",
            borderTop: `1px solid ${
              dark
                ? "#303a35"
                : "#bac7bf"
            }`,
            borderBottom: `1px solid ${
              dark
                ? "#303a35"
                : "#bac7bf"
            }`,
          }}
        >
          <div className="relative flex h-full items-center justify-center gap-3">
            <span
              className="rounded-full px-4 py-1 text-[10px]"
              style={{
                backgroundColor: dark
                  ? "#18211c"
                  : "#e6ece8",
                color: "#39ff88",
              }}
            >
              MAIN CORRIDOR
            </span>

            <button
  type="button"
  onClick={() => {


    const workforce =
      employees
        .map(
          (employee) =>
            `${employee.name} — ${employee.role} — ${employee.status}`
        )
        .join("\n");

    alert(
      `AI WORKFORCE\n\n${workforce}\n\nTotal Employees: ${employees.length}\nWorking: ${workingCount}\nAvailable: ${availableCount}\nIdle: ${idleCount}`
    );
  }}
  className="rounded-full px-4 py-1 text-[10px] font-semibold transition hover:scale-105"
  style={{
    backgroundColor: dark
      ? "#18211c"
      : "#e6ece8",
    color: "#39ff88",
    border: `1px solid ${
      dark
        ? "#2d4035"
        : "#c4d2c9"
    }`,
    cursor: "pointer",
  }}
>
  AI Workforce Area
</button>


          </div>

          {/* WALKING DOTS */}

          <div
            className="absolute left-[12%] top-1/2 h-1.5 w-1.5 rounded-full"
            style={{
              backgroundColor: "#39ff88",
              boxShadow:
                "0 0 8px #39ff88",
            }}
          />

          <div
            className="absolute right-[15%] top-1/2 h-1.5 w-1.5 rounded-full"
            style={{
              backgroundColor: "#39ff88",
              boxShadow:
                "0 0 8px #39ff88",
            }}
          />
        </div>

        {/* CREATIVE */}

        <OfficeRoom
          title="Creative Studio"
          department="Creative"
          employees={getDepartmentEmployees(
            "Creative"
          )}
          dark={dark}
          bottom
          onEmployeeClick={setSelectedEmployee}
          animationOffset={3}
        />

        {/* HR */}

        <OfficeRoom
          title="HR & Operations"
          department="HR"
          employees={getDepartmentEmployees(
            "HR"
          )}
          dark={dark}
          bottom
          onEmployeeClick={setSelectedEmployee}
          animationOffset={4}
        />

        {/* OFFICE STATUS */}

        <div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full border px-4 py-1.5 text-[9px]"
          style={{
            backgroundColor: dark
              ? "#111412"
              : "#ffffff",
            borderColor: dark
              ? "#303a35"
              : "#c7d1cb",
            color: dark
              ? "#849087"
              : "#69756e",
          }}
        >
          {employees.length} AI Employees •{" "}
          {workingCount} Working •{" "}
          {availableCount} Available •{" "}
          {idleCount} Idle
        </div>
      </div>

      {/* ========================= */}
      {/* EMPLOYEE LEGEND */}
      {/* ========================= */}

      <div className="mt-4 flex flex-wrap gap-3">
        {employees.map((employee) => (
          <button
            key={employee.id}
            type="button"
            onClick={() =>
              setSelectedEmployee(employee)
            }
            className="flex items-center gap-2 rounded-xl border px-3 py-2 text-left transition hover:scale-[1.02]"
            style={{
              backgroundColor: dark
                ? "#111412"
                : "#ffffff",
              borderColor: dark
                ? "#26302b"
                : "#d1d9d4",
            }}
          >
            <span className="text-lg">
              {employee.avatar}
            </span>

            <div>
              <p className="text-[10px] font-semibold">
                {employee.name}
              </p>

              <p
                className="text-[9px]"
                style={{
                  color:
                    employee.status === "Idle"
                      ? dark
                        ? "#7d8781"
                        : "#6d7771"
                      : "#39ff88",
                }}
              >
                {employee.status}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* ========================= */}
      {/* EMPLOYEE DETAILS */}
      {/* ========================= */}

      {selectedEmployee && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-5"
          onClick={() =>
            setSelectedEmployee(null)
          }
        >
          <div
            className="w-80 rounded-2xl border p-5 shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
            style={{
              backgroundColor: dark
                ? "#111412"
                : "#ffffff",
              borderColor: dark
                ? "#39443e"
                : "#d1d9d4",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="text-4xl">
                {selectedEmployee.avatar}
              </div>

              <div>
                <h2 className="text-base font-bold">
                  {selectedEmployee.name}
                </h2>

                <p
                  className="text-xs"
                  style={{
                    color: "#39ff88",
                  }}
                >
                  {selectedEmployee.role}
                </p>

                <p
                  className="text-[10px]"
                  style={{
                    color: dark
                      ? "#7f8b84"
                      : "#6b756f",
                  }}
                >
                  {selectedEmployee.department}
                </p>
              </div>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-[10px] font-semibold">
                Employee Status
              </p>

              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    "Working",
                    "Available",
                    "Idle",
                  ] as Employee["status"][]
                ).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      updateStatus(
                        selectedEmployee.id,
                        item
                      )
                    }
                    className="rounded-lg border px-2 py-2 text-[9px]"
                    style={{
                      backgroundColor:
                        selectedEmployee.status ===
                        item
                          ? "#39ff88"
                          : dark
                          ? "#181d1a"
                          : "#f3f6f4",

                      color:
                        selectedEmployee.status ===
                        item
                          ? "#061009"
                          : dark
                          ? "#ffffff"
                          : "#17201b",

                      borderColor: dark
                        ? "#303a35"
                        : "#d1d9d4",
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

           <div className="mt-5 flex gap-2">
  <button
    type="button"
    onClick={() =>
      setSelectedEmployee(null)
    }
    className="flex-1 rounded-lg border px-3 py-2 text-xs"
    style={{
      borderColor: dark
        ? "#303a35"
        : "#d1d9d4",
      color: dark
        ? "#ffffff"
        : "#17201b",
    }}
  >
    Close
  </button>

  <button
    type="button"
    onClick={() =>
      fireEmployee(selectedEmployee.id)
    }
    className="rounded-lg px-3 py-2 text-xs font-semibold"
    style={{
      backgroundColor: "#ff5c5c",
      color: "#ffffff",
    }}
  >
    Fire
  </button>
</div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================= */
/* OFFICE ROOM */
/* ================================= */

function OfficeRoom({
  title,
  department,
  employees,
  dark,
  bottom = false,
  onEmployeeClick,
  animationOffset,
}: {
  title: string;
  department: string;
  employees: Employee[];
  dark: boolean;
  bottom?: boolean;
  onEmployeeClick: (
    employee: Employee
  ) => void;
  animationOffset: number;
}) {
  const roomEmployees = employees.slice(0, 4);

  let left: string | undefined;
  let right: string | undefined;

  if (
    department === "Management" ||
    department === "Creative"
  ) {
    left = "2%";
  }

  if (
    department === "Research" ||
    department === "HR"
  ) {
    right = "2%";
  }

  if (department === "Development") {
    left = "33%";
  }

  const width =
    department === "Management" ||
    department === "Research"
      ? "30%"
      : department === "Development"
      ? "32%"
      : "43%";

  return (
    <div
      className="absolute rounded-xl border p-4"
      style={{
        left,
        right,
        top: !bottom ? "3%" : undefined,
        bottom: bottom ? "3%" : undefined,
        width,
        height: bottom
          ? "35%"
          : "43%",
        backgroundColor: dark
          ? "#19201d"
          : "#e9efeb",
        borderColor: dark
          ? "#39443e"
          : "#bdc9c1",
      }}
    >
      <RoomTitle title={title} />

      {roomEmployees.length === 0 ? (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-dashed px-4 py-3 text-center text-[9px]"
          style={{
            borderColor: dark
              ? "#354039"
              : "#b7c3bc",
            color: dark
              ? "#69756e"
              : "#758078",
          }}
        >
          Empty workspace
          <br />
          Ready for new employee
        </div>
      ) : (
        roomEmployees.map(
          (employee, index) => (
            <Desk
              key={employee.id}
              employee={employee}
              index={index}
              dark={dark}
              onClick={() =>
                onEmployeeClick(employee)
              }
              animationIndex={
                animationOffset + index
              }
            />
          )
        )
      )}

      <div
        className="absolute bottom-4 left-4 rounded-lg px-2 py-1 text-[9px]"
        style={{
          backgroundColor: dark
            ? "#101411"
            : "#dce5df",
          color: dark
            ? "#77847c"
            : "#68736d",
        }}
      >
        {department === "Management" &&
          "Strategic Department"}

        {department === "Development" &&
          "Code • Build • Design"}

        {department === "Research" &&
          "Research • Analysis"}

        {department === "Creative" &&
          "Creative • Design"}

        {department === "HR" &&
          "People • Operations"}
      </div>
    </div>
  );
}

/* ================================= */
/* ROOM TITLE */
/* ================================= */

function RoomTitle({
  title,
}: {
  title: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xs font-bold uppercase tracking-wider">
        {title}
      </h2>

      <span
        className="h-2 w-2 rounded-full"
        style={{
          backgroundColor: "#39ff88",
          boxShadow:
            "0 0 8px rgba(57,255,136,0.8)",
        }}
      />
    </div>
  );
}

/* ================================= */
/* DESK + WALKING EMPLOYEE */
/* ================================= */

function Desk({
  employee,
  index,
  dark,
  onClick,
  animationIndex,
}: {
  employee: Employee;
  index: number;
  dark: boolean;
  onClick: () => void;
  animationIndex: number;
}) {
  const positions = [
    {
      left: "8%",
      top: "27%",
    },
    {
      left: "55%",
      top: "27%",
    },
    {
      left: "30%",
      top: "57%",
    },
    {
      left: "65%",
      top: "57%",
    },
  ];

  const position =
    positions[index % positions.length];

  const animationNames = [
    "walkAround1",
    "walkAround2",
    "walkAround3",
    "walkAround4",
  ];

  const animationName =
    animationNames[
      animationIndex %
        animationNames.length
    ];

  const animationDuration =
    7 + (animationIndex % 4);

  const animationDelay =
    -(animationIndex * 1.7);

  return (
    <div
      className="absolute"
      style={{
        left: position.left,
        top: position.top,
      }}
    >
      {/* MOVING EMPLOYEE */}

      <button
        type="button"
        onClick={onClick}
        className="office-walker absolute left-1/2 z-20 -translate-x-1/2"
        style={{
          top: "-48px",
          animationName,
          animationDuration: `${animationDuration}s`,
          animationDelay: `${animationDelay}s`,
        }}
      >
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full border text-3xl transition hover:scale-125"
          style={{
            backgroundColor: dark
              ? "#111613"
              : "#ffffff",
            borderColor: dark
              ? "#39443e"
              : "#c0cbc4",
          }}
        >
          {employee.avatar}
        </div>

        {/* STATUS DOT */}

        <span
          className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full"
          style={{
            backgroundColor:
              employee.status ===
              "Idle"
                ? "#7d8781"
                : employee.status ===
                  "Working"
                ? "#39ff88"
                : "#60A5FA",
            boxShadow:
              employee.status ===
              "Idle"
                ? "none"
                : "0 0 8px currentColor",
          }}
        />
      </button>

      {/* DESK */}

      <button
        type="button"
        onClick={onClick}
        className="employee-shadow relative flex h-20 w-28 items-end justify-center rounded-lg border pb-1 transition hover:scale-[1.03]"
        style={{
          backgroundColor: dark
            ? "#101512"
            : "#d2dcd6",
          borderColor: dark
            ? "#344039"
            : "#b7c3bc",
        }}
      >
        {/* MONITOR */}

        <div
          className="absolute left-1/2 top-2 flex h-7 w-12 -translate-x-1/2 items-center justify-center rounded border text-[10px]"
          style={{
            backgroundColor: dark
              ? "#080b09"
              : "#f1f4f2",
            borderColor: dark
              ? "#3b4740"
              : "#aebbb3",
          }}
        >
          <span
            style={{
              color: "#39ff88",
            }}
          >
            ▰
          </span>
        </div>

        {/* KEYBOARD */}

        <div
          className="absolute bottom-4 left-1/2 h-1.5 w-7 -translate-x-1/2 rounded"
          style={{
            backgroundColor: dark
              ? "#4c5751"
              : "#8d9992",
          }}
        />

        {/* DESK OBJECT */}

        <div
          className="absolute bottom-2 right-3 h-2 w-2 rounded-full"
          style={{
            backgroundColor:
              "#39ff88",
            opacity: 0.7,
          }}
        />
      </button>

      {/* NAME */}

      <div className="mt-1 w-28 text-center">
        <p className="truncate text-[9px] font-semibold">
          {employee.name}
        </p>

        <p
          className="text-[8px]"
          style={{
            color:
              employee.status ===
              "Idle"
                ? dark
                  ? "#77827b"
                  : "#69746e"
                : employee.status ===
                  "Working"
                ? "#39ff88"
                : "#60A5FA",
          }}
        >
          {employee.status}
        </p>
      </div>
    </div>
  );
}



  
  

export default VirtualOffice;