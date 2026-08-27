"use client";

import { useForm } from "react-hook-form";
import { Save } from "lucide-react";
import { renameWorkspace } from "../server/actions/rename-workspace";
import { createWorkspace } from "../server/actions/create-workspace";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput, FormSubmitButton } from "@/components/form";
import { useTransition } from "react";
import {
  WorkspaceFormValues,
  workspaceSchema,
} from "../schemas/form-workspace-schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  initialValues?: WorkspaceFormValues;
  workspaceId?: string;
};

export default function WorkspaceForm({ initialValues, workspaceId }: Props) {
  const form = useForm<WorkspaceFormValues>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: !!workspaceId ? initialValues : { name: "" },
  });
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreate = async (values: WorkspaceFormValues) => {
    const result = await createWorkspace(values);
    if (!result.success) {
      toast.error("Fail to create workspace.");
    } else {
      toast.success("Workspace created successfully.");
      router.push(`/dashboard/w/${result.data.id}`);
    }
  };

  const handleRename = async (
    values: WorkspaceFormValues,
    workspaceId: string,
  ) => {
    const result = await renameWorkspace({ name: values.name, workspaceId });
    if (!result.success) {
      toast.error("Fail to rename workspace.");
    } else {
      toast.success("Workspace renamed successfully.");
      router.back();
    }
  };

  const onSubmit = async (values: WorkspaceFormValues) => {
    startTransition(() => {
      if (!workspaceId) handleCreate(values);
      else handleRename(values, workspaceId);
    });
  };

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormInput
          control={form.control}
          name="name"
          label="Workspace Name"
          placeholder="Enter your workspace name ..."
        />

        <FormSubmitButton
          className="md:w-fit md:ml-auto flex"
          isPending={isPending}
        >
          <Save className="size-5" />
          {workspaceId ? "Save Changes" : "Create Workspace"}
        </FormSubmitButton>
      </form>
    </>
  );
}
