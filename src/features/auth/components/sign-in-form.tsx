"use client";

import { useForm } from "react-hook-form";
import { SignInFormValues, signInSchema } from "../schemas/sign-in-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Mail } from "lucide-react";
import { useTransition } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  FormInput,
  FormPasswordInput,
  FormSubmitButton,
} from "@/components/form";
import { fetchUserPendingInvitationsCount } from "@/features/invitations/server/actions/fetch-user-pending-invitations-count";

export default function SignInForm() {
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = (formData: SignInFormValues) => {
    const { email, password } = formData;

    startTransition(async () => {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });
      if (!data?.user) {
        toast.error(error?.message || "Sign in failed. Please try again.");
        return;
      }

      toast.success("Signed in successfully.");

      const invitations = await fetchUserPendingInvitationsCount(email);
      if (invitations.success && invitations.data >= 1) {
        router.push("/invitations");
      }

      router.push("/dashboard");
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <FormInput
        control={form.control}
        name="email"
        label="Email"
        placeholder="you@example.com"
        icon={<Mail className="size-5 text-zinc-500" />}
      />
      <FormPasswordInput control={form.control} name="password" />
      <FormSubmitButton isPending={isPending} className="w-full">
        Sign In
        <ArrowRight className="size-4" />
      </FormSubmitButton>
    </form>
  );
}
