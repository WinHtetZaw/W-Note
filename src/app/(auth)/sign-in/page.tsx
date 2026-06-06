import AuthFormWrapper from "@/features/auth/components/auth-form-wrapper";
import SignInForm from "@/features/auth/components/sign-in-form";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
  return (
    <>
      <AuthFormWrapper
        pageTitle="Welcome Back"
        formTitle="Sign In"
        formDescription="Access your AI workspace and notes."
        link={
          <>
            Don't have an account?{" "}
            <Link href="/sign-up" className="font-medium text-violet-400">
              Sign Up
            </Link>
          </>
        }
      >
        <SignInForm />
      </AuthFormWrapper>
    </>
  );
}
