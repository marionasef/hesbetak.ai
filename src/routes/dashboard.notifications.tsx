import { createFileRoute } from "@tanstack/react-router";
import { Header } from "./dashboard.transactions";
import { AlertTriangle, TrendingDown, CheckCircle2, Bell } from "lucide-react";

import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/dashboard/notifications")({ component: Page });

const NOTIFS = [
  { icon: TrendingDown, tone: "error", title: "Cash runway warning", desc: "At current spend rate, your cash will last 22 days.", time: "2h ago" },
  { icon: AlertTriangle, tone: "warning", title: "Invoice INV-1041 overdue", desc: "Stark Ltd — $950 — 5 days overdue.", time: "5h ago" },
  { icon: AlertTriangle, tone: "warning", title: "Unusual expense detected", desc: "Marketing spend up 240% vs last week.", time: "Yesterday" },
  { icon: CheckCircle2, tone: "success", title: "Payment received", desc: "Globex paid INV-1042 — $4,200", time: "Yesterday" },
  { icon: Bell, tone: "info", title: "Tax filing reminder", desc: "Q3 VAT return due in 12 days.", time: "2d ago" },
];

function Page() {
  const { t } = useI18n();
  return (
    <div className="space-y-5">
      <Header title={t("notifTitle")} desc={t("notifDesc")} />
      <div className="bg-card border border-border-default rounded-2xl divide-y divide-border-default shadow-soft">
        {NOTIFS.map((n, i) => (
          <div key={i} className="flex items-start gap-4 p-4 hover:bg-surface-subtle">
            <div className={`h-10 w-10 rounded-xl grid place-items-center shrink-0 ${
              n.tone === "error" ? "bg-status-error/10 text-status-error" :
              n.tone === "warning" ? "bg-status-warning/10 text-status-warning" :
              n.tone === "success" ? "bg-status-success/10 text-status-success" :
              "bg-surface-container text-primary"
            }`}>
              <n.icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">{n.title}</p>
              <p className="text-sm text-on-surface-variant mt-0.5">{n.desc}</p>
            </div>
            <span className="text-xs text-on-surface-variant whitespace-nowrap">{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
