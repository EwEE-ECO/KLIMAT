# KvadroAir — План разработки + SEO

---

## Фаза 0 — Фундамент (сейчас)

### 0.1 ✅ Ребрендинг КвадроКлимат → KvadroAir
- [x] Название во всех файлах frontend (layout, header, footer, about, contacts, privacy, admin)
- [x] Название в backend (package.json), Prisma seed, .env, docker-compose.yml
- [x] Адрес: д. 30/7к2 | Домен: kvadroair.ru | Nginx config

### 0.2 🔴 Домен kvadroair.ru
- [ ] Купить домен | Настроить DNS | SSL (Let's Encrypt) | Редирект со старого

---

## Фаза 1 — SEO-база

### 1.1 🟡 JSON-LD — подключить к страницам
Компоненты в `JsonLd.tsx` есть, но **нигде не используются**.
- [ ] `OrganizationJsonLd` → корневой layout
- [ ] `ProductJsonLd` → `product/[slug]/page.tsx`
- [ ] `BreadcrumbJsonLd` → на страницы с хлебными крошками
- [ ] `ArticleJsonLd` → `blog/[slug]/page.tsx`
- [ ] `FAQPage` → `services/page.tsx`
- [ ] `LocalBusiness` → для локального SEO (Геленджик)

### 1.2 🟡 Canonical URL
- [ ] `<link rel="canonical">` через корневой layout

### 1.3 🟡 Twitter Cards
- [ ] `twitter:card`, `title`, `description`, `image` на все страницы

### 1.4 ⚪ Open Graph для всех страниц
- [ ] Сейчас только у главной, товара и блога. Добавить: catalog, about, contacts, services, privacy

### 1.5 ⚪ Sitemap
- [ ] Динамическая генерация из Prisma | Изображения в sitemap

### 1.6 ⚪ Meta robots
- [ ] `admin/*`, `cart`, `checkout` → noindex

---

## Фаза 2 — Товары и каталог

### 2.1 🟡 Prisma Seed
- [ ] Категории (6 шт) | Бренды (10 шт) | 20-30 товаров с характеристиками
- [ ] Цены, остатки, статус наличия

### 2.2 🔴 Фильтрация через URL
- [ ] Переделать `useState` → `useSearchParams`
- [ ] URL: `/catalog?brand=dantex&power=9&inverter=true`
- [ ] Чтобы фильтры индексировались и не сбрасывались при перезагрузке

### 2.3 ⚪ next/image везде
- [ ] Заменить SVG-заполнители на `<Image>` с реальными фото
- [ ] Alt-теги ко всем изображениям

### 2.4 ⚪ Пагинация
- [ ] URL-based: `/catalog/page/2` | 12-15 товаров на страницу

---

## Фаза 3 — Блог и контент

### 3.1 ⚪ Реальные посты
- [ ] 5-10 SEO-статей ("купить кондиционер в Геленджике", "сплит-система цена")
- [ ] Изображения к каждой статье

### 3.2 ⚪ BlogPosting Schema
- [ ] JSON-LD Article/BlogPosting с author, datePublished, image

### 3.3 ⚪ Категории блога в URL
- [ ] `/blog/category/sovety` вместо кнопок-фильтров

---

## Фаза 4 — Функционал магазина

### 4.1 🔴 Корзина
- [ ] Синхронизация с бэкендом для авторизованных

### 4.2 🔴 Оформление заказа
- [ ] Интеграция с NestJS | Email/Telegram уведомления

### 4.3 🔴 Админ-панель
- [ ] CRUD товаров | Управление заказами | Загрузка изображений

### 4.4 ⚪ Форма обратной связи (без бэкенда, пока VPS нет)
- [ ] Formspree / Web3Forms / PHP-скрипт на Reg.ru
- [ ] Цель в Яндекс.Метрику

---

## Фаза 5 — Инфраструктура

### 5.1 🔴 VPS / Хостинг
- Reg.ru shared hosting **не поддерживает Docker**
- Варианты: Reg.ru VPS (от 300₽/мес), Timeweb VPS, или статика на Reg.ru

### 5.2 🔴 Docker Compose
- [ ] PostgreSQL + NestJS + Next.js + Nginx + Let's Encrypt + CI/CD

### 5.3 🟡 GitHub
- [ ] `git init` → первый коммит → создать репозиторий → настроить деплой

---

## Фаза 6 — Продвинутое SEO

### 6.1 ⚪ Локальное SEO
- [ ] Яндекс.Бизнес | 2GIS | Google Business Profile | Отзывы с AggregateRating

### 6.2 ⚪ SEO-тексты категорий
- [ ] "Настенные сплит-системы в Геленджике", "Кассетные кондиционеры для офиса" и т.д.

### 6.3 ⚪ Performance
- [ ] Core Web Vitals (Lighthouse) | Critical CSS | Lazy load | Кэширование | Brotli

### 6.4 ⚪ Внешние ссылки
- [ ] Яндекс.Метрика (цели) | Google Search Console | Яндекс.Вебмастер

---

## Текущий статус (21 июня 2026)

| Фаза | Прогресс |
|------|----------|
| 0 — Фундамент | 🟢 90% |
| 1 — SEO-база | 🟡 15% |
| 2 — Товары и каталог | 🔴 5% |
| 3 — Блог | 🔴 10% |
| 4 — Функционал | 🔴 10% |
| 5 — Инфраструктура | 🔴 0% |
| 6 — Продвинутое SEO | ⚪ 0% |

---

## Что делаем прямо сейчас (следующие шаги)

1. **JSON-LD** — подключить существующие компоненты к страницам
2. **Canonical + Twitter Cards** — через корневой layout
3. **Open Graph** — добавить на catalog, about, contacts, services, privacy
4. **Изображения** — реальные фото продуктов вместо SVG

Эти 4 пункта дадут ~80% SEO-эффекта при минимальных затратах времени.
