"use client";
import { useEffect, useRef, useState } from "react";

function useCountUp(end: number, duration = 1600) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return { value, ref };
}

const metrics = [
  { end: 7, suffix: "+", hasBorder: true },
  { end: 1000, suffix: "+", hasBorder: true },
  { end: 600, suffix: "+", hasBorder: true },
  { end: 1, suffix: "", hasBorder: false },
];

const dictKeys = ["engineers", "downloads", "users", "publications"] as const;

export default function Metrics({ dict }: { dict: any }) {
  return (
    <div className="flex flex-wrap md:flex-nowrap justify-center border-y border-black/[0.06] py-10 px-6 md:py-12 md:px-16 max-w-[1200px] mx-auto">
      {metrics.map((m, i) => (
        <MetricItem key={i} end={m.end} suffix={m.suffix} label={dict[dictKeys[i]]} hasBorder={m.hasBorder} />
      ))}
    </div>
  );
}

function MetricItem({ end, suffix, label, hasBorder }: { end: number; suffix: string; label: string; hasBorder: boolean }) {
  const { value, ref } = useCountUp(end);

  return (
    <div
      ref={ref}
      className={`text-center flex-1 w-[45%] md:w-auto md:max-w-[220px] px-6 mb-6 md:mb-0 metric ${hasBorder ? 'border-r-0 md:border-r border-black/[0.06]' : ''}`}
    >
      <div className="text-[34px] md:text-[40px] font-bold tracking-[-1px] text-[#1a1a1a] metric-number">
        <span className="text-accent">{value}</span>{suffix}
      </div>
      <div className="text-[13px] text-[#888] mt-1.5 leading-[1.4]">{label}</div>
    </div>
  );
}
