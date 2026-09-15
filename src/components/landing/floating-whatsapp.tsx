import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/config/site-config";

/**
 * Botón flotante de WhatsApp — accesible, no interfiere con el contenido
 * y siempre visible para maximizar la conversión de la landing.
 */
export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp (abre en una nueva pestaña)"
      className="group fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-emerald-950/50 transition-transform duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050c1d] sm:bottom-6 sm:right-6"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-20"
      />
      <MessageCircle className="size-7" aria-hidden="true" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg border border-white/10 bg-[#0a1730] px-3 py-2 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 sm:block">
        ¿Dudas? Escríbenos por WhatsApp
      </span>
    </a>
  );
}
