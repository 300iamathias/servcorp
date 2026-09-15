"use client";

import { useCallback, useSyncExternalStore } from "react";
import { TriangleAlert, X } from "lucide-react";
import { demoBanner } from "@/config/site-config";

const STORAGE_KEY = "sc-demo-banner-dismissed";
const CHANGE_EVENT = "sc-demo-banner-change";

/**
 * Franja superior de "Modo Vista Previa" — indica al visitante que el
 * sitio es una maqueta de propuesta con datos de referencia.
 *
 * - Se cierra con la ✕ y la preferencia se recuerda en localStorage.
 * - Para quitarla del sitio completo, poner demoBanner.enabled = false
 *   en src/config/site-config.ts.
 * - Se renderiza encima del navbar (el navbar sigue siendo sticky).
 */

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

/** Snapshot en cliente: banner cerrado solo si el usuario lo descartó. */
function getSnapshot(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

/** Snapshot en servidor/hidratación: mostrar el banner. */
function getServerSnapshot(): boolean {
  return false;
}

export function DemoBanner() {
  const dismissed = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const dismiss = useCallback(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // sin persistencia disponible; notificar igualmente a esta pestaña
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  if (demoBanner.enabled === false || dismissed) return null;

  return (
    <div
      role="note"
      aria-label="Aviso de modo vista previa"
      className="relative z-[60] w-full bg-black text-center"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-10 py-2 sm:gap-2.5 sm:px-12">
        <TriangleAlert
          className="size-4 shrink-0 text-amber-400"
          aria-hidden="true"
        />
        <p className="text-[11px] leading-snug text-slate-300 sm:text-xs">
          <span className="font-bold tracking-wide text-amber-400">
            {demoBanner.title}
          </span>{" "}
          <span className="hidden sm:inline">·</span>{" "}
          {demoBanner.message}
        </p>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Cerrar aviso de vista previa"
        className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
