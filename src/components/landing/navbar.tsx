"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Building2, CalendarCheck, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { company, navLinks, zoomBookingUrl } from "@/config/site-config";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-white/10 bg-[#050c1d]/90 shadow-lg shadow-black/20 backdrop-blur-xl"
          : "border-transparent bg-[#050c1d]/70 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="#inicio"
          className="flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label={`${company.name} — Inicio`}
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 shadow-md shadow-blue-900/40">
            <Building2 className="size-5 text-white" aria-hidden="true" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-tight text-white sm:text-base">
              Servicios Corporativos
            </span>
            <span className="text-[10px] font-medium tracking-widest text-blue-400 uppercase">
              Legal · Financiero · SAS
            </span>
          </span>
        </Link>

        {/* Navegación escritorio */}
        <nav aria-label="Navegación principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA Zoom (escritorio) */}
        <div className="hidden md:block">
          <Button
            asChild
            className="bg-blue-600 text-white shadow-md shadow-blue-950/50 transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-900/40"
          >
            <a href={zoomBookingUrl}>
              <CalendarCheck className="size-4" aria-hidden="true" />
              Agendar Consulta por Zoom
            </a>
          </Button>
        </div>

        {/* Menú móvil */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white md:hidden"
              aria-label="Abrir menú de navegación"
            >
              <Menu className="size-5" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-80 border-white/10 bg-[#070f26] text-white"
          >
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2 text-left text-white">
                <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700">
                  <Building2 className="size-4 text-white" aria-hidden="true" />
                </span>
                {company.name}
              </SheetTitle>
            </SheetHeader>
            <nav aria-label="Navegación móvil" className="mt-2 px-4">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-3 text-base font-medium text-slate-200 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-500"
                onClick={() => setOpen(false)}
              >
                <a href={zoomBookingUrl}>
                  <CalendarCheck className="size-4" aria-hidden="true" />
                  Agendar Consulta por Zoom
                </a>
              </Button>
              <p className="mt-6 text-xs leading-relaxed text-slate-400">
                {company.legalName}
                <br />
                RUC {company.ruc}
                <br />
                {company.city}
              </p>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
