import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number | string): string {
  const num = typeof price === "string" ? parseFloat(price) : price
  return new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num)
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^\wа-яё]+/gi, "-").replace(/^-+|-+$/g, "")
}

export function createApiUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"
  return `${base}/api${path}`
}
