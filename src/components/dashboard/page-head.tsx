import { Sparkles } from "lucide-react";
import { ReactNode } from "react";
import PageLabel from "../ui/page-label";

type Props = {
  pageLabel: string;
  labelIcon?: ReactNode;
  title: string;
  subTitle: string;
  children?: ReactNode;
};

export default function PageHead(props: Props) {
  const { title, subTitle, children, pageLabel, labelIcon } = props;
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <PageLabel icon={labelIcon} label={pageLabel} className="mb-4" />

        <h1 className="text-4xl font-black md:text-5xl">{title}</h1>

        <p className="mt-4 text-lg text-muted">{subTitle}</p>
      </div>

      {children}
    </div>
  );
}
