import { getDictionary } from "@/app/dictionaries";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ lang: 'en' | 'tr'; slug: string }>;
}) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="pt-32 pb-24 px-6 md:px-16 max-w-[1200px] mx-auto min-h-[60vh]">
      <div className="text-[12px] font-bold text-accent uppercase tracking-[.14em] mb-4">
        {dict.projects.tag || "PROJECT"}
      </div>
      <h1 className="text-[40px] md:text-[56px] font-bold tracking-[-1.5px] leading-[1.1] mb-8 text-[#1a1a1a] capitalize">
        {slug.replace(/-/g, ' ')}
      </h1>
      
      <div className="prose prose-lg max-w-none text-[#555] leading-relaxed">
        <p>
          {lang === 'tr' 
            ? "Bu sayfa şu an yapım aşamasındadır. Proje detayları yakında eklenecektir."
            : "This page is currently under construction. Project details will be added soon."}
        </p>
      </div>
    </div>
  );
}
