export function ensureEmailMatches(
  invitationEmail: string | null,
  currentEmail: string,
) {
  if (!invitationEmail) {
    return;
  }

  if (invitationEmail.toLowerCase() !== currentEmail.toLowerCase()) {
    throw new Error("This invitation belongs to another email address.");
  }
}
