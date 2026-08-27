import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FormSubmitButtonProps = {
  isPending?: boolean;
  children: React.ReactNode;
  className?: string;
};

export function FormSubmitButton(props: FormSubmitButtonProps) {
  const { isPending, children, className } = props;

  return (
    <Button
      type="submit"
      disabled={isPending}
      className={cn("disabled:opacity-70", className)}
    >
      {children}
    </Button>
  );
}
