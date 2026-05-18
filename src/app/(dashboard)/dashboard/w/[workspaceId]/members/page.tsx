// app/(app)/workspace/[workspaceId]/members/page.tsx

import {
  Users,
  UserPlus,
  Search,
  Shield,
  Crown,
  MoreHorizontal,
  Sparkles,
} from "lucide-react";

const members = [
  {
    name: "Zeed",
    email: "zeed@example.com",
    role: "Owner",
    status: "Active",
  },

  {
    name: "Sarah Kim",
    email: "sarah@example.com",
    role: "Admin",
    status: "Active",
  },

  {
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "Member",
    status: "Offline",
  },

  {
    name: "Michael Chen",
    email: "michael@example.com",
    role: "Member",
    status: "Active",
  },
];

export default function MembersPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]" />
      </div>

      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-violet-400" />
              Team Collaboration
            </div>

            <h1 className="text-4xl font-black md:text-5xl">
              Workspace Members
            </h1>

            <p className="mt-4 text-lg text-zinc-400">
              Manage members, roles, and permissions.
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-2xl bg-violet-600 px-6 py-4 font-semibold transition hover:bg-violet-500">
            <UserPlus className="h-5 w-5" />
            Invite Member
          </button>
        </div>

        {/* Search */}
        <div className="mt-10 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-xl">
          <Search className="h-5 w-5 text-zinc-500" />

          <input
            placeholder="Search members..."
            className="w-full bg-transparent outline-none placeholder:text-zinc-500"
          />
        </div>

        {/* Members */}
        <div className="mt-10 space-y-5">
          {members.map((member) => (
            <MemberCard key={member.email} {...member} />
          ))}
        </div>
      </div>
    </main>
  );
}

function MemberCard({
  name,
  email,
  role,
  status,
}: {
  name: string;
  email: string;
  role: string;
  status: string;
}) {
  return (
    <div className="flex flex-col gap-5 rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl lg:flex-row lg:items-center lg:justify-between">
      {/* Left */}
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-lg font-bold">
          {name.charAt(0)}
        </div>

        <div>
          <h2 className="text-xl font-semibold">{name}</h2>

          <p className="mt-1 text-zinc-400">{email}</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
          {role === "Owner" ? (
            <Crown className="h-4 w-4 text-yellow-400" />
          ) : (
            <Shield className="h-4 w-4 text-violet-400" />
          )}

          {role}
        </div>

        <div
          className={`rounded-full px-4 py-2 text-sm ${
            status === "Active"
              ? "bg-green-500/10 text-green-400"
              : "bg-zinc-500/10 text-zinc-400"
          }`}
        >
          {status}
        </div>

        <button className="rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
