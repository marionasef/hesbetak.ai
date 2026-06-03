import { createFileRoute } from "@tanstack/react-router";
import { Header, StatusBadge } from "./dashboard.transactions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";

import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/dashboard/expenses")({ component: Page });

const CATS = ["Salaries", "Rent", "Software", "Marketing", "Utilities", "Travel", "Other"];
const EXP = [
  { d: "2026-05-28", v: "AWS", cat: "Software", amt: 184, status: "completed" },
  { d: "2026-05-27", v: "WeWork", cat: "Rent", amt: 1800, status: "completed" },
  { d: "2026-05-26", v: "Google Ads", cat: "Marketing", amt: 420, status: "pending" },
  { d: "2026-05-24", v: "Uber for Business", cat: "Travel", amt: 88, status: "completed" },
  { d: "2026-05-22", v: "Zoom Pro", cat: "Software", amt: 16, status: "completed" },
];

function Page() {
  const { t } = useI18n();
  return (
    <div className="space-y-5">
      <Header
        title={t("expTitle")}
        desc={t("expDesc")}
        action={
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary gap-1.5"><Plus className="h-4 w-4" /> {t("addExpense")}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>{t("newExpense")}</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div className="space-y-1.5"><Label>{t("vendor")}</Label><Input placeholder="e.g. AWS" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5"><Label>{t("amount")}</Label><Input type="number" placeholder="0.00" /></div>
                  <div className="space-y-1.5">
                    <Label>{t("category")}</Label>
                    <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                      {CATS.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5"><Label>{t("date")}</Label><Input type="date" /></div>
                <div className="space-y-1.5"><Label>{t("notes")}</Label><Input placeholder={t("optional")} /></div>
              </div>
              <DialogFooter><Button className="bg-gradient-primary">{t("saveExpense")}</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { l: t("totalThisMonth"), v: "$8,240" },
          { l: t("pendingApproval"), v: "$420" },
          { l: t("avgPerWeek"), v: "$1,920" },
        ].map((s) => (
          <div key={s.l} className="bg-card border border-border-default rounded-2xl p-5">
            <p className="text-sm text-on-surface-variant">{s.l}</p>
            <p className="text-2xl font-bold mt-2">{s.v}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        <CategoryChip name="All" active />
        {CATS.map((c) => <CategoryChip key={c} name={c} />)}
      </div>

      <div className="bg-card border border-border-default rounded-2xl overflow-hidden shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-surface-container text-on-surface-variant text-xs uppercase">
            <tr>
              <th className="text-start p-3 font-medium">{t("date")}</th>
              <th className="text-start p-3 font-medium">{t("vendor")}</th>
              <th className="text-start p-3 font-medium">{t("category")}</th>
              <th className="text-start p-3 font-medium">{t("status")}</th>
              <th className="text-end p-3 font-medium">{t("amount")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default">
            {EXP.map((e, i) => (
              <tr key={i} className="hover:bg-surface-subtle">
                <td className="p-3 text-on-surface-variant">{e.d}</td>
                <td className="p-3 font-medium">{e.v}</td>
                <td className="p-3">{e.cat}</td>
                <td className="p-3"><StatusBadge status={e.status} /></td>
                <td className="p-3 text-end font-semibold">${e.amt.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CategoryChip({ name, active }: { name: string; active?: boolean }) {
  return (
    <button
      className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
        active ? "bg-primary text-primary-foreground border-primary" : "border-border-default text-on-surface-variant hover:border-primary/40"
      }`}
    >
      {name}
    </button>
  );
}
