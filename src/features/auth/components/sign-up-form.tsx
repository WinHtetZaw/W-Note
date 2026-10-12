"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Mail, User } from "lucide-react";
import { useState, useTransition } from "react";
import { SignUpFormValues, signUpSchema } from "../schemas/sign-up-schema";
import { authClient } from "@/lib/auth/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  FormInput,
  FormPasswordInput,
  FormSubmitButton,
} from "@/components/form";

export default function SignUpForm() {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "" },
  });
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const onSubmit = (formData: SignUpFormValues) => {
    const { name, email, password } = formData;
    startTransition(async () => {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
      });
      if (!data?.user) {
        toast.error(error?.message || "Sign up failed. Please try again.");
        return;
      }

      toast.success("Account created successfully. Please sign in.");
      router.push("/sign-in");
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <FormInput
        control={form.control}
        name="name"
        label="Full Name"
        placeholder="Enter your full name"
        icon={<User className="size-5 text-zinc-500" />}
      />

      <FormInput
        control={form.control}
        name="email"
        label="Email"
        placeholder="you@example.com"
        icon={<Mail className="size-5 text-zinc-500" />}
      />

      <FormPasswordInput control={form.control} name="password" />

      <FormSubmitButton isPending={isPending}>
        Create Account
        <ArrowRight className="size-4" />
      </FormSubmitButton>
    </form>
  );
}
