export default function ResourcesGrid({ lang }: { lang: 'en' | 'tr' }) {
  const articles = [
    {
      type: lang === 'tr' ? "Hakemli Makale" : "Peer-Reviewed",
      title: lang === 'tr' ? "Türkçe Büyük Dil Modellerinde Nicemleme Etkisi" : "Quantization Compensation in Turkish LLMs",
      desc: lang === 'tr' 
        ? "Veri Bilimi Dergisi 2025 (Vol 8, No 2) üzerinde yayınlanmış INT4/INT8 bellek ve performans analizi raporu." 
        : "INT4/INT8 memory and performance analysis report published in Data Science Journal 2025 (Vol 8, No 2).",
    },
    {
      type: "Medium",
      title: lang === 'tr' ? "Whisper ile Saniye Altı Gecikme" : "Sub-Second Latency with Whisper",
      desc: lang === 'tr'
        ? "Gerçek zamanlı ses uygulamalarında Pipecat, LiveKit ve özel API'ler üzerinden gecikmeyi nasıl 200ms altına düşürdük?"
        : "How we reduced Voice AI latency below 200ms using Pipecat, LiveKit, and custom API integrations.",
    },
    {
      type: "Case Study",
      title: lang === 'tr' ? "Hukuk Ekosisteminde RAG Kurulumu" : "RAG Integration in Legal Ecosystems",
      desc: lang === 'tr'
        ? "Hukuki metinlerde halüsinasyonları %99 oranında engelleyen ve kaynak göstererek yanıt veren hibrit arama mimarimiz."
        : "Our hybrid search architecture that prevents hallucinations by 99% in legal documents through strict source-based retrieval."
    }
  ];

  return (
    <section className="py-24 px-6 md:px-16 max-w-[1200px] mx-auto bg-[#FAF9F6]">
      <div className="text-[12px] font-bold text-accent uppercase tracking-[.14em] mb-4">
        {lang === 'tr' ? "Kaynaklar & Yayınlar" : "Resources & Publications"}
      </div>
      <h2 className="text-[32px] md:text-[42px] font-bold tracking-[-1px] leading-[1.12] mb-12 text-[#1a1a1a]">
        {lang === 'tr' ? "Teknik İçgörüler" : "Technical Insights"}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((item, idx) => (
          <div key={idx} className="bg-white border border-black/[0.06] rounded-2xl p-7 hover:shadow-lg transition-all duration-300 group cursor-pointer hover:border-black/15 flex flex-col h-full">
            <div className="inline-block text-[11px] font-semibold text-accent bg-green-50 px-3 py-1 rounded-full mb-6 max-w-max tracking-wider">
              {item.type}
            </div>
            <h3 className="text-[20px] font-bold mb-3 text-[#1a1a1a] leading-[1.3] group-hover:text-accent transition-colors">
              {item.title}
            </h3>
            <p className="text-[14px] text-[#666] leading-[1.6] flex-1">
              {item.desc}
            </p>
            <div className="mt-8 flex items-center text-[13px] font-bold text-[#1a1a1a] group-hover:text-accent transition-colors">
              {lang === 'tr' ? "Detayları Oku" : "Read Full Article"}
              <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
