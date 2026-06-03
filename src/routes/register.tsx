import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import AuthLayout, { SocialButtons, OrDivider } from "@/components/AuthLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/register")({ component: RegisterPage });

function RegisterPage() {
  const { t } = useI18n();
  const nav = useNavigate();
  return (
    <AuthLayout title={t("signUp")} subtitle={t("signUpSubtitle")}>
      <SocialButtons />
      <OrDivider />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          nav({ to: "/verify-otp" });
        }}
        className="space-y-4"
      >
        <div className="space-y-1.5">
          <Label htmlFor="name">{t("fullName")}</Label>
          <Input id="name" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">{t("email")}</Label>
          <Input id="email" type="email" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">{t("password")}</Label>
          <Input id="password" type="password" required />
        </div>
        <Button className="w-full bg-gradient-primary h-11">{t("createAccount")}</Button>
      </form>
      <p className="mt-5 text-sm text-center text-on-surface-variant">
        {t("alreadyHaveAccount")}{" "}
        <Link to="/login" className="text-primary font-medium hover:underline">
          {t("signIn")}
        </Link>
      </p>
    </AuthLayout>
  );
}
