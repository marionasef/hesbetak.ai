import { createFileRoute } from "@tanstack/react-router";
import { Header } from "./dashboard.transactions";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ComposedChart, Legend,
} from "recharts";

import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/dashboard/forecasting")({ component: Page });

const data = Array.from({ length: 12 }).map((_, i) => {
  const m = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i];
  const isForecast = i >= 7;
  return {
    m,
    actual: isForecast ? null : 12000 + i * 1800 + Math.random() * 1500,
    forecast: isForecast ? 12000 + i * 1900 + Math.random() * 1800 : null,
    expense: 7000 + i * 800 + Math.random() * 800,
  };
});

function Page() {
  const { t } = useI18n();
  return (
    <div className="space-y-5">
      <Header title={t("fcTitle")} desc={t("fcDesc")} />

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { l: t("predictedRevenue"), v: "$52,400", delta: "+8.6%" },
          { l: t("predictedExpenses"), v: "$21,100", delta: "–7.6%" },
          { l: t("predictedCash"), v: "$180,000", delta: "+35.8%" },
        ].map((s) => (
          <div key={s.l} className="bg-card border border-border-default rounded-2xl p-5">
            <p className="text-sm text-on-surface-variant">{s.l}</p>
            <p className="text-2xl font-bold mt-2">{s.v}</p>
            <p className="text-xs text-status-success mt-1">{s.delta} forecast</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border-default rounded-2xl p-5 shadow-soft">
        <div className="mb-4">
          <h3 className="font-semibold">{t("forecastActualVsForecast")}</h3>
          <p className="text-xs text-on-surface-variant">{t("forecastDashedLine")}</p>
        </div>
        <div className="h-80">
          <ResponsiveContainer>
            <ComposedChart data={data}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="m" stroke="var(--on-surface-variant)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--on-surface-variant)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Legend />
              <Line type="monotone" dataKey="actual" stroke="var(--primary)" strokeWidth={2.5} dot={{ r: 3 }} name="Actual revenue" />
              <Line type="monotone" dataKey="forecast" stroke="var(--accent)" strokeWidth={2.5} strokeDasharray="6 4" dot={{ r: 3 }} name="Forecast" />
              <Line type="monotone" dataKey="expense" stroke="var(--status-error)" strokeWidth={2} dot={false} name="Expenses" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
