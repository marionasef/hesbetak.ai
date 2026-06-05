import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";
import { Trash2, Users, Building, ShieldAlert, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/")({ component: AdminDashboard });

type User = {
  name: string;
  email: string;
  role: string;
};

type Organization = {
  id: string;
  name: string;
  plan: "Free" | "Basic" | "Pro" | "Enterprise";
  users: User[];
  createdAt: string;
};

const INITIAL_ORGS: Organization[] = [
  {
    id: "org_1",
    name: "Acme Corporation",
    plan: "Pro",
    createdAt: "2025-11-10",
    users: [
      { name: "John Doe", email: "john@acme.corp", role: "Owner" },
      { name: "Jane Smith", email: "jane@acme.corp", role: "Admin" },
      { name: "Bob Wilson", email: "bob@acme.corp", role: "User" },
    ],
  },
  {
    id: "org_2",
    name: "Globex Industries",
    plan: "Enterprise",
    createdAt: "2025-12-01",
    users: [
      { name: "Hank Scorpio", email: "hank@globex.com", role: "Owner" },
      { name: "Homer S.", email: "homer@globex.com", role: "User" },
    ],
  },
  {
    id: "org_3",
    name: "Initech",
    plan: "Basic",
    createdAt: "2026-01-15",
    users: [
      { name: "Bill Lumbergh", email: "bill@initech.net", role: "Owner" },
      { name: "Peter G.", email: "peter@initech.net", role: "User" },
      { name: "Milton W.", email: "milton@initech.net", role: "User" },
    ],
  },
  {
    id: "org_4",
    name: "Stark Industries",
    plan: "Free",
    createdAt: "2026-03-22",
    users: [
      { name: "Tony Stark", email: "tony@stark.com", role: "Owner" },
    ],
  },
];

function AdminDashboard() {
  const { t } = useI18n();
  const [organizations, setOrganizations] = useState<Organization[]>(INITIAL_ORGS);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (deleteId) {
      setOrganizations((prev) => prev.filter((o) => o.id !== deleteId));
      toast.success(t("orgDeleted"));
      setDeleteId(null);
    }
  };

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "Enterprise": return "bg-primary/20 text-primary border-primary/30";
      case "Pro": return "bg-status-success/20 text-status-success border-status-success/30";
      case "Basic": return "bg-status-warning/20 text-status-warning border-status-warning/30";
      default: return "bg-surface-container text-on-surface-variant border-border-default";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Building className="h-6 w-6 text-primary" /> {t("organizations")}
        </h1>
        <p className="text-on-surface-variant mt-1">{t("manageOrgs")}</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {organizations.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-2xl border border-border-default">
            <ShieldAlert className="h-10 w-10 mx-auto text-on-surface-variant opacity-50 mb-3" />
            <p className="text-on-surface-variant">No organizations found.</p>
          </div>
        ) : (
          organizations.map((org) => (
            <div key={org.id} className="bg-card border border-border-default rounded-2xl p-5 shadow-soft">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <h2 className="text-lg font-semibold">{org.name}</h2>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${getPlanBadge(org.plan)}`}>
                      {org.plan} {t("plan")}
                    </span>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-1.5 text-sm font-medium text-on-surface-variant mb-2">
                      <Users className="h-4 w-4" /> {t("users")} ({org.users.length})
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {org.users.map((u, i) => (
                        <div key={i} className="bg-surface-subtle border border-border-default rounded-lg p-2.5 flex flex-col">
                          <span className="text-sm font-medium flex items-center justify-between">
                            {u.name}
                            {u.role === "Owner" && <BadgeCheck className="h-3.5 w-3.5 text-primary" />}
                          </span>
                          <span className="text-xs text-on-surface-variant truncate">{u.email}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Button 
                    variant="ghost" 
                    className="text-status-error hover:text-status-error hover:bg-status-error/10"
                    onClick={() => setDeleteId(org.id)}
                  >
                    <Trash2 className="h-4 w-4 me-1.5" /> {t("deleteOrg")}
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-status-error">
              <ShieldAlert className="h-5 w-5" /> {t("confirmDeleteOrg")}
            </DialogTitle>
            <DialogDescription>
              {t("deleteOrgWarning")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setDeleteId(null)}>{t("cancel")}</Button>
            <Button className="bg-status-error hover:bg-status-error/90 text-white" onClick={handleDelete}>
              {t("deleteConfirm")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
