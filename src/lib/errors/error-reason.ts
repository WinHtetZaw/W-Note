// export type ErrorReason =
//   | "NOT_AUTHENTICATED"
//   | "NOT_WORKSPACE_MEMBER"
//   | "INSUFFICIENT_PERMISSION"
//   | "NOTE_NOT_FOUND"
//   | "NOTE_UPDATE_NOT_ALLOWED"
//   | "INVALID_INPUT"
//   | "UNEXPECTED";

export const ErrorReason = {
  UserNotAuthenticated: "NOT_AUTHENTICATED",
  UserNotFound: "USER_NOT_FOUND",
  NotWorkspaceMember: "NOT_WORKSPACE_MEMBER",
  NotWorkspaceAdminOrOwner: "NOT_WORKSPACE_ADMIN_OR_OWNER",
  InsufficientPermission: "INSUFFICIENT_PERMISSION",
  InvalidInput: "INVALID_INPUT",
  UnexpectedError: "UNEXPECTED",

  WorkspaceNotFound: "WORKSPACE_NOT_FOUND",
  WorkspaceMemberNotFound: "WORKSPACE_MEMBER_NOT_FOUND",
  InvitationNotFound: "INVIATION_NOT_FOUND",

  NoteCreateNotAllowed: "NOTE_CREATE_NOT_ALLOWED",
  NoteUpdateNotAllowed: "NOTE_UPDATE_NOT_ALLOWED",
  NoteDeleteNotAllowed: "NOTE_DELETE_NOT_ALLOWED",
  NoteNotFound: "NOTE_NOT_FOUND",

  FolderCreateNotAllowed: "FOLDER_CREATE_NOT_ALLOWED",
  FolderUpdateNotAllowed: "FOLDER_UPDATE_NOT_ALLOWED",
  FolderDeleteNotAllowed: "FOLDER_DELETE_NOT_ALLOWED",
  FolderNotFound: "FOLDER_NOT_FOUND",

  // Conflicts
  NoteAlreadyExists: "NOTE_ALREADY_EXISTS",
  FolderAlreadyExists: "FOLDER_ALREADY_EXISTS",
  InvitationAlreadyExists: "INVITATION_ALREADY_EXISTS",
  OwnerCannotLeaveWorkspace: "OWNER_CANNOT_LEAVE_WORKSPACE",
  UserAlreadyAWorkspaceMember: "USER_ALREADY_A_WORKSPACE_MEMBER",
  InvitatioAlreadyAccepted: "INVITATION_ALREADY_ACCEPTED",
  InvitationAlreadyDeclined: "INVITATION_ALREADY_DECLINED",
  InvitationAlreadyRevoked: "INVITATION_ALREADY_REVOKED",
  InvitationExpired: "INVITATION_EXPIRED",

  EmailDoesNotSent: "EMAIL_DOES_NOT_SENT",
} as const;
