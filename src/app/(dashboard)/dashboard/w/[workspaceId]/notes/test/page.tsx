"use client";

import { summarizeNote } from "@/features/notes/server/actions/summarize-note";
import { useParams } from "next/navigation";
import { useState, useTransition } from "react";

export default function Page() {
  const [isPending, startTransition] = useTransition();
  const [testing, setTesting] = useState("");
  const params = useParams();
  const workspaceId = params.workspaceId as string;

  const handleSubmit = () => {
    console.log(testing);
    startTransition(async () => {
      const res = await summarizeNote({
        noteId: "054cff4d-db75-488d-aa65-d2b8d8a66808",
        workspaceId,
      });
      console.dir(res);
    });
  };
  return (
    <div>
      <h3>test</h3>
      <textarea
        className="block w-full bg-violet-500/20 h-40"
        placeholder="enter text"
        onChange={(e) => setTesting(e.target.value)}
      />
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
}
