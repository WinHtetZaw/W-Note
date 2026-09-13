import UserEditForm from "./user-edit-form";
import { User } from "lucide-react";
import SectionHeader from "@/components/dashboard/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import { getSessionSerever } from "@/lib/better-auth/session-server";

export default async function PersonalInfoCard() {
  const session = await getSessionSerever();

  if (!session) {
    throw new Error("Fail to load data.");
  }

  const userName = session.user.name;

  return (
    <section className="rounded-[32px] p-8 glass">
      <SectionHeader
        icon={<User className="h-5 w-5" />}
        title="Personal Information"
        description="Update the information associated with your account."
      />

      <div className="mt-8 flex flex-col gap-8">
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 items-center uppercase justify-center rounded-full bg-violet-600 text-2xl font-black">
            {userName[0]}
          </div>

          <div>
            <h3 className="font-semibold">Profile Photo</h3>

            <p className="mt-1 text-sm text-zinc-500">
              JPG, PNG or WebP. Maximum 5MB.
            </p>

            <button className="mt-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm transition hover:bg-white/10">
              Change Photo
            </button>
          </div>
        </div>

        <UserEditForm userName={userName} />
      </div>
    </section>
  );
}

export function PersonalInfoCardLoading() {
  return (
    <section className="rounded-[32px] p-8 glass">
      <SectionHeader
        icon={<User className="h-5 w-5" />}
        title="Personal Information"
        description="Update the information associated with your account."
      />

      <div className="mt-8 flex flex-col gap-8">
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 items-center uppercase justify-center rounded-full bg-violet-600 text-2xl font-black"></div>

          <div>
            <h3 className="font-semibold">Profile Photo</h3>

            <p className="mt-1 text-sm text-zinc-500">
              JPG, PNG or WebP. Maximum 5MB.
            </p>

            <Skeleton className="mt-3 rounded-xl h-9.5 w-38" />
          </div>
        </div>

        <div className="flex flex-col w-2/3 gap-6">
          <Skeleton className="h-12 rounded-2xl" />
          <Skeleton className="h-12 w-40 rounded-2xl ml-auto" />
        </div>
      </div>
    </section>
  );
}
