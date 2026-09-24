import { getSessionSerever } from "@/lib/auth/session-server";
import Link from "next/link";

export default async function ProfileLink() {
  const session = await getSessionSerever();

  if (!session) {
    throw new Error("Fail to load user session.");
  }

  const userName = session.user.name;

  return (
    <Link href="/profile">
      <div className="flex items-center gap-3 rounded-2xl glass px-3 py-2">
        <div className="flex h-10 w-10 items-center uppercase justify-center rounded-full bg-violet-600 font-bold">
          {userName[0]}
        </div>

        <div className="hidden md:block max-w-26">
          <p className="font-medium line-clamp-1">{userName}</p>
        </div>
      </div>
    </Link>
  );
}
