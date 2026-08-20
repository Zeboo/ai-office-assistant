import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Lock,
  Save,
  Moon,
  Mail,
  Smartphone,
} from "lucide-react";

import { colors } from "../theme/colors";

function Settings() {
  return (
    <div
      className="min-h-[calc(100vh-80px)] p-8"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
      }}
    >
      {/* HEADER */}
      <div className="mb-7 flex items-center gap-3">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl"
          style={{
            backgroundColor: colors.primary,
            color: colors.black,
          }}
        >
          <SettingsIcon size={22} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            Settings
          </h1>

          <p
            className="text-sm"
            style={{
              color: colors.textMuted,
            }}
          >
            Manage your AI Virtual Office preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">

        {/* LEFT SETTINGS */}
        <div className="col-span-2 space-y-5">

          {/* PROFILE */}
          <section
            className="rounded-2xl border p-6"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <div className="mb-5 flex items-center gap-3">
              <User
                size={19}
                style={{
                  color: colors.primary,
                }}
              />

              <div>
                <h2 className="text-sm font-semibold">
                  Profile
                </h2>

                <p
                  className="text-xs"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Manage your personal information
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="mb-2 block text-xs"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Full Name
                </label>

                <input
                  value="Palwasha"
                  readOnly
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
                  style={{
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                />
              </div>

              <div>
                <label
                  className="mb-2 block text-xs"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Email
                </label>

                <input
                  value="palwasha@example.com"
                  readOnly
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
                  style={{
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                />
              </div>
            </div>
          </section>

          {/* NOTIFICATIONS */}
          <section
            className="rounded-2xl border p-6"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <div className="mb-5 flex items-center gap-3">
              <Bell
                size={19}
                style={{
                  color: colors.primary,
                }}
              />

              <div>
                <h2 className="text-sm font-semibold">
                  Notifications
                </h2>

                <p
                  className="text-xs"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Control how you receive updates
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <SettingRow
                icon={<Mail size={17} />}
                title="Email Notifications"
                description="Receive important updates by email"
                enabled
              />

              <SettingRow
                icon={<Bell size={17} />}
                title="Task Notifications"
                description="Get notified when tasks change"
                enabled
              />

              <SettingRow
                icon={<Smartphone size={17} />}
                title="Mobile Notifications"
                description="Receive notifications on your devices"
                enabled={false}
              />
            </div>
          </section>

          {/* APPEARANCE */}
          <section
            className="rounded-2xl border p-6"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <div className="mb-5 flex items-center gap-3">
              <Palette
                size={19}
                style={{
                  color: colors.primary,
                }}
              />

              <div>
                <h2 className="text-sm font-semibold">
                  Appearance
                </h2>

                <p
                  className="text-xs"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Customize your workspace appearance
                </p>
              </div>
            </div>

            <SettingRow
              icon={<Moon size={17} />}
              title="Dark Mode"
              description="Use the dark workspace theme"
              enabled
            />
          </section>

          {/* PRIVACY */}
          <section
            className="rounded-2xl border p-6"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <div className="mb-5 flex items-center gap-3">
              <Shield
                size={19}
                style={{
                  color: colors.primary,
                }}
              />

              <div>
                <h2 className="text-sm font-semibold">
                  Privacy & Security
                </h2>

                <p
                  className="text-xs"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Protect your workspace and account
                </p>
              </div>
            </div>

            <SettingRow
              icon={<Lock size={17} />}
              title="Two-Factor Authentication"
              description="Add an extra layer of account security"
              enabled={false}
            />

            <div
              className="mt-4 flex items-center justify-between rounded-xl p-4"
              style={{
                backgroundColor: colors.surfaceLight,
              }}
            >
              <div>
                <p className="text-xs font-semibold">
                  Session Security
                </p>

                <p
                  className="mt-1 text-[10px]"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Your workspace session is protected
                </p>
              </div>

              <span
                className="rounded-lg px-3 py-1.5 text-[10px] font-semibold"
                style={{
                  backgroundColor:
                    "rgba(57,255,136,0.10)",
                  color: colors.primary,
                }}
              >
                Secure
              </span>
            </div>
          </section>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-5">

          {/* ACCOUNT */}
          <section
            className="rounded-2xl border p-6"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.black,
                }}
              >
                P
              </div>

              <div>
                <h2 className="font-semibold">
                  Palwasha
                </h2>

                <p
                  className="text-xs"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Premium User
                </p>
              </div>
            </div>

            <div
              className="mt-5 rounded-xl p-4"
              style={{
                backgroundColor: colors.surfaceLight,
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-xs"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Account Status
                </span>

                <span
                  className="text-xs font-semibold"
                  style={{
                    color: colors.primary,
                  }}
                >
                  Active
                </span>
              </div>
            </div>
          </section>

          {/* LANGUAGE */}
          <section
            className="rounded-2xl border p-6"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <div className="mb-4 flex items-center gap-3">
              <Globe
                size={18}
                style={{
                  color: colors.primary,
                }}
              />

              <div>
                <h2 className="text-sm font-semibold">
                  Language
                </h2>

                <p
                  className="text-[10px]"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Choose your preferred language
                </p>
              </div>
            </div>

            <select
              className="w-full rounded-xl border px-3 py-3 text-sm outline-none"
              style={{
                backgroundColor: colors.background,
                borderColor: colors.border,
                color: colors.text,
              }}
              defaultValue="English"
            >
              <option>English</option>
              <option>Urdu</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </section>

          {/* AI PREFERENCES */}
          <section
            className="rounded-2xl border p-6"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <div className="mb-4">
              <h2 className="text-sm font-semibold">
                AI Preferences
              </h2>

              <p
                className="mt-1 text-[10px]"
                style={{
                  color: colors.textMuted,
                }}
              >
                Control how AI agents work
              </p>
            </div>

            <div className="space-y-4">
              <SettingRow
                title="Automatic Tasks"
                description="Allow AI agents to create tasks"
                enabled
              />

              <SettingRow
                title="Smart Suggestions"
                description="Receive AI-powered suggestions"
                enabled
              />
            </div>
          </section>

          {/* SAVE */}
          <button
            className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold"
            style={{
              backgroundColor: colors.primary,
              color: colors.black,
            }}
          >
            <Save size={17} />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

type SettingRowProps = {
  icon?: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
};

function SettingRow({
  icon,
  title,
  description,
  enabled,
}: SettingRowProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {icon && (
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg"
            style={{
              backgroundColor:
                "rgba(57,255,136,0.08)",
              color: colors.primary,
            }}
          >
            {icon}
          </div>
        )}

        <div>
          <p className="text-xs font-semibold">
            {title}
          </p>

          <p
            className="mt-1 text-[10px]"
            style={{
              color: colors.textMuted,
            }}
          >
            {description}
          </p>
        </div>
      </div>

      <div
        className="relative h-6 w-11 rounded-full"
        style={{
          backgroundColor: enabled
            ? colors.primary
            : colors.surfaceLight,
        }}
      >
        <div
          className="absolute top-1 h-4 w-4 rounded-full"
          style={{
            left: enabled ? "24px" : "4px",
            backgroundColor: enabled
              ? colors.black
              : colors.textMuted,
          }}
        />
      </div>
    </div>
  );
}

export default Settings;