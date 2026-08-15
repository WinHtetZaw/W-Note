import { ok, fail } from "../result";
import { requireWorkspaceMember } from "./require-workspace-member";

export async function requireWorkspaceOwner(workspaceId: string) {
  const [error, result] = await requireWorkspaceMember(workspaceId);
  if (error) {
    return fail({ reason: "NotFound" });
  }

  if (result.role !== "owner") {
    if (error) {
      return fail({ reason: "Forbidden" });
    }
  }

  return ok(result);
}
