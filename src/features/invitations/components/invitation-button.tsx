"use client";

import { UserPlus } from "lucide-react";
import InviteMemberDialog from "./invite-member-dialog";
import { useState } from "react";

// type Props = {
//   inviteOpen: boolean;
//   setInviteOpen: (open: boolean) => void;
// };

export default function InvitationButton() {
  const [inviteOpen, setInviteOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setInviteOpen(true)}
        className="inline-flex items-center gap-3 rounded-2xl bg-violet-600 px-6 py-4 font-semibold transition hover:bg-violet-500"
      >
        <UserPlus className="size-5" />
        Invite Member
      </button>
      <InviteMemberDialog open={inviteOpen} onOpenChange={setInviteOpen} />
    </>
  );
}
