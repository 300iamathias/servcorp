"use client";

import { useMemo, useState } from "react";
import {
  CreditCard,
  Lock,
  ShieldCheck,
  Smartphone,
  TriangleAlert,
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
 * MODO VISTA PREVIA: los campos de tarjeta llegan precargados con datos
 * de prueba en modo solo lectura (readOnly) y el botón "Pagar" no
 * procesa nada — al pulsarlo únicamente muestra un aviso de que esto es
 * una demostración, sin cargos ni pantallas de aprobación simuladas.
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

/** Tarjeta de prueba precargada (solo lectura — nadie puede digitar datos). */
const demoCard = {
  number: "4242 4242 4242 4242",
  name: "Cliente de Ejemplo",
  expiry: "12/28",
  cvv: "123",
} as const;

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
  const [notice, setNotice] = useState(false);

  const plan = useMemo(
    () => demoPlans.find((p) => p.value === planValue) ?? demoPlans[0],
    [planValue]
  );

  const brand = detectBrand(demoCard.number.replace(/\D/g, ""));

  function openModal() {
    setNotice(false);
    setOpen(true);
  }

  /**
   * Modo demostración: el botón no procesa ningún pago. Solo muestra el
   * aviso de que esto es una maqueta, sin cargos reales.
   */
  function handlePay(event: React.FormEvent) {
    event.preventDefault();
    setNotice(true);
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
              {paymentGateways.join(" / ")}. Los campos vienen precargados
              con datos de prueba (solo lectura) y no se realizará ningún
              cargo real.
            </DialogDescription>
          </DialogHeader>

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

            {/* Datos de tarjeta (solo lectura, datos de ejemplo) */}
            <div className="mt-4 space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="card-number" className="text-slate-200">
                  Número de tarjeta{" "}
                  <span className="text-[10px] text-slate-500">
                    (datos de ejemplo · solo lectura)
                  </span>
                </Label>
                <div className="relative">
                  <Input
                    id="card-number"
                    inputMode="numeric"
                    autoComplete="off"
                    value={demoCard.number}
                    readOnly
                    aria-readonly="true"
                    className={cn(demoFieldStyles, "cursor-default pr-16")}
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
                  value={demoCard.name}
                  readOnly
                  aria-readonly="true"
                  className={cn(demoFieldStyles, "cursor-default")}
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
                    value={demoCard.expiry}
                    readOnly
                    aria-readonly="true"
                    className={cn(demoFieldStyles, "cursor-default")}
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
                    value={demoCard.cvv}
                    readOnly
                    aria-readonly="true"
                    className={cn(demoFieldStyles, "cursor-default")}
                  />
                </div>
              </div>
            </div>

            {/* Aviso de demostración (aparece al pulsar "Pagar") */}
            {notice && (
              <div
                role="alert"
                className="mt-4 flex items-start gap-3 rounded-lg border border-amber-400/30 bg-amber-500/10 p-3 text-xs leading-relaxed text-amber-200"
              >
                <TriangleAlert
                  className="mt-0.5 size-4 shrink-0 text-amber-400"
                  aria-hidden="true"
                />
                <p>
                  <span className="font-semibold text-amber-100">
                    Esto es solo una demostración de pago.
                  </span>{" "}
                  No se procesan pagos ni se realizan cargos. El cobro real
                  se activará cuando el sitio pase a producción con la
                  pasarela autorizada ({paymentGateways.join(" / ")}).
                </p>
              </div>
            )}

            <Button
              type="submit"
              className="mt-5 h-12 w-full bg-blue-600 text-base font-semibold text-white shadow-lg shadow-blue-950/50 transition-all hover:bg-blue-500"
            >
              <Lock className="size-5" aria-hidden="true" />
              Pagar ${plan.amount}.00 de forma segura
            </Button>

            <div className="mt-4 flex items-start gap-3 text-[11px] leading-relaxed text-slate-500">
              <ShieldCheck
                className="mt-0.5 size-4 shrink-0 text-emerald-500"
                aria-hidden="true"
              />
              <p>
                Entorno de demostración: los campos son de solo lectura con
                datos de prueba y no se realizan cargos. En producción, este
                checkout lo sirve la pasarela bajo cifrado TLS y estándar
                PCI DSS.
              </p>
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-500">
              <Smartphone className="size-3.5" aria-hidden="true" />
              También aceptamos transferencias y link de pago enviado por
              WhatsApp.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
