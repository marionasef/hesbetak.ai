import { createFileRoute } from "@tanstack/react-router";
import { Header } from "./dashboard.transactions";
import { Button } from "@/components/ui/button";
import { ChevronRight, Plus, Folder, FileText } from "lucide-react";
import { useState } from "react";

import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/dashboard/accounts")({ component: Page });

type Node = { id: string; name: string; code: string; type: string; children?: Node[] };

const TREE: Node[] = [
  {
    id: "1", code: "1000", name: "Assets", type: "Asset",
    children: [
      { id: "11", code: "1100", name: "Cash", type: "Asset" },
      { id: "12", code: "1200", name: "Bank — Main account", type: "Asset" },
      { id: "13", code: "1300", name: "Accounts Receivable", type: "Asset" },
    ],
  },
  {
    id: "2", code: "2000", name: "Liabilities", type: "Liability",
    children: [
      { id: "21", code: "2100", name: "Accounts Payable", type: "Liability" },
      { id: "22", code: "2200", name: "Loans", type: "Liability" },
    ],
  },
  {
    id: "3", code: "3000", name: "Equity", type: "Equity",
    children: [{ id: "31", code: "3100", name: "Owner's capital", type: "Equity" }],
  },
  {
    id: "4", code: "4000", name: "Revenue", type: "Income",
    children: [
      { id: "41", code: "4100", name: "Product sales", type: "Income" },
      { id: "42", code: "4200", name: "Services", type: "Income" },
    ],
  },
  {
    id: "5", code: "5000", name: "Expenses", type: "Expense",
    children: [
      { id: "51", code: "5100", name: "Salaries", type: "Expense" },
      { id: "52", code: "5200", name: "Rent", type: "Expense" },
      { id: "53", code: "5300", name: "Software", type: "Expense" },
    ],
  },
];

function Page() {
  const { t } = useI18n();
  return (
    <div className="space-y-5">
      <Header
        title={t("coaTitle")}
        desc={t("coaDesc")}
        action={<Button className="bg-gradient-primary gap-1.5"><Plus className="h-4 w-4" /> {t("addAccount")}</Button>}
      />
      <div className="bg-card border border-border-default rounded-2xl p-4 shadow-soft">
        <div className="space-y-1">
          {TREE.map((n) => <TreeRow key={n.id} node={n} depth={0} />)}
        </div>
      </div>
    </div>
  );
}

function TreeRow({ node, depth }: { node: Node; depth: number }) {
  const [open, setOpen] = useState(true);
  const hasChildren = !!node.children?.length;
  return (
    <>
      <div
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-surface-subtle cursor-pointer"
        style={{ paddingInlineStart: depth * 24 + 8 }}
        onClick={() => hasChildren && setOpen(!open)}
      >
        {hasChildren ? (
          <ChevronRight className={`h-4 w-4 text-on-surface-variant transition-transform ${open ? "rotate-90" : ""} rtl:rotate-180 rtl:${open ? "-rotate-90" : ""}`} />
        ) : <span className="w-4" />}
        {hasChildren ? <Folder className="h-4 w-4 text-primary" /> : <FileText className="h-4 w-4 text-on-surface-variant" />}
        <span className="text-xs text-on-surface-variant font-mono w-12">{node.code}</span>
        <span className={`text-sm ${hasChildren ? "font-semibold" : ""}`}>{node.name}</span>
        <span className="ms-auto text-xs text-on-surface-variant">{node.type}</span>
      </div>
      {open && node.children?.map((c) => <TreeRow key={c.id} node={c} depth={depth + 1} />)}
    </>
  );
}
