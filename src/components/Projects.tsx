export default function Projects({ dict }: { dict: any }) {
  return (
    <section className="py-20 md:py-28 px-6 md:px-16 max-w-[1200px] mx-auto" id="projects">
      <div className="text-[12px] font-bold text-accent uppercase tracking-[.14em] mb-4">{dict.tag}</div>
      <h2 className="text-[32px] md:text-[42px] font-bold tracking-[-1px] leading-[1.12] mb-5 text-[#1a1a1a]">
        {dict.title}
      </h2>
      <p className="text-[16px] text-[#666] max-w-[540px] leading-[1.7] mb-14">
        {dict.desc}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {dict.items.slice(0, 6).map((item: any, i: number) => (
          <ProjectCard
            key={i}
            tag={item.tag}
            title={item.title}
            desc={item.desc}
            award={item.award}
          />
        ))}
      </div>
      {dict.items.length > 6 && (
        <div className="flex justify-center mt-4">
          <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)]">
            <ProjectCard
              tag={dict.items[6].tag}
              title={dict.items[6].title}
              desc={dict.items[6].desc}
              award={dict.items[6].award}
            />
          </div>
        </div>
      )}
    </section>
  );
}

function ProjectCard({ tag, title, desc, award }: { tag: string; title: string; desc: string; award: string }) {
  return (
    <div className="animate-child card-hover bg-white border border-black/[0.06] rounded-2xl p-6 md:p-7 transition-all duration-250 cursor-pointer hover:border-black/15">
      <div className="inline-block text-[11px] font-semibold text-accent bg-green-50 px-3 py-1 rounded-full mb-4 project-tag" style={{letterSpacing: '0.02em'}}>
        {tag}
      </div>
      <h3 className="text-[15px] font-bold mb-2.5 text-[#1a1a1a]">{title}</h3>
      <p className="text-[13px] text-[#777] leading-[1.7]">{desc}</p>
      <div className="flex items-center mt-4 text-[11px] font-semibold text-[#666] project-award" style={{borderTop: '1px solid var(--color-border-subtle)', paddingTop: '16px', marginTop: '16px'}}>
        {award}
      </div>
    </div>
  );
}
