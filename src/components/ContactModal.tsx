"use client";
import React, { useEffect, useState, useRef } from "react";

export function dispatchContactModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("open-contact-modal"));
  }
}

export default function ContactModal({ isOpen: controlledIsOpen, onClose, dict, initialProduct }: { isOpen?: boolean; onClose?: () => void; dict: any; initialProduct?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-contact-modal", handleOpen);
    return () => window.removeEventListener("open-contact-modal", handleOpen);
  }, []);

  const openState = isOpen || (controlledIsOpen ?? false);

  // AnimeJS Entrance/Exit
  useEffect(() => {
    if (typeof window === "undefined" || !(window as any).anime) return;
    const anime = (window as any).anime;

    if (openState) {
      document.body.style.overflow = "hidden";
      anime({
        targets: overlayRef.current,
        opacity: [0, 1],
        duration: 300,
        easing: "easeOutSine"
      });
      anime({
        targets: modalRef.current,
        translateY: [40, 0],
        scale: [0.95, 1],
        opacity: [0, 1],
        duration: 400,
        easing: "easeOutExpo"
      });
    } else {
      document.body.style.overflow = "";
    }
  }, [openState]);

  const handleClose = () => {
    if (typeof window === "undefined" || !(window as any).anime) {
      closeState();
      return;
    }
    const anime = (window as any).anime;
    
    anime({
      targets: overlayRef.current,
      opacity: [1, 0],
      duration: 300,
      easing: "easeInSine"
    });
    anime({
      targets: modalRef.current,
      translateY: [0, 20],
      scale: [1, 0.95],
      opacity: [1, 0],
      duration: 300,
      easing: "easeInExpo",
      complete: closeState
    });
  };

  const closeState = () => {
    setIsOpen(false);
    setStatus("idle");
    onClose?.();
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      product: (form.elements.namedItem("product") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("sent");
        if (typeof window !== "undefined" && (window as any).anime) {
          (window as any).anime({
            targets: ".success-toast",
            scale: [0.8, 1],
            opacity: [0, 1],
            easing: "easeOutElastic(1, .6)",
            duration: 800
          });
        }
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (!openState) return null;

  const pdLabel = dict.send === "Mesajı Gönder" ? "Ar-Ge / Çözüm Tercihi (İsteğe Bağlı)" : "R&D / Solution Preference (Optional)";
  const selectDef = dict.send === "Mesajı Gönder" ? "Seçiniz..." : "Select...";

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md opacity-0" onClick={handleClose}>
      <div ref={modalRef} className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] w-full max-w-lg p-8 md:p-10 relative opacity-0" onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} className="absolute top-6 right-6 text-[#aaa] hover:text-[#1a1a1a] bg-zinc-100 hover:bg-zinc-200 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer transition-all duration-200 border-none">
          ✕
        </button>

        {status === "sent" ? (
          <div className="text-center py-10 success-toast">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6 shadow-inner border border-accent/10">
              <svg width="32" height="32" viewBox="0 0 22 22" fill="none">
                <path d="M6 11.5l3.5 3.5 6.5-7" stroke="#497D15" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-[26px] font-bold mb-3 text-[#1a1a1a] tracking-tight">{dict.sentTitle}</h2>
            <p className="text-[15px] text-[#666] leading-[1.6]">{dict.sentDesc}</p>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center mb-6 border border-accent/10">
              <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                <path d="M2 4.5C2 3.67 2.67 3 3.5 3h11c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5h-11C2.67 15 2 14.33 2 13.5v-9z" stroke="#497D15" strokeWidth="1.5"/>
                <path d="M2 5l7 4.5 7-4.5" stroke="#497D15" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h2 className="text-[28px] font-bold mb-3 text-[#1a1a1a] tracking-tight">{dict.title}</h2>
            <p className="text-[15px] text-[#666] mb-8 leading-[1.6]">{dict.desc}</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[13px] font-bold text-[#444] mb-2">{dict.name}</label>
                  <input type="text" name="name" required placeholder={dict.namePlaceholder} className="w-full px-4 py-3.5 border border-black/10 rounded-xl focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 text-[14px] font-sans transition-all duration-200 bg-[#FAFAFA]" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#444] mb-2">{dict.email}</label>
                  <input type="email" name="email" required placeholder={dict.emailPlaceholder} className="w-full px-4 py-3.5 border border-black/10 rounded-xl focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 text-[14px] font-sans transition-all duration-200 bg-[#FAFAFA]" />
                </div>
              </div>
              
              <div>
                <label className="block text-[13px] font-bold text-[#444] mb-2">{pdLabel}</label>
                <select name="product" defaultValue={initialProduct || ""} className="w-full px-4 py-3.5 border border-black/10 rounded-xl focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 text-[14px] font-sans transition-all duration-200 bg-[#FAFAFA] appearance-none cursor-pointer">
                  <option value="" disabled>{selectDef}</option>
                  <option value="Workflow Automation (n8n)">Workflow Automation (n8n)</option>
                  <option value="Real-Time Voice AI">Real-Time Voice AI</option>
                  <option value="LLM Fine-Tuning">LLM Fine-Tuning</option>
                  <option value="RAG & Knowledge Systems">RAG & Knowledge Systems</option>
                  <option value="AI Architecture & Consulting">AI Architecture & Consulting</option>
                  <option value="AI-Powered Mobile">AI-Powered Mobile</option>
                  <option value="MLOps & Deployment">MLOps & Deployment</option>
                  <option value="Other">Other / General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#444] mb-2">{dict.message}</label>
                <textarea name="message" required rows={4} placeholder={dict.messagePlaceholder} className="w-full px-4 py-3.5 border border-black/10 rounded-xl focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 text-[14px] font-sans resize-none transition-all duration-200 bg-[#FAFAFA]"></textarea>
              </div>

              {status === "error" && (
                <p className="text-[13px] font-medium text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">{dict.error}</p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-accent text-white font-bold tracking-wide py-4 rounded-xl hover:bg-accent-hover hover:shadow-[0_8px_20px_rgba(73,125,21,0.25)] hover:-translate-y-0.5 transition-all duration-200 text-[15px] font-sans border-none cursor-pointer mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                {status === "sending" ? dict.sending : dict.send}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
