import {
  Bell,
  CalendarDays,
  Globe2,
  Mail,
  Moon,
  Shield,
  Sparkles,
  Sun,
  Trash2,
  User,
} from "lucide-react";

export default function ProfilePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 pt=6 pb-16">
      {/* Header */}

      <section>
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
          <Sparkles className="h-4 w-4 text-violet-400" />

          <span className="text-sm">Account Settings</span>
        </div>

        <h1 className="text-5xl font-black">Your Profile</h1>

        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          Manage your personal information, preferences, and account settings.
        </p>
      </section>

      {/* Profile */}

      <section className="mt-12 rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
        <SectionHeader
          icon={<User className="h-5 w-5" />}
          title="Personal Information"
          description="Update the information associated with your account."
        />

        <div className="mt-8 flex flex-col gap-8">
          {/* Avatar */}

          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-600 text-2xl font-black">
              Z
            </div>

            <div>
              <h3 className="font-semibold">Profile Photo</h3>

              <p className="mt-1 text-sm text-zinc-500">
                JPG, PNG or WebP. Maximum 5MB.
              </p>

              <button className="mt-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm transition hover:bg-white/10">
                Change Photo
              </button>
            </div>
          </div>

          {/* Name */}

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              label="Full Name"
              defaultValue="Zeed"
              placeholder="Your name"
            />

            <FormField
              label="Email Address"
              defaultValue="zeed@example.com"
              placeholder="you@example.com"
              type="email"
            />
          </div>

          <div className="flex justify-end">
            <button className="rounded-2xl bg-violet-600 px-6 py-3 font-semibold transition hover:bg-violet-500">
              Save Changes
            </button>
          </div>
        </div>
      </section>

      {/* Account */}

      <section className="mt-8 rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
        <SectionHeader
          icon={<Shield className="h-5 w-5" />}
          title="Account"
          description="Information about your account."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <InfoCard
            icon={<Mail className="h-5 w-5" />}
            label="Email"
            value="zeed@example.com"
          />

          <InfoCard
            icon={<CalendarDays className="h-5 w-5" />}
            label="Member Since"
            value="January 2026"
          />
        </div>
      </section>

      {/* Preferences */}

      <section className="mt-8 rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
        <SectionHeader
          icon={<Moon className="h-5 w-5" />}
          title="Preferences"
          description="Customize your AI Notes experience."
        />

        <div className="mt-8 space-y-5">
          {/* Theme */}

          <PreferenceRow
            icon={<Moon className="h-5 w-5" />}
            title="Appearance"
            description="Choose how AI Notes looks for you."
          >
            <button className="flex items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
              <Moon className="h-4 w-4" />
              Dark
            </button>
          </PreferenceRow>

          {/* Notifications */}

          <PreferenceRow
            icon={<Bell className="h-5 w-5" />}
            title="Email Notifications"
            description="Receive notifications about workspace activity."
          >
            <button className="relative h-6 w-11 rounded-full bg-violet-600">
              <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white" />
            </button>
          </PreferenceRow>

          {/* Language */}

          <PreferenceRow
            icon={<Globe2 className="h-5 w-5" />}
            title="Language"
            description="Choose your preferred language."
          >
            <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">
              English
            </button>
          </PreferenceRow>
        </div>
      </section>

      {/* Danger Zone */}

      <section className="mt-8 rounded-[32px] border border-red-500/20 bg-red-500/[0.03] p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-500/10">
            <Trash2 className="h-5 w-5 text-red-400" />
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold">Delete Account</h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
              Permanently delete your account and all personal data. This action
              cannot be undone.
            </p>

            <button className="mt-5 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/20">
              Delete Account
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400">
        {icon}
      </div>

      <div>
        <h2 className="text-2xl font-bold">{title}</h2>

        <p className="mt-1 text-sm text-zinc-500">{description}</p>
      </div>
    </div>
  );
}

function FormField({
  label,
  defaultValue,
  placeholder,
  type = "text",
}: {
  label: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-zinc-300">{label}</label>

      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500/50 focus:bg-white/[0.07]"
      />
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center gap-3 text-zinc-500">
        {icon}

        <span className="text-sm">{label}</span>
      </div>

      <p className="mt-3 font-medium text-white">{value}</p>
    </div>
  );
}

function PreferenceRow({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-zinc-400">
          {icon}
        </div>

        <div>
          <h3 className="font-medium">{title}</h3>

          <p className="mt-1 text-sm text-zinc-500">{description}</p>
        </div>
      </div>

      {children}
    </div>
  );
}
