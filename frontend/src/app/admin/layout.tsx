"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { SessionProvider, useSession, signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, LayoutDashboard, Package, ShoppingCart, FolderTree, FileText, Wrench, MessageSquare, LogOut, ChevronLeft, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/admin", label: "Дашборд", icon: LayoutDashboard },
  { href: "/admin/products", label: "Товары", icon: Package },
  { href: "/admin/orders", label: "Заказы", icon: ShoppingCart },
  { href: "/admin/categories", label: "Категории", icon: FolderTree },
  { href: "/admin/blog", label: "Блог", icon: FileText },
  { href: "/admin/services", label: "Услуги", icon: Wrench },
  { href: "/admin/contacts", label: "Заявки", icon: MessageSquare },
]

const sidebarVariants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring" as const, damping: 28, stiffness: 300 } },
  exit: { x: "-100%", opacity: 0, transition: { duration: 0.2 } },
} as const

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </SessionProvider>
  )
}

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, status } = useSession()
  const [verified, setVerified] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated" && pathname !== "/admin/login") {
      router.push("/admin/login")
      return
    }
    if (status === "authenticated" && session?.user) {
      const token = (session.user as any).access_token
      if (!token) {
        router.push("/admin/login")
        return
      }
      fetch("http://localhost:4000/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      }).then((res) => {
        if (!res.ok) {
          signOut({ callbackUrl: "/admin/login" })
        } else {
          setVerified(true)
        }
      }).catch(() => {
        signOut({ callbackUrl: "/admin/login" })
      })
    }
  }, [status, pathname, router, session])

  useEffect(() => {
    setMobileSidebarOpen(false)
  }, [pathname])

  if (pathname === "/admin/login") return <>{children}</>

  if (status === "loading" || (status === "authenticated" && !verified)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
      </div>
    )
  }

  if (!session) return null

  const currentPage = navItems.find((i) => pathname === i.href || pathname.startsWith(i.href + "/"))

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Desktop sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 shrink-0 hidden lg:flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <span className="font-bold text-gray-900">Admin Panel</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link key={item.href} href={item.href} className={cn("flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl transition-colors", active ? "bg-brand-500 text-white" : "text-gray-600 hover:bg-gray-100")}>
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <Link href="/" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-brand-500 rounded-xl hover:bg-gray-100 transition-colors">
            <ChevronLeft className="w-4 h-4" /> На сайт
          </Link>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.aside
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-2xl lg:hidden flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <span className="font-bold text-gray-900">Admin Panel</span>
              <button onClick={() => setMobileSidebarOpen(false)} className="p-1 text-gray-500 hover:text-brand-500 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              {navItems.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + "/")
                return (
                  <Link key={item.href} href={item.href} className={cn("flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl transition-colors", active ? "bg-brand-500 text-white" : "text-gray-600 hover:bg-gray-100")}>
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
            <div className="p-4 border-t border-gray-100">
              <Link href="/" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-brand-500 rounded-xl hover:bg-gray-100 transition-colors" onClick={() => setMobileSidebarOpen(false)}>
                <ChevronLeft className="w-4 h-4" /> На сайт
              </Link>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileSidebarOpen(true)} className="lg:hidden p-2 text-gray-500 hover:text-brand-500 rounded-lg hover:bg-gray-100 transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="font-semibold text-gray-900 truncate">{currentPage?.label || "Админ-панель"}</h2>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-sm text-gray-500 hidden sm:block">{session.user?.email}</span>
            <button onClick={() => signOut({ callbackUrl: "/admin/login" })} className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-100 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Mobile scrollable table wrapper */}
            <div className="overflow-x-auto">
              {children}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
