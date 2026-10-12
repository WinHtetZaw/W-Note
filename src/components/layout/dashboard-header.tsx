import { ThemeToggle } from "../ui/theme-toggle";
import { Suspense } from "react";
import HeaderSearch from "../dashboard/header-search";
import BurgerMenu from "../ui/burger-menu";
import { Skeleton } from "../ui/skeleton";
import ProfileLink from "../ui/profile-link";

export default async function DashboardHeader() {
  return (
    <header className="sticky top-0 z-40 header-bg">
      <div className="flex h-20 items-center justify-between px-6">
        <BurgerMenu />
        <Suspense fallback={<p>search fallbak</p>}>
          <HeaderSearch />
        </Suspense>

        <div className="ml-auto flex items-center gap-4">
          {/* ! later implement notification feat
          <button className="hidden lg:block relative rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10">
            <Bell className="h-5 w-5" />

            <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-violet-500" />
          </button> */}

          <Suspense fallback={<Skeleton className="size-10 rounded-full" />}>
            <ProfileLink />
          </Suspense>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
