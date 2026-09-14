"use client";

import { useEffect, useState } from "react";
import { Check, ChevronsUpDown, UserRound, Crown } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { OwnWorkspaces } from "../types";
import { MemberWithDetail } from "@/features/members/types";
import { fetchMembersForTransfer } from "@/features/members/server/actions/fetch-members-for-transfer";
import { wait } from "@/lib/utils";
import { toast } from "sonner";
import { showSuccessToast } from "@/components/ui/custom-toast";
import { transferWorkspaceOwnership } from "../server/actions/transfer-workspace-ownership";
import { useRouter } from "next/navigation";
import { errorMessages } from "@/lib/errors";

type WorkspaceMember = {
  id: string;
  name: string;
  email: string;
  role: "member" | "admin";
  image?: string | null;
};

type props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workspace: OwnWorkspaces[number];
  isTranferPending: boolean;
  startTranferTransition: (callback: () => void) => void;
};

export default function TransferOwnershipDialog(props: props) {
  const {
    open,
    onOpenChange,
    workspace,
    isTranferPending,
    startTranferTransition,
  } = props;
  const [selectedMember, setSelectedMember] = useState<MemberWithDetail | null>(
    null,
  );

  const [memberPickerOpen, setMemberPickerOpen] = useState(false);
  //   const [isTransferring, setIsTransferring] = useState(false);
  const [members, setMembers] = useState<MemberWithDetail[] | []>([]);
  const router = useRouter();

  useEffect(() => {
    const gettingMembers = async () => {
      const result = await fetchMembersForTransfer(workspace.workspace.id);
      if (result.code) {
        return;
      }
      setMembers(result.data);
      console.log(members);
    };
    gettingMembers();
  }, []);

  const handleTransfer = async () => {
    if (!selectedMember || isTranferPending) return;

    const loadingToast = toast.loading("Transfering workspace...");
    onOpenChange(false);

    startTranferTransition(async () => {
      const result = await transferWorkspaceOwnership({
        workspaceId: workspace.workspaceId,
        newOwnerId: selectedMember.userId,
      });

      if (result.code) {
        toast.dismiss(loadingToast);
        toast.error(errorMessages[result.code]);
        return;
      }

      toast.dismiss(loadingToast);
      toast.success("Successfully Workspace Transfered");
      router.refresh();
    });
  };

  const handleOpenChange = (value: boolean) => {
    if (isTranferPending) return;

    onOpenChange(value);

    if (!value) {
      setSelectedMember(null);
      setMemberPickerOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="border-white/10 bg-zinc-950 text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Crown className="size-5 text-violet-400" />
            Transfer ownership
          </DialogTitle>

          <DialogDescription className="text-zinc-400">
            Transfer{" "}
            <span className="font-medium text-zinc-200">
              &quot;{workspace.workspace.name}&quot;
            </span>{" "}
            to another workspace member.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          {/* Member selector */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-zinc-200">
              Transfer ownership to
            </p>

            <Popover open={memberPickerOpen} onOpenChange={setMemberPickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  role="combobox"
                  aria-expanded={memberPickerOpen}
                  className="h-auto min-h-14 w-full justify-between border-white/10 bg-white/[0.03] px-4 py-3 text-left hover:bg-white/[0.06]"
                >
                  {selectedMember ? (
                    <MemberPreview member={selectedMember} />
                  ) : (
                    <span className="text-sm text-zinc-500">
                      Select a member...
                    </span>
                  )}

                  <ChevronsUpDown className="ml-3 size-4 shrink-0 text-zinc-500" />
                </Button>
              </PopoverTrigger>

              <PopoverContent
                align="start"
                className="w-[var(--radix-popover-trigger-width)] border-white/10 bg-zinc-950 p-0 text-white"
              >
                <Command className="bg-transparent">
                  <CommandInput
                    placeholder="Search members..."
                    className="border-none"
                  />

                  <CommandList>
                    <CommandEmpty className="py-6 text-center text-sm text-zinc-500">
                      <p>No members found.</p>
                      <p>
                        For account deletion, you need to delete workspace
                        directly.
                      </p>
                    </CommandEmpty>

                    <CommandGroup>
                      {members.map((member) => {
                        const isSelected =
                          selectedMember?.user.id === member.user.id;

                        return (
                          <CommandItem
                            key={member.user.id}
                            value={`${member.user.name} ${member.user.email}`}
                            onSelect={() => {
                              setSelectedMember(member);
                              setMemberPickerOpen(false);
                            }}
                            className="cursor-pointer py-3"
                          >
                            <MemberPreview member={member} />

                            <Check
                              className={[
                                "ml-auto size-4",
                                isSelected
                                  ? "opacity-100 text-violet-400"
                                  : "opacity-0",
                              ].join(" ")}
                            />
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Selected member */}
          {selectedMember && (
            <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-4">
              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">
                  <Crown className="size-4 text-violet-400" />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-zinc-200">
                    Ownership will be transferred to{" "}
                    <span className="text-white">
                      {selectedMember.user.name}
                    </span>
                    .
                  </p>

                  <p className="text-xs leading-5 text-zinc-500">
                    After transferring ownership, you will become a member of
                    this workspace.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Warning */}
          <p className="text-sm leading-6 text-zinc-500">
            This action will change the workspace owner immediately. Make sure
            you have selected the correct member before continuing.
          </p>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={isTranferPending}
            onClick={() => handleOpenChange(false)}
            className="text-zinc-400 hover:bg-white/5 hover:text-white"
          >
            Cancel
          </Button>

          <Button
            type="button"
            disabled={!selectedMember || isTranferPending}
            onClick={handleTransfer}
            className="gap-2 bg-violet-500 text-white hover:bg-violet-400"
          >
            <Crown className="size-4" />

            {isTranferPending ? "Transferring..." : "Transfer ownership"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function MemberPreview({ member }: { member: MemberWithDetail }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      {member.user.image ? (
        <img
          src={member.user.image}
          alt=""
          className="size-9 shrink-0 rounded-full object-cover"
        />
      ) : (
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-violet-500/10">
          <UserRound className="size-4 text-violet-400" />
        </div>
      )}

      <div className="min-w-0 text-left">
        <p className="truncate text-sm font-medium text-zinc-200">
          {member.user.name}
        </p>

        <p className="truncate text-xs text-zinc-500">{member.user.email}</p>
      </div>
    </div>
  );
}
