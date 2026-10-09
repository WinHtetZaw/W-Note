import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import PageLabel from "../ui/page-label";
import { cn } from "@/lib/utils";

type Props = {
  pageLabel: string;
  labelIcon?: LucideIcon;
  title: string;
  subTitle: string;
  children?: ReactNode;
  className?: string;
};

export default function PageHead(props: Props) {
  const { title, subTitle, children, pageLabel, labelIcon, className } = props;
  return (
    <div
      className={cn(
        "flex gap-6 flex-wrap lg:flex-row items-center justify-between",
        className,
      )}
    >
      <div className="space-y-3">
        <PageLabel icon={labelIcon} label={pageLabel} />

        <h1 className="font-black text-5xl capitalize">{title}</h1>

        <p className="text-lg text-muted">{subTitle}</p>
      </div>

      {children}
    </div>
  );
}
