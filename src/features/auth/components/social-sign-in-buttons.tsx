"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import { useState } from "react";

type Provider = "google" | "github";

export function SocialSignInButtons() {
  const [loadingProvider, setLoadingProvider] = useState<Provider | null>(null);

  async function handleSocialSignIn(provider: Provider) {
    setLoadingProvider(provider);

    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/dashboard",
      });
    } catch (error) {
      console.error(`${provider} sign-in failed:`, error);

      setLoadingProvider(null);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <Button
        className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 transition hover:bg-white/10"
        variant="outline"
        disabled={loadingProvider !== null}
        onClick={() => handleSocialSignIn("google")}
      >
        {loadingProvider === "google"
          ? "Redirecting..."
          : "Continue with Google"}
      </Button>

      <button
        className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 transition hover:bg-white/10"

        disabled={loadingProvider !== null}
        onClick={() => handleSocialSignIn("github")}
      >
        {loadingProvider === "github"
          ? "Redirecting..."
          : "Continue with GitHub"}
      </button>
    </div>
  );
}
