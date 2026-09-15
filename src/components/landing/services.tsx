"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  FileCheck2,
  Landmark,
  Scale,
  TrendingUp,
} from "lucide-react";

const services = [
  {
    icon: Landmark,
    title: "Constitución y Creación de Empresas SAS",
    description:
      "Constituimos tu Sociedad por Acciones Simplificada de principio a fin, bajo la Ley Orgánica de Emprendimiento e Innovación (LOEI), sin trámites presenciales.",
    features: [
      "Elaboración del acta de constitución y estatutos",
      "Inscripción en la Superintendencia de Compañías",
      "RUC, RIMPE y firma electrónica ante el SRI",
      "Apertura de cuenta BTE para el capital social",
      "Nombramientos de Gerencia y Junta de Accionistas",
    ],
  },
  {
    icon: Scale,
    title: "Asesoría y Asistencia Legal Empresarial",
    description:
      "Soporte jurídico corporativo permanente para que tu compañía opere con certeza y cumplimiento normativo en Ecuador.",
    features: [
      "Redacción y revisión de contratos mercantiles",
      "Reformas de estatutos y aumentos de capital",
      "Cumplimiento normativo y gubernamental",
      "Registro de marcas y propiedad intelectual",
      "Asesoría en decisiones de Junta y accionistas",
    ],
  },
  {
    icon: TrendingUp,
    title: "Consultoría y Asistencia Financiera",
    description:
      "Planificación financiera y tributaria orientada a la salud, el crecimiento y el cumplimiento fiscal de tu empresa.",
    features: [
      "Planificación financiera y presupuestos",
      "Flujo de caja y proyecciones de crecimiento",
      "Cumplimiento tributario y declaraciones al SRI",
      "Estructuración de financiamiento bancario",
      "Contabilidad bajo estándares NIIF",
    ],
  },
];

export function Services() {
  return (
    <section
      id="servicios"
      aria-labelledby="servicios-heading"
      className="relative border-t border-white/5 bg-[#060e22] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold tracking-widest text-blue-400 uppercase">
            Nuestros Servicios
          </p>
          <h2
            id="servicios-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Soluciones corporativas integrales para tu negocio
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
            Un solo aliado estratégico para la parte legal, financiera y
            administrativa de tu compañía en Ecuador.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:shadow-xl hover:shadow-blue-950/40 sm:p-7"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-blue-600/15 ring-1 ring-blue-400/30 transition-colors group-hover:bg-blue-600/25">
                <service.icon
                  className="size-6 text-blue-400"
                  aria-hidden="true"
                />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-white sm:text-xl">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {service.description}
              </p>
              <ul className="mt-5 flex-1 space-y-2.5">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-slate-300"
                  >
                    <FileCheck2
                      className="mt-0.5 size-4 shrink-0 text-blue-400"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#contacto"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 transition-colors hover:text-blue-300"
                aria-label={`Solicitar asesoría en ${service.title}`}
              >
                Solicitar asesoría
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
