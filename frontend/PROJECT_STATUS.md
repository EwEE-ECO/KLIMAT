# KvadroKlimat — Project Status

> Последнее обновление: 14 июня 2026
> Автор: opencode (opencode/big-pickle)

---

## ✅ Done

### Дизайн + вёрстка
- Все страницы: Hero, Features, Хиты продаж, Why Us, Отзывы, Блог, Контакты, О компании, Каталог, Карточка товара, Корзина, Checkout, Админ-панель
- Анимации: Framer Motion (scroll reveal)
- Адаптив: Tailwind breakpoints

### Правки по запросу
- **"Популярные категории"** — удалены с главной страницы (`page.tsx:16`)
- **Фото на /about** — заменено на градиент-заглушку (`about/page.tsx`)
- **Сертификаты** — названия обновлены: EUROHOFF, Denko, Dahatsu; `aspect-[4/3]`; заголовок "Сертификаты"
- **Текст "Категории товаров"** → "Хиты продаж" в презентации

### Деплой
- GitHub Pages: `https://ewee-eco.github.io/KLIMAT/`
- GitHub Actions: `peaceiris/actions-gh-pages@v3` из `out/`
- Все коммиты в main

### Документы
- PDF-презентация: `C:\Users\zxkre\Desktop\kvadroklimat-presentation\kvadroklimat-presentation.pdf`
- Папка презентации: `C:\Users\zxkre\Desktop\kvadroklimat-presentation\` (11 слайдов)
- HTML-презентация: `kvadroklimat-presentation.html` (удалена)

---

## 🔧 Технические решения (читать перед продолжением)

### Static Export + GitHub Pages
```ts
// next.config.ts
if (process.env.GITHUB_PAGES === "true") {
  config.output = "export"
  config.basePath = "/KLIMAT"
  config.trailingSlash = true
  config.images = { unoptimized: true }
}
```

### Build command (PowerShell)
```powershell
$env:GITHUB_PAGES = "true"; npm run build
```

### Изображения
- `<img>` вместо `next/image` — потому что basePath не добавляется автоматом к `<img>`
- Вручную: `src={`${basePath}/certificates/...`}`
- Certificate images: `public/certificates/` — cert-1.jpg, cert-2.jpg, cert-3.jpg
- Формат карточек: `aspect-[4/3]` + `object-contain`, без padding

### Ключевые файлы
| Файл | Описание |
|------|----------|
| `src/app/page.tsx` | Главная (без Popular Categories) |
| `src/app/(store)/about/page.tsx` | О компании (без фото, с сертификатами) |
| `src/components/sections/CategoriesSection.tsx` | Не используется на главной |
| `src/components/sections/CertificatesSection.tsx` | Сертификаты |
| `next.config.ts` | Static Export, basePath |
| `public/certificates/` | Файлы сертификатов |

---

## 📋 Backlog / Что осталось

- [ ] **Custom domain** — привязать kvadroklimat.ru к GitHub Pages
- [ ] **Мобильная адаптация** — проверить все breakpoints на реальных устройствах
- [ ] **SEO** — meta-теги, Open Graph, Twitter Cards (проверить)
- [ ] **Товары в каталоге** — наполнить реальными товарами (сейчас заглушки)
- [ ] **Скриншоты в PDF** — обновить после всех правок (если нужно)
- [ ] **Старый сайт** — kvadroklimat.ru показывает старый контент, разобраться

---

## 🚀 Следующий проект: КвадраСервис

### Что сохранить (общий бренд)
- Цветовая схема: тёмно-синий `#050C1A` + зелёный `#79BD18`
- Шрифт: Inter
- Тот же стек: Next.js 15 + Tailwind CSS 4 + Framer Motion
- Static Export → GitHub Pages

### Что изменить (другой характер)
- **Тематика:** сервис/услуги, не магазин — другой UX, другая структура
- **Дизайн:** не копировать секции KvadroKlimat, свой характер
- **Навигация:** услуги, цены, портфолио, контакты
- **Страницы:** главная, услуги, цены, портфолио/кейсы, о нас, контакты, заявка

### Организация
- Отдельный репозиторий на GitHub
- Отдельный GitHub Pages (или поддиректория)
- Домен: обсудить (kvadroservice.ru? сервис.квадроклимат.рф?)

---

## 🔗 Ссылки

| Что | Ссылка |
|-----|--------|
| Репозиторий | `https://github.com/EwEE-ECO/KLIMAT` |
| Сайт | `https://ewee-eco.github.io/KLIMAT/` |
| Презентация | `C:\Users\zxkre\Desktop\kvadroklimat-presentation\` |
| PDF | `C:\Users\zxkre\Desktop\kvadroklimat-presentation.pdf` |
| Рабочая папка | `C:\Users\zxkre\Desktop\МОИ ПРОЕКТЫ\kvadroklimat\frontend\` |

---

## 💡 Заметки на будущее

- **build:** всегда `$env:GITHUB_PAGES = "true"` в PowerShell (не `Set-Variable`)
- **certificates:** если добавлять новые — сохранять в `public/certificates/` и в `<img>` использовать `${basePath}/certificates/...`
- **Презентация:** если менять контент — обновить `print-all.html` в папке презентации и перегенерить PDF через Edge headless
- **Не комить** PDF и большие файлы в репозиторий
