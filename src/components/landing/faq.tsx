"use client";

import { motion } from "framer-motion";
import { MessageCircleQuestion } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/config/site-config";

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="text-center"
        >
          <p className="text-sm font-semibold tracking-widest text-blue-400 uppercase">
            Preguntas Frecuentes
          </p>
          <h2
            id="faq-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Resolvemos tus dudas antes de empezar
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
            Las respuestas que la mayoría de nuestros clientes pregunta en la
            primera reunión por Zoom.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-10"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-5 transition-colors last:border-b data-[state=open]:border-blue-400/30"
              >
                <AccordionTrigger className="py-4 text-left text-sm font-semibold text-white hover:no-underline hover:text-blue-300 sm:text-base [&>svg]:size-5 [&>svg]:text-blue-400">
                  <span className="flex items-start gap-3">
                    <MessageCircleQuestion
                      className="mt-0.5 size-5 shrink-0 text-blue-400"
                      aria-hidden="true"
                    />
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-5 pl-8 text-sm leading-relaxed text-slate-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
