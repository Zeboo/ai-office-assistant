
import {
  useRef,
  useState,
  type ReactNode,
} from "react";
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
  Sun,
  Mail,
  Smartphone,
  Check,
} from "lucide-react";

import {
  darkColors,
  lightColors,
  type ThemeMode,
} from "../theme/colors";

type SettingsProps = {
  themeMode: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
};

type SettingsState = {

  
  fullName: string;
email: string;
profileImage: string;

  emailNotifications: boolean;
  taskNotifications: boolean;
  mobileNotifications: boolean;
  twoFactorAuthentication: boolean;
  automaticTasks: boolean;
  smartSuggestions: boolean;
  language: string;
};

const defaultSettings: SettingsState = {

  fullName: "Palwasha",
email: "palwasha@example.com",
profileImage: "",
  emailNotifications: true,
  taskNotifications: true,
  mobileNotifications: false,
  twoFactorAuthentication: false,
  automaticTasks: true,
  smartSuggestions: true,
  language: "English",
};

function Settings({
  themeMode,
  onThemeChange,
}: SettingsProps) {

   
  
  const colors =
    themeMode === "dark" ? darkColors : lightColors;
    const fileInputRef = useRef<HTMLInputElement>(null);

 const [settings, setSettings] =
  useState<SettingsState>(() => {
      const savedSettings =
        localStorage.getItem("ai-office-settings");

      if (savedSettings) {
        try {
          return {
            ...defaultSettings,
            ...JSON.parse(savedSettings),
          };
        } catch {
          return defaultSettings;
        }
      }

      return defaultSettings;
    });

  const [saved, setSaved] = useState(false);

  const updateSetting = (
    key: keyof SettingsState,
    value: boolean | string,
  ) => {
    setSettings((previous) => ({
      ...previous,
      [key]: value,
    }));

    setSaved(false);
  };

  const saveSettings = () => {
  localStorage.setItem(
    "ai-office-settings",
    JSON.stringify(settings),
  );

  setSettings((previous) => ({
    ...previous,
  }));

  setSaved(true);

  setTimeout(() => {
    setSaved(false);
  }, 2000);
};

  return (
    <div
      className="min-h-[calc(100vh-80px)] p-8 transition-colors"
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

              {/* NAME */}
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
  value={settings.fullName}
  onChange={(event) => {
    updateSetting("fullName", event.target.value);
  }}
  className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
  style={{
    backgroundColor: colors.background,
    borderColor: colors.border,
    color: colors.text,
  }}
/>
                 
                
              </div>

              {/* EMAIL */}
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
  value={settings.email}
  onChange={(event) => {
    updateSetting("email", event.target.value);
  }}
  className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
  style={{
    backgroundColor: colors.background,
    borderColor: colors.border,
    color: colors.text,
  }}
/>
                 
                
              </div>

            </div>
                        <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={saveSettings}
                className="rounded-xl px-5 py-2.5 text-xs font-bold transition"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.black,
                }}
              >
                Save Profile
              </button>
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
                colors={colors}
                icon={<Mail size={17} />}
                title="Email Notifications"
                description="Receive important updates by email"
                enabled={settings.emailNotifications}
                onToggle={() =>
                  updateSetting(
                    "emailNotifications",
                    !settings.emailNotifications,
                  )
                }
              />

              <SettingRow
                colors={colors}
                icon={<Bell size={17} />}
                title="Task Notifications"
                description="Get notified when tasks change"
                enabled={settings.taskNotifications}
                onToggle={() =>
                  updateSetting(
                    "taskNotifications",
                    !settings.taskNotifications,
                  )
                }
              />

              <SettingRow
                colors={colors}
                icon={<Smartphone size={17} />}
                title="Mobile Notifications"
                description="Receive notifications on your devices"
                enabled={settings.mobileNotifications}
                onToggle={() =>
                  updateSetting(
                    "mobileNotifications",
                    !settings.mobileNotifications,
                  )
                }
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

            {/* THEME */}
            <div
              className="flex items-center justify-between rounded-xl p-4"
              style={{
                backgroundColor: colors.surfaceLight,
              }}
            >
              <div className="flex items-center gap-3">

                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor:
                      themeMode === "dark"
                        ? "rgba(57,255,136,0.08)"
                        : "rgba(22,163,74,0.08)",
                    color: colors.primary,
                  }}
                >
                  {themeMode === "dark" ? (
                    <Moon size={17} />
                  ) : (
                    <Sun size={17} />
                  )}
                </div>

                <div>
                  <p className="text-xs font-semibold">
                    {themeMode === "dark"
                      ? "Dark Mode"
                      : "Light Mode"}
                  </p>

                  <p
                    className="mt-1 text-[10px]"
                    style={{
                      color: colors.textMuted,
                    }}
                  >
                    Switch between dark and light workspace themes
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={() => {
                  onThemeChange(
                    themeMode === "dark"
                      ? "light"
                      : "dark",
                  );
                }}
                className="relative h-6 w-11 rounded-full transition"
                style={{
                  backgroundColor:
                    themeMode === "dark"
                      ? colors.primary
                      : colors.surfaceLight,
                }}
                aria-label="Toggle theme"
              >
                <span
                  className="absolute top-1 h-4 w-4 rounded-full transition"
                  style={{
                    left:
                      themeMode === "dark"
                        ? "24px"
                        : "4px",
                    backgroundColor:
                      themeMode === "dark"
                        ? colors.black
                        : colors.textMuted,
                  }}
                />
              </button>

            </div>
          </section>

          {/* PRIVACY & SECURITY */}
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
              colors={colors}
              icon={<Lock size={17} />}
              title="Two-Factor Authentication"
              description="Add an extra layer of account security"
              enabled={
                settings.twoFactorAuthentication
              }
              onToggle={() =>
                updateSetting(
                  "twoFactorAuthentication",
                  !settings.twoFactorAuthentication,
                )
              }
            />

            {/* SESSION SECURITY */}
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
                    themeMode === "dark"
                      ? "rgba(57,255,136,0.10)"
                      : "rgba(22,163,74,0.10)",
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
  className="relative h-14 w-14 cursor-pointer overflow-hidden rounded-full"
  onClick={() => fileInputRef.current?.click()}
  title="Change profile picture"
>
  {settings.profileImage ? (
    <img
      src={settings.profileImage}
      alt="Profile"
      className="h-full w-full object-cover"
    />
  ) : (
    <div
      className="flex h-full w-full items-center justify-center text-lg font-bold"
      style={{
        backgroundColor: colors.primary,
        color: colors.black,
      }}
    >
      {settings.fullName.charAt(0).toUpperCase() || "P"}
    </div>
  )}
</div>

<input
  ref={fileInputRef}
  type="file"
  accept="image/*"
  className="hidden"
  onChange={(event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (typeof result === "string") {
        updateSetting("profileImage", result);
      }
    };

    reader.readAsDataURL(file);
  }}
/>

              <div>
                <h2 className="font-semibold">
  {settings.fullName}
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
              value={settings.language}
              onChange={(event) => {
                updateSetting(
                  "language",
                  event.target.value,
                );
              }}
              className="w-full rounded-xl border px-3 py-3 text-sm outline-none"
              style={{
                backgroundColor: colors.background,
                borderColor: colors.border,
                color: colors.text,
              }}
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
                colors={colors}
                title="Automatic Tasks"
                description="Allow AI agents to create tasks"
                enabled={settings.automaticTasks}
                onToggle={() =>
                  updateSetting(
                    "automaticTasks",
                    !settings.automaticTasks,
                  )
                }
              />

              <SettingRow
                colors={colors}
                title="Smart Suggestions"
                description="Receive AI-powered suggestions"
                enabled={settings.smartSuggestions}
                onToggle={() =>
                  updateSetting(
                    "smartSuggestions",
                    !settings.smartSuggestions,
                  )
                }
              />

            </div>
          </section>

          {/* SAVE */}
          <button
            type="button"
            onClick={saveSettings}
            className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition"
            style={{
              backgroundColor: saved
                ? colors.surfaceLight
                : colors.primary,
              color: saved
                ? colors.primary
                : colors.black,
            }}
          >
            {saved ? (
              <>
                <Check size={17} />
                Settings Saved
              </>
            ) : (
              <>
                <Save size={17} />
                Save Settings
              </>
            )}
          </button>

        </div>
      </div>
    </div>
  );
}

type SettingRowProps = {
  colors: typeof darkColors;
   icon?: ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
};

function SettingRow({
  colors,
  icon,
  title,
  description,
  enabled,
  onToggle,
}: SettingRowProps) {
  return (
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-3">

        {icon && (
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg"
            style={{
              backgroundColor:
                enabled
                  ? "rgba(57,255,136,0.08)"
                  : colors.surfaceLight,
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

      <button
        type="button"
        onClick={onToggle}
        className="relative h-6 w-11 rounded-full transition"
        style={{
          backgroundColor: enabled
            ? colors.primary
            : colors.surfaceLight,
        }}
          aria-label={`Toggle ${title}`}
      >
        <span
          className="absolute top-1 h-4 w-4 rounded-full transition"
          style={{
            left: enabled
              ? "24px"
              : "4px",
            backgroundColor: enabled
              ? colors.black
              : colors.textMuted,
          }}
        />
      </button>

    </div>
  );
}

export default Settings;