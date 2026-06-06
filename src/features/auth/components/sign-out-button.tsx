"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export default function SignOutButton({ className }: { className?: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleSignOut = () => {
    startTransition(async () => {
      const { data, error } = await authClient.signOut();
      if (!data?.success) {
        toast.error(error?.message || "Sign out failed. Please try again.");
        return;
      }

      toast.success("Signed out successfully.");
      router.refresh();
    });
  };
  return (
    <button disabled={isPending} onClick={handleSignOut} className={className}>
      Sign Out
    </button>
  );
}
