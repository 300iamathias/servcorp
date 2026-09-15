"use client";

import { useMemo, useState } from "react";
import {
  BadgeCheck,
  CreditCard,
  Loader2,
  Lock,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { paymentGateways } from "@/config/site-config";
import { cn } from "@/lib/utils";

/**
 * Simulador de pago en línea (Hosted Checkout estilo Nuvei/Datafast).
 * Es una maqueta 100% client-side con fines de demostración comercial:
 * no procesa pagos ni almacena datos de tarjetas.
 *
 * En producción, el botón "Pagar" de la empresa redirigiría al checkout
 * seguro real generado desde el panel del comercio (Nuvei o Datafast).
 */

const demoPlans = [
  {
    value: "constitucion-sas",
    label: "Constitución completa de SAS",
    amount: 350,
  },
  {
    value: "asesoria-legal",
    label: "Plan de acompañamiento legal (mensual)",
    amount: 120,
  },
  {
    value: "consultoria-financiera",
    label: "Consultoría financiera (sesión)",
    amount: 180,
  },
] as const;

type CheckoutState = "form" | "processing" | "approved";

function formatCardNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function detectBrand(digits: string): string | null {
  if (digits.startsWith("4")) return "Visa";
  if (/^5[1-5]/.test(digits)) return "Mastercard";
  if (/^3[0689]/.test(digits)) return "Diners Club / Discover";
  return null;
}

const demoFieldStyles =
  "border-white/15 bg-white/5 text-white placeholder:text-slate-500 focus-visible:border-blue-400 focus-visible:ring-blue-500/30";

export function PaymentDemoModal() {
  const [open, setOpen] = useState(false);
  const [planValue, setPlanValue] = useState<string>(demoPlans[0].value);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [state, setState] = useState<CheckoutState>("form");
  const [reference, setReference] = useState("");

  const plan = useMemo(
    () => demoPlans.find((p) => p.value === planValue) ?? demoPlans[0],
    [planValue]
  );

  const rawDigits = cardNumber.replace(/\D/g, "");
  const brand = detectBrand(rawDigits);
  const canPay =
    rawDigits.length >= 15 &&
    cardName.trim().length >= 5 &&
    /^\d{2}\/\d{2}$/.test(expiry) &&
    Number(expiry.slice(0, 2)) >= 1 &&
    Number(expiry.slice(0, 2)) <= 12 &&
    cvv.replace(/\D/g, "").length >= 3;

  function openModal() {
    setState("form");
    setReference("");
    setOpen(true);
  }

  function resetForm() {
    setCardNumber("");
    setCardName("");
    setExpiry("");
    setCvv("");
    setState("form");
  }

  function handlePay(event: React.FormEvent) {
    event.preventDefault();
    if (!canPay) return;
    setState("processing");
    // Simulación local del proceso del hosted checkout
    window.setTimeout(() => {
      setReference(
        `DEMO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
      );
      setState("approved");
    }, 1800);
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={openModal}
        className="mt-4 w-full justify-start border-blue-400/30 bg-blue-600/10 text-xs font-semibold text-blue-300 hover:bg-blue-600/20 hover:text-blue-200"
        aria-haspopup="dialog"
      >
        <CreditCard className="size-4" aria-hidden="true" />
        Ver ejemplo de pago en línea
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[85vh] w-full overflow-y-auto border-white/10 bg-[#0a1730] p-6 text-slate-200 sm:max-w-md legal-scroll">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-left text-lg text-white">
              <Lock className="size-5 text-emerald-400" aria-hidden="true" />
              Pago en línea seguro
            </DialogTitle>
            <DialogDescription className="text-left text-xs text-slate-400">
              Simulación del checkout que usarían tus clientes vía{" "}
              {paymentGateways.join(" / ")}. No se realizará ningún cargo
              real.
            </DialogDescription>
          </DialogHeader>

          {state === "approved" ? (
            <div
              className="flex flex-col items-center py-6 text-center"
              role="status"
              aria-live="polite"
            >
              <span className="flex size-16 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-400/30">
                <BadgeCheck
                  className="size-8 text-emerald-400"
                  aria-hidden="true"
                />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-white">
                Pago de demostración aprobado
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                {plan.label} ·{" "}
                <span className="font-bold text-white">
                  ${plan.amount}.00 USD
                </span>
              </p>
              <p className="mt-3 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-slate-300">
                Ref: {reference}
              </p>
              <p className="mt-4 text-xs leading-relaxed text-slate-400">
                En producción, esta pantalla la genera la pasarela con la
                aprobación real del banco y se envía el comprobante por
                correo.
              </p>
              <Button
                variant="outline"
                className="mt-5 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                onClick={resetForm}
              >
                Probar otra tarjeta
              </Button>
            </div>
          ) : (
            <form onSubmit={handlePay} noValidate>
              {/* Resumen del pedido */}
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <Label
                  htmlFor="plan-demo"
                  className="text-xs font-medium tracking-wide text-slate-400 uppercase"
                >
                  Servicio a pagar
                </Label>
                <select
                  id="plan-demo"
                  value={planValue}
                  onChange={(e) => setPlanValue(e.target.value)}
                  disabled={state === "processing"}
                  className="mt-2 w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-white focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:opacity-60"
                >
                  {demoPlans.map((p) => (
                    <option
                      key={p.value}
                      value={p.value}
                      className="bg-[#0a1730]"
                    >
                      {p.label} — ${p.amount}.00
                    </option>
                  ))}
                </select>
                <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                  <span className="text-sm text-slate-400">Total a pagar</span>
                  <span className="text-xl font-bold text-white">
                    ${plan.amount}.00{" "}
                    <span className="text-xs font-normal text-slate-400">
                      USD
                    </span>
                  </span>
                </div>
              </div>

              {/* Datos de tarjeta */}
              <div className="mt-4 space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="card-number" className="text-slate-200">
                    Número de tarjeta{" "}
                    <span className="text-[10px] text-slate-500">
                      (usa datos de ejemplo)
                    </span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="card-number"
                      inputMode="numeric"
                      autoComplete="off"
                      placeholder="4242 4242 4242 4242"
                      value={cardNumber}
                      onChange={(e) =>
                        setCardNumber(formatCardNumber(e.target.value))
                      }
                      disabled={state === "processing"}
                      className={cn(demoFieldStyles, "pr-16")}
                    />
                    {brand && (
                      <span className="absolute top-1/2 right-3 -translate-y-1/2 text-[10px] font-bold text-blue-300 uppercase">
                        {brand}
                      </span>
                    )}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="card-name" className="text-slate-200">
                    Nombre del titular
                  </Label>
                  <Input
                    id="card-name"
                    autoComplete="off"
                    placeholder="Como aparece en la tarjeta"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    disabled={state === "processing"}
                    className={demoFieldStyles}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="card-expiry" className="text-slate-200">
                      Vencimiento (MM/AA)
                    </Label>
                    <Input
                      id="card-expiry"
                      inputMode="numeric"
                      autoComplete="off"
                      placeholder="12/28"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      disabled={state === "processing"}
                      className={demoFieldStyles}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="card-cvv" className="text-slate-200">
                      CVV
                    </Label>
                    <Input
                      id="card-cvv"
                      inputMode="numeric"
                      autoComplete="off"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) =>
                        setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                      }
                      disabled={state === "processing"}
                      className={demoFieldStyles}
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={!canPay || state === "processing"}
                className="mt-5 h-12 w-full bg-blue-600 text-base font-semibold text-white shadow-lg shadow-blue-950/50 transition-all hover:bg-blue-500 disabled:opacity-50"
              >
                {state === "processing" ? (
                  <>
                    <Loader2
                      className="size-5 animate-spin"
                      aria-hidden="true"
                    />
                    Procesando pago…
                  </>
                ) : (
                  <>
                    <Lock className="size-5" aria-hidden="true" />
                    Pagar ${plan.amount}.00 de forma segura
                  </>
                )}
              </Button>

              <div className="mt-4 flex items-start gap-3 text-[11px] leading-relaxed text-slate-500">
                <ShieldCheck
                  className="mt-0.5 size-4 shrink-0 text-emerald-500"
                  aria-hidden="true"
                />
                <p>
                  Entorno de demostración: los datos no salen de tu navegador
                  y no se realizan cargos. En producción, este checkout lo
                  sirve la pasarela bajo cifrado TLS y estándar PCI DSS.
                </p>
              </div>
              <p className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-500">
                <Smartphone className="size-3.5" aria-hidden="true" />
                También aceptamos transferencias y link de pago enviado por
                WhatsApp.
              </p>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
