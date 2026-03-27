"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface ShootingStar {
  id: number
  x: number
  y: number
  angle: number
  scale: number
  speed: number
  distance: number
}

export interface ShootingStarsProps {
  className?: string
  children?: React.ReactNode
  minSpeed?: number
  maxSpeed?: number
  minDelay?: number
  maxDelay?: number
  starColor?: string
  trailColor?: string
  starWidth?: number
  starHeight?: number
}

export function ShootingStars({
  className,
  children,
  minSpeed = 5,
  maxSpeed = 14,
  minDelay = 600,
  maxDelay = 800,
  starColor = "#6B9B2A",
  trailColor = "#497D15",
  starWidth = 15,
  starHeight = 2,
}: ShootingStarsProps) {
  const [stars, setStars] = useState<ShootingStar[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const getRandomStartPoint = useCallback(() => {
    const container = containerRef.current
    if (!container) return { x: 0, y: 0, angle: 45 }

    const { width, height } = container.getBoundingClientRect()
    const side = Math.floor(Math.random() * 4)

    switch (side) {
      case 0:
        return { x: Math.random() * width, y: 0, angle: 45 }
      case 1:
        return { x: width, y: Math.random() * height, angle: 135 }
      case 2:
        return { x: Math.random() * width, y: height, angle: 225 }
      case 3:
        return { x: 0, y: Math.random() * height, angle: 315 }
      default:
        return { x: 0, y: 0, angle: 45 }
    }
  }, [])

  const createStar = useCallback(() => {
    const { x, y, angle } = getRandomStartPoint()
    const newStar: ShootingStar = {
      id: Date.now() + Math.random(),
      x,
      y,
      angle,
      scale: 1,
      speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
      distance: 0,
    }
    setStars(prev => [...prev, newStar])
    const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay
    timeoutRef.current = setTimeout(createStar, randomDelay)
  }, [getRandomStartPoint, minSpeed, maxSpeed, minDelay, maxDelay])

  useEffect(() => {
    const initialDelay = setTimeout(createStar, 300)
    return () => {
      clearTimeout(initialDelay)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [createStar])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const moveStars = () => {
      const { width, height } = container.getBoundingClientRect()

      setStars(prevStars =>
        prevStars
          .map(star => {
            const newX = star.x + star.speed * Math.cos((star.angle * Math.PI) / 180)
            const newY = star.y + star.speed * Math.sin((star.angle * Math.PI) / 180)
            const newDistance = star.distance + star.speed
            const newScale = 1 + newDistance / 100

            if (newX < -50 || newX > width + 50 || newY < -50 || newY > height + 50) {
              return null
            }

            return { ...star, x: newX, y: newY, distance: newDistance, scale: newScale }
          })
          .filter((star): star is ShootingStar => star !== null),
      )

      animationRef.current = requestAnimationFrame(moveStars)
    }

    animationRef.current = requestAnimationFrame(moveStars)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
    >
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="orioncaf-star-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor={trailColor} stopOpacity={0} />
            <stop offset="100%" stopColor={starColor} stopOpacity={1} />
          </linearGradient>
        </defs>

        {stars.map(star => (
          <rect
            key={star.id}
            fill="url(#orioncaf-star-gradient)"
            width={starWidth * star.scale}
            height={starHeight}
            x={star.x}
            y={star.y}
            transform={`rotate(${star.angle}, ${star.x + (starWidth * star.scale) / 2}, ${star.y + starHeight / 2})`}
            style={{ opacity: 0.6 }}
          />
        ))}
      </svg>

      {children && <div className="relative z-10 h-full w-full">{children}</div>}
    </div>
  )
}

export default ShootingStars
