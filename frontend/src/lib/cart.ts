"use client"

import { useState, useEffect, useCallback } from "react"

export interface CartItem {
  id: string
  name: string
  slug: string
  price: number
  image?: string
  quantity: number
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem("kvadroklimat-cart")
      if (stored) setItems(JSON.parse(stored))
    } catch {}
  }, [])

  const persist = useCallback((newItems: CartItem[]) => {
    setItems(newItems)
    localStorage.setItem("kvadroklimat-cart", JSON.stringify(newItems))
  }, [])

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      const updated = existing ? prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)) : [...prev, { ...item, quantity: 1 }]
      localStorage.setItem("kvadroklimat-cart", JSON.stringify(updated))
      return updated
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prev) => {
      const updated = prev.filter((i) => i.id !== id)
      localStorage.setItem("kvadroklimat-cart", JSON.stringify(updated))
      return updated
    })
  }, [])

  const updateQuantity = useCallback((id: string, delta: number) => {
    setItems((prev) => {
      const updated = prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i))
      localStorage.setItem("kvadroklimat-cart", JSON.stringify(updated))
      return updated
    })
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    localStorage.removeItem("kvadroklimat-cart")
  }, [])

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return { items, addItem, removeItem, updateQuantity, clearCart, total, count }
}
