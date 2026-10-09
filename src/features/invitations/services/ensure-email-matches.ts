export function ensureEmailMatches(
  invitationEmail: string | null,
  currentEmail: string,
) {
  if (!invitationEmail) {
    throw new Error("This invitation has no email address.");
  }

  if (invitationEmail.toLowerCase() !== currentEmail.toLowerCase()) {
    throw new Error("This invitation belongs to another email address.");
  }
}
