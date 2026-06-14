"use client"

import { useState } from "react"
import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { formatPrice } from "@/lib/utils"

const steps = ["Контактные данные", "Адрес доставки", "Комментарий", "Подтверждение"]

export default function CheckoutPage() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: "", phone: "", email: "", city: "Краснодар", street: "", house: "", apartment: "", comment: "", contactMethod: "call", agreement: false })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateStep = () => {
    const newErrors: Record<string, string> = {}
    if (step === 0) {
      if (!form.name.trim()) newErrors.name = "Введите имя"
      if (!form.phone.trim()) newErrors.phone = "Введите телефон"
    }
    if (step === 1) {
      if (!form.street.trim()) newErrors.street = "Введите улицу"
      if (!form.house.trim()) newErrors.house = "Введите дом"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep()) setStep(Math.min(step + 1, 3))
  }

  const prevStep = () => setStep(Math.max(step - 1, 0))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.agreement) { setErrors({ agreement: "Необходимо согласие на обработку данных" }); return }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="container-main py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Спасибо за заказ!</h1>
        <p className="text-lg text-gray-500 mb-8">Менеджер свяжется с вами в течение 15 минут</p>
        <Link href="/"><Button variant="primary" size="lg">На главную</Button></Link>
      </div>
    )
  }

  return (
    <div className="container-main py-8 md:py-12">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-brand-500">Главная</Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-brand-500">Корзина</Link>
          <span>/</span>
          <span className="text-gray-600">Оформление заказа</span>
        </div>

        <div className="flex justify-between mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i <= step ? "bg-brand-500 text-white" : "bg-gray-200 text-gray-500"}`}>{i + 1}</div>
              <span className={`text-sm hidden sm:inline ${i <= step ? "text-brand-500 font-medium" : "text-gray-400"}`}>{s}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Контактные данные</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Имя *</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" placeholder="Иван" />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Телефон *</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" placeholder="+7 (___) ___-__-__" />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" placeholder="email@example.com" />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Адрес доставки</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Город</label>
                  <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Улица *</label>
                    <input type="text" value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />
                    {errors.street && <p className="text-xs text-red-500 mt-1">{errors.street}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Дом *</label>
                    <input type="text" value={form.house} onChange={(e) => setForm({ ...form, house: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />
                    {errors.house && <p className="text-xs text-red-500 mt-1">{errors.house}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Квартира/офис</label>
                  <input type="text" value={form.apartment} onChange={(e) => setForm({ ...form, apartment: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Комментарий и способ связи</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Комментарий к заказу</label>
                  <textarea value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} rows={3} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 resize-none" placeholder="Удобное время, особенности доступа..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Способ связи</label>
                  <div className="flex gap-3">
                    {[{ value: "call", label: "Звонок" }, { value: "whatsapp", label: "WhatsApp" }, { value: "telegram", label: "Telegram" }].map((opt) => (
                      <button key={opt.value} type="button" onClick={() => setForm({ ...form, contactMethod: opt.value })} className={`px-4 py-3 text-sm font-medium rounded-xl border transition-colors ${form.contactMethod === opt.value ? "bg-brand-500 text-white border-brand-500" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"}`}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Подтверждение заказа</h2>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                  <p><span className="text-gray-500">Имя:</span> <span className="font-medium">{form.name}</span></p>
                  <p><span className="text-gray-500">Телефон:</span> <span className="font-medium">{form.phone}</span></p>
                  <p><span className="text-gray-500">Email:</span> <span className="font-medium">{form.email || "—"}</span></p>
                  <p><span className="text-gray-500">Адрес:</span> <span className="font-medium">{form.city}, {form.street} {form.house}{form.apartment ? `, кв. ${form.apartment}` : ""}</span></p>
                  <p><span className="text-gray-500">Связь:</span> <span className="font-medium capitalize">{form.contactMethod === "call" ? "Звонок" : form.contactMethod}</span></p>
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.agreement} onChange={(e) => setForm({ ...form, agreement: e.target.checked })} className="mt-1 w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-400" />
                  <span className="text-xs text-gray-500">Согласен на обработку персональных данных в соответствии с <a href="/privacy" className="text-brand-500 underline">политикой конфиденциальности</a></span>
                </label>
                {errors.agreement && <p className="text-xs text-red-500">{errors.agreement}</p>}
              </div>
            )}
          </div>

          <div className="flex justify-between mt-6">
            {step > 0 ? <Button type="button" variant="outline" onClick={prevStep}>Назад</Button> : <div />}
            {step < 3 ? (
              <Button type="button" variant="primary" onClick={nextStep}>Продолжить</Button>
            ) : (
              <Button type="submit" variant="secondary" size="lg">Подтвердить заказ</Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
