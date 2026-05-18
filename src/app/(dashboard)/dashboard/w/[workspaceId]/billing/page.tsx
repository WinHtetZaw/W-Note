// app/(app)/workspace/[workspaceId]/billing/page.tsx

"use client";

import { useForm } from "react-hook-form";
import {
  CreditCard,
  Crown,
  Download,
  Sparkles,
  Zap,
  Check,
} from "lucide-react";

type BillingFormValues = {
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
};

const invoices = [
  {
    id: "INV-1024",
    date: "May 12, 2026",
    amount: "$24.00",
    status: "Paid",
  },

  {
    id: "INV-1023",
    date: "Apr 12, 2026",
    amount: "$24.00",
    status: "Paid",
  },

  {
    id: "INV-1022",
    date: "Mar 12, 2026",
    amount: "$24.00",
    status: "Paid",
  },
];

export default function BillingPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BillingFormValues>({
    defaultValues: {
      cardholderName: "",
      cardNumber: "",
      expiry: "",
      cvc: "",
    },
  });

  const onSubmit = (values: BillingFormValues) => {
    console.log(values);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]" />
      </div>

      <div className="p-6">
        {/* Header */}
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-violet-400" />
            Workspace Billing
          </div>

          <h1 className="text-4xl font-black md:text-5xl">
            Billing & Subscription
          </h1>

          <p className="mt-4 text-lg text-zinc-400">
            Manage plans, invoices, and payment methods.
          </p>
        </div>

        {/* Layout */}
        <div className="mt-10 grid gap-6 xl:grid-cols-[1fr_380px]">
          {/* Left */}
          <div className="space-y-6">
            {/* Current Plan */}
            <section className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
                    <Crown className="h-4 w-4" />
                    Current Plan
                  </div>

                  <h2 className="text-3xl font-black">
                    Pro Plan
                  </h2>

                  <p className="mt-3 max-w-xl text-zinc-400">
                    Unlimited AI generations, advanced workspace
                    collaboration, and priority support.
                  </p>
                </div>

                <div className="rounded-[28px] border border-violet-500/20 bg-violet-500/10 p-6">
                  <div className="text-sm text-zinc-400">
                    Monthly Billing
                  </div>

                  <div className="mt-2 text-5xl font-black">
                    $24
                  </div>

                  <div className="mt-2 text-sm text-zinc-400">
                    per month
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                <PlanFeature label="Unlimited AI generations" />
                <PlanFeature label="Realtime collaboration" />
                <PlanFeature label="Workspace analytics" />
                <PlanFeature label="Priority support" />
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <button className="rounded-2xl bg-violet-600 px-6 py-4 font-semibold transition hover:bg-violet-500">
                  Upgrade Plan
                </button>

                <button className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 transition hover:bg-white/10">
                  Cancel Subscription
                </button>
              </div>
            </section>

            {/* Payment Form */}
            <section className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
              <div className="flex items-center gap-3">
                <CreditCard className="h-6 w-6 text-violet-400" />

                <div>
                  <h2 className="text-2xl font-bold">
                    Payment Method
                  </h2>

                  <p className="text-sm text-zinc-400">
                    Update your card information
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 space-y-6"
              >
                {/* Cardholder */}
                <div>
                  <label className="mb-3 block text-sm text-zinc-400">
                    Cardholder Name
                  </label>

                  <input
                    {...register("cardholderName", {
                      required: "Cardholder name is required",
                    })}
                    placeholder="Zeed"
                    className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-5 outline-none transition focus:border-violet-500"
                  />

                  {errors.cardholderName && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.cardholderName.message}
                    </p>
                  )}
                </div>

                {/* Card Number */}
                <div>
                  <label className="mb-3 block text-sm text-zinc-400">
                    Card Number
                  </label>

                  <input
                    {...register("cardNumber", {
                      required: "Card number is required",
                      minLength: {
                        value: 16,
                        message:
                          "Card number must be at least 16 digits",
                      },
                    })}
                    placeholder="4242 4242 4242 4242"
                    className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-5 outline-none transition focus:border-violet-500"
                  />

                  {errors.cardNumber && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.cardNumber.message}
                    </p>
                  )}
                </div>

                {/* Expiry + CVC */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-3 block text-sm text-zinc-400">
                      Expiry Date
                    </label>

                    <input
                      {...register("expiry", {
                        required: "Expiry date is required",
                      })}
                      placeholder="12/28"
                      className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-5 outline-none transition focus:border-violet-500"
                    />

                    {errors.expiry && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.expiry.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-3 block text-sm text-zinc-400">
                      CVC
                    </label>

                    <input
                      {...register("cvc", {
                        required: "CVC is required",
                        minLength: {
                          value: 3,
                          message:
                            "CVC must be at least 3 digits",
                        },
                      })}
                      placeholder="123"
                      className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-5 outline-none transition focus:border-violet-500"
                    />

                    {errors.cvc && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.cvc.message}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="rounded-2xl bg-violet-600 px-6 py-4 font-semibold transition hover:bg-violet-500"
                >
                  Save Payment Method
                </button>
              </form>
            </section>

            {/* Billing History */}
            <section className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
              <div>
                <h2 className="text-2xl font-bold">
                  Billing History
                </h2>

                <p className="mt-2 text-zinc-400">
                  Download your previous invoices.
                </p>
              </div>

              <div className="mt-8 space-y-4">
                {invoices.map((invoice) => (
                  <InvoiceCard
                    key={invoice.id}
                    {...invoice}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6">
            {/* AI Usage */}
            <section className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
              <div className="flex items-center gap-3">
                <Zap className="h-6 w-6 text-violet-400" />

                <div>
                  <h2 className="text-xl font-bold">
                    AI Usage
                  </h2>

                  <p className="text-sm text-zinc-400">
                    Monthly AI token usage
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">
                    Used Tokens
                  </span>

                  <span>72%</span>
                </div>

                <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[72%] rounded-full bg-violet-500" />
                </div>

                <p className="mt-4 text-sm text-zinc-400">
                  72,000 / 100,000 tokens used
                </p>
              </div>
            </section>

            {/* Next Payment */}
            <section className="rounded-[32px] border border-violet-500/20 bg-violet-500/10 p-6 backdrop-blur-2xl">
              <h2 className="text-xl font-bold">
                Next Payment
              </h2>

              <div className="mt-6">
                <div className="text-5xl font-black">
                  $24
                </div>

                <p className="mt-3 text-zinc-300">
                  Charged on June 12, 2026
                </p>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

function PlanFeature({
  label,
}: {
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="rounded-full bg-violet-500/10 p-2">
        <Check className="h-4 w-4 text-violet-400" />
      </div>

      <span>{label}</span>
    </div>
  );
}

function InvoiceCard({
  id,
  date,
  amount,
  status,
}: {
  id: string;
  date: string;
  amount: string;
  status: string;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h3 className="font-semibold">{id}</h3>

        <p className="mt-1 text-sm text-zinc-400">
          {date}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-400">
          {status}
        </div>

        <div className="font-semibold">
          {amount}
        </div>

        <button className="rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10">
          <Download className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}