/**
 * Configuración central del sitio — Servicios Corporativos S.A.S.
 * Modifica únicamente este archivo para actualizar los datos corporativos,
 * enlaces de contacto y pasarelas de pago de toda la landing page.
 */

export const company = {
  name: "Servicios Corporativos",
  legalName: "Servicios Corporativos S.A.S.",
  ruc: "1792938475001",
  address:
    "Av. República de El Salvador N36-64 y Av. Naciones Unidas, Edificio Metrópolis, Piso 8, Oficina 802, Quito – Ecuador",
  city: "Quito, Ecuador",
  phone: "+593 2 513 8400",
  phoneHref: "tel:+59325138400",
  whatsapp: "+593 99 214 7856",
  whatsappNumber: "593992147856",
  email: "contacto@servicioscorporativos.ec",
  schedule: "Lunes a Viernes · 09:00 – 18:00 (ECT, GMT-5)",
  founded: 2016,
} as const;

/** Enlace directo para agendar una reunión de diagnóstico por Zoom (sin costo). */
export const zoomBookingUrl = "#contacto";

/** Enlace directo de WhatsApp con mensaje precargado. */
export const whatsappUrl = `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(
  "Hola, deseo información sobre los servicios de constitución de compañías SAS y asesoría legal/financiera."
)}`;

/**
 * Mapa de ubicación (Google Maps, sin API key).
 * Al cambiar la dirección real de la empresa, actualiza también estas dos URLs.
 */
export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  "Edificio Metrópolis, Av. República de El Salvador N36-64, Quito, Ecuador"
)}&z=16&output=embed`;

export const mapDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  "Edificio Metrópolis, Av. República de El Salvador N36-64, Quito, Ecuador"
)}`;

export const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
] as const;

export const serviceOptions = [
  {
    value: "constitucion-sas",
    label: "Constitución y Creación de Empresas SAS",
  },
  {
    value: "asesoria-legal",
    label: "Asesoría y Asistencia Legal Empresarial",
  },
  {
    value: "consultoria-financiera",
    label: "Consultoría y Asistencia Financiera",
  },
  {
    value: "otro",
    label: "Otro / No estoy seguro aún",
  },
] as const;

/** Pasarelas de pago autorizadas y tarjetas aceptadas (footer compliant). */
export const paymentGateways = ["Nuvei", "Datalink"] as const;

/**
 * Franja superior de "Modo Vista Previa".
 * Cambia `enabled` a false cuando el sitio pase a producción con los
 * datos reales del cliente, y la franja desaparecerá de todo el sitio.
 */
export const demoBanner = {
  enabled: true,
  title: "MODO VISTA PREVIA",
  message:
    "Este sitio es una propuesta de maquetación técnica y visual. Los datos, cifras y testimonios mostrados son únicamente de referencia y se personalizarán con la información real del cliente.",
} as const;

/** Crédito de desarrollo en el pie de página. */
export const developerCredit = {
  prefix: "Desarrollado por",
  agency: "Jimbra",
  url: "https://jimbra.net",
} as const;

export const acceptedCards = [
  { brand: "Visa" },
  { brand: "Mastercard" },
  { brand: "Diners Club" },
  { brand: "Discover" },
] as const;

/** Documentos legales disponibles en el footer (se abren en modales). */
export const legalDocuments = [
  {
    id: "terminos",
    label: "Términos y Condiciones de Uso",
    title: "Términos y Condiciones de Uso",
    lastUpdated: "Última actualización: enero de 2025",
  },
  {
    id: "privacidad",
    label: "Política de Privacidad y Protección de Datos",
    title: "Política de Privacidad y Protección de Datos Personales",
    lastUpdated: "Última actualización: enero de 2025",
  },
  {
    id: "reembolso",
    label: "Política de Reembolso, Cancelación y Devoluciones",
    title: "Política de Reembolso, Cancelación y Devoluciones",
    lastUpdated: "Última actualización: enero de 2025",
  },
] as const;

export type LegalDocumentId = (typeof legalDocuments)[number]["id"];

/** Testimonios de clientes (datos de ejemplo para la demo). */
export const testimonials = [
  {
    quote:
      "Constituí mi SAS en menos de tres semanas sin salir de casa. El acompañamiento por Zoom fue impecable: me explicaron cada paso y tuve mi RUC y mi cuenta BTE funcionando rápido. Totalmente recomendados.",
    name: "Carlos Mendoza",
    role: "Director General",
    company: "AgroAndes Trading S.A.S.",
    city: "Quito",
  },
  {
    quote:
      "Llevan la asesoría legal de nuestras tres compañías: contratos, reformas de estatutos y cumplimiento. Responden siempre el mismo día y eso para mí vale oro. Un aliado estratégico real.",
    name: "Andrea Villagómez",
    role: "Gerente Propietaria",
    company: "Grupo AV Consultores S.A.S.",
    city: "Guayaquil",
  },
  {
    quote:
      "Su consultoría financiera nos ordenó el flujo de caja y las declaraciones al SRI. Por fin tomamos decisiones con números claros y ahorramos en impuestos de forma 100% legal.",
    name: "Diego Zambrano",
    role: "Fundador",
    company: "TecnoSwift S.A.S.",
    city: "Manta",
  },
] as const;

/** Preguntas frecuentes (datos de ejemplo para la demo). */
export const faqs = [
  {
    question: "¿Qué es una compañía SAS y por qué conviene constituirla en Ecuador?",
    answer:
      "La Sociedad por Acciones Simplificada (SAS) fue creada por la Ley Orgánica de Emprendimiento e Innovación (LOEI). Permite constituir la empresa 100% en línea, con responsabilidad limitada al capital aportado, un solo accionista, libertad para definir los estatutos y capital social en BTE (bienes y derechos escindibles). Es la figura ideal para emprendedores y pymes.",
  },
  {
    question: "¿Cuánto tarda la constitución de una SAS?",
    answer:
      "Con la documentación completa, el proceso suele tomar entre 8 y 15 días hábiles, incluyendo la inscripción en la Superintendencia de Compañías y la obtención del RUC. Los plazos dependen de la carga administrativa de las instituciones públicas, y te mantenemos informado en cada etapa.",
  },
  {
    question: "¿De verdad todo el proceso es 100% remoto?",
    answer:
      "Sí. Toda la asesoría y el seguimiento se realizan mediante videollamadas por Zoom, correo y WhatsApp. Los trámites se gestionan en línea con firma electrónica, por lo que puedes estar en cualquier ciudad de Ecuador — o en el exterior — y constituir tu empresa sin visitar oficinas.",
  },
  {
    question: "¿Cuánto cuestan los servicios?",
    answer:
      "La reunión de diagnóstico por Zoom es gratuita y sin compromiso. A partir de ahí preparamos una propuesta con honorarios fijos y transparentes según el alcance: constitución completa, planes de acompañamiento legal mensual o consultoría financiera puntual. Sin costos ocultos.",
  },
  {
    question: "¿Qué formas de pago aceptan?",
    answer:
      "Aceptamos tarjetas de crédito y débito Visa, Mastercard, Diners Club y Discover, procesadas de forma segura a través de las pasarelas de pago Nuvei y Datalink, además de transferencias bancarias para planes corporativos.",
  },
  {
    question: "¿Trabajan con clientes en todo el Ecuador?",
    answer:
      "Sí, atendemos a clientes en todo el país (Quito, Guayaquil, Cuenca, Manta, Ambato y más) así como a ecuatorianos residentes en el exterior que desean constituir empresas en Ecuador. Al ser 100% remotos, la ubicación no es una barrera.",
  },
] as const;
