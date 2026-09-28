import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description: string;
  className?: string;
};

export default function SectionTitle(props: Props) {
  const { title, description, className = "" } = props;

  return (
    <div className={cn("mb-16 text-center", className)}>
      <h2 className="text-4xl font-bold md:text-5xl">{title}</h2>

      <p className="mt-5 text-lg text-muted">{description}</p>
    </div>
  );
}
