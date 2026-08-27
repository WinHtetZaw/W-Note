import { ErrorReason } from "../errors";
import { fail, ok } from "../result";
import { requireWorkspaceMember } from "./require-workspace-member";

export async function requireWorkspaceAdmin(workspaceId: string) {
  const [error, result] = await requireWorkspaceMember(workspaceId);
  if (error) {
    return fail({ reason: error.reason });
  }

  if (result.role !== "admin" && result.role !== "owner") {
    return fail({ reason: ErrorReason.NotWorkspaceAdminOrOwner });
  }

  return ok(result);
}
