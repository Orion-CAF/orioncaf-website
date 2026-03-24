export default function Features({ dict }: { dict: any }) {
  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-16 pb-24">

      {/* Feature 1: Speech */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center py-16 md:py-20 border-t border-black/[0.06]">
        <div>
          <div className="text-[12px] font-bold text-accent uppercase tracking-[.14em] mb-4">{dict.core.tag}</div>
          <h2 className="text-[28px] md:text-[34px] font-bold tracking-[-0.8px] leading-[1.15] mb-4 text-[#1a1a1a]">
            {dict.core.title}
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.75] mb-6">
            {dict.core.desc}
          </p>
          <ul className="flex flex-col gap-3 mb-7">
            {dict.core.bullets.map((b: string, i: number) => <FeatureItem key={i} text={b} />)}
          </ul>
          <a href="#projects" className="inline-block text-[13px] font-semibold px-5 py-2.5 rounded-full border border-black/15 bg-transparent text-[#1a1a1a] hover:bg-white hover:shadow-sm font-sans transition-all duration-200 cursor-pointer no-underline">
            {dict.core.btn}
          </a>
        </div>
        <div className="feature-visual rounded-2xl p-7 md:p-8">
          <div className="text-[11px] font-bold text-[#999] uppercase tracking-[.1em] mb-4">
            {dict.core.pipeline}
          </div>
          <div className="flex items-center mb-7">
            <PipeStep label={dict.core.audioIn} sub={dict.core.mic} active={false} />
            <div className="w-[18px] text-center text-[12px] text-[#ccc] shrink-0">&rsaquo;</div>
            <PipeStep label="ASR" sub="Whisper" active={true} />
            <div className="w-[18px] text-center text-[12px] text-[#ccc] shrink-0">&rsaquo;</div>
            <PipeStep label="LLM" sub={dict.core.reasoning} active={true} />
            <div className="w-[18px] text-center text-[12px] text-[#ccc] shrink-0">&rsaquo;</div>
            <PipeStep label="TTS" sub={dict.core.ttsModels} active={true} />
            <div className="w-[18px] text-center text-[12px] text-[#ccc] shrink-0">&rsaquo;</div>
            <PipeStep label={dict.core.audioOut} sub={dict.core.speaker} active={false} />
          </div>
          <div className="mt-6">
            <div className="text-[11px] font-bold text-[#999] uppercase tracking-[.1em] mb-3.5">
              {dict.core.latency}
            </div>
            <LatencyRow name="ASR" value="<200ms" width="30%" color="bg-accent" textClass="text-accent" />
            <LatencyRow name="LLM" value="<400ms" width="55%" color="bg-[#6B9B2A]" textClass="text-[#6B9B2A]" />
            <LatencyRow name="TTS" value="<150ms" width="22%" color="bg-accent" textClass="text-accent" />
            <div className="flex items-center gap-2.5 mt-2 pt-2 border-t border-black/[0.06]">
              <div className="text-[12px] text-[#1a1a1a] font-bold w-[52px] shrink-0">{dict.core.total}</div>
              <div className="flex-1 h-[6px] bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-accent to-[#6B9B2A]" style={{ width: '72%' }}></div>
              </div>
              <div className="text-[11px] font-bold text-[#1a1a1a] w-[44px] text-right">&lt;1s</div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature 2: Turkish LLM (reversed) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center py-16 md:py-20 border-t border-black/[0.06]">
        <div className="md:order-2">
          <div className="text-[12px] font-bold text-accent uppercase tracking-[.14em] mb-4">{dict.turkish.tag}</div>
          <h2 className="text-[28px] md:text-[34px] font-bold tracking-[-0.8px] leading-[1.15] mb-4 text-[#1a1a1a]">
            {dict.turkish.title}
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.75] mb-6">
            {dict.turkish.desc}
          </p>
          <ul className="flex flex-col gap-3 mb-7">
            {dict.turkish.bullets.map((b: string, i: number) => <FeatureItem key={i} text={b} />)}
          </ul>
          <a href="https://huggingface.co/OrionCAF" target="_blank" rel="noopener noreferrer" className="inline-block text-[13px] font-semibold px-5 py-2.5 rounded-full border border-black/15 bg-transparent text-[#1a1a1a] hover:bg-white hover:shadow-sm font-sans transition-all duration-200 cursor-pointer no-underline">
            {dict.turkish.btn}
          </a>
        </div>
        <div className="feature-visual rounded-2xl p-7 md:p-8 md:order-1">
          <div className="text-[11px] font-bold text-[#999] uppercase tracking-[.1em] mb-4">
            {dict.turkish.results}
          </div>
          <div className="flex flex-col gap-3">
            {dict.turkish.metrics.map((m: any, i: number) => (
              <MetricCard key={i} title={m.title} sub={m.sub} num={m.num} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <li className="text-[14px] text-[#666] flex items-start gap-3">
      <div className="w-[6px] h-[6px] rounded-full bg-accent shrink-0 mt-[7px]"></div>
      {text}
    </li>
  );
}

function PipeStep({ label, sub, active }: { label: string; sub: string; active: boolean }) {
  return (
    <div className={`flex-1 border rounded-lg px-1.5 py-3 text-center ${
      active ? 'border-accent/40 bg-green-50' : 'bg-[#FFF7ED] border-black/[0.06]'
    }`}>
      <div className={`text-[11px] font-bold ${active ? 'text-accent' : 'text-[#1a1a1a]'}`}>{label}</div>
      <div className="text-[10px] text-[#999] mt-0.5">{sub}</div>
    </div>
  );
}

function LatencyRow({ name, value, width, color, textClass }: { name: string; value: string; width: string; color: string; textClass: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-2.5">
      <div className="text-[12px] text-[#888] w-[52px] shrink-0">{name}</div>
      <div className="flex-1 h-[6px] bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width }}></div>
      </div>
      <div className={`text-[11px] font-bold w-[44px] text-right ${textClass}`}>{value}</div>
    </div>
  );
}

function MetricCard({ title, sub, num }: { title: string; sub: string; num: string }) {
  return (
    <div className="bg-[#FFF7ED] border border-black/[0.06] rounded-xl py-4 px-5 flex justify-between items-center">
      <div>
        <div className="text-[13px] font-semibold text-[#1a1a1a]">{title}</div>
        <div className="text-[11px] text-[#999] mt-1">{sub}</div>
      </div>
      <div className="text-[24px] font-bold text-accent">{num}</div>
    </div>
  );
}
