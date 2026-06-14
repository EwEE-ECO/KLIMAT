"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/Button"

function StaticNotice() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md text-center">
        <div className="w-16 h-16 rounded-xl bg-brand-500 flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-bold text-2xl">K</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Админ-панель недоступна</h1>
        <p className="text-gray-500 mb-6">Для управления сайтом запустите локальный сервер.</p>
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <code className="block bg-gray-50 rounded-xl p-4 text-sm text-left text-gray-700 mb-4 font-mono">git pull<br/>npm run dev</code>
          <p className="text-sm text-gray-500">После запуска откройте <strong className="text-gray-700">http://localhost:3000/admin</strong></p>
        </div>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  const [isStatic, setIsStatic] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsStatic(typeof window !== "undefined" && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1")
  }, [])

  if (isStatic) return <StaticNotice />

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.ok) {
      router.push("/admin")
      router.refresh()
    } else {
      setError("Неверный email или пароль")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-xl bg-brand-500 flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">K</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Вход в админ-панель</h1>
          <p className="text-sm text-gray-500 mt-1">КвадроКлимат</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" placeholder="admin@kvadroklimat.ru" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" placeholder="••••••••" required />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button variant="primary" size="lg" className="w-full" disabled={loading}>{loading ? "Вход..." : "Войти"}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
