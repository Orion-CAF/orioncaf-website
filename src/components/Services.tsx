"use client";
import { dispatchContactModal } from "./ContactModal";

const icons = [
  <svg key="0" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 9h12M9 3v12" stroke="#497D15" strokeWidth="1.3" strokeLinecap="round"/><circle cx="9" cy="9" r="7" stroke="#497D15" strokeWidth="1.2"/></svg>,
  <svg key="1" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="6" r="3" stroke="#497D15" strokeWidth="1.2"/><path d="M3 15c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" stroke="#497D15" strokeWidth="1.2" strokeLinecap="round"/><path d="M13.5 3.5c1.1.9 1.8 2.2 1.8 3.7s-.7 2.8-1.8 3.7" stroke="#497D15" strokeWidth="1.1" strokeLinecap="round"/></svg>,
  <svg key="2" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="6" height="6" rx="1.5" stroke="#497D15" strokeWidth="1.2"/><rect x="10" y="2" width="6" height="6" rx="1.5" stroke="#497D15" strokeWidth="1.2"/><rect x="2" y="10" width="6" height="6" rx="1.5" stroke="#497D15" strokeWidth="1.2"/><rect x="10" y="10" width="6" height="6" rx="1.5" stroke="#497D15" strokeWidth="1.2"/></svg>,
  <svg key="3" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 5h12M3 9h12M3 13h8" stroke="#497D15" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  <svg key="4" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="4" cy="9" r="2.2" stroke="#497D15" strokeWidth="1.2"/><circle cx="14" cy="4" r="2.2" stroke="#497D15" strokeWidth="1.2"/><circle cx="14" cy="14" r="2.2" stroke="#497D15" strokeWidth="1.2"/><path d="M6 8.5L11.8 5.5M6 9.5L11.8 12.5" stroke="#497D15" strokeWidth="1.1" strokeLinecap="round"/></svg>,
  <svg key="5" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4.5" y="1" width="9" height="16" rx="2" stroke="#497D15" strokeWidth="1.2"/><circle cx="9" cy="14.5" r="0.9" fill="#497D15"/><path d="M6.5 4h5" stroke="#497D15" strokeWidth="1" strokeLinecap="round"/></svg>,
  <svg key="6" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 2l1.9 4.2 4.6.4-3.4 3 1 4.4L9 11.7l-4.1 2.3 1-4.4-3.4-3 4.6-.4L9 2z" stroke="#497D15" strokeWidth="1.2" strokeLinejoin="round"/></svg>,
];

export default function Services({ dict }: { dict: any }) {
  return (
    <section className="py-20 md:py-28 px-6 md:px-16 max-w-[1200px] mx-auto" id="solutions">
      <div className="text-[12px] font-bold text-accent uppercase tracking-[.14em] mb-4">{dict.tag}</div>
      <h2 className="text-[32px] md:text-[42px] font-bold tracking-[-1px] leading-[1.12] mb-5 text-[#1a1a1a]">{dict.title}</h2>
      <p className="text-[16px] text-[#666] max-w-[540px] leading-[1.7] mb-14">
        {dict.desc}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {icons.slice(0, 6).map((icon, i) => (
          <ServiceCard
            key={i}
            title={dict.items[i].title}
            desc={dict.items[i].desc}
            linkText={dict.docs}
            icon={icon}
          />
        ))}
      </div>
      {icons.length > 6 && (
        <div className="flex justify-center mt-4">
          <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)]">
            <ServiceCard
              title={dict.items[6].title}
              desc={dict.items[6].desc}
              linkText={dict.docs}
              icon={icons[6]}
            />
          </div>
        </div>
      )}
    </section>
  );
}

function ServiceCard({ title, desc, linkText, icon }: { title: string; desc: string; linkText: string; icon: React.ReactNode }) {
  return (
    <div
      onClick={dispatchContactModal}
      className="animate-child card-hover service-card group bg-white border border-black/[0.06] rounded-2xl p-7 transition-all duration-300 cursor-pointer hover:border-accent/30 hover:shadow-[0_0_0_3px_rgba(73,125,21,0.06)]"
    >
      <div className="w-10 h-10 rounded-xl service-icon flex items-center justify-center mb-5 transition-all">
        <div className="w-[18px] h-[18px]">
          {icon}
        </div>
      </div>
      <h3 className="text-[15px] font-bold mb-2.5 text-[#1a1a1a]">{title}</h3>
      <p className="text-[13px] text-[#777] leading-[1.7]">{desc}</p>
      <div className="flex items-center gap-1 mt-4 text-[12px] text-accent font-semibold group-hover:gap-2 transition-all duration-200">
        {linkText}
      </div>
    </div>
  );
}
