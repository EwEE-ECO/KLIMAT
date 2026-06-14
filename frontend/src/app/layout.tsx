import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { CookieBanner } from "@/components/ui/CookieBanner"
import { Providers } from "@/components/Providers"
import "./globals.css"

const roboto = Roboto({ subsets: ["cyrillic", "latin"], display: "swap", weight: ["400", "500", "700", "900"], variable: "--font-roboto" })

export const metadata: Metadata = {
  title: { default: "КвадроКлимат — продажа и монтаж кондиционеров в Краснодаре", template: "%s | КвадроКлимат" },
  description: "Продажа, монтаж и обслуживание кондиционеров в Краснодаре. Более 40 брендов: DENKO, Daikin, Mitsubishi, Bosch, LG и др. Официальная гарантия, бесплатный замер.",
  keywords: ["кондиционеры Краснодар", "сплит-системы", "монтаж кондиционеров", "климатическая техника", "DENKO", "Daikin", "Mitsubishi"],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "КвадроКлимат",
    title: "КвадроКлимат — продажа и монтаж кондиционеров в Краснодаре",
    description: "Продажа, монтаж и обслуживание кондиционеров в Краснодаре. Более 40 брендов.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={roboto.variable}>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  )
}
