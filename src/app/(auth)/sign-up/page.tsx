import Link from "next/link";
import { Sparkles } from "lucide-react";
import SignUpForm from "@/features/auth/components/sign-up-form";
import AuthFormWrapper from "@/features/auth/components/auth-form-wrapper";

export default function SignUpPage() {
  return (
    <AuthFormWrapper
      pageTitle="Create Account"
      formTitle="Sign Up"
      formDescription="Start building your AI-powered knowledge base."
      link={
        <>
          Already have an account?{" "}
          <Link href="/sign-in" className="font-medium text-violet-400">
            Sign In
          </Link>
        </>
      }
    >
      <SignUpForm />
    </AuthFormWrapper>
  );
}
