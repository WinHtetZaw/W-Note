"use client";

import { Controller, useForm } from "react-hook-form";
import { FileText, Save } from "lucide-react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { formSchema, NoteFormValues } from "../schemas/form-schema";
import { useParams } from "next/navigation";
import { createNote } from "../server/actions/create-note";
import { editNote } from "../server/actions/edit-note";

type Props = {
  isEditForm?: boolean;
  oldNote?: NoteFormValues;
  // workspaceId: string;
  // noteId?: string;
};

export default function NoteFormPage(props: Props) {
  const { isEditForm, oldNote } = props;
  const form = useForm<NoteFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: oldNote ? oldNote : { title: "", content: "" },
  });
  const [isPending, startTransition] = useTransition();
  const { workspaceId, noteId }: { workspaceId: string; noteId: string } =
    useParams();

  const handleCreate = async (data: z.infer<typeof formSchema>) => {
    const result = await createNote({ ...data, workspaceId });
    if (!result.success) {
      toast.error(result.message);
    } else {
      toast.success("Note created successfully.");
    }
    return result;
  };

  const handleRename = async (data: z.infer<typeof formSchema>) => {
    const result = await editNote({ ...data, workspaceId, noteId });
    if (!result.success) {
      toast.error(result.message);
    } else {
      toast.success("Note edited successfully.");
    }
    return result;
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      if (isEditForm) {
        await handleRename(data);
      } else {
        await handleCreate(data);
      }
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Controller
        name="title"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel
              htmlFor="title"
              className="mb-3 flex items-center gap-2 text-sm text-zinc-400"
            >
              <FileText className="h-4 w-4" />
              Note Title
            </FieldLabel>
            <Input
              {...field}
              id="title"
              aria-invalid={fieldState.invalid}
              placeholder="Your note title"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="content"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel
              htmlFor="content"
              className="mb-3 flex items-center gap-2 text-sm text-zinc-400"
            >
              <FileText className="h-4 w-4" />
              Content
            </FieldLabel>
            <Textarea
              {...field}
              id="content"
              aria-invalid={fieldState.invalid}
              placeholder="Write your note here..."
              autoComplete="off"
              className="min-h-80 w-full resize-none rounded-3xl border border-white/10 bg-white/5 px-6 py-5 text-lg leading-8 outline-none transition focus:border-violet-500"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Button
        disabled={isPending}
        className="ml-auto flex disabled:bg-green-500"
      >
        <Save className="size-5" />

        {isEditForm ? "Save Changes" : "Create Note"}
      </Button>
    </form>
  );
}
