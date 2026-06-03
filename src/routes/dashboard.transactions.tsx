import { createFileRoute } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download } from "lucide-react";

import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/dashboard/transactions")({ component: Page });

const TXNS = [
  { d: "2026-05-28", desc: "Stripe payout", cat: "Revenue", amt: 4250, status: "completed" },
  { d: "2026-05-27", desc: "AWS subscription", cat: "Software", amt: -184, status: "completed" },
  { d: "2026-05-26", desc: "Acme Co — Invoice #1043", cat: "Revenue", amt: 1800, status: "pending" },
  { d: "2026-05-25", desc: "Office rent", cat: "Rent", amt: -1800, status: "completed" },
  { d: "2026-05-24", desc: "Google Ads", cat: "Marketing", amt: -420, status: "completed" },
  { d: "2026-05-22", desc: "Refund — Client X", cat: "Refund", amt: -250, status: "failed" },
  { d: "2026-05-21", desc: "Shopify order #2298", cat: "Revenue", amt: 380, status: "completed" },
  { d: "2026-05-20", desc: "Salary — Ahmad", cat: "Salaries", amt: -3200, status: "completed" },
];

function Page() {
  const { t } = useI18n();
  return (
    <div className="space-y-5">
      <Header title={t("txTitle")} desc={t("txDesc")} />
      <div className="flex flex-wrap gap-2 items-center">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="h-4 w-4 absolute start-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <Input placeholder={t("searchTransactions")} className="ps-9 bg-card" />
        </div>
        <Button variant="outline" size="sm" className="gap-1.5"><Filter className="h-4 w-4" /> {t("filter")}</Button>
        <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-4 w-4" /> {t("export")}</Button>
      </div>

      <div className="bg-card border border-border-default rounded-2xl overflow-hidden shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-surface-container text-on-surface-variant text-xs uppercase">
            <tr>
              <th className="text-start p-3 font-medium">{t("date")}</th>
              <th className="text-start p-3 font-medium">{t("description")}</th>
              <th className="text-start p-3 font-medium">{t("category")}</th>
              <th className="text-start p-3 font-medium">{t("status")}</th>
              <th className="text-end p-3 font-medium">{t("amount")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default">
            {TXNS.map((t, i) => (
              <tr key={i} className="hover:bg-surface-subtle">
                <td className="p-3 text-on-surface-variant">{t.d}</td>
                <td className="p-3 font-medium">{t.desc}</td>
                <td className="p-3 text-on-surface-variant">{t.cat}</td>
                <td className="p-3"><StatusBadge status={t.status} /></td>
                <td className={`p-3 text-end font-semibold ${t.amt > 0 ? "text-status-success" : "text-on-surface"}`}>
                  {t.amt > 0 ? "+" : ""}${Math.abs(t.amt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const { t } = useI18n();
  const map: Record<string, string> = {
    completed: "bg-status-success/10 text-status-success",
    pending: "bg-status-warning/10 text-status-warning",
    failed: "bg-status-error/10 text-status-error",
    paid: "bg-status-success/10 text-status-success",
    overdue: "bg-status-error/10 text-status-error",
    draft: "bg-surface-container text-on-surface-variant",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${map[status] ?? "bg-surface-container"}`}>
      {t(status as any) || status}
    </span>
  );
}

export function Header({ title, desc, action }: { title: string; desc?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-3 flex-wrap">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {desc && <p className="text-sm text-on-surface-variant">{desc}</p>}
      </div>
      {action}
    </div>
  );
}
