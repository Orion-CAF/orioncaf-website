import { getDictionary } from "@/app/dictionaries";

export default async function BlogsPage({
  params,
}: {
  params: Promise<{ lang: 'en' | 'tr' }>;
}) {
  const { lang } = await params;

  return (
    <div className="pt-32 pb-24 px-6 md:px-16 max-w-[1200px] mx-auto min-h-[60vh]">
      <h1 className="text-[40px] md:text-[56px] font-bold tracking-[-1.5px] leading-[1.1] mb-8 text-[#1a1a1a]">
        {lang === 'tr' ? "Medium Yazıları" : "Medium Blogs"}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white border border-black/5 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="h-40 bg-zinc-100 rounded-xl mb-6"></div>
            <div className="text-[12px] font-bold text-accent uppercase tracking-wider mb-3">AI Engineeering</div>
            <h3 className="text-[20px] font-bold leading-tight mb-3 text-[#1a1a1a]">
              {lang === 'tr' ? "Yapay Zeka Mimarisinde Gelecek" : "The Future of AI Architecture"}
            </h3>
            <p className="text-[#666] text-[15px] leading-relaxed mb-6">
              {lang === 'tr' 
                ? "Büyük dil modellerinin kurumsal süreçlere entegrasyonu hakkında..."
                : "Integrating large language models into enterprise workflows..."}
            </p>
            <div className="flex items-center text-[14px] font-semibold text-accent">
              <span>{lang === 'tr' ? "Devamını Oku" : "Read More"}</span>
              <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
