import SignOutButton from "@/features/auth/components/sign-out-button";
import { auth } from "@/lib/auth";
import { Brain } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { ReactNode, Suspense } from "react";
import { ThemeToggle } from "./ui/theme-toggle";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";

export default async function Header() {
  return (
    <header className="fixed w-full top-0 z-50 border-b border-foreground/10 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Brain className="size-7 text-icon" />
          <span className="text-xl font-bold tracking-tight">NoteAI</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink href="/features">Features</NavLink>

          <NavLink href="/pricing">Pricing</NavLink>

          <Suspense fallback={<Skeleton className="h-5 w-20 rounded-xl" />}>
            <AuthCheckLink />
          </Suspense>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

async function AuthCheckLink() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <>
      {session?.user ? (
        <SignOutButton className="h-8 px-2 text-link transition hover:text-violet-500" />
      ) : (
        <NavLink href="/sign-in">Sign In</NavLink>
      )}
    </>
  );
}

type NavLinkProps = { children: ReactNode; href: string };

function NavLink({ children, href }: NavLinkProps) {
  return (
    <Button variant="styleLess" asChild className="h-8 px-2 ">
      <Link href={href} className="text-link transition hover:text-violet-500">
        {children}
      </Link>
    </Button>
  );
}
