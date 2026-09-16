"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { company, type LegalDocumentId } from "@/config/site-config";

/**
 * Modales de documentación legal (Términos, Privacidad y Reembolso),
 * redactados bajo la legislación ecuatoriana vigente.
 */

type LegalDoc = {
  id: LegalDocumentId;
  title: string;
  lastUpdated: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
};

const legalDocs: Record<LegalDocumentId, LegalDoc> = {
  terminos: {
    id: "terminos",
    title: "Términos y Condiciones de Uso",
    lastUpdated: "Última actualización: enero de 2025",
    intro: `Los presentes Términos y Condiciones regulan el uso del sitio web y la contratación de los servicios profesionales de ${company.legalName}, identificado con RUC ${company.ruc}, con domicilio en ${company.address}. Al utilizar este sitio o contratar nuestros servicios, usted declara haber leído, comprendido y aceptado íntegramente estos términos, de conformidad con la legislación de la República del Ecuador.`,
    sections: [
      {
        heading: "1. Objeto del servicio",
        body: [
          `${company.legalName} presta servicios profesionales de consultoría empresarial, incluyendo: (a) constitución y creación de compañías por acciones simplificadas (SAS) conforme a la Ley Orgánica de Emprendimiento e Innovación (LOEI); (b) asesoría y asistencia legal empresarial; y (c) consultoría y asistencia financiera y tributaria.`,
          "Los servicios se prestan de forma 100% remota, principalmente mediante reuniones por videollamada (Zoom) y canales oficiales de comunicación, salvo que se acuerde expresamente una modalidad distinta.",
        ],
      },
      {
        heading: "2. Naturaleza del servicio y limitación de responsabilidad",
        body: [
          "Nuestros servicios tienen carácter de asesoría profesional y gestión administrativa. La compañía no garantiza resultados jurisdiccionales ni decisiones administrativas que dependan exclusivamente de instituciones públicas o terceros, tales como la Superintendencia de Compañías, Valores y Seguros, el Servicio de Rentas Internas (SRI), notarías u otras entidades.",
          "Los tiempos de trámite publicados son estimaciones referenciales y pueden variar por causas ajenas a nuestra voluntad, incluyendo cargas administrativas, cambios normativos o requerimientos adicionales de las autoridades competentes.",
        ],
      },
      {
        heading: "3. Obligaciones del cliente",
        body: [
          "El cliente se obliga a: (a) suministrar información veraz, completa y actualizada; (b) entregar la documentación requerida en los formatos y plazos acordados; (c) efectuar los pagos de honorarios y tasas en las fechas pactadas; y (d) revisar y aprobar oportunamente los documentos que se le sometan a consideración.",
          "Los retrasos atribuibles al cliente en la entrega de información o aprobaciones podrán extender los plazos de ejecución sin responsabilidad para la compañía.",
        ],
      },
      {
        heading: "4. Honorarios, pagos y pasarelas autorizadas",
        body: [
          "Los honorarios son los fijados en la propuesta económica aceptada por el cliente. Los pagos se procesan exclusivamente a través de las pasarelas de pago autorizadas Nuvei y Datalink, con tarjetas de crédito o débito Visa, Mastercard, Diners Club y Discover, u otros medios expresamente habilitados.",
          "Toda transacción se procesa bajo protocolos de seguridad PCI DSS mediante formularios seguros de la pasarela. La compañía no almacena datos completos de tarjetas de crédito en sus sistemas.",
        ],
      },
      {
        heading: "5. Propiedad intelectual",
        body: [
          "Los contenidos de este sitio web —marcas, logotipos, textos, diseños y materiales— son propiedad de la compañía o de sus licenciantes y se encuentran protegidos por la normativa de propiedad intelectual ecuatoriana. Queda prohibida su reproducción total o parcial sin autorización escrita.",
          "Los documentos societarios elaborados a medida para el cliente le serán entregados una vez cancelada la totalidad de los honorarios pactados.",
        ],
      },
      {
        heading: "6. Confidencialidad",
        body: [
          "Ambas partes se obligan a mantener confidencialidad sobre la información comercial, financiera y societaria intercambiada con motivo de la prestación de los servicios, obligación que subsiste incluso después de la terminación de la relación contractual.",
        ],
      },
      {
        heading: "7. Jurisdicción y ley aplicable",
        body: [
          "Estos términos se rigen por las leyes de la República del Ecuador. Para cualquier controversia derivada de su interpretación o ejecución, las partes se someten a los jueces competentes del distrito metropolitano de Quito, con renuncia expresa a cualquier otro fuero.",
        ],
      },
    ],
  },
  privacidad: {
    id: "privacidad",
    title: "Política de Privacidad y Protección de Datos Personales",
    lastUpdated: "Última actualización: enero de 2025",
    intro: `${company.legalName}, RUC ${company.ruc}, con domicilio en ${company.address} ("el Responsable"), trata los datos personales de sus clientes, potenciales clientes y visitantes en cumplimiento de la Ley Orgánica de Protección de Datos Personales del Ecuador (LOPDP, Registro Oficial Suplemento 459 de 10 de mayo de 2021) y su reglamento.`,
    sections: [
      {
        heading: "1. Responsable del tratamiento",
        body: [
          `El responsable del tratamiento de sus datos personales es ${company.legalName}. Para todo lo relacionado con la protección de datos puede escribirnos a ${company.email} o llamarnos al ${company.phone}.`,
        ],
      },
      {
        heading: "2. Datos que recopilamos",
        body: [
          "Datos identificativos y de contacto: nombre completo, correo electrónico, número de teléfono y, cuando la prestación del servicio lo requiera, datos societarios y documentación corporativa aportada voluntariamente por el titular.",
          "Datos de navegación: información técnica básica generada por el uso del sitio web. No recopilamos categorías especiales de datos ni datos financieros completos de tarjetas; los pagos se procesan directamente en las pasarelas certificadas Nuvei y Datalink.",
        ],
      },
      {
        heading: "3. Finalidades y base legal del tratamiento",
        body: [
          "Atender sus solicitudes de información y presupuestos (base legal: consentimiento y medidas precontractuales); prestar los servicios profesionales contratados y cumplir obligaciones legales, contables y tributarias (base legal: ejecución de contrato y obligación legal); y enviarle comunicaciones comerciales sobre nuestros servicios únicamente si ha otorgado su consentimiento expreso.",
          "El consentimiento puede retirarse en cualquier momento sin efecto retroactivo, escribiendo a nuestro correo de contacto.",
        ],
      },
      {
        heading: "4. Plazo de conservación",
        body: [
          "Conservaremos sus datos personales durante el tiempo necesario para cumplir las finalidades descritas y los plazos legales aplicables (incluyendo obligaciones tributarias y contables de conservación documental), tras los cuales serán eliminados o anonimizados de forma segura.",
        ],
      },
      {
        heading: "5. Destinatarios y transferencias",
        body: [
          "No cedemos ni comercializamos sus datos personales con terceros. Únicamente los compartimos cuando resulte necesario para la prestación del servicio (por ejemplo, gestores de trámites ante la Superintendencia de Compañías o el SRI) o cuando exista obligación legal.",
          "Los proveedores tecnológicos que utilizamos (alojamiento web, videollamadas y pasarelas de pago) actúan bajo encargo del responsable y con garantías adecuadas de seguridad y confidencialidad.",
        ],
      },
      {
        heading: "6. Derechos de los titulares",
        body: [
          "De conformidad con la LOPDP, usted puede ejercer en cualquier momento sus derechos de: acceso, rectificación, supresión (olvido), oposición, portabilidad y de ser informado sobre tratamiento y cesiones, así como presentar reclamaciones ante la Superintendencia de Protección de Datos Personales.",
          "Para ejercer sus derechos, envíe una solicitud a nuestro correo de contacto indicando su nombre, medio de contacto y derecho que desea ejercer. Responderemos dentro de los plazos establecidos por la normativa vigente.",
        ],
      },
      {
        heading: "7. Seguridad de la información",
        body: [
          "Aplicamos medidas técnicas y organizativas apropiadas para proteger sus datos contra pérdida, uso indebido o acceso no autorizado, incluyendo cifrado en tránsito (HTTPS/TLS), control de accesos y minimización de datos.",
        ],
      },
    ],
  },
  reembolso: {
    id: "reembolso",
    title: "Política de Reembolso, Cancelación y Devoluciones",
    lastUpdated: "Última actualización: enero de 2025",
    intro: `La presente política regula los reembolsos, cancelaciones y devoluciones de los servicios prestados por ${company.legalName}, RUC ${company.ruc}, en aplicación del derecho ecuatoriano, en particular la Ley Orgánica de Defensa del Consumidor (LODC) y las normas de la LOEI aplicables a servicios profesionales.`,
    sections: [
      {
        heading: "1. Derecho de desistimiento previo a la ejecución",
        body: [
          "El cliente puede cancelar la contratación de un servicio y solicitar el reembolso total (100%) de los honorarios pagados, siempre que la solicitud se realice antes de que la compañía haya iniciado cualquier gestión, elaboración de documentos o presentación de trámites ante instituciones públicas o privadas.",
        ],
      },
      {
        heading: "2. Cancelación con servicios en ejecución",
        body: [
          "Si la cancelación se solicita una vez iniciada la ejecución del servicio, se descontará del reembolso: (a) la proporción de honorarios correspondiente al trabajo efectivamente realizado hasta la fecha; y (b) los gastos no recuperables pagados a terceros (tasas de la Superintendencia de Compañías, notariado, firma electrónica, entre otros), que no son reembolsables por corresponder a costos de terceros.",
          "El saldo reembolsable se calculará y comunicará al cliente por escrito dentro de los cinco (5) días hábiles siguientes a la solicitud de cancelación.",
        ],
      },
      {
        heading: "3. Servicios no reembolsables",
        body: [
          "No procede el reembolso cuando: (a) el trámite principal ya ha sido aprobado por la autoridad competente; (b) el servicio legal o de consultoría ya fue prestado en su totalidad, incluida la entrega de documentos finales y asesorías; o (c) el cliente incumplió gravamente sus obligaciones de información o pago, impidiendo la ejecución normal del servicio.",
        ],
      },
      {
        heading: "4. Procedimiento de solicitud",
        body: [
          "Las solicitudes de reembolso o cancelación deben dirigirse por escrito a nuestro correo de contacto, indicando nombre, datos de la contratación y motivo. El plazo máximo de respuesta es de cinco (5) días hábiles.",
          "Una vez aprobado el reembolso, este se procesará a través de la misma pasarela de pago utilizada en la transacción original (Nuvei o Datalink), abonándose a la misma tarjeta con la que se efectuó el pago.",
        ],
      },
      {
        heading: "5. Plazos de devolución",
        body: [
          "Los reembolsos aprobados se procesan dentro de un plazo máximo de diez (10) a quince (15) días hábiles desde la aprobación, plazo que puede verse sujeto a los tiempos de liquidación de la entidad bancaria o de la pasarela de pago emisora, ajenos a nuestra voluntad.",
        ],
      },
      {
        heading: "6. Reclamos y defensoría del consumidor",
        body: [
          "En caso de desacuerdo con la resolución de un reclamo, el consumidor podrá acudir a las juntas de defensa del consumidor o a la autoridad competente, conforme a la LODC. Esta política no limita los derechos irrenunciables que asisten al consumidor por ley.",
        ],
      },
    ],
  },
};

export function LegalModal({
  docId,
  open,
  onOpenChange,
}: {
  docId: LegalDocumentId | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const doc = docId ? legalDocs[docId] : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[85vh] w-full gap-0 overflow-hidden border-white/10 bg-[#0a1730] p-0 text-slate-200 sm:max-w-2xl"
        aria-describedby={undefined}
      >
        {doc && (
          <>
            <DialogHeader className="border-b border-white/10 bg-white/[0.03] px-6 py-5">
              <DialogTitle className="pr-8 text-left text-lg font-semibold text-white sm:text-xl">
                {doc.title}
              </DialogTitle>
              <DialogDescription className="text-left text-xs text-slate-400">
                {doc.lastUpdated} · {company.legalName} · RUC {company.ruc}
              </DialogDescription>
            </DialogHeader>

            <div className="legal-scroll max-h-[60vh] overflow-y-auto px-6 py-5">
              <p className="text-sm leading-relaxed text-slate-300">
                {doc.intro}
              </p>
              <div className="mt-5 space-y-5">
                {doc.sections.map((section) => (
                  <section key={section.heading}>
                    <h3 className="text-sm font-semibold text-blue-300">
                      {section.heading}
                    </h3>
                    {section.body.map((paragraph, i) => (
                      <p
                        key={i}
                        className="mt-2 text-sm leading-relaxed text-slate-300"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </section>
                ))}
              </div>
              <p className="mt-6 border-t border-white/10 pt-4 text-xs leading-relaxed text-slate-500">
                Documento informativo proporcionado por {company.legalName}.
                Para consultar la versión completa en formato PDF o solicitar
                aclaraciones, contáctenos en {company.email} o al {company.phone}.
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
