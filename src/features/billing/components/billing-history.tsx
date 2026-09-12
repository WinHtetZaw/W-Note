import { Download, FileText } from "lucide-react";

type BillingHistoryProps = {
  workspaceId: string;
};

const invoices = [
  {
    id: "INV-2026-09",
    date: "Sep 11, 2026",
    amount: "$12.00",
    status: "Paid",
  },
  {
    id: "INV-2026-08",
    date: "Aug 11, 2026",
    amount: "$12.00",
    status: "Paid",
  },
  {
    id: "INV-2026-07",
    date: "Jul 11, 2026",
    amount: "$12.00",
    status: "Paid",
  },
];

export default function BillingHistory({ workspaceId }: BillingHistoryProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
      {/* Desktop header */}
      <div className="hidden grid-cols-[1fr_1fr_1fr_auto] gap-4 border-b border-white/10 px-6 py-4 text-xs font-medium uppercase tracking-wider text-zinc-600 sm:grid">
        <span>Invoice</span>
        <span>Date</span>
        <span>Amount</span>
        <span />
      </div>

      <div className="divide-y divide-white/5">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="flex flex-col gap-4 px-5 py-5 sm:grid sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-center sm:gap-4 sm:px-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-white/5">
                <FileText className="size-4 text-zinc-400" />
              </div>

              <span className="text-sm font-medium text-zinc-300">
                {invoice.id}
              </span>
            </div>

            <span className="text-sm text-zinc-500">{invoice.date}</span>

            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-300">{invoice.amount}</span>

              <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400">
                {invoice.status}
              </span>
            </div>

            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-white/5 hover:text-zinc-200"
              aria-label={`Download ${invoice.id}`}
            >
              <Download className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
