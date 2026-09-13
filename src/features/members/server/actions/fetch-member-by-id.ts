"use server";

import { redirect } from "next/navigation";
import { ErrorCode } from "@/lib/errors";
import { fetchMemberByIdService } from "../services/fetch-member-by-id-service";

type IncomingData = {
  workspaceId: string;
  userId: string;
};

export async function fetchMemberById(rawData: IncomingData) {
  const [error, data] = await fetchMemberByIdService(rawData);

  if (error == null) {
    return { data };
  }

  const reason = error.reason;
  switch (reason) {
    case "INVALID_INPUT":
      return { code: ErrorCode.Validation, reason, details: error.details };
    case "NOT_AUTHENTICATED":
      redirect("/sign-in");
    case "NOT_WORKSPACE_MEMBER":
      return { code: ErrorCode.Forbidden, reason };
    case "WORKSPACE_MEMBER_NOT_FOUND":
      return { code: ErrorCode.NotFound, reason };
    case "UNEXPECTED":
      return { code: ErrorCode.Internal, reason };
    default:
      const _exhaustiveCheck: never = reason;
      console.error("Unknown server error reason:", _exhaustiveCheck);
      return { code: ErrorCode.Internal };
  }
}
