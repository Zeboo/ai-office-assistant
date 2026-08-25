
import { useState } from "react";

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
];

function VirtualOffice({ themeMode }: VirtualOfficeProps) {
  const dark = themeMode === "dark";

  const [employees, setEmployees] =
    useState<Employee[]>(initialEmployees);

  const [showHireForm, setShowHireForm] = useState(false);

  const [selectedEmployee, setSelectedEmployee] =
    useState<Employee | null>(null);

  const [name, setName] = useState("");
  const [role, setRole] = useState("Developer Agent");
  const [department, setDepartment] =
    useState("Development");
  const [status, setStatus] =
    useState<Employee["status"]>("Available");

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
      current.filter((employee) => employee.id !== id)
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
    (employee) => employee.status === "Working"
  ).length;

  const availableCount = employees.filter(
    (employee) => employee.status === "Available"
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
        backgroundColor: dark ? "#080a09" : "#e9eeeb",
        color: dark ? "#ffffff" : "#17201b",
      }}
    >
      {/* HEADER */}
      <div
        className="relative mb-5 flex items-center justify-between rounded-2xl border px-5 py-4"
        style={{
          backgroundColor: dark ? "#111412" : "#ffffff",
          borderColor: dark ? "#26302b" : "#d7ded9",
        }}
      >
        <div>
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
                  color: dark ? "#7f8b84" : "#6b756f",
                }}
              >
                Live AI workforce environment
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="rounded-lg border px-3 py-2 text-xs"
            style={{
              backgroundColor: dark ? "#151a17" : "#f5f7f6",
              borderColor: dark ? "#26302b" : "#d7ded9",
            }}
          >
            <span style={{ color: "#39ff88" }}>
              ●
            </span>{" "}
            Office Online
          </div>

          <button
            type="button"
            onClick={() => setShowHireForm(true)}
            className="rounded-lg px-4 py-2 text-xs font-semibold"
            style={{
              backgroundColor: "#39ff88",
              color: "#061009",
            }}
          >
            + Hire Employee
          </button>
        </div>

        {/* HIRE FORM */}
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

            {/* NAME */}
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

            {/* ROLE */}
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
              <option>Developer Agent</option>
              <option>Design Agent</option>
              <option>Research Agent</option>
              <option>HR Agent</option>
              <option>Finance Agent</option>
              <option>Marketing Agent</option>
            </select>

            {/* DEPARTMENT */}
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

            {/* STATUS */}
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

      {/* OFFICE */}
      <div
        className="relative overflow-hidden rounded-3xl border"
        style={{
          height: "650px",
          backgroundColor: dark ? "#151b19" : "#dce5df",
          borderColor: dark ? "#303a35" : "#c5d0c9",
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
                linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
              `
              : `
                linear-gradient(rgba(0,0,0,0.035) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.035) 1px, transparent 1px)
              `,
            backgroundSize: "32px 32px",
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
        />

        {/* CORRIDOR */}
        <div
          className="absolute left-0 right-0 top-[45%]"
          style={{
            height: "10%",
            backgroundColor: dark
              ? "#0d110f"
              : "#cfd9d3",
            borderTop: `1px solid ${
              dark ? "#303a35" : "#bac7bf"
            }`,
            borderBottom: `1px solid ${
              dark ? "#303a35" : "#bac7bf"
            }`,
          }}
        >
          <div className="flex h-full items-center justify-center gap-3">
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

            <span
              className="text-[10px]"
              style={{
                color: dark
                  ? "#69756e"
                  : "#758078",
              }}
            >
              AI Workforce Area
            </span>
          </div>
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
        />

        {/* HR */}
        <OfficeRoom
          title="HR & Operations"
          department="HR"
          employees={getDepartmentEmployees("HR")}
          dark={dark}
          bottom
          onEmployeeClick={setSelectedEmployee}
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

      {/* EMPLOYEE LEGEND */}
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

      {/* EMPLOYEE DETAILS */}
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
                      borderColor:
                        dark
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

              {selectedEmployee.id > 5 && (
                <button
                  type="button"
                  onClick={() =>
                    fireEmployee(
                      selectedEmployee.id
                    )
                  }
                  className="rounded-lg px-3 py-2 text-xs font-semibold"
                  style={{
                    backgroundColor:
                      "#ff5c5c",
                    color: "#ffffff",
                  }}
                >
                  Fire
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================= */
/* OFFICE ROOM */
/* ============================= */

function OfficeRoom({
  title,
  department,
  employees,
  dark,
  bottom = false,
  onEmployeeClick,
}: {
  title: string;
  department: string;
  employees: Employee[];
  dark: boolean;
  bottom?: boolean;
  onEmployeeClick: (
    employee: Employee
  ) => void;
}) {
  const roomEmployees = employees.slice(0, 4);

  return (
    <div
      className="absolute rounded-xl border p-4"
      style={{
        left:
          department === "Management"
            ? "2%"
            : department === "Development"
            ? "33%"
            : department === "Research"
            ? undefined
            : department === "Creative"
            ? "2%"
            : undefined,

        right:
          department === "Research" ||
          department === "HR"
            ? "2%"
            : undefined,

        top:
          !bottom ? "3%" : undefined,

        bottom:
          bottom ? "3%" : undefined,

        width:
          department === "Management" ||
          department === "Research"
            ? "30%"
            : department === "Development"
            ? "32%"
            : "43%",

        height:
          bottom ? "35%" : "43%",

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
        roomEmployees.map((employee, index) => (
          <Desk
            key={employee.id}
            employee={employee}
            index={index}
            dark={dark}
            onClick={() =>
              onEmployeeClick(employee)
            }
          />
        ))
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

/* ============================= */
/* ROOM TITLE */
/* ============================= */

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

/* ============================= */
/* DESK */
/* ============================= */

function Desk({
  employee,
  index,
  dark,
  onClick,
}: {
  employee: Employee;
  index: number;
  dark: boolean;
  onClick: () => void;
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

  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute text-left transition hover:scale-105"
      style={{
        left: position.left,
        top: position.top,
      }}
    >
      {/* DESK */}
      <div
        className="relative flex h-20 w-28 items-end justify-center rounded-lg border pb-1"
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
          <span style={{ color: "#39ff88" }}>
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

        {/* EMPLOYEE */}
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 text-3xl">
          {employee.avatar}
        </div>
      </div>

      {/* NAME */}
      <div className="mt-1 w-28 text-center">
        <p className="truncate text-[9px] font-semibold">
          {employee.name}
        </p>

        <p
          className="text-[8px]"
          style={{
            color:
              employee.status === "Idle"
                ? dark
                  ? "#77827b"
                  : "#69746e"
                : "#39ff88",
          }}
        >
          {employee.status}
        </p>
      </div>
    </button>
  );
}

export default VirtualOffice;
