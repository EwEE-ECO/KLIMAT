"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

type Direction = "up" | "down" | "left" | "right" | "fade"

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: Direction
  delay?: number
  duration?: number
  distance?: number
  className?: string
  once?: boolean
}

const directionVariants = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up": return { y: distance }
    case "down": return { y: -distance }
    case "left": return { x: distance }
    case "right": return { x: -distance }
    case "fade": return { opacity: 0 }
  }
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  distance = 40,
  className,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directionVariants(direction, distance) }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directionVariants(direction, distance) }}
      transition={{ duration, delay, type: "spring" as const, damping: 25, stiffness: 200 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
