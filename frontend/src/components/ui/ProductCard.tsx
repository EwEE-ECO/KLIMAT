import Link from "next/link"
import { ShoppingCart, Star } from "lucide-react"
import { cn, formatPrice } from "@/lib/utils"

interface Product {
  id: string
  name: string
  slug: string
  price: string | number
  oldPrice?: string | number | null
  images: string[]
  rating?: number
  reviewCount?: number
  isHit?: boolean
  isNew?: boolean
  brand?: string
  shortDesc?: string
}

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  return (
    <div className={cn("group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300", className)}>
      <Link href={`/product/${product.slug}`} className="block relative aspect-[4/3] bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-gray-300">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        </div>
        <div className="absolute top-3 left-3 flex gap-2">
          {product.isHit && <span className="px-2.5 py-1 text-[11px] font-bold text-white bg-red-500 rounded-md">ХИТ</span>}
          {product.isNew && <span className="px-2.5 py-1 text-[11px] font-bold text-white bg-green-500 rounded-md">НОВИНКА</span>}
        </div>
        {product.oldPrice && (
          <div className="absolute top-3 right-3 px-2 py-1 text-[11px] font-bold text-white bg-accent-400 rounded-md">
            -{Math.round((1 - Number(product.price) / Number(product.oldPrice)) * 100)}%
          </div>
        )}
      </Link>
      <div className="p-4">
        {product.brand && <span className="text-xs font-medium text-accent-400 uppercase tracking-wider">{product.brand}</span>}
        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-1 text-sm font-semibold text-gray-800 line-clamp-2 hover:text-brand-500 transition-colors leading-snug">{product.name}</h3>
        </Link>
        {product.shortDesc && <p className="mt-1 text-xs text-gray-400 line-clamp-1">{product.shortDesc}</p>}
        <div className="mt-2 flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium text-gray-600">{product.rating || 5.0}</span>
          <span className="text-xs text-gray-400">({product.reviewCount || 0})</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
            {product.oldPrice && <span className="ml-2 text-sm text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>}
          </div>
          <button className="p-2.5 bg-brand-500 text-white rounded-xl hover:bg-brand-600 transition-colors" aria-label="В корзину">
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
