import { DemoBanner } from "@/components/landing/demo-banner";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Services } from "@/components/landing/services";
import { HowWeWork } from "@/components/landing/how-we-work";
import { Testimonials } from "@/components/landing/testimonials";
import { Faq } from "@/components/landing/faq";
import { ContactSection } from "@/components/landing/contact-form";
import { Footer } from "@/components/landing/footer";
import { FloatingWhatsApp } from "@/components/landing/floating-whatsapp";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#050c1d] text-slate-200 antialiased">
      <DemoBanner />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <HowWeWork />
        <Testimonials />
        <Faq />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
