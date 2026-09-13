"use client";

import { FormInput, FormSubmitButton } from "@/components/form";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const userFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

type UserFormValues = z.infer<typeof userFormSchema>;

type Props = { userName: string };

export default function UserEditForm({ userName }: Props) {
  //   const { data: session } = authClient.useSession();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: { name: userName ?? "" },
  });
  const [isPending, startTransition] = useTransition();

  //   useEffect(() => {
  //     if (!session?.user) return;

  //     form.reset({ name: session.user.name ?? "" });
  //   }, [session, form]);

  const onSubmit = (formData: UserFormValues) => {
    if (userName === formData.name) {
      return;
    }

    startTransition(async () => {
      const { error } = await authClient.updateUser({ name: formData.name });

      if (error) {
        console.error(error);
        toast.error("Failed to update profile name.");
        return;
      }

      toast.success("Successfully updated name");
    });
  };
  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-2/3"
      >
        <FormInput
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="Enter your name"
          inputGroupClassName="h-12 rounded-2xl px-4 py-0"
          inputClassName="p-0"
        />
        <FormSubmitButton
          isPending={isPending}
          className="ml-auto font-semibold h-12"
        >
          Save Changes
        </FormSubmitButton>
      </form>
    </>
  );
}
