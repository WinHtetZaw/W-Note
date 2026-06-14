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
import { handleToast } from "@/lib/utils";

type Props = {
  initialValues?: WorkspaceFormValues;
  workspaceId?: string;
};

export default function WorkspaceForm({ initialValues, workspaceId }: Props) {
  const isEditForm = !!workspaceId;
  const form = useForm<WorkspaceFormValues>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: !!workspaceId ? initialValues : { name: "" },
  });
  const [isPending, startTransition] = useTransition();

  const submitWorkspace = async (values: WorkspaceFormValues) => {
    const result = isEditForm
      ? await renameWorkspace({ ...values, workspaceId })
      : await createWorkspace(values);
    handleToast(result.success, result.message);
  };

  const onSubmit = async (values: WorkspaceFormValues) => {
    // console.log("Form submitted with values:", values);
    startTransition(() => submitWorkspace(values));
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
          {isEditForm ? "Save Changes" : "Create Workspace"}
        </FormSubmitButton>
      </form>
    </>
  );
}
