"use client";

import { CheckCircle2, XCircle, X } from "lucide-react";
import { toast } from "sonner";

type CustomToastProps = {
  id: string | number;
  type: "success" | "error";
  title: string;
  description?: string;
};

export function CustomToast({
  id,
  type,
  title,
  description,
}: CustomToastProps) {
  const isSuccess = type === "success";

  return (
    <div className="flex w-full items-start gap-3 rounded-lg border bg-background p-4 shadow-lg sm:w-100">
      {isSuccess ? (
        <CheckCircle2 className="size-5 shrink-0 text-green-500" />
      ) : (
        <XCircle className="size-5 shrink-0 text-destructive" />
      )}

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{title}</p>

        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <button
        type="button"
        onClick={() => toast.dismiss(id)}
        className="shrink-0 text-muted-foreground hover:text-foreground"
        aria-label="Close notification"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}

export function showSuccessToast(title: string, description?: string) {
  return toast.custom(
    (id) => (
      <CustomToast
        id={id}
        type="success"
        title={title}
        description={description}
      />
    ),
    {
      duration: 5000,
    },
  );
}

export function showErrorToast(title: string, description?: string) {
  return toast.custom(
    (id) => (
      <CustomToast
        id={id}
        type="error"
        title={title}
        description={description}
      />
    ),
    {
      duration: 5000,
    },
  );
}
