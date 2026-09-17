"use client";

import { FormInput } from "@/components/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { editWorkspace } from "../server/actions/edit-workspace";
import { wait } from "@/lib/utils";
import { errorMessages } from "@/lib/errors";

const editWorkspaceFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

type EditWorkspaceFormValue = z.infer<typeof editWorkspaceFormSchema>;

type Props = { workspaceName: string };

export default function EditWorkspaceForm({ workspaceName }: Props) {
  const form = useForm<EditWorkspaceFormValue>({
    resolver: zodResolver(editWorkspaceFormSchema),
    defaultValues: { name: workspaceName ?? "" },
  });

  const [isPending, startTransition] = useTransition();
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const router = useRouter();

  const onSubmit = ({ name }: EditWorkspaceFormValue) => {
    if (!workspaceId) return;

    startTransition(async () => {
      const res = await editWorkspace({ workspaceId, name });
      if (res.code) {
        console.error(res);
        toast.error(errorMessages[res.code]);
        return;
      }

      toast.success("Successfully saved changes.");
      router.refresh();
    });
  };
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <FormInput
        control={form.control}
        name="name"
        label="workspace name"
        placeholder="Enter your workspace name ..."
      />

      <Button className="ml-auto w-full md:w-48 flex">
        <Save className="size-5" />
        <span className="mr-auto">
          {isPending ? "Saving . . ." : "Save Changes"}
        </span>
      </Button>
    </form>
  );
}
