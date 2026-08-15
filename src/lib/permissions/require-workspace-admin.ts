import { fail, ok } from "../result";
import { requireWorkspaceMember } from "./require-workspace-member";

export async function requireWorkspaceAdmin(workspaceId: string) {
  const [error, result] = await requireWorkspaceMember(workspaceId);
  if (error) {
    return fail({ reason: "NotFound" });
  }

  if (result.role !== "admin" && result.role !== "owner") {
    return fail({ reason: "Forbidden" });
  }

  return ok(result);
}
