"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) setVisible(true)
  }, [])

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "all")
    setVisible(false)
  }

  const acceptEssential = () => {
    localStorage.setItem("cookie-consent", "essential")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-200 shadow-2xl">
      <div className="container-main flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600 text-center sm:text-left">
          Мы используем файлы cookie для улучшения работы сайта. Продолжая использование, вы соглашаетесь с{" "}
          <Link href="/privacy" className="text-brand-500 underline hover:text-brand-600">политикой обработки персональных данных</Link>.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={acceptEssential} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            Только необходимое
          </button>
          <button onClick={acceptAll} className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors">
            Принять все
          </button>
        </div>
      </div>
    </div>
  )
}
