import { getSessionServer } from "@/lib/auth/session-server";
import Link from "next/link";

export default async function ProfileLink() {
  const session = await getSessionServer();

  if (!session) {
    throw new Error("Fail to load user session.");
  }

  const userName = session.user.name;

  return (
    <Link href="/profile">
      <div className="flex items-center gap-3 rounded-full lg:rounded-2xl glass lg:px-3 lg:py-2">
        <div className="flex size-10 items-center uppercase justify-center rounded-full bg-violet-600 font-bold">
          {userName[0]}
        </div>

        <div className="hidden lg:block max-w-26">
          <p className="font-medium line-clamp-1">{userName}</p>
        </div>
      </div>
    </Link>
  );
}
