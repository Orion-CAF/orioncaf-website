export default function Research({ dict }: { dict: any }) {
  return (
    <section className="px-6 md:px-16 max-w-[1200px] mx-auto pb-24" id="research">
      <div className="text-[12px] font-bold text-accent uppercase tracking-[.14em] mb-4">{dict.tag}</div>
      <div className="flex flex-wrap items-center gap-4 mb-10">
        <h2 className="text-[32px] md:text-[42px] font-bold tracking-[-1px] leading-[1.12] text-[#1a1a1a]">
          {dict.title}
        </h2>
        <span className="text-[11px] font-bold text-accent bg-green-50 px-3 py-1 rounded-full border border-accent/20 tracking-wider uppercase inline-block">Peer-Reviewed</span>
      </div>
      <div className="bg-white border border-black/[0.06] rounded-2xl p-7 md:px-8 md:py-7 flex flex-col md:flex-row items-start gap-5">
        <div className="w-11 h-11 shrink-0 rounded-xl bg-green-50 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="3" y="2" width="14" height="16" rx="2" stroke="#497D15" strokeWidth="1.2"/>
            <path d="M6.5 6.5h7M6.5 10h7M6.5 13.5h4.5" stroke="#497D15" strokeWidth="1" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <div className="text-[16px] font-bold mb-2 leading-[1.4] text-[#1a1a1a]">
            {dict.paperTitle}
          </div>
          <div className="text-[13px] text-[#888] mb-2">
            {dict.paperAuthor}
          </div>
          <div className="text-[13px] text-accent font-semibold">
            {dict.paperJournal}
          </div>
        </div>
      </div>
    </section>
  );
}
