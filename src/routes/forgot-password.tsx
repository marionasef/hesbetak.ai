import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import AuthLayout from "@/components/AuthLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/forgot-password")({ component: ForgotPage });

function ForgotPage() {
  const { t } = useI18n();
  const nav = useNavigate();
  return (
    <AuthLayout title={t("forgot")} subtitle={t("forgotSubtitle")}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          nav({ to: "/verify-otp" });
        }}
        className="space-y-4"
      >
        <div className="space-y-1.5">
          <Label htmlFor="email">{t("email")}</Label>
          <Input id="email" type="email" required />
        </div>
        <Button className="w-full bg-gradient-primary h-11">{t("sendCode")}</Button>
      </form>
      <p className="mt-5 text-sm text-center text-on-surface-variant">
        {t("rememberIt")}{" "}
        <Link to="/login" className="text-primary font-medium hover:underline">{t("signIn")}</Link>
      </p>
    </AuthLayout>
  );
}
