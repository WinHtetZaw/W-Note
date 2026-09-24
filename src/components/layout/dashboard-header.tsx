import { Bell } from "lucide-react";
import { ThemeToggle } from "../ui/theme-toggle";
import { Suspense } from "react";
import ProfileLink from "@/features/members/components/profile-link";
import HeaderSearch from "../dashboard/header-search";

export default async function DashboardHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between px-6">
        {/* Search */}
        <Suspense fallback={<p>search fallbak</p>}>
          <HeaderSearch />
        </Suspense>

        {/* Right */}
        <div className="ml-auto flex items-center gap-4">
          <button className="relative rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10">
            <Bell className="h-5 w-5" />

            <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-violet-500" />
          </button>

          <Suspense fallback={<p>Profile link fallbak</p>}>
            <ProfileLink />
          </Suspense>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
