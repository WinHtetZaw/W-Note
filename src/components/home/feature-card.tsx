type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export default function FeatureCard(props: Props) {
  const { icon, title, description } = props;

  return (
    <div className="glass p-8">
      <div className="mb-5">{icon}</div>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="mt-4 leading-7 text-muted">{description}</p>
    </div>
  );
}
