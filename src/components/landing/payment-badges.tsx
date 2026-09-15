import type { ReactElement } from "react";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Insignias de tarjetas de crédito aceptadas (Visa, Mastercard,
 * Diners Club y Discover) dibujadas con CSS puro — sin dependencias
 * de imágenes externas — para el footer compliant con pasarelas de pago.
 */

function VisaBadge() {
  return (
    <span
      className="flex h-8 w-[52px] items-center justify-center rounded-md bg-white shadow-sm"
      title="Visa"
      role="img"
      aria-label="Visa aceptada"
    >
      <span className="text-sm font-black italic tracking-tight text-[#1A1F71]">
        VISA
      </span>
    </span>
  );
}

function MastercardBadge() {
  return (
    <span
      className="flex h-8 w-[52px] items-center justify-center gap-0 rounded-md bg-white shadow-sm"
      title="Mastercard"
      role="img"
      aria-label="Mastercard aceptada"
    >
      <span className="relative flex items-center">
        <span className="size-4 rounded-full bg-[#EB001B]" />
        <span className="-ml-1.5 size-4 rounded-full bg-[#F79E1B] opacity-90" />
      </span>
    </span>
  );
}

function DinersBadge() {
  return (
    <span
      className="flex h-8 w-[52px] flex-col items-center justify-center rounded-md bg-white shadow-sm"
      title="Diners Club"
      role="img"
      aria-label="Diners Club aceptada"
    >
      <span className="flex items-center">
        <span className="size-3.5 rounded-full bg-[#0079BE]" />
        <span className="-ml-1 size-3.5 rounded-full bg-[#0079BE]/40" />
      </span>
      <span className="mt-0.5 text-[6px] leading-none font-bold tracking-wide text-[#0B2C5F]">
        DINERS CLUB
      </span>
    </span>
  );
}

function DiscoverBadge() {
  return (
    <span
      className="flex h-8 w-[52px] items-center justify-center gap-0.5 overflow-hidden rounded-md bg-white shadow-sm"
      title="Discover"
      role="img"
      aria-label="Discover aceptada"
    >
      <span className="text-[8px] leading-none font-black tracking-tight text-[#231F20]">
        DISC
      </span>
      <span className="size-2.5 rounded-full bg-[#F76E20]" />
      <span className="text-[8px] leading-none font-black tracking-tight text-[#231F20]">
        VER
      </span>
    </span>
  );
}

const badgeMap: Record<string, () => ReactElement> = {
  Visa: VisaBadge,
  Mastercard: MastercardBadge,
  "Diners Club": DinersBadge,
  Discover: DiscoverBadge,
};

export function PaymentBadges({
  brands,
  className,
}: {
  brands: readonly string[];
  className?: string;
}) {
  return (
    <div
      className={cn("flex flex-wrap items-center gap-2", className)}
      aria-label="Tarjetas de crédito y débito aceptadas"
    >
      {brands.map((brand) => {
        const Badge = badgeMap[brand];
        return Badge ? <Badge key={brand} /> : null;
      })}
    </div>
  );
}

export function SecurePaymentNotice({ text }: { text: string }) {
  return (
    <p className="flex items-start gap-2 text-xs leading-relaxed text-slate-400">
      <ShieldCheck
        className="mt-0.5 size-4 shrink-0 text-emerald-400"
        aria-hidden="true"
      />
      <span>{text}</span>
    </p>
  );
}
