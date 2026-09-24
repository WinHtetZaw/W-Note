import { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export default function FeatureCard(props: Props) {
  const { icon: Icon, title, description } = props;

  return (
    <div className="p-8 card">
      <Icon className="mb-5 size-7 text-primary" />
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="mt-4 leading-7 text-muted">{description}</p>
    </div>
  );
}
