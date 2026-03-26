"use client";
import { useEffect, useRef, useState } from "react";

const stories = [
  {
    en: "Working with OrionCAF reduced our call center latency by 60%. The Turkish transcription accuracy on Whisper is unparalleled.",
    tr: "OrionCAF ile çalışmak çağrı merkezi gecikmemizi %60 azalttı. Whisper üzerindeki Türkçe deşifre doğruluğu rakipsiz.",
    author: "Ahmet Y., CTO",
    company: "Telecom Enterprise",
  },
  {
    en: "Their localized RAG system processes our legal documents entirely on-premise. Finally, a solution that respects our data privacy constraints.",
    tr: "Yerelleştirilmiş RAG sistemleri hukuki belgelerimizi tamamen şirket içi (on-premise) işliyor. Nihayet veri gizliliği kısıtlarımıza saygı duyan bir çözüm.",
    author: "Selin K., Managing Partner",
    company: "Corporate Law Firm",
  },
  {
    en: "The n8n automation pipeline they built for our tourism operations replaced 3 distinct manual workflows in just two weeks.",
    tr: "Turizm operasyonlarımız için kurdukları n8n otomasyon boru hattı, sadece iki haftada 3 farklı manuel iş akışının yerini aldı.",
    author: "Mehmet D., Operations Director",
    company: "Global Tourism Group",
  }
];

export default function CustomerSlider({ lang }: { lang: 'en' | 'tr' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window !== "undefined" && (window as any).anime && slideRef.current) {
        (window as any).anime({
          targets: slideRef.current,
          opacity: [1, 0],
          translateX: [0, -20],
          duration: 300,
          easing: "easeInSine",
          complete: () => {
            setCurrentIndex((prev) => (prev + 1) % stories.length);
            (window as any).anime({
              targets: slideRef.current,
              opacity: [0, 1],
              translateX: [20, 0],
              duration: 400,
              easing: "easeOutSine"
            });
          }
        });
      } else {
        setCurrentIndex((prev) => (prev + 1) % stories.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-white border-y border-black/[0.06] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-16 flex flex-col items-center">
        <div className="text-[12px] font-bold text-accent uppercase tracking-[.14em] mb-12">
          {lang === 'tr' ? "Başarı Hikayeleri" : "Success Stories"}
        </div>
        
        <div className="relative w-full max-w-[800px] min-h-[180px] flex items-center justify-center text-center">
          <div ref={slideRef} className="absolute inset-0 flex flex-col items-center justify-center">
            <h3 className="text-[20px] md:text-[28px] font-medium text-[#1a1a1a] leading-[1.5] tracking-[-0.5px] italic mb-8">
              "{stories[currentIndex][lang]}"
            </h3>
            <div className="flex flex-col items-center">
              <div className="text-[15px] font-bold text-accent">{stories[currentIndex].author}</div>
              <div className="text-[13px] text-[#888]">{stories[currentIndex].company}</div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-8">
          {stories.map((_, idx) => (
            <button 
              key={idx} 
              onClick={() => setCurrentIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 border-none p-0 cursor-pointer ${idx === currentIndex ? 'bg-accent' : 'bg-black/10'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
