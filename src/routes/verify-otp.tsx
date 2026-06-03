import { createFileRoute, useNavigate } from "@tanstack/react-router";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useState } from "react";

import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/verify-otp")({ component: VerifyOTP });

function VerifyOTP() {
  const { t } = useI18n();
  const nav = useNavigate();
  const [code, setCode] = useState("");
  return (
    <AuthLayout title={t("verifyEmailTitle")} subtitle={t("verifyEmailDesc")}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          nav({ to: "/onboarding" });
        }}
        className="space-y-6"
      >
        <div className="flex justify-center">
          <InputOTP maxLength={6} value={code} onChange={setCode}>
            <InputOTPGroup>
              {Array.from({ length: 6 }).map((_, i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button className="w-full bg-gradient-primary h-11" disabled={code.length < 6}>
          {t("verifyAndContinue")}
        </Button>
        <p className="text-center text-sm text-on-surface-variant">
          {t("didntGetIt")} <button type="button" className="text-primary hover:underline">{t("resend")}</button>
        </p>
      </form>
    </AuthLayout>
  );
}
