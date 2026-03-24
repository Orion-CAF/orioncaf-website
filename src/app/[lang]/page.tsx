import { getDictionary } from "@/app/dictionaries";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Metrics from "@/components/Metrics";
import Services from "@/components/Services";
import Features from "@/components/Features";
import Projects from "@/components/Projects";
import Research from "@/components/Research";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default async function Home({ params }: { params: Promise<{ lang: 'en' | 'tr' }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Navbar dict={dict.nav} lang={lang} contactDict={dict.contactModal} />
      <ScrollReveal>
        <Hero dict={dict.hero} />
      </ScrollReveal>
      <ScrollReveal>
        <Metrics dict={dict.metrics} />
      </ScrollReveal>
      <ScrollReveal>
        <Services dict={dict.services} />
      </ScrollReveal>
      <ScrollReveal>
        <Features dict={dict.features} />
      </ScrollReveal>
      <ScrollReveal>
        <Projects dict={dict.projects} />
      </ScrollReveal>
      <ScrollReveal>
        <Research dict={dict.research} />
      </ScrollReveal>
      <ScrollReveal>
        <CtaBanner dict={dict.cta} />
      </ScrollReveal>
      <Footer dict={dict.footer} />
    </>
  );
}
