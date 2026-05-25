"use client";

import { useForm } from "react-hook-form";
import { Save, Building2, FileText } from "lucide-react";
import { createWorkspace } from "../server/actions";

type WorkspaceFormValues = {
  name: string;
  description?: string;
};

// const oldWorkspace = {
//   name: "Startup Team",
//   description: "AI workspace for product development and collaboration.",
// };

type Props = {
  isEditForm?: boolean;
  oldWorkspace?: WorkspaceFormValues;
};

export default function WorkspaceForm({
  isEditForm = false,
  oldWorkspace,
}: Props) {
  const isEdit = isEditForm;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkspaceFormValues>({
    defaultValues: isEdit
      ? oldWorkspace
      : {
          name: "",
          description: "",
        },
  });

  const onSubmit = async (values: WorkspaceFormValues) => {
    console.log("Form submitted with values:", values);
    // return;
    if (isEdit) {
      // Update existing workspace logic
      console.log("Updating workspace with values:", values);
    } else {
      const data = await createWorkspace(values);
      console.log("Created workspace:", data);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="mb-3 flex items-center gap-2 text-sm text-zinc-400">
            <Building2 className="h-4 w-4" />
            Workspace Name
          </label>

          <input
            {...register("name", {
              required: "Workspace name is required",
            })}
            className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-5 outline-none transition focus:border-violet-500"
            placeholder="Startup Team"
          />

          {errors.name && (
            <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="mb-3 flex items-center gap-2 text-sm text-zinc-400">
            <FileText className="h-4 w-4" />
            Description
          </label>

          <textarea
            {...register("description")}
            placeholder="Describe your workspace..."
            className="min-h-45 w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none transition focus:border-violet-500"
          />
        </div>

        <button className="flex ml-auto items-center gap-2 rounded-2xl bg-violet-600 px-6 py-4 font-semibold transition hover:bg-violet-500">
          <Save className="h-5 w-5" />

          {isEdit ? "Save Changes" : "Create Workspace"}
        </button>
      </form>
    </>
  );
}
