import { getDictionary } from "@/app/dictionaries";
import Research from "@/components/Research";

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ lang: 'en' | 'tr' }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="pt-32 pb-24 min-h-[60vh]">
      <div className="px-6 md:px-16 max-w-[1200px] mx-auto mb-12">
        <h1 className="text-[40px] md:text-[56px] font-bold tracking-[-1.5px] leading-[1.1] text-[#1a1a1a]">
          {lang === 'tr' ? "Makaleler" : "Articles"}
        </h1>
        <p className="mt-6 text-[18px] md:text-[21px] text-[#555] leading-[1.5] max-w-[800px] tracking-[-0.2px]">
          {lang === 'tr' 
            ? "Akademik yayınlarımız ve hakemli araştırmalarımız."
            : "Our academic publications and peer-reviewed research."}
        </p>
      </div>

      <Research dict={dict.research} />
    </div>
  );
}
