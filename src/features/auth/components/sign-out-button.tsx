"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export default function SignOutButton({ className }: { className?: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSignOut = () => {
    startTransition(async () => {
      const { error } = await authClient.signOut();
      if (error) {
        toast.error(error?.message || "Sign out failed. Please try again.");
        return;
      }

      toast.success("Signed out successfully.");
      router.refresh();
    });
  };
  return (
    <Button
      variant="styleLess"
      disabled={isPending}
      onClick={handleSignOut}
      className={className}
    >
      Sign Out
    </Button>
  );
}
