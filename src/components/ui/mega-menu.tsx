"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export type MegaMenuItem = {
  id: number;
  label: string;
  subMenus?: {
    title: string;
    items: {
      label: string;
      description: string;
      icon: React.ElementType;
      onClick?: () => void;
      href?: string;
    }[];
  }[];
  link?: string;
  onClick?: () => void;
};

export interface MegaMenuProps extends React.HTMLAttributes<HTMLUListElement> {
  items: MegaMenuItem[];
  className?: string;
}

const MegaMenu = React.forwardRef<HTMLUListElement, MegaMenuProps>(
  ({ items, className, ...props }, ref) => {
    const [openMenu, setOpenMenu] = React.useState<string | null>(null);
    const closeRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleHover = (menuLabel: string | null) => {
      if (closeRef.current) clearTimeout(closeRef.current);
      if (menuLabel) {
        setOpenMenu(menuLabel);
      } else {
        closeRef.current = setTimeout(() => setOpenMenu(null), 150);
      }
    };

    return (
      <ul
        ref={ref}
        className={`relative flex items-center space-x-0 ${className || ""}`}
        {...props}
      >
        {items.map((navItem) => (
          <li
            key={navItem.label}
            className="relative"
            onMouseEnter={() => handleHover(navItem.label)}
            onMouseLeave={() => handleHover(null)}
          >
            <button
              onClick={navItem.onClick}
              className={`relative flex cursor-pointer items-center justify-center gap-1 py-1.5 px-4 text-sm transition-colors duration-300 group bg-transparent border-none font-medium ${
                openMenu === navItem.label
                  ? "text-[#1a1a1a]"
                  : "text-[#555] hover:text-[#1a1a1a]"
              }`}
            >
              <span>{navItem.label}</span>
              {navItem.subMenus && (
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    openMenu === navItem.label ? "rotate-180" : ""
                  }`}
                />
              )}
              {/* Hover pill background — NO layoutId to prevent cross-item flickering */}
              {openMenu === navItem.label && (
                <motion.div
                  className="absolute inset-0 size-full bg-black/[0.06]"
                  style={{ borderRadius: 99 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                />
              )}
            </button>

            <AnimatePresence>
              {openMenu === navItem.label && navItem.subMenus && (
                <div className="absolute left-0 top-full w-auto pt-2 z-[200]">
                  <motion.div
                    className="w-max border border-white/[0.08] bg-[#0c0c0c] p-4 shadow-2xl"
                    style={{ borderRadius: 16 }}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <div className="flex w-fit shrink-0 space-x-9 overflow-hidden">
                      {navItem.subMenus.map((sub) => (
                        <div className="w-full" key={sub.title}>
                          <h3 className="mb-4 text-sm font-medium capitalize text-white/50">
                            {sub.title}
                          </h3>
                          <ul className="space-y-1">
                            {sub.items.map((item) => {
                              const Icon = item.icon;
                              return (
                                <li key={item.label}>
                                  <button
                                    onClick={item.onClick || (() => { if (item.href) window.location.href = item.href; })}
                                    className="flex items-center space-x-3 group/item w-full text-left bg-transparent border-none cursor-pointer p-2 rounded-lg transition-colors duration-200 hover:bg-white/[0.06]"
                                  >
                                    <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-white/20 text-white/70 transition-all duration-300 group-hover/item:bg-white group-hover/item:text-[#0A0A0A] group-hover/item:border-white group-hover/item:scale-110">
                                      <Icon className="h-5 w-5 flex-none" />
                                    </div>
                                    <div className="w-max leading-5">
                                      <p className="shrink-0 text-sm font-medium text-white/80 transition-all duration-300 group-hover/item:text-white group-hover/item:translate-x-0.5">
                                        {item.label}
                                      </p>
                                    </div>
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    );
  }
);

MegaMenu.displayName = "MegaMenu";

export default MegaMenu;
export { MegaMenu };
