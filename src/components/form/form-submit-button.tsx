import { Button } from "@/components/ui/button";

type FormSubmitButtonProps = {
  isPending?: boolean;
  children: React.ReactNode;
  className?: string;
};

export function FormSubmitButton(props: FormSubmitButtonProps) {
  const { isPending, children, className } = props;

  return (
    <Button type="submit" disabled={isPending} className={className}>
      {children}
    </Button>
  );
}
