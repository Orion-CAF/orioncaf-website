"use client";
import React, { useEffect, useState } from "react";

export function dispatchContactModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("open-contact-modal"));
  }
}

export default function ContactModal({ isOpen: controlledIsOpen, onClose, dict }: { isOpen?: boolean; onClose?: () => void; dict: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-contact-modal", handleOpen);
    return () => window.removeEventListener("open-contact-modal", handleOpen);
  }, []);

  const openState = isOpen || (controlledIsOpen ?? false);
  const handleClose = () => {
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
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (!openState) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm" onClick={handleClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-7 md:p-9 relative animate-[fadeInUp_0.35s_ease-out]" onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} className="absolute top-5 right-5 text-[#ccc] hover:text-[#1a1a1a] border-none bg-transparent cursor-pointer text-lg transition-colors duration-200">
          ✕
        </button>

        {status === "sent" ? (
          <div className="text-center py-10">
            <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-5">
              <svg width="24" height="24" viewBox="0 0 22 22" fill="none">
                <path d="M6 11.5l3.5 3.5 6.5-7" stroke="#497D15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-[22px] font-bold mb-2 text-[#1a1a1a]">{dict.sentTitle}</h2>
            <p className="text-[14px] text-[#888] leading-[1.6]">{dict.sentDesc}</p>
          </div>
        ) : (
          <>
            <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center mb-5">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 4.5C2 3.67 2.67 3 3.5 3h11c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5h-11C2.67 15 2 14.33 2 13.5v-9z" stroke="#497D15" strokeWidth="1.2"/>
                <path d="M2 5l7 4.5 7-4.5" stroke="#497D15" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </div>
            <h2 className="text-[24px] font-bold mb-2 text-[#1a1a1a]">{dict.title}</h2>
            <p className="text-[14px] text-[#888] mb-7 leading-[1.6]">{dict.desc}</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-[12px] font-bold text-[#555] mb-2">{dict.name}</label>
                <input type="text" name="name" required placeholder={dict.namePlaceholder} className="w-full px-4 py-3 border border-black/10 rounded-xl focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 text-[14px] font-sans transition-all duration-200 bg-[#FFF7ED]" />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-[#555] mb-2">{dict.email}</label>
                <input type="email" name="email" required placeholder={dict.emailPlaceholder} className="w-full px-4 py-3 border border-black/10 rounded-xl focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 text-[14px] font-sans transition-all duration-200 bg-[#FFF7ED]" />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-[#555] mb-2">{dict.message}</label>
                <textarea name="message" required rows={4} placeholder={dict.messagePlaceholder} className="w-full px-4 py-3 border border-black/10 rounded-xl focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 text-[14px] font-sans resize-none transition-all duration-200 bg-[#FFF7ED]"></textarea>
              </div>

              {status === "error" && (
                <p className="text-[13px] text-red-500">{dict.error}</p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-accent text-white font-semibold py-3.5 rounded-full hover:bg-accent-hover hover:shadow-[0_4px_12px_rgba(73,125,21,0.25)] transition-all duration-200 text-[14px] font-sans border-none cursor-pointer mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
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
