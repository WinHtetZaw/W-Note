"use client";

import { useForm } from "react-hook-form";
import { SignInFormValues, signInSchema } from "../schemas/sign-in-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Mail } from "lucide-react";
import { useTransition } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
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
  const { token } = useParams();

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

      // if (!token) {
      //   return router.push("/dashboard");
      // }

      const result = await fetchUserPendingInvitationsCount(email);
      // const invitations = 0;
      if (result.success && result.data >= 1) {
        console.log(result.data);
        console.log("got to invitations");
        router.push("/invitations");
        // if (result.data > 0) {
        // } else {
        //   console.log("got to dashboard");
        //   router.push("/dashboard");
        // }

        // switch (result.data) {
        //   case 0:
        //     router.push("/dashboard/w/new");
        //     break;
        //   case 1:
        //     router.push("/pricing");
        //     // router.push(`/invitations/[$]`);
        //     break;
        //   default:
        //     router.push("/invitations");
        // }
      }
      console.log("got to dashboard");
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
      <FormSubmitButton isPending={isPending}>
        Sign In
        <ArrowRight className="size-4" />
      </FormSubmitButton>
    </form>
  );
}
