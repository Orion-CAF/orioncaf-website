"use client"

import { motion } from "framer-motion"
import React, { useMemo } from "react"
import { cn } from "@/lib/utils"

export interface BoxesProps {
  className?: string
  rows?: number
  cols?: number
}

const colors = [
  "rgba(73, 125, 21, 0.6)",   // OrionCAF green
  "rgba(107, 155, 42, 0.5)",  // light green
  "rgba(134, 239, 172, 0.4)", // green-300
  "rgba(125, 211, 252, 0.4)", // sky-300
  "rgba(196, 181, 253, 0.4)", // violet-300
  "rgba(253, 224, 71, 0.35)", // yellow-300
  "rgba(165, 180, 252, 0.4)", // indigo-300
]

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)]

const BoxCell = React.memo(({ showPlus }: { showPlus: boolean }) => (
  <motion.div
    className="relative h-8 w-16 border-r border-t border-white/[0.08]"
    whileHover={{
      backgroundColor: getRandomColor(),
      transition: { duration: 0 },
    }}
    transition={{ duration: 2 }}
  >
    {showPlus && (
      <svg
        className="pointer-events-none absolute -left-[22px] -top-[14px] h-6 w-10 text-white/[0.12]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 6v12m6-6H6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )}
  </motion.div>
))

BoxCell.displayName = "BoxCell"

const BoxRow = React.memo(({ rowIndex, cols }: { rowIndex: number; cols: number }) => (
  <div className="relative h-8 w-16 border-l border-white/[0.08]">
    {Array.from({ length: cols }).map((_, colIndex) => (
      <BoxCell key={colIndex} showPlus={rowIndex % 2 === 0 && colIndex % 2 === 0} />
    ))}
  </div>
))

BoxRow.displayName = "BoxRow"

export const Boxes = ({ className, rows = 150, cols = 100 }: BoxesProps) => {
  const rowElements = useMemo(
    () =>
      Array.from({ length: rows }).map((_, rowIndex) => (
        <BoxRow key={rowIndex} rowIndex={rowIndex} cols={cols} />
      )),
    [rows, cols],
  )

  return (
    <div
      className={cn("pointer-events-auto absolute inset-0 z-0 flex", className)}
      style={{
        transform: "translate(-50%, -50%) skewX(-48deg) skewY(14deg) scale(0.675)",
        transformOrigin: "center center",
        top: "50%",
        left: "50%",
        width: "300vw",
        height: "300vh",
      }}
    >
      {rowElements}
    </div>
  )
}
