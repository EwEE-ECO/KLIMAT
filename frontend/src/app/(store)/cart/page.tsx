"use client"

import Link from "next/link"
import { useState } from "react"
import { Trash2, ShoppingBag, ArrowLeft, Wrench } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { formatPrice } from "@/lib/utils"

const initialItems = [
  { id: "1", name: "Сплит-система DENKO DSX-12", slug: "denko-dsx-12", price: 34990, quantity: 1, image: "" },
]

export default function CartPage() {
  const [items, setItems] = useState(initialItems)
  const [withInstallation, setWithInstallation] = useState(false)
  const [promoCode, setPromoCode] = useState("")

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const installationCost = withInstallation ? 5000 * items.length : 0
  const total = subtotal + installationCost

  const updateQuantity = (id: string, delta: number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item)))
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  if (items.length === 0) {
    return (
      <div className="container-main py-16 text-center">
        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Корзина пуста</h1>
        <p className="text-gray-500 mb-6">Добавьте товары из каталога</p>
        <Link href="/catalog"><Button variant="primary" size="lg">Перейти в каталог</Button></Link>
      </div>
    )
  }

  return (
    <div className="container-main py-8 md:py-12">
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-brand-500">Главная</Link>
        <span>/</span>
        <span className="text-gray-600">Корзина</span>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Корзина</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100">
              <div className="w-20 h-20 bg-gray-50 rounded-xl shrink-0 overflow-hidden flex items-center justify-center text-gray-300">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/product/${item.slug}`} className="text-sm font-semibold text-gray-900 hover:text-brand-500 line-clamp-1">{item.name}</Link>
                <p className="text-lg font-bold text-gray-900 mt-1">{formatPrice(item.price)}</p>
              </div>
              <div className="flex items-center border border-gray-200 rounded-xl shrink-0">
                <button onClick={() => updateQuantity(item.id, -1)} className="px-2.5 py-1.5 text-gray-500 hover:text-brand-500">−</button>
                <span className="px-3 py-1.5 text-sm font-semibold min-w-[2.5rem] text-center">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="px-2.5 py-1.5 text-gray-500 hover:text-brand-500">+</button>
              </div>
              <p className="text-lg font-bold text-gray-900 w-24 text-right shrink-0">{formatPrice(item.price * item.quantity)}</p>
              <button onClick={() => removeItem(item.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}

          <button onClick={() => setWithInstallation(!withInstallation)} className={`flex items-center justify-between w-full p-4 rounded-2xl border transition-colors ${withInstallation ? "bg-brand-50 border-brand-200" : "bg-white border-gray-100"}`}>
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${withInstallation ? "bg-brand-500 border-brand-500" : "border-gray-300"}`}>
                {withInstallation && <span className="text-white text-xs">✓</span>}
              </div>
              <Wrench className="w-5 h-5 text-brand-500" />
              <span className="text-sm font-medium text-gray-900">Добавить монтаж для всех товаров</span>
            </div>
            <span className="text-sm font-semibold text-brand-500">5 000 ₽ / шт.</span>
          </button>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 sticky top-24">
            <h3 className="font-bold text-gray-900 mb-4">Итого</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Товары</span><span className="font-medium">{formatPrice(subtotal)}</span></div>
              {withInstallation && <div className="flex justify-between"><span className="text-gray-500">Монтаж</span><span className="font-medium">{formatPrice(installationCost)}</span></div>}
              <div className="pt-3 border-t border-gray-200 flex justify-between text-base">
                <span className="font-bold text-gray-900">Итого</span>
                <span className="font-bold text-gray-900">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="mt-4">
              <input type="text" placeholder="Промокод" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400" />
            </div>

            <Link href="/checkout">
              <Button variant="secondary" size="lg" className="w-full mt-4">Оформить заказ</Button>
            </Link>
            <Link href="/catalog" className="flex items-center justify-center gap-1 mt-3 text-sm text-gray-500 hover:text-brand-500 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Продолжить покупки
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
