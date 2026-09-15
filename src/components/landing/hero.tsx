"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck,
  CheckCircle2,
  Landmark,
  MessageCircle,
  Scale,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { company, whatsappUrl, zoomBookingUrl } from "@/config/site-config";

const heroHighlights = [
  { icon: Landmark, label: "Constitución de compañías SAS" },
  { icon: Scale, label: "Asesoría legal empresarial" },
  { icon: TrendingUp, label: "Consultoría financiera" },
];

const heroStats = [
  { value: "+350", label: "Empresas constituidas" },
  { value: "100%", label: "Atención remota por Zoom" },
  { value: "24 h", label: "Respuesta a tu solicitud" },
  { value: `${new Date().getFullYear() - company.founded}+`, label: "Años de experiencia" },
];

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
    >
      {/* Fondo decorativo: retícula + resplandores */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:44px_44px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-40 -right-40 h-[360px] w-[360px] rounded-full bg-cyan-500/10 blur-[120px]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-16 pb-16 sm:px-6 sm:pt-24 sm:pb-20 lg:px-8 lg:pt-28 lg:pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-medium text-blue-300 sm:text-sm"
          >
            <ShieldCheck className="size-4" aria-hidden="true" />
            Constitución de compañías SAS en Ecuador · Proceso 100% remoto
          </motion.div>

          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-4xl leading-tight font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Constituye tu compañía{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              SAS en Ecuador
            </span>{" "}
            con asesoría legal y financiera integral
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg"
          >
            Te acompañamos en cada etapa: desde la constitución de tu empresa
            SAS ante la Superintendencia de Compañías, hasta el soporte legal
            corporativo y la planificación financiera que tu negocio necesita
            para crecer con seguridad.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="h-12 w-full bg-blue-600 px-8 text-base font-semibold text-white shadow-lg shadow-blue-950/50 transition-all hover:bg-blue-500 hover:shadow-xl sm:w-auto"
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-5" aria-hidden="true" />
                Escríbenos por WhatsApp
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="h-12 w-full border border-white/20 bg-white/5 px-8 text-base font-semibold text-white backdrop-blur transition-all hover:bg-white/10 sm:w-auto"
              variant="outline"
            >
              <a href={zoomBookingUrl}>
                <CalendarCheck className="size-5" aria-hidden="true" />
                Agendar Consulta por Zoom
              </a>
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.34 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-300"
            aria-label="Servicios destacados"
          >
            {heroHighlights.map((item) => (
              <li key={item.label} className="flex items-center gap-2">
                <CheckCircle2
                  className="size-4 text-blue-400"
                  aria-hidden="true"
                />
                {item.label}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Métricas de confianza */}
        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42 }}
          className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
        >
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-5 text-center backdrop-blur"
            >
              <dt className="order-2 mt-1 block text-xs text-slate-400 sm:text-sm">
                {stat.label}
              </dt>
              <dd className="order-1 text-2xl font-bold text-white sm:text-3xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
