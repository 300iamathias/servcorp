# Servicios Corporativos — Landing Page

Landing page corporativa profesional para una firma de consultoría empresarial en Ecuador: **constitución de compañías SAS, asesoría legal corporativa y consultoría financiera**.

> 🇪🇨 Proceso 100% remoto vía Zoom · Diseño ejecutivo oscuro/azul · Mobile-first · Listo para GitHub y Vercel

![Next.js](https://img.shields.io/badge/Next.js-16-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4) ![Prisma](https://img.shields.io/badge/Prisma-6-2D3748) ![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-New_York-8B5CF6)

---

## ✨ Funcionalidades

- **Navbar sticky** con menú de navegación y botón directo «Agendar Consulta por Zoom»
- **Hero** con propuesta de valor, CTAs de WhatsApp/Zoom y métricas de confianza
- **Grid de servicios**: Constitución de SAS · Asesoría Legal · Consultoría Financiera
- **Cómo Trabajamos**: proceso en 4 pasos, 100% remoto vía Zoom
- **Testimonios** de clientes con calificación 5 estrellas
- **FAQ** con acordeón animado
- **Formulario de contacto conectado a WhatsApp** (validado en cliente): al enviarse, abre WhatsApp con la solicitud estructurada y prellenada — sin base de datos ni backend
- **Simulador de pago en línea** (checkout demo estilo Nuvei/Datafast) para mostrar el flujo de cobro al cliente final
- **Footer compliant** para pasarelas de pago (Nuvei/Datafast): RUC, razón social, dirección, teléfono, correo, badges Visa/Mastercard/Diners/Discover
- **Modales legales**: Términos y Condiciones (LOEI), Política de Privacidad (LOPDP) y Política de Reembolso (LODC)
- **Franja «Modo Vista Previa»** desactivable con una línea (ideal para presentar la maqueta al cliente)
- **Botón flotante de WhatsApp** siempre visible
- Animaciones suaves con Framer Motion · Scrollbar personalizada · Accesibilidad (ARIA, teclado)

## 🧱 Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Lenguaje | TypeScript 5 (modo estricto) |
| Estilos | Tailwind CSS 4 + shadcn/ui (New York) + Lucide Icons |
| Animaciones | Framer Motion |
| Validación | Zod + React Hook Form |
| Contacto | API de WhatsApp (`wa.me`) — sin base de datos |

## 🚀 Puesta en marcha local

Requisitos: [Node.js 18+](https://nodejs.org) y opcionalmente [Bun](https://bun.sh) (recomendado) o npm/pnpm.

```bash
# 1. Instalar dependencias
bun install        # o: npm install

# 2. Levantar el servidor de desarrollo
bun run dev        # o: npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

> El formulario de contacto funciona sin base de datos: abre WhatsApp con la solicitud prellenada. Las carpetas `prisma/` y `db/` incluidas son una base opcional para una futura versión con guardado de leads (ver «Migrar a producción con base de datos»).

## 📦 Estructura del proyecto

```
src/
├── app/
│   ├── api/contact/route.ts     # API del formulario (validación + Prisma)
│   ├── layout.tsx               # Metadata SEO en español
│   ├── page.tsx                 # Landing (ensambla las secciones)
│   └── globals.css              # Tema, scroll suave y scrollbar custom
├── components/
│   ├── landing/                 # navbar, hero, servicios, proceso,
│   │                            # testimonios, FAQ, contacto, footer,
│   │                            # modales legales, WhatsApp flotante
│   └── ui/                      # Kit shadcn/ui completo
├── config/site-config.ts        # ⭐ ÚNICA fuente de datos del negocio
├── hooks/  ·  lib/
prisma/schema.prisma             # Modelo ContactMessage
```

## ✏️ Personalización (importante para producción)

Todos los datos del negocio —RUC, razón social, dirección, teléfonos, correo, **número de WhatsApp donde llegan los leads**, enlaces de Zoom, testimonios, FAQ, franja de vista previa y textos legales— se centralizan en **un solo archivo**:

```bash
src/config/site-config.ts
```

Edítalo con los datos reales de la empresa antes de publicar. Los textos de los modales legales se editan en `src/components/landing/legal-modals.tsx` y los planes de ejemplo del simulador de pago en `src/components/landing/payment-demo.tsx`.

## ☁️ Despliegue en Vercel

### 1. Subir a GitHub

```bash
git init
git add .
git commit -m "feat: landing page Servicios Corporativos"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/servicios-corporativos-landing.git
git push -u origin main
```

> El `.gitignore` ya excluye `.env` (pero sí incluye `.env.example`), `node_modules` y `.next`.

### 2. Importar en Vercel

1. Entra a [vercel.com/new](https://vercel.com/new) e importa el repositorio.
2. Vercel detecta Next.js automáticamente. **No se requiere configurar ninguna variable de entorno** — el formulario funciona vía WhatsApp.
3. Clic en **Deploy**. En 2 minutos tendrás tu sitio en `tu-proyecto.vercel.app`.

### 💳 Cómo funcionan los pagos en producción

El sitio muestra la infraestructura de cobro (badges Nuvei/Datafast + simulador). Para cobrar de verdad, el comercio genera un **link de pago** desde su panel de Nuvei o Datafast y lo envía por correo/WhatsApp junto con la propuesta. Opcionalmente puede publicarse un botón fijo; el simulador del footer indica exactamente dónde integrarlo.

### 🔒 (Opcional) Migrar a producción con base de datos

Si el cliente quisiera guardar los leads del formulario en una base de datos en lugar de recibirlos por WhatsApp:

1. Crea una base gratuita en [Neon](https://neon.tech) o [Supabase](https://supabase.com).
2. Cambia `provider = "postgresql"` en `prisma/schema.prisma`, apunta `DATABASE_URL` a tu base y ejecuta `npx prisma db push`.
3. Recrea el endpoint `POST /api/contact` (React Hook Form + Zod ya están listos en `src/components/landing/contact-form.tsx`) y en Vercel agrega la variable `DATABASE_URL`.

## 📜 Scripts disponibles

| Comando | Descripción |
|---|---|
| `bun run dev` | Servidor de desarrollo |
| `bun run build` | Build de producción |
| `bun run lint` | ESLint |
| `bun run db:push` | (Opcional) Sincroniza el esquema Prisma con la BD |

---

© 2025 Servicios Corporativos S.A.S. — Proyecto de demostración. Datos de contacto y testimonios ficticios con fines de ejemplo.
