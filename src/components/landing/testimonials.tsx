"use client";

import { motion } from "framer-motion";
import { MapPin, Quote, Star } from "lucide-react";
import { testimonials } from "@/config/site-config";

function initialsOf(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

export function Testimonials() {
  return (
    <section
      id="testimonios"
      aria-labelledby="testimonios-heading"
      className="relative border-t border-white/5 bg-[#060e22] py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/3 h-[320px] w-[320px] rounded-full bg-blue-600/10 blur-[130px]"
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
            Testimonios
          </p>
          <h2
            id="testimonios-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Emprendedores que ya confiaron en nosotros
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
            Historias reales de clientes que constituyeron su empresa y
            hacen crecer su negocio con nuestro acompañamiento.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.figure
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-lg shadow-black/20 transition-colors hover:border-blue-400/30 sm:p-7"
            >
              <div className="flex items-center justify-between">
                <Quote
                  className="size-7 text-blue-500/50"
                  aria-hidden="true"
                />
                <div
                  className="flex items-center gap-0.5"
                  role="img"
                  aria-label="Calificación: 5 de 5 estrellas"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-amber-400 text-amber-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-200">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                <span
                  className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-sm font-bold text-white"
                  aria-hidden="true"
                >
                  {initialsOf(item.name)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {item.role} · {item.company}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                    <MapPin className="size-3" aria-hidden="true" />
                    {item.city}, Ecuador
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
