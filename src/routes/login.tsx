import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import AuthLayout, { SocialButtons, OrDivider } from "@/components/AuthLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const { t } = useI18n();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (email.toLowerCase().includes("admin")) {
        nav({ to: "/admin" });
      } else {
        nav({ to: "/dashboard" });
      }
    }, 600);
  };

  return (
    <AuthLayout title={t("signIn")} subtitle={t("welcomeBackSubtitle")}>
      <SocialButtons />
      <OrDivider />
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">{t("email")}</Label>
          <Input 
            id="email" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@business.com" 
            required 
          />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">{t("password")}</Label>
            <Link to="/forgot-password" className="text-xs text-primary hover:underline">
              {t("forgot")}
            </Link>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" disabled={loading} className="w-full bg-gradient-primary h-11">
          {loading ? "…" : t("signIn")}
        </Button>
      </form>
      <p className="mt-5 text-sm text-center text-on-surface-variant">
        {t("alreadyHaveAccount")}{" "}
        <Link to="/register" className="text-primary font-medium hover:underline">
          {t("signUp")}
        </Link>
      </p>
    </AuthLayout>
  );
}
