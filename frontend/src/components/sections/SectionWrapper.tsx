"use client"

import { ScrollReveal } from "@/components/ui/ScrollReveal"

interface SectionWrapperProps {
  children: React.ReactNode
}

export function SectionWrapper({ children }: SectionWrapperProps) {
  return (
    <ScrollReveal direction="up" distance={48}>
      {children}
    </ScrollReveal>
  )
}
