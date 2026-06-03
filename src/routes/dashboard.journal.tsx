import { createFileRoute } from "@tanstack/react-router";
import { Header } from "./dashboard.transactions";

import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/dashboard/journal")({ component: Page });

const ENTRIES = [
  {
    d: "2026-05-28", ref: "JE-0042", memo: "Stripe payout received",
    lines: [
      { acc: "1200 Bank — Main", dr: 4250, cr: 0 },
      { acc: "4100 Product sales", dr: 0, cr: 4250 },
    ],
  },
  {
    d: "2026-05-27", ref: "JE-0041", memo: "AWS subscription",
    lines: [
      { acc: "5300 Software", dr: 184, cr: 0 },
      { acc: "1200 Bank — Main", dr: 0, cr: 184 },
    ],
  },
  {
    d: "2026-05-25", ref: "JE-0040", memo: "Office rent",
    lines: [
      { acc: "5200 Rent", dr: 1800, cr: 0 },
      { acc: "1200 Bank — Main", dr: 0, cr: 1800 },
    ],
  },
];

function Page() {
  const { t } = useI18n();
  return (
    <div className="space-y-5">
      <Header title={t("jeTitle")} desc={t("jeDesc")} />
      <div className="space-y-4">
        {ENTRIES.map((e) => {
          const total = e.lines.reduce((s, l) => s + l.dr, 0);
          return (
            <div key={e.ref} className="bg-card border border-border-default rounded-2xl overflow-hidden shadow-soft">
              <div className="flex items-center justify-between p-4 border-b border-border-default">
                <div>
                  <p className="font-semibold">{e.memo}</p>
                  <p className="text-xs text-on-surface-variant">{e.d} · {e.ref}</p>
                </div>
                <span className="text-sm font-mono font-semibold">${total.toLocaleString()}</span>
              </div>
              <table className="w-full text-sm">
                <thead className="bg-surface-container text-xs uppercase text-on-surface-variant">
                  <tr>
                    <th className="text-start p-2 font-medium">{t("account")}</th>
                    <th className="text-end p-2 font-medium">{t("debit")}</th>
                    <th className="text-end p-2 font-medium">{t("credit")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-default">
                  {e.lines.map((l, i) => (
                    <tr key={i}>
                      <td className="p-3 font-mono text-xs">{l.acc}</td>
                      <td className="p-3 text-end font-semibold text-status-success">
                        {l.dr ? `$${l.dr.toLocaleString()}` : "—"}
                      </td>
                      <td className="p-3 text-end font-semibold text-primary">
                        {l.cr ? `$${l.cr.toLocaleString()}` : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
}
