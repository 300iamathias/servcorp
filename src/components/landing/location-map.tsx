"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { company, mapDirectionsUrl, mapEmbedUrl } from "@/config/site-config";

/**
 * Mapa de ubicación dentro de la sección de contacto.
 * Usa el embed público de Google Maps (no requiere API key).
 * Los enlaces se configuran en src/config/site-config.ts.
 */
export function LocationMap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55 }}
      className="mt-10 lg:mt-12"
      aria-label="Ubicación de la oficina"
    >
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-xl shadow-black/30">
        {/* Encabezado del mapa */}
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
              <MapPin className="size-5 text-blue-400" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">
                Encuéntranos en Quito
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-slate-400">
                {company.address}
              </p>
            </div>
          </div>
          <a
            href={mapDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-blue-400/30 bg-blue-600/10 px-4 text-sm font-semibold text-blue-300 transition-colors hover:bg-blue-600/20 hover:text-blue-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Abrir indicaciones para llegar en Google Maps (se abre en una nueva pestaña)"
          >
            <Navigation className="size-4" aria-hidden="true" />
            Cómo llegar
          </a>
        </div>

        {/* Mapa embebido */}
        <div className="border-t border-white/10">
          <iframe
            src={mapEmbedUrl}
            title={`Mapa de ubicación de ${company.legalName}`}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="h-64 w-full border-0 grayscale-[35%] contrast-[1.03] sm:h-72 lg:h-80"
          />
        </div>
      </div>
    </motion.div>
  );
}
