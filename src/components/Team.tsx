import { useEffect, useMemo, useState } from "react";
import {
  Users,
  UserPlus,
  Search,
  Pencil,
  Trash2,
  X,
  Mail,
  Phone,
  BriefcaseBusiness,
  UserCheck,
  UserX,
} from "lucide-react";

import { darkColors, lightColors } from "../theme/colors";

type Employee = {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  status: "Active" | "On Leave";
};

const API_URL = "http://localhost:3000/employees";

function Team({
  themeMode,
}: {
  themeMode: "dark" | "light";
}) {
  const theme = themeMode === "dark" ? darkColors : lightColors;
  const dark = themeMode === "dark";

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] =
    useState<Employee | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [employeeForm, setEmployeeForm] = useState({
    name: "",
    role: "",
    department: "Engineering",
    email: "",
    phone: "",
    status: "Active" as "Active" | "On Leave",
  });

  const [employees, setEmployees] = useState<Employee[]>([]);

  const departments = [
    "All",
    "Management",
    "Engineering",
    "Design",
    "HR",
    "Finance",
  ];

  const loadEmployees = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to load employees.");
      }

      const data = await response.json();

      const mappedEmployees: Employee[] = data.map(
        (employee: any) => ({
          id: employee.id,
          name: employee.name ?? "",
          role: employee.role ?? "",
          department: employee.department ?? "",
          email: employee.email ?? "",
          phone: employee.phone ?? "",
          status:
            employee.status === "On Leave"
              ? "On Leave"
              : "Active",
        })
      );

      setEmployees(mappedEmployees);
    } catch (error) {
      console.error(error);
      alert(
        "Could not load employees from backend. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch =
        employee.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        employee.role
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        employee.email
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesDepartment =
        department === "All" ||
        employee.department === department;

      return matchesSearch && matchesDepartment;
    });
  }, [employees, search, department]);

  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active"
  ).length;

  const onLeaveEmployees = employees.filter(
    (employee) => employee.status === "On Leave"
  ).length;

  const openAddModal = () => {
    setSelectedEmployee(null);

    setEmployeeForm({
      name: "",
      role: "",
      department: "Engineering",
      email: "",
      phone: "",
      status: "Active",
    });

    setShowModal(true);
  };

  const openEditModal = (employee: Employee) => {
    setSelectedEmployee(employee);

    setEmployeeForm({
      name: employee.name,
      role: employee.role,
      department: employee.department,
      email: employee.email,
      phone: employee.phone,
      status: employee.status,
    });

    setShowModal(true);
  };

  const saveEmployee = async () => {
    if (
      !employeeForm.name.trim() ||
      !employeeForm.role.trim() ||
      !employeeForm.department.trim() ||
      !employeeForm.email.trim()
    ) {
      alert(
        "Please enter employee name, role, department and email."
      );
      return;
    }

    setSaving(true);

    try {
      const url = selectedEmployee
        ? `${API_URL}/${selectedEmployee.id}`
        : API_URL;

      const method = selectedEmployee ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: employeeForm.name.trim(),
          role: employeeForm.role.trim(),
          department: employeeForm.department,
          email: employeeForm.email.trim(),
          phone: employeeForm.phone.trim(),
          status: employeeForm.status,
          avatar: "",
        }),
      });

      if (!response.ok) {
        const errorBody = await response
          .json()
          .catch(() => null);

        throw new Error(
          errorBody?.message ||
            "Failed to save employee."
        );
      }

      const saved = await response.json();

      const mappedEmployee: Employee = {
        id: saved.id,
        name: saved.name ?? "",
        role: saved.role ?? "",
        department: saved.department ?? "",
        email: saved.email ?? "",
        phone: saved.phone ?? "",
        status:
          saved.status === "On Leave"
            ? "On Leave"
            : "Active",
      };

      if (selectedEmployee) {
        setEmployees((current) =>
          current.map((employee) =>
            employee.id === mappedEmployee.id
              ? mappedEmployee
              : employee
          )
        );
      } else {
        setEmployees((current) => [
          ...current,
          mappedEmployee,
        ]);
      }

      setShowModal(false);
      setSelectedEmployee(null);
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Could not save employee."
      );
    } finally {
      setSaving(false);
    }
  };

  const deleteEmployee = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to delete employee."
        );
      }

      setEmployees((current) =>
        current.filter(
          (employee) => employee.id !== id
        )
      );

      if (selectedEmployee?.id === id) {
        setSelectedEmployee(null);
      }
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Could not delete employee."
      );
    }
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
            <Users size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              Team
            </h1>

            <p
              className="text-sm"
              style={{
                color: theme.textMuted,
              }}
            >
              Manage employees, departments and team members
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* ADD EMPLOYEE */}
          <button
            type="button"
            onClick={openAddModal}
            className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition hover:scale-[1.02]"
            style={{
              backgroundColor: theme.primary,
              color: dark ? theme.black : "#FFFFFF",
            }}
          >
            <UserPlus size={18} />
            Add Employee
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div
          className="rounded-2xl border p-5"
          style={{
            backgroundColor: theme.surface,
            borderColor: theme.border,
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className="text-xs"
                style={{
                  color: theme.textMuted,
                }}
              >
                Total Employees
              </p>

              <p className="mt-2 text-2xl font-bold">
                {employees.length}
              </p>
            </div>

            <Users
              size={24}
              style={{
                color: theme.primary,
              }}
            />
          </div>
        </div>

        <div
          className="rounded-2xl border p-5"
          style={{
            backgroundColor: theme.surface,
            borderColor: theme.border,
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className="text-xs"
                style={{
                  color: theme.textMuted,
                }}
              >
                Active
              </p>

              <p className="mt-2 text-2xl font-bold">
                {activeEmployees}
              </p>
            </div>

            <UserCheck
              size={24}
              style={{
                color: theme.primary,
              }}
            />
          </div>
        </div>

        <div
          className="rounded-2xl border p-5"
          style={{
            backgroundColor: theme.surface,
            borderColor: theme.border,
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className="text-xs"
                style={{
                  color: theme.textMuted,
                }}
              >
                On Leave
              </p>

              <p className="mt-2 text-2xl font-bold">
                {onLeaveEmployees}
              </p>
            </div>

            <UserX
              size={24}
              style={{
                color: theme.textMuted,
              }}
            />
          </div>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div
        className="mb-6 flex flex-col gap-3 rounded-2xl border p-4 md:flex-row"
        style={{
          backgroundColor: theme.surface,
          borderColor: theme.border,
        }}
      >
        <div
          className="flex flex-1 items-center gap-2 rounded-xl border px-3 py-2.5"
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
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search employees..."
            className="w-full bg-transparent text-xs outline-none"
            style={{
              color: theme.text,
            }}
          />
        </div>

        <select
          value={department}
          onChange={(e) =>
            setDepartment(e.target.value)
          }
          className="rounded-xl border px-4 py-2.5 text-xs outline-none"
          style={{
            backgroundColor: theme.surfaceLight,
            borderColor: theme.border,
            color: theme.text,
          }}
        >
          {departments.map((item) => (
            <option key={item} value={item}>
              {item === "All"
                ? "All Departments"
                : item}
            </option>
          ))}
        </select>
      </div>

      {/* EMPLOYEE GRID */}
      {loading ? (
        <div
          className="rounded-2xl border p-10 text-center"
          style={{
            backgroundColor: theme.surface,
            borderColor: theme.border,
          }}
        >
          <Users
            size={35}
            className="mx-auto mb-3"
            style={{
              color: theme.textMuted,
            }}
          />

          <p className="text-sm font-semibold">
            Loading employees...
          </p>

          <p
            className="mt-1 text-xs"
            style={{
              color: theme.textMuted,
            }}
          >
            Getting team members from the backend.
          </p>
        </div>
      ) : filteredEmployees.length === 0 ? (
        <div
          className="rounded-2xl border p-10 text-center"
          style={{
            backgroundColor: theme.surface,
            borderColor: theme.border,
          }}
        >
          <Users
            size={35}
            className="mx-auto mb-3"
            style={{
              color: theme.textMuted,
            }}
          />

          <p className="text-sm font-semibold">
            No employees found
          </p>

          <p
            className="mt-1 text-xs"
            style={{
              color: theme.textMuted,
            }}
          >
            Try another search or department.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredEmployees.map((employee) => (
            <div
              key={employee.id}
              className="rounded-2xl border p-5 transition hover:-translate-y-0.5"
              style={{
                backgroundColor: theme.surface,
                borderColor: theme.border,
              }}
            >
              {/* TOP */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold"
                    style={{
                      backgroundColor: dark
                        ? "rgba(57,255,136,0.12)"
                        : "rgba(22,163,74,0.12)",
                      color: theme.primary,
                    }}
                  >
                    {employee.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold">
                      {employee.name}
                    </h3>

                    <p
                      className="mt-1 text-[10px]"
                      style={{
                        color: theme.textMuted,
                      }}
                    >
                      {employee.role}
                    </p>
                  </div>
                </div>

                <span
                  className="rounded-lg px-2.5 py-1 text-[9px] font-semibold"
                  style={{
                    backgroundColor:
                      employee.status === "Active"
                        ? dark
                          ? "rgba(57,255,136,0.10)"
                          : "rgba(22,163,74,0.10)"
                        : "rgba(245,158,11,0.10)",
                    color:
                      employee.status === "Active"
                        ? theme.primary
                        : "#d97706",
                  }}
                >
                  {employee.status}
                </span>
              </div>

              {/* DEPARTMENT */}
              <div
                className="mt-5 flex items-center gap-2 rounded-xl p-3"
                style={{
                  backgroundColor:
                    theme.surfaceLight,
                }}
              >
                <BriefcaseBusiness
                  size={15}
                  style={{
                    color: theme.primary,
                  }}
                />

                <div>
                  <p
                    className="text-[9px]"
                    style={{
                      color: theme.textMuted,
                    }}
                  >
                    Department
                  </p>

                  <p className="text-xs font-semibold">
                    {employee.department}
                  </p>
                </div>
              </div>

              {/* CONTACT */}
              <div className="mt-4 space-y-2">
                <div
                  className="flex items-center gap-2 text-[10px]"
                  style={{
                    color: theme.textSecondary,
                  }}
                >
                  <Mail size={13} />
                  {employee.email}
                </div>

                <div
                  className="flex items-center gap-2 text-[10px]"
                  style={{
                    color: theme.textSecondary,
                  }}
                >
                  <Phone size={13} />
                  {employee.phone || "No phone number"}
                </div>
              </div>

              {/* ACTIONS */}
              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedEmployee(employee)
                  }
                  className="flex-1 rounded-xl py-2.5 text-xs font-semibold transition hover:scale-[1.01]"
                  style={{
                    backgroundColor:
                      theme.surfaceLight,
                    color: theme.textSecondary,
                  }}
                >
                  View Details
                </button>

                <button
                  type="button"
                  onClick={() =>
                    openEditModal(employee)
                  }
                  className="rounded-xl p-2.5 transition hover:scale-105"
                  style={{
                    backgroundColor:
                      theme.surfaceLight,
                    color: theme.primary,
                  }}
                >
                  <Pencil size={15} />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    deleteEmployee(employee.id)
                  }
                  className="rounded-xl p-2.5 transition hover:scale-105"
                  style={{
                    backgroundColor:
                      theme.surfaceLight,
                    color: "#ef4444",
                  }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DETAILS MODAL */}
      {selectedEmployee && !showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div
            className="w-full max-w-md rounded-2xl border p-6"
            style={{
              backgroundColor: theme.surface,
              borderColor: theme.border,
            }}
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold">
                  Employee Details
                </h2>

                <p
                  className="mt-1 text-xs"
                  style={{
                    color: theme.textMuted,
                  }}
                >
                  Complete employee information
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedEmployee(null)
                }
                style={{
                  color: theme.textMuted,
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 text-center">
              <div
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold"
                style={{
                  backgroundColor: dark
                    ? "rgba(57,255,136,0.12)"
                    : "rgba(22,163,74,0.12)",
                  color: theme.primary,
                }}
              >
                {selectedEmployee.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>

              <h3 className="mt-3 text-lg font-bold">
                {selectedEmployee.name}
              </h3>

              <p
                className="mt-1 text-xs"
                style={{
                  color: theme.textMuted,
                }}
              >
                {selectedEmployee.role}
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <div
                className="rounded-xl p-3"
                style={{
                  backgroundColor:
                    theme.surfaceLight,
                }}
              >
                <p
                  className="text-[9px]"
                  style={{
                    color: theme.textMuted,
                  }}
                >
                  Department
                </p>

                <p className="mt-1 text-xs font-semibold">
                  {selectedEmployee.department}
                </p>
              </div>

              <div
                className="rounded-xl p-3"
                style={{
                  backgroundColor:
                    theme.surfaceLight,
                }}
              >
                <p
                  className="text-[9px]"
                  style={{
                    color: theme.textMuted,
                  }}
                >
                  Email
                </p>

                <p className="mt-1 text-xs font-semibold">
                  {selectedEmployee.email}
                </p>
              </div>

              <div
                className="rounded-xl p-3"
                style={{
                  backgroundColor:
                    theme.surfaceLight,
                }}
              >
                <p
                  className="text-[9px]"
                  style={{
                    color: theme.textMuted,
                  }}
                >
                  Phone
                </p>

                <p className="mt-1 text-xs font-semibold">
                  {selectedEmployee.phone ||
                    "No phone number"}
                </p>
              </div>

              <div
                className="rounded-xl p-3"
                style={{
                  backgroundColor:
                    theme.surfaceLight,
                }}
              >
                <p
                  className="text-[9px]"
                  style={{
                    color: theme.textMuted,
                  }}
                >
                  Status
                </p>

                <p
                  className="mt-1 text-xs font-semibold"
                  style={{
                    color:
                      selectedEmployee.status ===
                      "Active"
                        ? theme.primary
                        : "#d97706",
                  }}
                >
                  {selectedEmployee.status}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                setSelectedEmployee(null)
              }
              className="mt-5 w-full rounded-xl py-2.5 text-xs font-semibold"
              style={{
                backgroundColor: theme.primary,
                color: dark
                  ? theme.black
                  : "#FFFFFF",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div
            className="w-full max-w-lg rounded-2xl border p-6"
            style={{
              backgroundColor: theme.surface,
              borderColor: theme.border,
            }}
          >
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold">
                  {selectedEmployee
                    ? "Edit Employee"
                    : "Add Employee"}
                </h2>

                <p
                  className="mt-1 text-xs"
                  style={{
                    color: theme.textMuted,
                  }}
                >
                  {selectedEmployee
                    ? "Update employee information"
                    : "Add a new team member"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setSelectedEmployee(null);
                }}
                style={{
                  color: theme.textMuted,
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {/* NAME */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold">
                  Full Name
                </label>

                <input
                  value={employeeForm.name}
                  onChange={(e) =>
                    setEmployeeForm({
                      ...employeeForm,
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g. Ahmed Khan"
                  className="w-full rounded-xl border px-3 py-2.5 text-xs outline-none"
                  style={{
                    backgroundColor:
                      theme.surfaceLight,
                    borderColor: theme.border,
                    color: theme.text,
                  }}
                />
              </div>

              {/* ROLE */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold">
                  Job Role
                </label>

                <input
                  value={employeeForm.role}
                  onChange={(e) =>
                    setEmployeeForm({
                      ...employeeForm,
                      role: e.target.value,
                    })
                  }
                  placeholder="e.g. Backend Developer"
                  className="w-full rounded-xl border px-3 py-2.5 text-xs outline-none"
                  style={{
                    backgroundColor:
                      theme.surfaceLight,
                    borderColor: theme.border,
                    color: theme.text,
                  }}
                />
              </div>

              {/* DEPARTMENT */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold">
                  Department
                </label>

                <select
                  value={employeeForm.department}
                  onChange={(e) =>
                    setEmployeeForm({
                      ...employeeForm,
                      department: e.target.value,
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
                  {departments
                    .filter((item) => item !== "All")
                    .map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                </select>
              </div>

              {/* EMAIL */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold">
                  Email
                </label>

                <input
                  type="email"
                  value={employeeForm.email}
                  onChange={(e) =>
                    setEmployeeForm({
                      ...employeeForm,
                      email: e.target.value,
                    })
                  }
                  placeholder="employee@company.com"
                  className="w-full rounded-xl border px-3 py-2.5 text-xs outline-none"
                  style={{
                    backgroundColor:
                      theme.surfaceLight,
                    borderColor: theme.border,
                    color: theme.text,
                  }}
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold">
                  Phone
                </label>

                <input
                  value={employeeForm.phone}
                  onChange={(e) =>
                    setEmployeeForm({
                      ...employeeForm,
                      phone: e.target.value,
                    })
                  }
                  placeholder="+92 300 1234567"
                  className="w-full rounded-xl border px-3 py-2.5 text-xs outline-none"
                  style={{
                    backgroundColor:
                      theme.surfaceLight,
                    borderColor: theme.border,
                    color: theme.text,
                  }}
                />
              </div>

              {/* STATUS */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold">
                  Status
                </label>

                <select
                  value={employeeForm.status}
                  onChange={(e) =>
                    setEmployeeForm({
                      ...employeeForm,
                      status: e.target.value as
                        | "Active"
                        | "On Leave",
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
                  <option value="Active">
                    Active
                  </option>

                  <option value="On Leave">
                    On Leave
                  </option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setSelectedEmployee(null);
                }}
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
                onClick={saveEmployee}
                disabled={saving}
                className="rounded-xl px-5 py-2.5 text-xs font-bold disabled:cursor-not-allowed disabled:opacity-60"
                style={{
                  backgroundColor: theme.primary,
                  color: dark
                    ? theme.black
                    : "#FFFFFF",
                }}
              >
                {saving
                  ? "Saving..."
                  : selectedEmployee
                    ? "Save Changes"
                    : "Add Employee"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Team;