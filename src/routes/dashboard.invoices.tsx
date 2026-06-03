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

export const Route = createFileRoute("/dashboard/invoices")({ component: Page });

const INV = [
  { n: "INV-1043", client: "Acme Co", d: "2026-05-26", due: "2026-06-25", amt: 1800, status: "pending" },
  { n: "INV-1042", client: "Globex", d: "2026-05-22", due: "2026-06-21", amt: 4200, status: "paid" },
  { n: "INV-1041", client: "Stark Ltd", d: "2026-05-18", due: "2026-05-25", amt: 950, status: "overdue" },
  { n: "INV-1040", client: "Wayne Industries", d: "2026-05-14", due: "2026-06-13", amt: 7200, status: "paid" },
  { n: "INV-1039", client: "Initech", d: "2026-05-10", due: "2026-06-09", amt: 320, status: "draft" },
];

function Page() {
  const { t } = useI18n();
  return (
    <div className="space-y-5">
      <Header
        title={t("invTitle")}
        desc={t("invDesc")}
        action={
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary gap-1.5"><Plus className="h-4 w-4" /> {t("newInvoice")}</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader><DialogTitle>{t("createInvoice")}</DialogTitle></DialogHeader>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5"><Label>{t("client")}</Label><Input placeholder="Client name" /></div>
                <div className="space-y-1.5"><Label>{t("email")}</Label><Input type="email" placeholder="client@email.com" /></div>
                <div className="space-y-1.5"><Label>{t("issueDate")}</Label><Input type="date" /></div>
                <div className="space-y-1.5"><Label>{t("dueDate")}</Label><Input type="date" /></div>
              </div>
              <div className="mt-4 space-y-1.5">
                <Label>{t("itemDescription")}</Label>
                <div className="flex gap-2">
                  <Input placeholder="Service" className="flex-1" />
                  <Input type="number" placeholder="Qty" className="w-24" />
                  <Input type="number" placeholder="Price" className="w-32" />
                </div>
              </div>
              <DialogFooter className="mt-6">
                <Button variant="outline">{t("saveDraft")}</Button>
                <Button className="bg-gradient-primary">{t("sendInvoice")}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid sm:grid-cols-4 gap-4">
        {[
          { l: t("outstanding"), v: "$12,400" },
          { l: t("paid30d"), v: "$24,500" },
          { l: t("overdue"), v: "$3,200", alert: true },
          { l: t("drafts"), v: "2" },
        ].map((s) => (
          <div key={s.l} className="bg-card border border-border-default rounded-2xl p-5">
            <p className="text-sm text-on-surface-variant">{s.l}</p>
            <p className={`text-2xl font-bold mt-2 ${s.alert ? "text-status-error" : ""}`}>{s.v}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border-default rounded-2xl overflow-hidden shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-surface-container text-on-surface-variant text-xs uppercase">
            <tr>
              <th className="text-start p-3 font-medium">{t("number")}</th>
              <th className="text-start p-3 font-medium">{t("client")}</th>
              <th className="text-start p-3 font-medium">{t("issued")}</th>
              <th className="text-start p-3 font-medium">{t("dueDate")}</th>
              <th className="text-start p-3 font-medium">{t("status")}</th>
              <th className="text-end p-3 font-medium">{t("amount")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default">
            {INV.map((i) => (
              <tr key={i.n} className="hover:bg-surface-subtle cursor-pointer">
                <td className="p-3 font-medium text-primary">{i.n}</td>
                <td className="p-3">{i.client}</td>
                <td className="p-3 text-on-surface-variant">{i.d}</td>
                <td className="p-3 text-on-surface-variant">{i.due}</td>
                <td className="p-3"><StatusBadge status={i.status} /></td>
                <td className="p-3 text-end font-semibold">${i.amt.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
