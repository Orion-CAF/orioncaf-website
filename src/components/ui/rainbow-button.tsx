'use client';
import React from 'react';

export function RainbowButton({ children, onClick, className = "" }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
    return (
        <button
            onClick={onClick}
            className={`rainbow-border relative flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#111] rounded-xl border-none text-white cursor-pointer font-bold text-[15px] transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] ${className}`}
        >
            {children}
            <style jsx>{`
                .rainbow-border::before,
                .rainbow-border::after {
                    content: '';
                    position: absolute;
                    left: -2px;
                    top: -2px;
                    border-radius: 14px;
                    background: linear-gradient(45deg, #497D15, #6B9B2A, #88c440, #d4f08f, #497D15, #6B9B2A, #88c440, #d4f08f);
                    background-size: 400%;
                    width: calc(100% + 4px);
                    height: calc(100% + 4px);
                    z-index: -1;
                    animation: rainbow 12s linear infinite;
                }
                .rainbow-border::after {
                    filter: blur(20px);
                    opacity: 0.6;
                }
                @keyframes rainbow {
                    0% { background-position: 0 0; }
                    50% { background-position: 400% 0; }
                    100% { background-position: 0 0; }
                }
            `}</style>
        </button>
    );
}
