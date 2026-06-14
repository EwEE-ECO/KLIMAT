export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "КвадроКлимат",
    url: "https://kvadroklimat.ru",
    logo: "https://kvadroklimat.ru/logo.png",
    description: "Продажа и монтаж кондиционеров в Краснодаре",
    address: { "@type": "PostalAddress", addressLocality: "Краснодар", streetAddress: "ул. Ростовское шоссе, д. 30/7", addressCountry: "RU" },
    contactPoint: { "@type": "ContactPoint", telephone: "+7-918-163-83-77", contactType: "customer service" },
    sameAs: ["https://wa.me/79181638377", "https://t.me/kvadroklimat"],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function ProductJsonLd({ product }: { product: any }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || product.name,
    image: product.images?.[0] || "",
    brand: { "@type": "Brand", name: product.brand },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "RUB",
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `https://kvadroklimat.ru/product/${product.slug}`,
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `https://kvadroklimat.ru${item.url}`,
    })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
