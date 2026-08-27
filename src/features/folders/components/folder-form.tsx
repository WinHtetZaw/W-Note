"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import z from "zod";
import { useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { createFolder } from "../server/actions/create-folder";
import { useCreateFolder } from "../hooks/use-create-folder";
import { FormInput, FormSubmitButton } from "@/components/form";
import { renameFolder } from "../server/actions/rename-folder";
import { errorMessages } from "@/lib/errors/error-messages";

const formSchema = z.object({
  name: z.string().trim().min(2, "Folder name must be at least 2 characters"),
});

type FolderFormValues = z.infer<typeof formSchema>;

type Props = {
  isEditForm?: boolean;
  oldFolder?: FolderFormValues;
};

export default function FolderForm({ isEditForm, oldFolder }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: isEditForm ? oldFolder : { name: "" },
  });
  const [isPending, startTransition] = useTransition();
  const { workspaceId, folderId }: { workspaceId: string; folderId: string } =
    useParams();
  const router = useRouter();
  // const mutation = useCreateFolder(workspaceId);

  const handleCreate = async ({ name }: z.infer<typeof formSchema>) => {
    const result = await createFolder({
      name,
      workspaceId,
    });
    // const result = await mutation.mutateAsync({
    //   ...data,
    //   workspaceId,
    //   createdBy: session.user.id,
    // });
    if (result.code) {
      toast.error(errorMessages[result.code]);
      return;
    }
    toast.success("Folder created successfully.");
    router.push(`/dashboard/w/${workspaceId}/folders`);
  };

  const handleRename = async ({ name }: z.infer<typeof formSchema>) => {
    const result = await renameFolder({
      name,
      workspaceId,
      folderId,
    });
    if (!result.success) {
      toast.error(result.code);
    } else {
      toast.success("Folder renamed successfully.");
    }
    return result;
  };

  const onSubmit = (formData: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      if (isEditForm) {
        await handleRename(formData);
      } else {
        await handleCreate(formData);
      }
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FormInput
        control={form.control}
        name="name"
        label="Folder Name"
        placeholder="Enter name . . ."
      />
      <FormSubmitButton isPending={isPending} className="flex ml-auto">
        <Save className="size-5" />
        {isEditForm ? "Save Changes" : "Create Folder"}
      </FormSubmitButton>
    </form>
  );
}
