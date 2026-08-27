"use client";

import { ReactNode, use, useMemo, useState } from "react";

import { Sparkles, UserPlus } from "lucide-react";

import MemberSearch from "./member-search";
import MemberCard from "./member-card";
// import InviteMemberDialog from "./invite-member-dialog";
import { members } from "../constant";
import { fetchMembers } from "../server/actions/fetch-members";

interface Props {
  workspaceId: string;
  currentUserRole: "owner" | "admin" | "member";
  invitationList: ReactNode;
  invitationButton: ReactNode;
}

export default function MembersPage(props: Props) {
  const { workspaceId, currentUserRole, invitationList, invitationButton } =
    props;
  const [search, setSearch] = useState("");

  const [inviteOpen, setInviteOpen] = useState(false);

  const filteredMembers = useMemo(() => {
    const value = search.toLowerCase();

    return members.filter(
      (member) =>
        member.name.toLowerCase().includes(value) ||
        member.email.toLowerCase().includes(value),
    );
  }, [search]);

  // const filteredInvitations = useMemo(() => {
  //   const value = search.toLowerCase();

  //   return pendingInvitations.filter((invite) =>
  //     invite.email.toLowerCase().includes(value),
  //   );
  // }, [search]);

  return (
    <>
      {/* Header */}

      <section className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-violet-400" />

            <span className="text-sm">Team Collaboration</span>
          </div>

          <h1 className="text-5xl font-black">Workspace Members</h1>

          <p className="mt-4 max-w-2xl text-lg text-zinc-400">
            Manage your workspace members, invitations, permissions and
            ownership.
          </p>
        </div>

        {(currentUserRole === "owner" || currentUserRole === "admin") && (
          <>{invitationButton}</>
        )}
      </section>

      {/* Search */}

      <section className="mt-10">
        <MemberSearch value={search} onChange={setSearch} />
      </section>

      {/* Members */}

      <section className="mt-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Members</h2>

          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-400">
            {filteredMembers.length} Members
          </span>
        </div>

        <div className="space-y-5">
          {filteredMembers.length === 0 ? (
            <EmptyState
              title="No members found"
              description="Try another search."
            />
          ) : (
            filteredMembers.map((member) => (
              <MemberCard
                key={member.id}
                workspaceId={workspaceId}
                member={member}
                currentUserRole={currentUserRole}
              />
            ))
          )}
        </div>
      </section>

      {/* Invitations */}
      {/* <InvitationList /> */}
      {invitationList}
      {/* <section className="mt-20">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Pending Invitations</h2>

          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-400">
            {filteredInvitations.length} Pending
          </span>
        </div>

        {filteredInvitations.length === 0 ? (
          <EmptyState
            title="No pending invitations"
            description="Everyone has accepted their invitations."
          />
        ) : (
          <div className="space-y-5">
            {filteredInvitations.map((invite) => (
              <InvitationCard key={invite.id} invitation={invite} />
            ))}
          </div>
        )}
      </section> */}

      {/* <InviteMemberDialog open={inviteOpen} onOpenChange={setInviteOpen} /> */}
    </>
  );
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[32px] border border-dashed border-white/10 bg-white/[0.03] p-16 text-center">
      <h3 className="text-2xl font-bold">{title}</h3>

      <p className="mt-3 text-zinc-500">{description}</p>
    </div>
  );
}
