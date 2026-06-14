"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { ArrowRight, Star, Briefcase, Building2, Users, Award } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/Button"

const heroImages = [
  "https://kvadroklimat.ru/upload/iblock/597/pgx2pivkopk9knyb3zzeqbblpepxgekf.jpg",
  "https://kvadroklimat.ru/upload/iblock/409/1z0u3k2tyhe951foiqzay6hugbh7i26s.webp",
  "https://kvadroklimat.ru/upload/iblock/d95/zjyr050mfy80krlkqo5bsgy7uiu0bbio.webp",
]

const stats = [
  { icon: Briefcase, value: 500, suffix: "+", label: "Проектов" },
  { icon: Building2, value: 40, suffix: "+", label: "Брендов" },
  { icon: Users, value: 5000, suffix: "+", label: "Клиентов" },
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
    <span ref={ref}>{count}{suffix}</span>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15, type: "spring" as const, damping: 25, stiffness: 200 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, damping: 20, stiffness: 150 } },
}

export function HeroSection() {
  const [bgIndex, setBgIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setBgIndex((i) => (i + 1) % heroImages.length), 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-brand-50 to-brand-100">
      <AnimatePresence mode="wait">
        <motion.div
          key={bgIndex}
          className="absolute inset-0 bg-cover bg-center opacity-[0.03]"
          style={{ backgroundImage: `url(${heroImages[bgIndex]})` }}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.08 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-brand-50/40 to-transparent" />

      <div className="container-main relative z-10 py-10 md:py-14 lg:py-16">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500/10 backdrop-blur-sm rounded-full text-sm text-brand-700 mb-6"
          >
            <Star className="w-4 h-4 text-brand-500" />
            <span>10 лет на рынке климатической техники</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight"
          >
            Продажа и монтаж
            <span className="block text-brand-500 mt-1">кондиционеров</span>
            <span className="block mt-1">в Краснодаре</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-4 text-base md:text-lg text-gray-500 max-w-2xl mx-auto"
          >
            Официальный дилер 40+ брендов. Бесплатный замер и консультация. Гарантия до 5 лет.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-6 justify-center">
            <Link href="/catalog">
              <Button variant="secondary" size="lg" className="gap-2">
                Рассчитать стоимость <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg" className="text-brand-700 border-brand-300 hover:bg-brand-100">
                Услуги монтажа
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-10 pt-8 border-t border-brand-200">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center mx-auto mb-2">
                  <stat.icon className="w-5 h-5 text-brand-600" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
