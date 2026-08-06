// export function getInvitationExpiration(days = 7) {
//   return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
// }

const INVITATION_EXPIRES_IN_DAYS = 7;

export function getInvitationExpiration(days?: number) {
  const expiresAt = new Date();

  expiresAt.setDate(expiresAt.getDate() + (days ?? INVITATION_EXPIRES_IN_DAYS));

  return expiresAt;
}
