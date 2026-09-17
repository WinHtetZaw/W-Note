import { authClient } from "@/lib/auth/auth-client";

export async function hasPasswordAccount() {
  const { data: accounts, error } = await authClient.listAccounts();

  if (error) {
    throw new Error(error.message);
  }

  return accounts.some((account) => account.providerId === "credential");
}
