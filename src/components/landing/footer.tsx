"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  CreditCard,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import {
  acceptedCards,
  company,
  developerCredit,
  legalDocuments,
  navLinks,
  paymentGateways,
  serviceOptions,
  type LegalDocumentId,
} from "@/config/site-config";
import {
  PaymentBadges,
  SecurePaymentNotice,
} from "@/components/landing/payment-badges";
import { LegalModal } from "@/components/landing/legal-modals";
import { PaymentDemoModal } from "@/components/landing/payment-demo";

export function Footer() {
  const [activeDoc, setActiveDoc] = useState<LegalDocumentId | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  function openLegalDoc(docId: LegalDocumentId) {
    setActiveDoc(docId);
    setModalOpen(true);
  }

  return (
    <footer className="mt-auto border-t border-white/10 bg-[#040a18]">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div>
            <Link
              href="#inicio"
              className="flex items-center gap-2.5"
              aria-label={`${company.name} — Volver al inicio`}
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700">
                <Building2 className="size-5 text-white" aria-hidden="true" />
              </span>
              <span className="text-base font-bold text-white">
                {company.name}
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Consultoría empresarial en Ecuador: constitución de compañías
              SAS, asesoría legal corporativa y asistencia financiera.
              Atención 100% remota con estándares profesionales.
            </p>
          </div>

          {/* Datos corporativos (compliance) */}
          <nav aria-label="Datos corporativos">
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
              Datos de la empresa
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <Building2
                  className="mt-0.5 size-4 shrink-0 text-blue-400"
                  aria-hidden="true"
                />
                <span>
                  Razón social:{" "}
                  <span className="font-medium text-slate-200">
                    {company.legalName}
                  </span>
                  <br />
                  RUC:{" "}
                  <span className="font-medium text-slate-200">
                    {company.ruc}
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin
                  className="mt-0.5 size-4 shrink-0 text-blue-400"
                  aria-hidden="true"
                />
                <span className="leading-relaxed">{company.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone
                  className="mt-0.5 size-4 shrink-0 text-blue-400"
                  aria-hidden="true"
                />
                <a
                  href={company.phoneHref}
                  className="transition-colors hover:text-white"
                >
                  {company.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail
                  className="mt-0.5 size-4 shrink-0 text-blue-400"
                  aria-hidden="true"
                />
                <a
                  href={`mailto:${company.email}`}
                  className="break-all transition-colors hover:text-white"
                >
                  {company.email}
                </a>
              </li>
            </ul>
          </nav>

          {/* Navegación y servicios */}
          <nav aria-label="Enlaces del sitio">
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
              Enlaces
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <h3 className="mt-6 text-sm font-semibold tracking-wider text-white uppercase">
              Servicios
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {serviceOptions.slice(0, 3).map((service) => (
                <li key={service.value}>
                  <a
                    href="#servicios"
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Pagos seguros */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
              Pagos seguros
            </h3>
            <p className="mt-4 text-sm text-slate-400">
              Procesamos tus pagos a través de las pasarelas autorizadas:
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {paymentGateways.map((gateway) => (
                <span
                  key={gateway}
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200"
                >
                  <CreditCard
                    className="size-3.5 text-blue-400"
                    aria-hidden="true"
                  />
                  {gateway}
                </span>
              ))}
            </div>
            <p className="mt-5 text-sm text-slate-400">
              Aceptamos:
            </p>
            <PaymentBadges brands={acceptedCards.map((c) => c.brand)} className="mt-2" />
            <div className="mt-5">
              <SecurePaymentNotice text="Transacciones protegidas con cifrado SSL/TLS bajo estándares PCI DSS. Nunca almacenamos datos completos de tarjetas." />
            </div>
            <PaymentDemoModal />
          </div>
        </div>

        {/* Barra legal inferior */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 lg:flex-row">
          <p className="text-center text-xs leading-relaxed text-slate-500 lg:text-left">
            © {new Date().getFullYear()} {company.legalName}. Todos los
            derechos reservados. RUC {company.ruc} · {company.city}.
            <br className="hidden lg:block" />
            Sitio web sujeto a la legislación de la República del Ecuador.
          </p>
          <nav
            aria-label="Documentos legales"
            className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1"
          >
            {legalDocuments.map((doc, index) => (
              <span key={doc.id} className="flex items-center">
                <button
                  type="button"
                  onClick={() => openLegalDoc(doc.id)}
                  className="rounded px-2 py-1 text-xs font-medium text-slate-400 underline decoration-slate-600 underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  aria-haspopup="dialog"
                >
                  {doc.label}
                </button>
                {index < legalDocuments.length - 1 && (
                  <span
                    className="text-slate-700"
                    aria-hidden="true"
                  >
                    ·
                  </span>
                )}
              </span>
            ))}
          </nav>
        </div>
        {/* Crédito de desarrollo */}
        <div className="mt-5 flex justify-center border-t border-white/5 pt-4 lg:justify-end lg:pr-24">
          <p className="text-xs text-slate-500">
            {developerCredit.prefix}{" "}
            <a
              href={developerCredit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-amber-500 transition-colors hover:text-amber-400 hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              aria-label={`Sitio desarrollado por ${developerCredit.agency} (abre en una nueva pestaña)`}
            >
              {developerCredit.agency}
            </a>
          </p>
        </div>
      </div>

      <LegalModal
        docId={activeDoc}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </footer>
  );
}
