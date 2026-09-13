import { headers } from "next/headers";
import { auth } from "../auth";

export const getSessionSerever = async () => {
  return auth.api.getSession({ headers: await headers() });
};
