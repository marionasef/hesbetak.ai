import { createFileRoute } from "@tanstack/react-router";
import { Header } from "./dashboard.transactions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight, Plus, Folder, FileText, Pencil } from "lucide-react";
import { useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";

import { useI18n } from "@/lib/i18n";
import { useCOA, COANode } from "@/lib/useCOA";

export const Route = createFileRoute("/dashboard/accounts")({ component: Page });

function Page() {
  const { t } = useI18n();
  const { coa, addAccount, editAccount } = useCOA();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingNode, setEditingNode] = useState<COANode | null>(null);
  
  const [accName, setAccName] = useState("");
  const [accCode, setAccCode] = useState("");
  const [accParent, setAccParent] = useState("5"); // Default expenses

  const openAdd = () => {
    setEditingNode(null);
    setAccName("");
    setAccCode("");
    setAccParent("5");
    setDialogOpen(true);
  };

  const openEdit = (node: COANode) => {
    setEditingNode(node);
    setAccName(node.name);
    setAccCode(node.code);
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (editingNode) {
      editAccount(editingNode.id, { name: accName, code: accCode });
    } else {
      const parent = coa.find((n) => n.id === accParent);
      const parentType = parent ? parent.type : "Asset";
      addAccount(accParent, { name: accName, code: accCode, type: parentType });
    }
    setDialogOpen(false);
  };

  return (
    <div className="space-y-5">
      <Header
        title={t("coaTitle")}
        desc={t("coaDesc")}
        action={<Button onClick={openAdd} className="bg-gradient-primary gap-1.5"><Plus className="h-4 w-4" /> {t("addAccount")}</Button>}
      />
      <div className="bg-card border border-border-default rounded-2xl p-4 shadow-soft">
        <div className="space-y-1">
          {coa.map((n) => <TreeRow key={n.id} node={n} depth={0} onEdit={openEdit} />)}
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingNode ? t("editAccount") : t("addAccount")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {!editingNode && (
              <div className="space-y-1.5">
                <Label>Category (Level 1)</Label>
                <select 
                  value={accParent} 
                  onChange={(e) => setAccParent(e.target.value)}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                >
                  {coa.map((n) => (
                    <option key={n.id} value={n.id}>{n.code} - {n.name}</option>
                  ))}
                </select>
              </div>
            )}
            <div className="space-y-1.5">
              <Label>{t("accountCode")}</Label>
              <Input value={accCode} onChange={(e) => setAccCode(e.target.value)} placeholder="e.g. 5800" />
            </div>
            <div className="space-y-1.5">
              <Label>{t("accountName")}</Label>
              <Input value={accName} onChange={(e) => setAccName(e.target.value)} placeholder="e.g. Marketing" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>{t("cancel")}</Button>
            <Button className="bg-gradient-primary" onClick={handleSave}>{t("saveChanges")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function TreeRow({ node, depth, onEdit }: { node: COANode; depth: number; onEdit: (node: COANode) => void }) {
  const [open, setOpen] = useState(true);
  const hasChildren = !!node.children?.length;
  
  return (
    <>
      <div
        className="group flex items-center gap-2 p-2 rounded-lg hover:bg-surface-subtle transition"
        style={{ paddingInlineStart: depth * 24 + 8 }}
      >
        <div 
          className="flex items-center gap-2 flex-1 cursor-pointer"
          onClick={() => hasChildren && setOpen(!open)}
        >
          {hasChildren ? (
            <ChevronRight className={`h-4 w-4 text-on-surface-variant transition-transform ${open ? "rotate-90" : ""} rtl:rotate-180 rtl:${open ? "-rotate-90" : ""}`} />
          ) : <span className="w-4" />}
          {hasChildren ? <Folder className="h-4 w-4 text-primary" /> : <FileText className="h-4 w-4 text-on-surface-variant" />}
          <span className="text-xs text-on-surface-variant font-mono w-12">{node.code}</span>
          <span className={`text-sm ${hasChildren ? "font-semibold" : ""}`}>{node.name}</span>
          <span className="ms-auto text-xs text-on-surface-variant me-4">{node.type}</span>
        </div>
        
        {/* Edit Action - only show on hover for leaf nodes to keep it clean */}
        <button 
          onClick={(e) => { e.stopPropagation(); onEdit(node); }}
          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-surface-container text-on-surface-variant transition"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
      </div>
      {open && node.children?.map((c) => <TreeRow key={c.id} node={c} depth={depth + 1} onEdit={onEdit} />)}
    </>
  );
}
