"use client";

import { motion } from "framer-motion";
import {
  ClipboardCheck,
  FileSignature,
  Lock,
  Rocket,
  UserRoundCheck,
  Video,
  Wifi,
} from "lucide-react";

const steps = [
  {
    icon: Video,
    step: "Paso 1",
    title: "Agenda tu reunión por Zoom",
    description:
      "Reserva una videollamada de diagnóstico sin costo desde nuestro formulario o por WhatsApp. Recibirás el enlace de Zoom al instante.",
  },
  {
    icon: ClipboardCheck,
    step: "Paso 2",
    title: "Diagnóstico personalizado",
    description:
      "Analizamos tu caso en detalle: actividad económica, socios, capital y objetivos, para definir la ruta legal y financiera ideal.",
  },
  {
    icon: FileSignature,
    step: "Paso 3",
    title: "Propuesta y plan de acción",
    description:
      "Recibes una propuesta transparente con alcance, plazos y honorarios claros. Sin costos ocultos ni sorpresas.",
  },
  {
    icon: Rocket,
    step: "Paso 4",
    title: "Ejecución y acompañamiento",
    description:
      "Gestionamos los trámites ante las instituciones correspondientes y te mantenemos informado hasta la entrega final.",
  },
];

const differentiators = [
  {
    icon: Wifi,
    title: "100% Remoto",
    description:
      "Todo el proceso se realiza vía reuniones por Zoom y documentación digital. No necesitas visitar nuestras oficinas.",
  },
  {
    icon: UserRoundCheck,
    title: "Atención Personalizada",
    description:
      "Un ejecutivo dedicado te acompaña durante todo el proceso y responde tus consultas directamente.",
  },
  {
    icon: Lock,
    title: "Confidencialidad Garantizada",
    description:
      "Tu información y documentación societaria se manejan bajo estrictos protocolos de seguridad y reserva.",
  },
];

export function HowWeWork() {
  return (
    <section
      id="nosotros"
      aria-labelledby="nosotros-heading"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -left-40 h-[360px] w-[360px] rounded-full bg-blue-600/10 blur-[130px]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold tracking-widest text-blue-400 uppercase">
            Nosotros · Cómo Trabajamos
          </p>
          <h2
            id="nosotros-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Un proceso simple, remoto y transparente
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
            Más de {new Date().getFullYear() - 2016} años acompañando a
            emprendedores y compañías en Ecuador. Trabajamos 100% en línea a
            través de reuniones por Zoom, con atención personalizada en cada
            etapa.
          </p>
        </motion.div>

        {/* Línea de proceso */}
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, index) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-blue-400/30 sm:p-7"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl bg-blue-600/15 ring-1 ring-blue-400/30">
                  <item.icon
                    className="size-5 text-blue-400"
                    aria-hidden="true"
                  />
                </span>
                <span
                  className="text-xs font-bold tracking-widest text-blue-400/70 uppercase"
                  aria-hidden="true"
                >
                  {item.step}
                </span>
              </div>
              <h3 className="mt-4 text-base font-semibold text-white sm:text-lg">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {item.description}
              </p>
            </motion.li>
          ))}
        </ol>

        {/* Diferenciadores */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {differentiators.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-4 rounded-2xl border border-blue-400/20 bg-blue-950/20 p-6"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 ring-1 ring-blue-400/30">
                <item.icon
                  className="size-5 text-blue-300"
                  aria-hidden="true"
                />
              </span>
              <div>
                <h3 className="text-base font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
