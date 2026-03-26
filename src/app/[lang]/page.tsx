import { getDictionary } from "@/app/dictionaries";
import Hero from "@/components/Hero";
import Metrics from "@/components/Metrics";
import Services from "@/components/Services";
import Features from "@/components/Features";
import Projects from "@/components/Projects";
import CustomerSlider from "@/components/CustomerSlider";
import ResourcesGrid from "@/components/ResourcesGrid";
import CtaBanner from "@/components/CtaBanner";
import ScrollReveal from "@/components/ScrollReveal";

export default async function Home({ params }: { params: Promise<{ lang: 'en' | 'tr' }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <ScrollReveal>
        <Hero dict={dict.hero} lang={lang} />
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
        <CustomerSlider lang={lang} />
      </ScrollReveal>
      <ScrollReveal>
        <ResourcesGrid lang={lang} />
      </ScrollReveal>
      <ScrollReveal>
        <CtaBanner dict={dict.cta} />
      </ScrollReveal>
    </>
  );
}
