<?php
/**
 * KvadroAir Seed Script
 * Run: php seed.php
 * Or via browser: https://kvadroair.ru/api/seed.php?key=seed123
 */

require_once __DIR__ . '/db.php';

$secretKey = 'seed123';
if (php_sapi_name() !== 'cli' && ($_GET['key'] ?? '') !== $secretKey) {
    die(json_encode(['error' => 'Invalid key']));
}

echo "Seeding KvadroAir database...\n";

// Categories
$categories = [
    ['id' => DB::uuid(), 'name' => 'Настенные сплит-системы', 'slug' => 'nastenniy', 'description' => 'Настенные сплит-системы — самый популярный тип кондиционеров для квартир и небольших офисов.', 'sort_order' => 1],
    ['id' => DB::uuid(), 'name' => 'Кассетные кондиционеры', 'slug' => 'kassetniy', 'description' => 'Кассетные кондиционеры для помещений с подвесным потолком.', 'sort_order' => 2],
    ['id' => DB::uuid(), 'name' => 'Канальные кондиционеры', 'slug' => 'kanalniy', 'description' => 'Канальные кондиционеры для скрытого монтажа.', 'sort_order' => 3],
    ['id' => DB::uuid(), 'name' => 'Мульти-сплит системы', 'slug' => 'multisplit', 'description' => 'Мульти-сплит системы — один внешний блок и несколько внутренних.', 'sort_order' => 4],
    ['id' => DB::uuid(), 'name' => 'Мобильные кондиционеры', 'slug' => 'mobilniy', 'description' => 'Мобильные кондиционеры — не требуют монтажа.', 'sort_order' => 5],
    ['id' => DB::uuid(), 'name' => 'Промышленные системы', 'slug' => 'prom', 'description' => 'Промышленные системы кондиционирования.', 'sort_order' => 6],
];

foreach ($categories as $cat) {
    DB::insert('categories', $cat);
    echo "  Category: {$cat['name']}\n";
}

// Products
$products = [
    [
        'name' => 'Сплит-система DENKO DSX-12', 'slug' => 'denko-dsx-12',
        'article' => 'DSX-12-2024', 'price' => 34990, 'old_price' => 42990,
        'description' => 'Настенная сплит-система DENKO DSX-12 — оптимальное решение для квартиры или небольшого офиса площадью до 35 м². Инверторный компрессор обеспечивает экономичное энергопотребление, низкий уровень шума и быстрый выход на заданную температуру.',
        'short_desc' => 'Инверторная сплит-система 12 BTU для помещений до 35 м²',
        'brand' => 'DENKO', 'type' => 'nastenniy', 'power' => '12 BTU', 'room_area' => '35 м²',
        'rating' => 4.8, 'review_count' => 124, 'is_hit' => 1, 'in_stock' => 1,
        'warranty' => '3 года', 'installation_price' => 7000,
        'specs' => ['Мощность охлаждения' => '12 000 BTU (3.5 кВт)', 'Мощность обогрева' => '13 000 BTU (3.8 кВт)', 'Уровень шума' => '22-42 дБ', 'Класс энергоэффективности' => 'A++', 'Хладагент' => 'R32', 'Цвет' => 'Белый'],
        'images' => ['https://kvadroklimat.ru/upload/iblock/44a/dx49e4o0tlju698litgpkcn56k70qomv.jpg'],
    ],
    [
        'name' => 'Сплит-система DENKO DSX-09', 'slug' => 'denko-dsx-09',
        'article' => 'DSX-09-2024', 'price' => 28990, 'old_price' => 35990,
        'description' => 'Компактная инверторная сплит-система DENKO DSX-09 для комнат до 25 м². Экономичное энергопотребление, низкий уровень шума, стильный дизайн.',
        'brand' => 'DENKO', 'type' => 'nastenniy', 'power' => '9 BTU', 'room_area' => '25 м²',
        'rating' => 4.7, 'review_count' => 89, 'is_hit' => 1, 'in_stock' => 1,
        'warranty' => '3 года', 'installation_price' => 6000,
        'specs' => ['Мощность охлаждения' => '9 000 BTU (2.6 кВт)', 'Мощность обогрева' => '10 000 BTU (2.9 кВт)', 'Уровень шума' => '20-40 дБ', 'Класс энергоэффективности' => 'A++', 'Хладагент' => 'R32'],
        'images' => ['https://kvadroklimat.ru/upload/iblock/44a/dx49e4o0tlju698litgpkcn56k70qomv.jpg'],
    ],
    [
        'name' => 'Сплит-система Kentatsu KSGB-24HFAN1', 'slug' => 'kentatsu-ksgb-24',
        'price' => 55990, 'old_price' => 64990,
        'description' => 'Мощная сплит-система Kentatsu KSGB-24HFAN1 для больших помещений до 70 м². Надёжный японский компрессор, высокая производительность.',
        'brand' => 'Kentatsu', 'type' => 'nastenniy', 'power' => '24 BTU', 'room_area' => '70 м²',
        'rating' => 4.6, 'review_count' => 56, 'is_hit' => 0, 'in_stock' => 1,
        'warranty' => '3 года', 'installation_price' => 9000,
        'specs' => ['Мощность охлаждения' => '24 000 BTU (7.0 кВт)', 'Мощность обогрева' => '26 000 BTU (7.6 кВт)', 'Уровень шума' => '28-48 дБ', 'Класс энергоэффективности' => 'A+', 'Хладагент' => 'R32'],
        'images' => ['https://kvadroklimat.ru/upload/iblock/44a/dx49e4o0tlju698litgpkcn56k70qomv.jpg'],
    ],
    [
        'name' => 'Сплит-система Royal Clima RC-H24BN', 'slug' => 'royal-clima-rc-h24',
        'price' => 42990, 'old_price' => 49990,
        'description' => 'Инверторная сплит-система Royal Clima RC-H24BN с улучшенной системой фильтрации воздуха. Ионизация, антибактериальный фильтр.',
        'brand' => 'Royal Clima', 'type' => 'nastenniy', 'power' => '24 BTU', 'room_area' => '65 м²',
        'rating' => 4.5, 'review_count' => 78, 'is_hit' => 0, 'in_stock' => 1,
        'warranty' => '3 года', 'installation_price' => 8500,
        'specs' => ['Мощность охлаждения' => '24 000 BTU (7.0 кВт)', 'Уровень шума' => '25-45 дБ', 'Класс энергоэффективности' => 'A++', 'Фильтрация' => 'Антибактериальный + ионизация'],
        'images' => ['https://kvadroklimat.ru/upload/iblock/44a/dx49e4o0tlju698litgpkcn56k70qomv.jpg'],
    ],
    [
        'name' => 'Сплит-система Tosot T12H-S1', 'slug' => 'tosot-t12h-s1',
        'price' => 31990, 'old_price' => 38990,
        'description' => 'Надёжная сплит-система Tosot T12H-S1 с инверторным компрессором. Японские технологии, доступная цена.',
        'brand' => 'Tosot', 'type' => 'nastenniy', 'power' => '12 BTU', 'room_area' => '35 м²',
        'rating' => 4.4, 'review_count' => 42, 'is_hit' => 0, 'in_stock' => 1,
        'warranty' => '3 года', 'installation_price' => 7000,
        'specs' => ['Мощность охлаждения' => '12 000 BTU (3.5 кВт)', 'Уровень шума' => '22-44 дБ', 'Класс энергоэффективности' => 'A+', 'Хладагент' => 'R32'],
        'images' => ['https://kvadroklimat.ru/upload/iblock/44a/dx49e4o0tlju698litgpkcn56k70qomv.jpg'],
    ],
    [
        'name' => 'Сплит-система Haier AS12NS4HRA', 'slug' => 'haier-as12ns4hra',
        'price' => 45990, 'old_price' => 52990,
        'description' => 'Премиальная сплит-система Haier с самоочисткой, Wi-Fi управлением и датчиком движения.',
        'brand' => 'Haier', 'type' => 'nastenniy', 'power' => '12 BTU', 'room_area' => '35 м²',
        'rating' => 4.9, 'review_count' => 203, 'is_hit' => 1, 'in_stock' => 1,
        'warranty' => '5 лет', 'installation_price' => 7000,
        'specs' => ['Мощность охлаждения' => '12 000 BTU (3.5 кВт)', 'Уровень шума' => '19-39 дБ', 'Класс энергоэффективности' => 'A+++', 'Wi-Fi' => 'Да', 'Самоочистка' => 'Да'],
        'images' => ['https://kvadroklimat.ru/upload/iblock/44a/dx49e4o0tlju698litgpkcn56k70qomv.jpg'],
    ],
    [
        'name' => 'Сплит-система Midea MSABU-12HRFN8', 'slug' => 'midea-msabu-12hrfn8',
        'price' => 37990, 'old_price' => 44990,
        'description' => 'Популярная сплит-система Midea с функцией самоочистки и антикоррозийным покрытием.',
        'brand' => 'Midea', 'type' => 'nastenniy', 'power' => '12 BTU', 'room_area' => '35 м²',
        'rating' => 4.6, 'review_count' => 167, 'is_hit' => 1, 'in_stock' => 1,
        'warranty' => '3 года', 'installation_price' => 7000,
        'specs' => ['Мощность охлаждения' => '12 000 BTU (3.5 кВт)', 'Уровень шума' => '22-42 дБ', 'Класс энергоэффективности' => 'A++', 'Самоочистка' => 'Да'],
        'images' => ['https://kvadroklimat.ru/upload/iblock/44a/dx49e4o0tlju698litgpkcn56k70qomv.jpg'],
    ],
    [
        'name' => 'Кассетный кондиционер DENKO DCK-18', 'slug' => 'denko-dck-18',
        'price' => 68990, 'old_price' => 78990,
        'description' => 'Кассетный кондиционер DENKO DCK-18 для офисов и коммерческих помещений до 50 м². Равномерное распределение воздуха по 4 направлениям.',
        'brand' => 'DENKO', 'type' => 'kassetniy', 'power' => '18 BTU', 'room_area' => '50 м²',
        'rating' => 4.7, 'review_count' => 34, 'is_hit' => 0, 'in_stock' => 1,
        'warranty' => '3 года', 'installation_price' => 12000,
        'specs' => ['Мощность охлаждения' => '18 000 BTU (5.3 кВт)', 'Уровень шума' => '28-46 дБ', 'Тип' => 'Кассетный', 'Монтаж' => 'Подвесной потолок'],
        'images' => ['https://kvadroklimat.ru/upload/iblock/d13/edto09z6vrzk94k3x0f8stiuil5t3whn.webp'],
    ],
    [
        'name' => 'Канальный кондиционер Kentatsu KSH-24', 'slug' => 'kentatsu-ksh-24',
        'price' => 78990, 'old_price' => 89990,
        'description' => 'Канальный кондиционер Kentatsu KSH-24 для скрытого монтажа. Идеальное решение для коттеджей и офисов.',
        'brand' => 'Kentatsu', 'type' => 'kanalniy', 'power' => '24 BTU', 'room_area' => '70 м²',
        'rating' => 4.5, 'review_count' => 28, 'is_hit' => 0, 'in_stock' => 1,
        'warranty' => '3 года', 'installation_price' => 15000,
        'specs' => ['Мощность охлаждения' => '24 000 BTU (7.0 кВт)', 'Тип' => 'Канальный', 'Монтаж' => 'Скрытый'],
        'images' => ['https://kvadroklimat.ru/upload/iblock/237/t0jozeyouneuhtmkvmc686msb0cvvwlz.webp'],
    ],
    [
        'name' => 'Мульти-сплит система DENKO DMK-21', 'slug' => 'denko-dmk-21',
        'price' => 98990, 'old_price' => 114990,
        'description' => 'Мульти-сплит система DENKO DMK-21 с одним внешним блоком и двумя внутренними. Для двух комнат до 25+15 м².',
        'brand' => 'DENKO', 'type' => 'multisplit', 'power' => '21 BTU', 'room_area' => '40 м²',
        'rating' => 4.6, 'review_count' => 45, 'is_hit' => 0, 'in_stock' => 1,
        'warranty' => '3 года', 'installation_price' => 14000,
        'specs' => ['Количество внутренних блоков' => '2', 'Мощность охлаждения' => '21 000 BTU (6.2 кВт)', 'Тип' => 'Мульти-сплит'],
        'images' => ['https://kvadroklimat.ru/upload/iblock/597/pgx2pivkopk9knyb3zzeqbblpepxgekf.jpg'],
    ],
];

foreach ($categories as $catIdx => $cat) {
    $catProducts = array_filter($products, fn($p) => $p['type'] === $cat['slug']);
    foreach ($catProducts as $p) {
        DB::insert('products', [
            'id' => DB::uuid(),
            'name' => $p['name'],
            'slug' => $p['slug'],
            'article' => $p['article'] ?? null,
            'description' => $p['description'] ?? null,
            'short_desc' => $p['short_desc'] ?? null,
            'price' => $p['price'],
            'old_price' => $p['old_price'] ?? null,
            'rating' => $p['rating'] ?? 0,
            'review_count' => $p['review_count'] ?? 0,
            'in_stock' => $p['in_stock'] ?? 1,
            'is_hit' => $p['is_hit'] ?? 0,
            'specs' => json_encode($p['specs'] ?? '{}'),
            'images' => json_encode($p['images'] ?? '[]'),
            'brand' => $p['brand'] ?? null,
            'type' => $p['type'],
            'power' => $p['power'] ?? null,
            'room_area' => $p['room_area'] ?? null,
            'warranty' => $p['warranty'] ?? null,
            'installation_price' => $p['installation_price'] ?? null,
            'category_id' => $cat['id'],
        ]);
        echo "  Product: {$p['name']}\n";
    }
}

// Blog posts
$blogPosts = [
    [
        'title' => 'Как выбрать кондиционер для квартиры: полное руководство 2024',
        'slug' => 'kak-vybrat-kondicioner',
        'excerpt' => 'Подробный гайд: мощность, тип, бренд, инвертор, функции. Всё, что нужно знать перед покупкой.',
        'category' => 'Советы', 'published' => 1,
        'content' => '<p>Выбор кондиционера — ответственная задача, от которой зависит комфорт в вашем доме на долгие годы. В этом руководстве мы разберём все ключевые параметры.</p><h2>1. Тип кондиционера</h2><p>Самый популярный вариант — настенная сплит-система. Она подходит для квартир и небольших офисов.</p><h2>2. Мощность охлаждения</h2><p>Основной параметр — BTU. Для комнаты 20 м² достаточно 9 000 BTU (2.6 кВт).</p><h2>3. Инвертор vs On/Off</h2><p>Инверторные модели экономичнее на 30-40%.</p>',
    ],
    [
        'title' => 'Монтаж кондиционера: этапы, стоимость, важные нюансы',
        'slug' => 'montazh-kondicionera',
        'excerpt' => 'Из чего складывается цена установки, как подготовить помещение, на что обратить внимание при выборе монтажников.',
        'category' => 'Советы', 'published' => 1,
        'content' => '<p>Монтаж кондиционера — важнейший этап. Базовая установка — от 7 000 ₽. Монтаж под ключ с материалами — от 12 000 ₽.</p><p>В стоимость входит: установка блоков, прокладка трассы, вакуумирование, пусконаладочные работы.</p>',
    ],
    [
        'title' => 'Скидка 20% на монтаж при покупке кондиционера',
        'slug' => 'skidka-montazh',
        'excerpt' => 'Специальное предложение на установку сплит-систем при покупке кондиционера.',
        'category' => 'Акции', 'published' => 1,
        'content' => '<p>При покупке любого кондиционера — скидка 20% на профессиональный монтаж. Гарантия на работы — 1 год.</p>',
    ],
];

foreach ($blogPosts as $bp) {
    DB::insert('blog_posts', [
        'id' => DB::uuid(),
        'title' => $bp['title'],
        'slug' => $bp['slug'],
        'excerpt' => $bp['excerpt'],
        'content' => $bp['content'],
        'category' => $bp['category'],
        'published' => $bp['published'],
    ]);
    echo "  Blog: {$bp['title']}\n";
}

// Services
$services = [
    ['name' => 'Монтаж сплит-системы', 'slug' => 'montazh-split', 'price' => 5000, 'description' => 'Стандартная установка кондиционера', 'category' => 'montazh', 'sort_order' => 1],
    ['name' => 'Обслуживание кондиционера', 'slug' => 'obsluzhivanie', 'price' => 1500, 'description' => 'Чистка, диагностика, дозаправка', 'category' => 'obsluzhivanie', 'sort_order' => 2],
    ['name' => 'Ремонт кондиционера', 'slug' => 'remont', 'price' => 2000, 'description' => 'Диагностика и ремонт любой сложности', 'category' => 'remont', 'sort_order' => 3],
];

foreach ($services as $s) {
    DB::insert('services', array_merge(['id' => DB::uuid()], $s));
    echo "  Service: {$s['name']}\n";
}

echo "\nDone! Seeded:\n";
echo "  Categories: " . count($categories) . "\n";
echo "  Products: " . count($products) . "\n";
echo "  Blog posts: " . count($blogPosts) . "\n";
echo "  Services: " . count($services) . "\n";
