"use client";

import { Github } from "@/components/icons/github-icon";
import { Google } from "@/components/icons/google-icon";
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
        className="h-14 w-full group flex items-center"
        variant="outline"
        disabled={loadingProvider !== null}
        onClick={() => handleSocialSignIn("google")}
      >
        <Google className=" size-6 grayscale-100 group-hover:grayscale-0 transition-[filter] duration-250" />
        {loadingProvider === "google"
          ? "Redirecting..."
          : "Continue with Google"}
      </Button>

      <Button
        className="h-14 w-full group"
        variant="outline"
        disabled={loadingProvider !== null}
        onClick={() => handleSocialSignIn("github")}
      >
        <Github className=" size-6 grayscale-100 text-violet-400 group-hover:grayscale-0 transition-[filter] duration-250" />

        {loadingProvider === "github"
          ? "Redirecting..."
          : "Continue with GitHub"}
      </Button>
    </div>
  );
}
