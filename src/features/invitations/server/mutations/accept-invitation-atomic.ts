import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { ErrorReason } from "@/lib/errors";
import { checkPlanLimit } from "@/features/billing/services/check-plan-limit";

import { workspaceInvitationsTable } from "@/db/schema/workspace-schema";
import { workspaceMembersTable } from "@/db/schema/workspace-schema";
import { workspacesTable } from "@/db/schema/workspace-schema";

import { validateInvitation } from "../../services/validate-invitation";
import { ensureEmailMatches } from "../../services/ensure-email-matches";
import { createWorkspaceMember } from "./create-workspace-member";
import { markInvitationAccepted } from "./mark-invitation-accepted";
import { fail, ok } from "@/lib/result";

type AcceptInvitationAtomicInput = {
  invitationId: string;
  userId: string;
  email: string;
};

export async function acceptInvitationAtomic(
  data: AcceptInvitationAtomicInput,
) {
  const { invitationId, userId, email } = data;

  return db.transaction(async (tx) => {
    // ─── Lock the invitation ────────────────────────────────────────────────
    const [invitation] = await tx
      .select()
      .from(workspaceInvitationsTable)
      .where(eq(workspaceInvitationsTable.id, invitationId))
      .for("update");

    if (!invitation) {
      return fail({ reason: ErrorReason.InvitationNotFound });
    }

    // The invitation is locked now, so two concurrent
    // acceptance requests cannot process it simultaneously.
    validateInvitation(invitation);
    ensureEmailMatches(invitation.email, email);

    // ─── Lock the workspace ─────────────────────────────────────────────────
    const [workspace] = await tx
      .select({
        id: workspacesTable.id,
      })
      .from(workspacesTable)
      .where(eq(workspacesTable.id, invitation.workspaceId))
      .for("update");

    if (!workspace) {
      return fail({ reason: ErrorReason.WorkspaceNotFound });
    }

    // ─── Check whether the user is already a member ──────────────────────────
    const [existingMember] = await tx
      .select({
        userId: workspaceMembersTable.userId,
      })
      .from(workspaceMembersTable)
      .where(
        and(
          eq(workspaceMembersTable.workspaceId, invitation.workspaceId),
          eq(workspaceMembersTable.userId, userId),
        ),
      )
      .limit(1);

    if (existingMember) {
      return fail({ reason: ErrorReason.UserAlreadyAWorkspaceMember });
    }

    // ─── Count current members ────────────────────────────────────────────────
    const memberCount = await tx.$count(
      workspaceMembersTable,
      eq(workspaceMembersTable.workspaceId, invitation.workspaceId),
    );

    // ─── Check workspace member plan limit ────────────────────────────────────
    const quota = await checkPlanLimit(
      invitation.workspaceId,
      "members",
      memberCount,
    );

    if (!quota.allowed) {
      return fail({ reason: ErrorReason.PlanLimitReached });
    }

    // ─── Create workspace member ───────────────────────────────────────────────
    const member = await createWorkspaceMember(tx, {
      workspaceId: invitation.workspaceId,
      userId,
      role: invitation.role,
    });

    // ─── Mark invitation as accepted ───────────────────────────────────────────
    await markInvitationAccepted(tx, invitation.id);

    return ok(member);
  });
}
