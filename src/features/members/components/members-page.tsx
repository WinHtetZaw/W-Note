"use client";

import { ReactNode, useMemo, useState } from "react";
import MemberSearch from "./member-search";
import MemberCard from "./member-card";
import { Member } from "../utils/types";
import PageHead from "@/components/dashboard/page-head";

interface Props {
  workspaceId: string;
  currentUserRole: "owner" | "admin" | "member";
  invitationList: ReactNode;
  invitationButton: ReactNode;
  members: Member[];
}

export default function MembersPage(props: Props) {
  const {
    workspaceId,
    currentUserRole,
    invitationList,
    invitationButton,
    members,
  } = props;
  const [search, setSearch] = useState("");

  const filteredMembers = useMemo(() => {
    const value = search.toLowerCase();

    return members.filter(
      (member) =>
        member.user.name.toLowerCase().includes(value) ||
        member.user.email.toLowerCase().includes(value),
    );
  }, [search]);

  // console.log(members);

  return (
    <>
      <PageHead
        pageLabel="Members"
        title="Workspace Members"
        subTitle="Manage your workspace members, invitations, permissions and ownership."
      >
        {(currentUserRole === "owner" || currentUserRole === "admin") && (
          <>{invitationButton}</>
        )}
      </PageHead>

      <section className="mt-10">
        <MemberSearch value={search} onChange={setSearch} />
      </section>

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
                key={member.userId}
                workspaceId={workspaceId}
                member={member}
                currentUserRole={currentUserRole}
              />
            ))
          )}
        </div>
      </section>
      {invitationList}
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
    <div className="rounded-[32px] border border-dashed border-white/10 bg-white/3 p-16 text-center">
      <h3 className="text-2xl font-bold">{title}</h3>

      <p className="mt-3 text-zinc-500">{description}</p>
    </div>
  );
}
