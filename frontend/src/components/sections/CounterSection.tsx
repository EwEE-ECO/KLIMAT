"use client"

import { useEffect, useRef, useState } from "react"
import { Briefcase, Building2, Users, Award } from "lucide-react"

const counters = [
  { icon: Briefcase, value: 500, suffix: "+", label: "Выполненных проектов" },
  { icon: Building2, value: 40, suffix: "+", label: "Брендов-партнёров" },
  { icon: Users, value: 5000, suffix: "+", label: "Довольных клиентов" },
  { icon: Award, value: 10, suffix: " лет", label: "На рынке" },
]

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 2000
          const start = performance.now()
          const animate = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const ease = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(ease * target))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export function CounterSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-brand-500 to-brand-700">
      <div className="container-main">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {counters.map((counter) => (
            <div key={counter.label} className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                <counter.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-1">
                <CountUp target={counter.value} suffix={counter.suffix} />
              </div>
              <p className="text-sm text-white/70">{counter.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
