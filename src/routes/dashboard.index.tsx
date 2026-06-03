import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import {
  TrendingUp, TrendingDown, DollarSign, Wallet, AlertTriangle, Sparkles, Lightbulb,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend,
} from "recharts";

export const Route = createFileRoute("/dashboard/")({ component: DashboardHome });

const cashflow = [
  { m: "Jan", in: 12000, out: 8000 },
  { m: "Feb", in: 14000, out: 9500 },
  { m: "Mar", in: 11000, out: 7800 },
  { m: "Apr", in: 18000, out: 10500 },
  { m: "May", in: 21000, out: 11200 },
  { m: "Jun", in: 25000, out: 12800 },
  { m: "Jul", in: 24000, out: 13500 },
];
const categories = [
  { c: "Salaries", v: 4200 }, { c: "Rent", v: 1800 }, { c: "Marketing", v: 1200 },
  { c: "Software", v: 800 }, { c: "Utilities", v: 450 },
];

function DashboardHome() {
  const { t } = useI18n();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t("welcomeBack")}</h1>
        <p className="text-on-surface-variant text-sm">{t("dashboardDesc")}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Kpi label={t("revenue")} value="$48,250" delta="+12.4%" up icon={DollarSign} />
        <Kpi label={t("expenses")} value="$22,840" delta="+3.2%" icon={Wallet} />
        <Kpi label={t("netProfit")} value="$25,410" delta="+18.6%" up icon={TrendingUp} />
        <Kpi label={t("cashOnHand")} value="$132,580" delta="–2.1%" down icon={Wallet} />
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card border border-border-default rounded-2xl p-5 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">{t("cashflow")}</h3>
              <p className="text-xs text-on-surface-variant">{t("last7Months")}</p>
            </div>
            <select className="text-xs rounded-md border border-border-default bg-card px-2 py-1">
              <option>{t("monthly")}</option><option>{t("weekly")}</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={cashflow}>
                <defs>
                  <linearGradient id="g-in" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g-out" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--status-error)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--status-error)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" stroke="var(--on-surface-variant)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--on-surface-variant)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="in" stroke="var(--primary)" fill="url(#g-in)" strokeWidth={2} />
                <Area type="monotone" dataKey="out" stroke="var(--status-error)" fill="url(#g-out)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-border-default rounded-2xl p-5 shadow-soft">
          <h3 className="font-semibold mb-1">{t("topExpenseCategories")}</h3>
          <p className="text-xs text-on-surface-variant mb-3">{t("thisMonth")}</p>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={categories} layout="vertical">
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="c" type="category" stroke="var(--on-surface-variant)" fontSize={12} tickLine={false} axisLine={false} width={70} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Bar dataKey="v" fill="var(--accent)" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI + Alerts */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-gradient-primary text-primary-foreground rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-2 text-sm opacity-90"><Sparkles className="h-4 w-4" /> {t("aiInsights")}</div>
          <h3 className="mt-1 text-lg font-semibold">{t("thingsToKnow")}</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              "Your software costs jumped 24% — review subscriptions.",
              "Acme Co invoice #1043 is 4 days overdue. Send reminder?",
              "Revenue trend predicts $58k next month (+20%).",
            ].map((x, i) => (
              <li key={i} className="flex gap-2 bg-white/10 rounded-lg p-3">
                <Lightbulb className="h-4 w-4 shrink-0 mt-0.5" /> {x}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card border border-border-default rounded-2xl p-6 shadow-soft">
          <div className="flex items-center gap-2 text-sm text-status-warning">
            <AlertTriangle className="h-4 w-4" /> {t("alerts")}
          </div>
          <h3 className="mt-1 text-lg font-semibold">{t("thingsAttention")}</h3>
          <ul className="mt-4 divide-y divide-border-default">
            {[
              { title: "Low cash warning", desc: "Bank balance below 30-day runway.", tone: "error" },
              { title: "Tax filing in 12 days", desc: "Q3 VAT return draft is ready.", tone: "warning" },
              { title: "2 invoices overdue", desc: "Total: $4,200", tone: "warning" },
            ].map((a, i) => (
              <li key={i} className="py-3 flex items-start gap-3">
                <span className={`mt-1.5 h-2 w-2 rounded-full ${a.tone === "error" ? "bg-status-error" : "bg-status-warning"}`} />
                <div>
                  <p className="font-medium text-sm">{a.title}</p>
                  <p className="text-xs text-on-surface-variant">{a.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Kpi({
  label, value, delta, up, down, icon: Icon,
}: {
  label: string; value: string; delta: string; up?: boolean; down?: boolean; icon: React.ElementType;
}) {
  const Trend = up ? TrendingUp : down ? TrendingDown : TrendingUp;
  const tone = up ? "text-status-success bg-status-success/10" : down ? "text-status-error bg-status-error/10" : "text-on-surface-variant bg-surface-container";
  return (
    <div className="bg-card border border-border-default rounded-2xl p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <p className="text-sm text-on-surface-variant">{label}</p>
        <div className="h-9 w-9 rounded-lg bg-surface-container text-primary grid place-items-center">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-3 text-2xl font-bold tracking-tight">{value}</p>
      <span className={`mt-2 inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${tone}`}>
        <Trend className="h-3 w-3" /> {delta}
      </span>
    </div>
  );
}
