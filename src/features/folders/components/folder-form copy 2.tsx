"use client";

import { Controller, useForm } from "react-hook-form";
import { Folder, Save } from "lucide-react";

type FolderFormValues = {
  name: string;
};

type Props = {
  isEditForm?: boolean;
  oldFolder?: FolderFormValues;
};

export default function FolderForm({ isEditForm, oldFolder }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FolderFormValues>({
    defaultValues: isEditForm ? oldFolder : { name: "" },
  });

  const onSubmit = (values: FolderFormValues) => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="mb-3 flex items-center gap-2 text-sm text-zinc-400">
          <Folder className="h-4 w-4" />
          Folder Name
        </label>

        <input
          {...register("name", {
            required: "Folder name is required",
          })}
          placeholder="Product Research"
          className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-5 outline-none transition focus:border-violet-500"
        />

        {errors.name && (
          <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>
        )}
      </div>
      <button className="flex items-center ml-auto gap-2 rounded-2xl bg-violet-600 px-6 py-4 font-semibold transition hover:bg-violet-500">
        <Save className="h-5 w-5" />

        {isEditForm ? "Save Changes" : "Create Folder"}
      </button>
    </form>
  );
}
