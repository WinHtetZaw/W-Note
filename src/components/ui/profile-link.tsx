import { getSessionServer } from "@/lib/auth/session-server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProfileLink() {
  const session = await getSessionServer();

  if (!session) {
    redirect("/sign-in");
  }

  const userName = session.user.name;

  return (
    <Link
      href="/profile"
      className="flex size-10 items-center uppercase justify-center rounded-full bg-violet-600 font-bold"
    >
      {userName[0]}
    </Link>
  );
}
