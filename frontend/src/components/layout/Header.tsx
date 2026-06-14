"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Search, ShoppingCart, Phone, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Главная" },
  {
    href: "/catalog",
    label: "Каталог",
    children: [
      { href: "/catalog?type=nastenniy", label: "Настенные сплит-системы" },
      { href: "/catalog?type=kassetniy", label: "Кассетные кондиционеры" },
      { href: "/catalog?type=kanalniy", label: "Канальные кондиционеры" },
      { href: "/catalog?type=multisplit", label: "Мульти-сплит системы" },
      { href: "/catalog?type=mobilniy", label: "Мобильные кондиционеры" },
    ],
  },
  { href: "/services", label: "Услуги" },
  { href: "/blog", label: "Блог" },
  { href: "/about", label: "О компании" },
  { href: "/contacts", label: "Контакты" },
]

const sidebarVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring" as const, damping: 22, stiffness: 180, mass: 0.8 } },
  exit: { x: "100%", opacity: 0, transition: { duration: 0.18, ease: "easeInOut" as const } },
} as const

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="container-main">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-brand-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-brand-500 leading-tight">КвадроКлимат</span>
              <span className="block text-xs text-gray-400 leading-tight">Климатическая техника</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href} className="group relative">
                  <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-600 hover:text-brand-500 rounded-lg hover:bg-brand-50 transition-colors">
                    {link.label} <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="p-2">
                      {link.children.map((child) => (
                        <Link key={child.href} href={child.href} className="block px-4 py-2.5 text-sm text-gray-600 hover:text-brand-500 hover:bg-brand-50 rounded-lg transition-colors">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={link.href} href={link.href} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-brand-500 rounded-lg hover:bg-brand-50 transition-colors">
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-2">
            <a href="tel:+79181638377" className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-500 hover:text-brand-600 transition-colors">
              <Phone className="w-4 h-4" /> +7 (918) 163-83-77
            </a>

            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-gray-500 hover:text-brand-500 rounded-lg hover:bg-brand-50 transition-colors">
              <Search className="w-5 h-5" />
            </button>

            <Link href="/cart" className="relative p-2 text-gray-500 hover:text-brand-500 rounded-lg hover:bg-brand-50 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brand-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">0</span>
            </Link>

            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-gray-500 hover:text-brand-500 rounded-lg hover:bg-brand-50 transition-colors">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="pb-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Поиск кондиционеров, брендов..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-full w-[300px] bg-white z-50 shadow-2xl lg:hidden overflow-y-auto"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="font-bold text-gray-900">Меню</span>
              <button onClick={() => setMenuOpen(false)} className="p-2 text-gray-500 hover:text-brand-500 rounded-lg hover:bg-brand-50 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="p-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.25 }}
                >
                  {link.children ? (
                    <div className="space-y-1 mb-2">
                      <span className="block px-4 py-2 text-sm font-semibold text-gray-800">{link.label}</span>
                      <div className="pl-4 border-l-2 border-brand-100">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-gray-500 hover:text-brand-500 hover:bg-brand-50 rounded-lg transition-colors"
                            onClick={() => setMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className="block px-4 py-2.5 text-sm text-gray-600 hover:text-brand-500 hover:bg-brand-50 rounded-lg transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * navLinks.length, duration: 0.25 }}
              >
                <a href="tel:+79181638377" className="flex items-center gap-2 px-4 py-3 mt-2 text-sm font-medium text-brand-500 bg-brand-50 rounded-xl">
                  <Phone className="w-4 h-4" /> +7 (918) 163-83-77
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
