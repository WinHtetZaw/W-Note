"use client";

import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const onSignIn = async () => {
    await authClient.signIn.email({
      email: "test@example.com",
      password: "password123",
    });
  };

  return <button onClick={onSignIn}>Sign In</button>;
}
