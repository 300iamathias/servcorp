"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { company, serviceOptions, whatsappUrl } from "@/config/site-config";
import { LocationMap } from "@/components/landing/location-map";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(3, "Ingresa tu nombre completo.")
    .max(120, "El nombre es demasiado largo."),
  correo: z.email("Ingresa un correo electrónico válido."),
  telefono: z
    .string()
    .trim()
    .regex(/^[+()\-\s\d]{7,30}$/, "Ingresa un teléfono válido."),
  tipoServicio: z.enum([
    "constitucion-sas",
    "asesoria-legal",
    "consultoria-financiera",
    "otro",
  ]),
  mensaje: z
    .string()
    .trim()
    .min(10, "Cuéntanos un poco más (mínimo 10 caracteres).")
    .max(2000, "El mensaje es demasiado largo."),
});

type ContactFormValues = z.infer<typeof formSchema>;

const contactInfo = [
  {
    icon: Phone,
    label: "Teléfono de atención",
    value: company.phone,
    href: company.phoneHref,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: company.whatsapp,
    href: whatsappUrl,
  },
  {
    icon: Mail,
    label: "Correo corporativo",
    value: company.email,
    href: `mailto:${company.email}`,
  },
  {
    icon: MapPin,
    label: "Oficina principal",
    value: company.address,
  },
  {
    icon: Clock,
    label: "Horario de atención",
    value: company.schedule,
  },
];

const darkFieldStyles =
  "border-white/15 bg-white/5 text-white placeholder:text-slate-500 focus-visible:border-blue-400 focus-visible:ring-blue-500/30";

/**
 * Formulario de contacto "híbrido WhatsApp": al enviarse, construye un
 * mensaje estructurado y abre WhatsApp con la solicitud prellenada.
 * No requiere base de datos ni backend — ideal para hosting estático
 * o serverless (Vercel) sin configuración adicional.
 */
export function ContactSection() {
  const [selectedService, setSelectedService] = useState<string>("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success">("idle");
  const [whatsappFallbackUrl, setWhatsappFallbackUrl] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      correo: "",
      telefono: "",
      mensaje: "",
    },
  });

  function onSubmit(values: ContactFormValues) {
    const serviceLabel =
      serviceOptions.find((option) => option.value === values.tipoServicio)
        ?.label ?? values.tipoServicio;

    // El *texto* entre asteriscos se muestra en negrita dentro de WhatsApp.
    // Se usan viñetas "•" (seguras en cualquier pipeline de codificación de
    // URLs) en lugar de emojis, para garantizar que el mensaje llegue
    // perfecto a todos los dispositivos.
    const lines = [
      `Hola *${company.name}*, soy *${values.nombre}*.`,
      ``,
      `• *Servicio de interés:* ${serviceLabel}`,
      `• *Correo:* ${values.correo}`,
      `• *Teléfono:* ${values.telefono}`,
      ``,
      `• *Mensaje:*`,
      values.mensaje.slice(0, 900),
    ];

    const url = `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(
      lines.join("\n")
    )}`;
    setWhatsappFallbackUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitStatus("success");
  }

  return (
    <section
      id="contacto"
      aria-labelledby="contacto-heading"
      className="relative border-t border-white/5 bg-[#060e22] py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-[320px] w-[320px] rounded-full bg-blue-600/10 blur-[130px]"
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
            Contacto
          </p>
          <h2
            id="contacto-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Hablemos de tu proyecto hoy mismo
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
            Completa el formulario y se abrirá WhatsApp con tu solicitud ya
            redactada hacia un asesor especializado, listo para coordinar tu
            reunión de diagnóstico por Zoom sin costo ni compromiso.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-5 lg:gap-10">
          {/* Información de contacto */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-2"
            aria-label="Información de contacto"
          >
            <ul className="space-y-4">
              {contactInfo.map((item) => {
                const content = (
                  <>
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                      <item.icon
                        className="size-5 text-blue-400"
                        aria-hidden="true"
                      />
                    </span>
                    <span>
                      <span className="block text-xs font-medium tracking-wide text-slate-400 uppercase">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block text-sm font-medium text-slate-100">
                        {item.value}
                      </span>
                    </span>
                  </>
                );
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={
                          item.href.startsWith("http")
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-blue-400/30 hover:bg-white/[0.06]"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                        {content}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-400/20 bg-blue-950/30 p-4">
              <Video className="mt-0.5 size-5 shrink-0 text-blue-300" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-slate-300">
                <span className="font-semibold text-white">
                  Reuniones por Zoom:{" "}
                </span>
                todas las consultas iniciales se realizan por videollamada,
                100% remotas y adaptadas a tu horario.
              </p>
            </div>
          </motion.aside>

          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/30 sm:p-8">
              {submitStatus === "success" ? (
                <div
                  className="flex flex-col items-center justify-center py-12 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <span className="flex size-16 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-400/30">
                    <CheckCircle2
                      className="size-8 text-emerald-400"
                      aria-hidden="true"
                    />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-white">
                    ¡Listo! Abrimos WhatsApp con tu solicitud
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-300">
                    Tu mensaje ya está redactado con todos los datos que
                    ingresaste. Solo presiona <strong>enviar</strong> en
                    WhatsApp y un asesor especializado te responderá en un
                    máximo de 24 horas hábiles.
                  </p>
                  {whatsappFallbackUrl && (
                    <Button
                      asChild
                      className="mt-6 h-11 bg-[#25D366] font-semibold text-white hover:bg-[#1fb958]"
                    >
                      <a
                        href={whatsappFallbackUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="size-5" aria-hidden="true" />
                        ¿No se abrió? Ábrelo aquí
                      </a>
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="mt-3 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                    onClick={() => {
                      setSubmitStatus("idle");
                      reset();
                      setSelectedService("");
                    }}
                  >
                    Enviar otra solicitud
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    {/* Nombre */}
                    <div className="space-y-2">
                      <Label htmlFor="nombre" className="text-slate-200">
                        Nombre completo{" "}
                        <span className="text-blue-400" aria-hidden="true">
                          *
                        </span>
                      </Label>
                      <Input
                        id="nombre"
                        type="text"
                        autoComplete="name"
                        placeholder="Ej. Juan Pérez"
                        aria-invalid={!!errors.nombre}
                        aria-describedby={
                          errors.nombre ? "error-nombre" : undefined
                        }
                        className={cn(darkFieldStyles, errors.nombre && "border-red-400/60")}
                        {...register("nombre")}
                      />
                      {errors.nombre && (
                        <p
                          id="error-nombre"
                          className="text-xs font-medium text-red-400"
                        >
                          {errors.nombre.message}
                        </p>
                      )}
                    </div>

                    {/* Correo */}
                    <div className="space-y-2">
                      <Label htmlFor="correo" className="text-slate-200">
                        Correo electrónico{" "}
                        <span className="text-blue-400" aria-hidden="true">
                          *
                        </span>
                      </Label>
                      <Input
                        id="correo"
                        type="email"
                        autoComplete="email"
                        placeholder="empresa@ejemplo.com"
                        aria-invalid={!!errors.correo}
                        aria-describedby={
                          errors.correo ? "error-correo" : undefined
                        }
                        className={cn(darkFieldStyles, errors.correo && "border-red-400/60")}
                        {...register("correo")}
                      />
                      {errors.correo && (
                        <p
                          id="error-correo"
                          className="text-xs font-medium text-red-400"
                        >
                          {errors.correo.message}
                        </p>
                      )}
                    </div>

                    {/* Teléfono */}
                    <div className="space-y-2">
                      <Label htmlFor="telefono" className="text-slate-200">
                        Teléfono / WhatsApp{" "}
                        <span className="text-blue-400" aria-hidden="true">
                          *
                        </span>
                      </Label>
                      <Input
                        id="telefono"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+593 99 999 9999"
                        aria-invalid={!!errors.telefono}
                        aria-describedby={
                          errors.telefono ? "error-telefono" : undefined
                        }
                        className={cn(darkFieldStyles, errors.telefono && "border-red-400/60")}
                        {...register("telefono")}
                      />
                      {errors.telefono && (
                        <p
                          id="error-telefono"
                          className="text-xs font-medium text-red-400"
                        >
                          {errors.telefono.message}
                        </p>
                      )}
                    </div>

                    {/* Tipo de servicio */}
                    <div className="space-y-2">
                      <Label htmlFor="tipo-servicio" className="text-slate-200">
                        Tipo de servicio{" "}
                        <span className="text-blue-400" aria-hidden="true">
                          *
                        </span>
                      </Label>
                      <input
                        type="hidden"
                        {...register("tipoServicio")}
                      />
                      <Select
                        value={selectedService}
                        onValueChange={(value) => {
                          setSelectedService(value);
                          setValue("tipoServicio", value, {
                            shouldValidate: true,
                          });
                        }}
                      >
                        <SelectTrigger
                          id="tipo-servicio"
                          aria-invalid={!!errors.tipoServicio}
                          className={cn(
                            "w-full !h-10 data-[placeholder]:text-slate-500",
                            darkFieldStyles,
                            errors.tipoServicio && "border-red-400/60"
                          )}
                        >
                          <SelectValue placeholder="Selecciona un servicio" />
                        </SelectTrigger>
                        <SelectContent className="border-white/10 bg-[#0a1730] text-slate-100">
                          {serviceOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className="focus:bg-blue-600/20 focus:text-white"
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.tipoServicio && (
                        <p className="text-xs font-medium text-red-400">
                          {errors.tipoServicio.message}
                        </p>
                      )}
                    </div>

                    {/* Mensaje */}
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="mensaje" className="text-slate-200">
                        Mensaje{" "}
                        <span className="text-blue-400" aria-hidden="true">
                          *
                        </span>
                      </Label>
                      <Textarea
                        id="mensaje"
                        rows={5}
                        placeholder="Describe brevemente tu necesidad: ¿deseas constituir una SAS? ¿Necesitas asesoría legal o financiera para tu empresa actual?"
                        aria-invalid={!!errors.mensaje}
                        aria-describedby={
                          errors.mensaje ? "error-mensaje" : undefined
                        }
                        className={cn(
                          "resize-none",
                          darkFieldStyles,
                          errors.mensaje && "border-red-400/60"
                        )}
                        {...register("mensaje")}
                      />
                      {errors.mensaje && (
                        <p
                          id="error-mensaje"
                          className="text-xs font-medium text-red-400"
                        >
                          {errors.mensaje.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="mt-6 h-12 w-full bg-[#25D366] text-base font-semibold text-white shadow-lg shadow-emerald-950/40 transition-all hover:bg-[#1fb958] sm:w-auto sm:px-10"
                  >
                    <Send className="size-5" aria-hidden="true" />
                    Enviar por WhatsApp
                  </Button>

                  <p className="mt-4 text-xs leading-relaxed text-slate-400">
                    Al enviar este formulario se abrirá WhatsApp con tu
                    solicitud prellenada; tus datos llegan directamente a
                    nuestro equipo de asesores y se manejan según nuestra{" "}
                    <a
                      href="#contacto"
                      className="text-blue-400 underline underline-offset-2 hover:text-blue-300"
                    >
                      Política de Privacidad y Protección de Datos
                    </a>
                    .
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Mapa de ubicación */}
        <LocationMap />
      </div>
    </section>
  );
}
