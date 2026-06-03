import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  Building2, Briefcase, Coins, Wallet, ArrowRight, ArrowLeft,
  Upload, Video, FileText, Sparkles, Check,
} from "lucide-react";
import { BrandMark, LangToggle, ThemeToggle } from "@/components/Brand";
import { toast } from "sonner";

export const Route = createFileRoute("/onboarding")({ component: Onboarding });

const INDUSTRIES = [
  "Retail", "Restaurant", "Consulting", "E-commerce", "Manufacturing",
  "Healthcare", "Real Estate", "Tech / SaaS",
];
const CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "EGP", name: "Egyptian Pound", symbol: "ج.م" },
  { code: "SAR", name: "Saudi Riyal", symbol: "ر.س" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
];
const DEFAULT_ACCOUNTS = [
  { id: "cash", name: "Cash", type: "Asset" },
  { id: "bank", name: "Bank", type: "Asset" },
  { id: "revenue", name: "Revenue", type: "Income" },
  { id: "expense", name: "Expense", type: "Expense" },
];

function Onboarding() {
  const { dir, t } = useI18n();
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [accounts, setAccounts] = useState<string[]>(DEFAULT_ACCOUNTS.map((a) => a.id));
  const [aiMode, setAiMode] = useState(false);

  const STEPS = [t("stepCompany"), t("stepIndustry"), t("stepCurrency"), t("stepAccounts")];

  const next = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else {
      toast.success("Workspace created!");
      nav({ to: "/dashboard" });
    }
  };
  const back = () => setStep(Math.max(0, step - 1));

  return (
    <div dir={dir} className="min-h-screen bg-gradient-hero">
      <header className="flex items-center justify-between p-4 md:px-8 border-b border-border-default bg-card/70 backdrop-blur">
        <BrandMark />
        <div className="flex items-center gap-2">
          <LangToggle />
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        {/* Steps indicator */}
        <ol className="flex items-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <li key={s} className="flex-1 flex items-center gap-2">
              <div
                className={`h-8 w-8 rounded-full grid place-items-center text-xs font-semibold border-2 ${
                  i < step
                    ? "bg-status-success border-status-success text-white"
                    : i === step
                    ? "bg-gradient-primary border-transparent text-primary-foreground"
                    : "bg-card border-border-default text-on-surface-variant"
                }`}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className={`text-sm hidden sm:inline ${
                  i === step ? "font-medium text-on-surface" : "text-on-surface-variant"
                }`}
              >
                {s}
              </span>
              {i < STEPS.length - 1 && <div className="flex-1 h-px bg-border-default" />}
            </li>
          ))}
        </ol>

        <div className="bg-card border border-border-default rounded-2xl shadow-card p-8">
          {step === 0 && (
            <StepWrap icon={Building2} title={t("createCompanyTitle")} desc={t("createCompanyDesc")}>
              <div className="space-y-1.5">
                <Label htmlFor="company">{t("companyNameLabel")}</Label>
                <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme LLC" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="size">{t("teamSizeLabel")}</Label>
                <select id="size" className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                  <option>1–5</option><option>6–20</option><option>21–50</option><option>50+</option>
                </select>
              </div>
            </StepWrap>
          )}

          {step === 1 && (
            <StepWrap icon={Briefcase} title={t("selectIndustryTitle")} desc={t("selectIndustryDesc")}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {INDUSTRIES.map((i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setIndustry(i)}
                    className={`p-3 rounded-lg border text-sm transition ${
                      industry === i
                        ? "border-primary bg-primary/5 text-primary font-medium"
                        : "border-border-default hover:border-primary/40"
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </StepWrap>
          )}

          {step === 2 && (
            <StepWrap icon={Coins} title={t("chooseCurrencyTitle")} desc={t("chooseCurrencyDesc")}>
              <div className="space-y-2">
                {CURRENCIES.map((c) => (
                  <button
                    type="button"
                    key={c.code}
                    onClick={() => setCurrency(c.code)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border text-sm transition ${
                      currency === c.code
                        ? "border-primary bg-primary/5"
                        : "border-border-default hover:border-primary/40"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="h-8 w-8 rounded-md bg-surface-container grid place-items-center font-semibold text-primary">
                        {c.symbol}
                      </span>
                      <span><strong>{c.code}</strong> · {c.name}</span>
                    </span>
                    {currency === c.code && <Check className="h-4 w-4 text-primary" />}
                  </button>
                ))}
              </div>
            </StepWrap>
          )}

          {step === 3 && (
            <StepWrap icon={Wallet} title={t("setupAccountsTitle")} desc={t("setupAccountsDesc")}>
              <div className="flex gap-2 p-1 bg-surface-container rounded-lg w-fit">
                <button
                  type="button"
                  onClick={() => setAiMode(false)}
                  className={`px-3 py-1.5 text-sm rounded-md ${!aiMode ? "bg-card shadow-soft font-medium" : "text-on-surface-variant"}`}
                >
                  {t("modeManual")}
                </button>
                <button
                  type="button"
                  onClick={() => setAiMode(true)}
                  className={`px-3 py-1.5 text-sm rounded-md inline-flex items-center gap-1.5 ${aiMode ? "bg-card shadow-soft font-medium" : "text-on-surface-variant"}`}
                >
                  <Sparkles className="h-3.5 w-3.5" /> {t("modeAI")}
                </button>
              </div>

              {!aiMode ? (
                <div className="space-y-2">
                  {DEFAULT_ACCOUNTS.map((a) => {
                    const checked = accounts.includes(a.id);
                    return (
                      <label
                        key={a.id}
                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer ${
                          checked ? "border-primary bg-primary/5" : "border-border-default"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) =>
                              setAccounts((acc) =>
                                e.target.checked ? [...acc, a.id] : acc.filter((x) => x !== a.id),
                              )
                            }
                            className="h-4 w-4 accent-primary"
                          />
                          <span className="font-medium">{a.name}</span>
                        </span>
                        <span className="text-xs text-on-surface-variant">{a.type}</span>
                      </label>
                    );
                  })}
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-3">
                  <UploadCard icon={FileText} label={t("uploadPDFs")} hint={t("dropBankPDFs")} />
                  <UploadCard icon={Video} label={t("recordVideo")} hint={t("describeBusiness")} />
                </div>
              )}
            </StepWrap>
          )}

          <div className="mt-8 flex items-center justify-between">
            <Button variant="ghost" onClick={back} disabled={step === 0} className="gap-1.5">
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" /> {t("back")}
            </Button>
            <Button onClick={next} className="bg-gradient-primary gap-1.5">
              {step === STEPS.length - 1 ? t("finish") : t("continue")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

function StepWrap({
  icon: Icon, title, desc, children,
}: { icon: React.ElementType; title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-xl bg-gradient-primary text-primary-foreground grid place-items-center">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm text-on-surface-variant">{desc}</p>
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function UploadCard({ icon: Icon, label, hint }: { icon: React.ElementType; label: string; hint: string }) {
  return (
    <button
      type="button"
      className="p-6 rounded-xl border-2 border-dashed border-border-default hover:border-primary hover:bg-primary/5 transition text-start"
    >
      <Icon className="h-6 w-6 text-primary" />
      <p className="mt-2 font-medium text-sm">{label}</p>
      <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-1">
        <Upload className="h-3 w-3" /> {hint}
      </p>
    </button>
  );
}
