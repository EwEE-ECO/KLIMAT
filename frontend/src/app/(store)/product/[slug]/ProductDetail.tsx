"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Star, Check, ChevronDown, Shield, Truck, Clock, Wrench } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { formatPrice } from "@/lib/utils"

interface ProductDetailProps {
  product: any
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<"specs" | "desc" | "reviews">("specs")
  const [showInstallation, setShowInstallation] = useState(false)

  const totalPrice = Number(product.price) * quantity + (showInstallation ? 5000 : 0)

  return (
    <div className="container-main py-8 md:py-12">
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-brand-500">Главная</Link>
        <span>/</span>
        <Link href="/catalog" className="hover:text-brand-500">Каталог</Link>
        <span>/</span>
        <Link href="/catalog?type=nastenniy" className="hover:text-brand-500">Настенные сплит-системы</Link>
        <span>/</span>
        <span className="text-gray-600">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <div className="relative aspect-[4/3] bg-gray-50 rounded-2xl overflow-hidden">
            <Image src={product.images?.[0] || "https://kvadroklimat.ru/upload/iblock/597/pgx2pivkopk9knyb3zzeqbblpepxgekf.jpg"} alt={product.name} fill className="object-cover" sizes="50vw" priority />
            <div className="absolute top-4 left-4 flex gap-2">
              {product.isHit && <span className="px-3 py-1 text-xs font-bold text-white bg-red-500 rounded-lg">ХИТ</span>}
              {product.oldPrice && (
                <span className="px-3 py-1 text-xs font-bold text-white bg-accent-400 rounded-lg">
                  -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                </span>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-accent-400 uppercase tracking-wider">{product.brand}</span>
            {product.article && <span className="text-xs text-gray-400">Арт: {product.article}</span>}
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">{product.name}</h1>

          <div className="flex items-center gap-2 mt-3">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
              ))}
            </div>
            <span className="text-sm text-gray-500">{product.rating} · {product.reviewCount} отзывов</span>
          </div>

          <div className="mt-6">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl md:text-4xl font-bold text-gray-900">{formatPrice(product.price)}</span>
              {product.oldPrice && <span className="text-xl text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <div className="flex items-center gap-1.5 text-sm text-green-600">
              <Check className="w-4 h-4" /> В наличии
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <Shield className="w-4 h-4" /> Гарантия 5 лет
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <button onClick={() => setShowInstallation(!showInstallation)} className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-brand-500" />
                <span className="text-sm font-semibold text-gray-900">Добавить установку</span>
                <span className="text-sm text-brand-500 font-semibold">5 000 ₽</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showInstallation ? "rotate-180" : ""}`} />
            </button>
            {showInstallation && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">Стандартный монтаж сплит-системы: установка внутреннего и внешнего блока, прокладка трассы до 5 метров, вакуумирование, тестовый пуск.</p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center border border-gray-200 rounded-xl">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2.5 text-gray-500 hover:text-brand-500 transition-colors">−</button>
              <span className="px-4 py-2.5 text-sm font-semibold min-w-[3rem] text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2.5 text-gray-500 hover:text-brand-500 transition-colors">+</button>
            </div>
            <Button variant="secondary" size="lg" className="flex-1 gap-2">
              <ShoppingCart className="w-5 h-5" /> В корзину
            </Button>
          </div>

          <div className="mt-4 p-4 bg-brand-50 rounded-xl">
            <p className="text-sm font-semibold text-brand-700">Итого: {formatPrice(totalPrice)}</p>
            {showInstallation && <p className="text-xs text-gray-500 mt-1">Товар {formatPrice(product.price)} + Установка 5 000 ₽</p>}
          </div>

          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <Truck className="w-5 h-5 text-brand-500 mx-auto mb-1" />
              <p className="text-xs text-gray-500">Доставка завтра</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <Clock className="w-5 h-5 text-brand-500 mx-auto mb-1" />
              <p className="text-xs text-gray-500">Монтаж за 1 день</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <Shield className="w-5 h-5 text-brand-500 mx-auto mb-1" />
              <p className="text-xs text-gray-500">Гарантия 5 лет</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 md:mt-16">
        <div className="flex gap-1 border-b border-gray-200">
          {[["specs", "Характеристики"], ["desc", "Описание"], ["reviews", "Отзывы"]].map(([key, label]) => (
            <button key={key} onClick={() => setActiveTab(key as any)} className={`px-5 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === key ? "text-brand-500 border-brand-500" : "text-gray-500 border-transparent hover:text-gray-700"}`}>
              {label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {activeTab === "specs" && (
            <div className="max-w-xl">
              <table className="w-full">
                <tbody>
                  {Object.entries(product.specs || {}).map(([key, value]) => (
                    <tr key={key} className="border-b border-gray-100">
                      <td className="py-3 pr-4 text-sm text-gray-500 w-1/2">{key}</td>
                      <td className="py-3 text-sm text-gray-900 font-medium">{value as string}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activeTab === "desc" && <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">{product.description}</p>}
          {activeTab === "reviews" && <p className="text-sm text-gray-500">Отзывов пока нет. Будьте первым!</p>}
        </div>
      </div>
    </div>
  )
}
