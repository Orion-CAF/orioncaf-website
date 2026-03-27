import { getDictionary } from "@/app/dictionaries";

export default async function PricingPage({ params }: { params: Promise<{ lang: 'en' | 'tr' }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-16 max-w-[1200px] mx-auto flex flex-col items-center justify-center">
      <h1 className="text-[36px] md:text-[52px] font-bold tracking-tight text-[#1a1a1a] mb-6 text-center">
        {lang === 'tr' ? 'Fiyatlandırma' : 'Pricing'}
      </h1>
      <p className="text-[16px] md:text-[20px] text-[#666] max-w-[600px] text-center mb-12">
        {lang === 'tr' 
          ? 'Kurumsal ihtiyaçlarınıza özel ölçeklenebilir altyapı ve yapay zeka modelleri için bizimle iletişime geçin.' 
          : 'Contact us for scalable infrastructure and custom AI models tailored to your enterprise needs.'}
      </p>
      
      <div className="bg-[#FFF7ED] border border-black/[0.06] rounded-2xl p-8 md:p-12 w-full max-w-[800px] flex flex-col items-center">
        <h2 className="text-[24px] font-bold text-[#1a1a1a] mb-4">Enterprise Custom</h2>
        <ul className="text-[15px] text-[#555] space-y-3 mb-8 w-full max-w-[400px]">
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#497D15]"></div> Dedicated Infrastructure</li>
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#497D15]"></div> Custom Model Tweaking</li>
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#497D15]"></div> 24/7 Priority Support</li>
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#497D15]"></div> SLA Guarantees</li>
        </ul>
      </div>
    </div>
  );
}
