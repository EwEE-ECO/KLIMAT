<?php
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/helpers.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = '/' . trim(str_replace('/api', '', $uri), '/');

// ─── AUTH ──────────────────────────────────────────────────────────────
if ($uri === '/auth/login' && $method === 'POST') {
  $dto = getJsonBody();
  if (empty($dto['email']) || empty($dto['password'])) jsonError('Email и пароль обязательны');
  $stmt = getDB()->prepare("SELECT id, email, name, password, role FROM User WHERE email = ?");
  $stmt->execute([$dto['email']]);
  $user = $stmt->fetch();
  if (!$user || !password_verify($dto['password'], $user['password'])) {
    jsonError('Неверный email или пароль', 401);
  }
  $token = jwtEncode(['sub' => $user['id'], 'email' => $user['email'], 'role' => $user['role']]);
  jsonResponse([
    'token' => $token,
    'user' => ['id' => $user['id'], 'email' => $user['email'], 'name' => $user['name'], 'role' => $user['role']]
  ], 201);
}

if ($uri === '/auth/verify' && $method === 'POST') {
  $dto = getJsonBody();
  if (empty($dto['token'])) jsonError('Токен обязателен');
  $payload = jwtDecode($dto['token']);
  if (!$payload) jsonError('Токен недействителен', 401);
  $stmt = getDB()->prepare("SELECT id, email, name, role FROM User WHERE id = ?");
  $stmt->execute([$payload['sub']]);
  $user = $stmt->fetch();
  if (!$user) jsonError('Токен недействителен', 401);
  jsonResponse(['valid' => true, 'user' => $user]);
}

if ($uri === '/auth/me' && $method === 'GET') {
  $user = getAuthUser();
  if (!$user) jsonError('Токен недействителен', 401);
  jsonResponse(['user' => $user]);
}

// ─── PRODUCTS ──────────────────────────────────────────────────────────
if ($uri === '/products/hits' && $method === 'GET') {
  $stmt = getDB()->prepare("SELECT * FROM Product WHERE isHit = 1 AND inStock = 1 ORDER BY createdAt DESC LIMIT 10");
  $stmt->execute();
  $products = $stmt->fetchAll();
  $products = array_map('formatProduct', $products);
  jsonResponse($products);
}

if ($uri === '/products' && $method === 'GET') {
  $query = $_GET;
  $where = ["p.inStock = 1"];
  $params = [];
  if (!empty($query['category'])) {
    $where[] = "c.slug = ?"; $params[] = $query['category'];
  }
  if (!empty($query['brand'])) { $where[] = "p.brand = ?"; $params[] = $query['brand']; }
  if (!empty($query['type'])) { $where[] = "p.type = ?"; $params[] = $query['type']; }
  if (!empty($query['roomArea'])) { $where[] = "p.roomArea = ?"; $params[] = $query['roomArea']; }
  if (!empty($query['priceMin'])) { $where[] = "p.price >= ?"; $params[] = (float)$query['priceMin']; }
  if (!empty($query['priceMax'])) { $where[] = "p.price <= ?"; $params[] = (float)$query['priceMax']; }
  if (!empty($query['search'])) {
    $s = '%' . $query['search'] . '%';
    $where[] = "(p.name LIKE ? OR p.article LIKE ?)";
    $params[] = $s; $params[] = $s;
  }
  $whereClause = implode(' AND ', $where);
  $page = max(1, (int)($query['page'] ?? 1));
  $limit = min(50, max(1, (int)($query['limit'] ?? 12)));
  $offset = ($page - 1) * $limit;
  $orderMap = ['price_asc' => 'p.price ASC', 'price_desc' => 'p.price DESC', 'name' => 'p.name ASC'];
  $order = $orderMap[$query['sort'] ?? ''] ?? 'p.createdAt DESC';
  $stmt = getDB()->prepare("SELECT COUNT(*) FROM Product p LEFT JOIN Category c ON p.categoryId = c.id WHERE $whereClause");
  $stmt->execute($params);
  $total = (int)$stmt->fetchColumn();
  $stmt = getDB()->prepare("SELECT p.* FROM Product p LEFT JOIN Category c ON p.categoryId = c.id WHERE $whereClause ORDER BY $order LIMIT $limit OFFSET $offset");
  $stmt->execute($params);
  $products = array_map('formatProduct', $stmt->fetchAll());
  jsonResponse([
    'items' => $products, 'total' => $total,
    'page' => $page, 'pages' => max(1, (int)ceil($total / $limit))
  ]);
}

if (preg_match('#^/products/([^/]+)$#', $uri, $m) && $method === 'GET') {
  $slug = $m[1];
  $stmt = getDB()->prepare("SELECT p.*, c.name as catName, c.slug as catSlug FROM Product p LEFT JOIN Category c ON p.categoryId = c.id WHERE p.slug = ?");
  $stmt->execute([$slug]);
  $product = $stmt->fetch();
  if (!$product) jsonError('Товар не найден', 404);
  $product = formatProduct($product);
  $stmt = getDB()->prepare("SELECT * FROM Review WHERE productId = ? ORDER BY createdAt DESC");
  $stmt->execute([$product['id']]);
  $product['reviews'] = $stmt->fetchAll();
  $product['category'] = ['name' => $product['catName'], 'slug' => $product['catSlug']];
  unset($product['catName'], $product['catSlug'], $product['parentId']);
  jsonResponse($product);
}

if ($uri === '/products' && $method === 'POST') {
  $user = requireAuth();
  $dto = getJsonBody();
  $id = cuid();
  $slug = $dto['slug'] ?? slugify($dto['name'] . '-' . substr(bin2hex(random_bytes(4)), 0, 8));
  $images = json_encode($dto['images'] ?? [], JSON_UNESCAPED_UNICODE);
  $specs = isset($dto['specs']) ? json_encode($dto['specs'], JSON_UNESCAPED_UNICODE) : null;
  $stmt = getDB()->prepare("INSERT INTO Product (id, name, slug, article, description, shortDesc, price, oldPrice, installment, rating, reviewCount, inStock, isHit, isNew, specs, images, seoTitle, seoDesc, brand, power, roomArea, type, warranty, installationPrice, categoryId) VALUES (?,?,?,?,?,?,?,?,?,0,0,1,0,0,?,?,?,?,?,?,?,?,?,?)");
  $stmt->execute([$id, $dto['name'], $slug, $dto['article'] ?? null, $dto['description'] ?? null, $dto['shortDesc'] ?? null, $dto['price'], $dto['oldPrice'] ?? null, $dto['installment'] ?? null, $specs, $images, $dto['seoTitle'] ?? null, $dto['seoDesc'] ?? null, $dto['brand'] ?? null, $dto['power'] ?? null, $dto['roomArea'] ?? null, $dto['type'] ?? null, $dto['warranty'] ?? null, $dto['installationPrice'] ?? null, $dto['categoryId']]);
  $stmt = getDB()->prepare("SELECT * FROM Product WHERE id = ?");
  $stmt->execute([$id]);
  jsonResponse(formatProduct($stmt->fetch()), 201);
}

if (preg_match('#^/products/([^/]+)$#', $uri, $m) && $method === 'PUT') {
  $user = requireAuth();
  $id = $m[1];
  $dto = getJsonBody();
  $fields = []; $params = [];
  foreach (['name','slug','article','description','shortDesc','price','oldPrice','installment','inStock','isHit','isNew','seoTitle','seoDesc','brand','power','roomArea','type','warranty','installationPrice','categoryId'] as $f) {
    if (isset($dto[$f])) { $fields[] = "`$f` = ?"; $params[] = $dto[$f]; }
  }
  if (isset($dto['specs'])) { $fields[] = "specs = ?"; $params[] = json_encode($dto['specs'], JSON_UNESCAPED_UNICODE); }
  if (isset($dto['images'])) { $fields[] = "images = ?"; $params[] = json_encode($dto['images'], JSON_UNESCAPED_UNICODE); }
  if (empty($fields)) jsonError('Нет данных для обновления');
  $params[] = $id;
  $stmt = getDB()->prepare("UPDATE Product SET " . implode(', ', $fields) . " WHERE id = ?");
  $stmt->execute($params);
  if ($stmt->rowCount() === 0) jsonError('Товар не найден', 404);
  $stmt = getDB()->prepare("SELECT * FROM Product WHERE id = ?");
  $stmt->execute([$id]);
  jsonResponse(formatProduct($stmt->fetch()));
}

if (preg_match('#^/products/([^/]+)$#', $uri, $m) && $method === 'DELETE') {
  $user = requireAuth();
  $id = $m[1];
  $stmt = getDB()->prepare("DELETE FROM Product WHERE id = ?");
  $stmt->execute([$id]);
  if ($stmt->rowCount() === 0) jsonError('Товар не найден', 404);
  jsonResponse(['success' => true]);
}

// ─── CATEGORIES ────────────────────────────────────────────────────────
if ($uri === '/categories' && $method === 'GET') {
  $stmt = getDB()->query("SELECT * FROM Category ORDER BY `order` ASC");
  $categories = $stmt->fetchAll();
  $tree = [];
  $byId = [];
  foreach ($categories as $c) {
    $c['children'] = [];
    $byId[$c['id']] = $c;
  }
  foreach ($byId as &$c) {
    if ($c['parentId'] && isset($byId[$c['parentId']])) {
      $byId[$c['parentId']]['children'][] = &$c;
    } else {
      $tree[] = &$c;
    }
  }
  jsonResponse($tree);
}

if (preg_match('#^/categories/([^/]+)$#', $uri, $m) && $method === 'GET') {
  $slug = $m[1];
  $stmt = getDB()->prepare("SELECT * FROM Category WHERE slug = ?");
  $stmt->execute([$slug]);
  $cat = $stmt->fetch();
  if (!$cat) jsonError('Категория не найдена', 404);
  $stmt = getDB()->prepare("SELECT * FROM Product WHERE categoryId = ? AND inStock = 1 ORDER BY createdAt DESC");
  $stmt->execute([$cat['id']]);
  $cat['products'] = array_map('formatProduct', $stmt->fetchAll());
  $stmt = getDB()->prepare("SELECT * FROM Category WHERE parentId = ? ORDER BY `order` ASC");
  $stmt->execute([$cat['id']]);
  $cat['children'] = $stmt->fetchAll();
  jsonResponse($cat);
}

if ($uri === '/categories' && $method === 'POST') {
  $user = requireAuth();
  $dto = getJsonBody();
  $id = cuid();
  $slug = $dto['slug'] ?? slugify($dto['name']);
  $stmt = getDB()->prepare("INSERT INTO Category (id, name, slug, description, image, parentId, `order`) VALUES (?,?,?,?,?,?,?)");
  $stmt->execute([$id, $dto['name'], $slug, $dto['description'] ?? null, $dto['image'] ?? null, $dto['parentId'] ?? null, $dto['order'] ?? 0]);
  $stmt = getDB()->prepare("SELECT * FROM Category WHERE id = ?");
  $stmt->execute([$id]);
  jsonResponse($stmt->fetch(), 201);
}

if (preg_match('#^/categories/([^/]+)$#', $uri, $m) && $method === 'PUT') {
  $user = requireAuth();
  $id = $m[1];
  $dto = getJsonBody();
  $fields = []; $params = [];
  foreach (['name','slug','description','image','parentId','order'] as $f) {
    if (isset($dto[$f])) { $fields[] = "`$f` = ?"; $params[] = $dto[$f]; }
  }
  if (empty($fields)) jsonError('Нет данных для обновления');
  $params[] = $id;
  $stmt = getDB()->prepare("UPDATE Category SET " . implode(', ', $fields) . " WHERE id = ?");
  $stmt->execute($params);
  jsonResponse(['success' => true]);
}

if (preg_match('#^/categories/([^/]+)$#', $uri, $m) && $method === 'DELETE') {
  $user = requireAuth();
  $id = $m[1];
  $stmt = getDB()->prepare("DELETE FROM Category WHERE id = ?");
  $stmt->execute([$id]);
  jsonResponse(['success' => true]);
}

// ─── ORDERS ────────────────────────────────────────────────────────────
if ($uri === '/orders/stats' && $method === 'GET') {
  $user = requireAuth();
  $stmt = getDB()->query("SELECT COUNT(*) as totalOrders, SUM(CASE WHEN status='NEW' THEN 1 ELSE 0 END) as newOrders, COALESCE(SUM(total),0) as totalRevenue FROM `Order`");
  jsonResponse($stmt->fetch());
}

if ($uri === '/orders' && $method === 'GET') {
  $user = requireAuth();
  $page = max(1, (int)($_GET['page'] ?? 1));
  $limit = 20;
  $offset = ($page - 1) * $limit;
  $where = '';
  $params = [];
  if (!empty($_GET['status'])) { $where = "WHERE status = ?"; $params[] = $_GET['status']; }
  $stmt = getDB()->prepare("SELECT COUNT(*) FROM `Order` $where");
  $stmt->execute($params);
  $total = (int)$stmt->fetchColumn();
  $stmt = getDB()->prepare("SELECT * FROM `Order` $where ORDER BY createdAt DESC LIMIT $limit OFFSET $offset");
  $stmt->execute($params);
  $orders = $stmt->fetchAll();
  foreach ($orders as &$o) {
    $s = getDB()->prepare("SELECT * FROM OrderItem WHERE orderId = ?");
    $s->execute([$o['id']]);
    $o['items'] = $s->fetchAll();
  }
  jsonResponse(['items' => $orders, 'total' => $total, 'page' => $page, 'pages' => max(1, (int)ceil($total / $limit))]);
}

if (preg_match('#^/orders/([^/]+)/status$#', $uri, $m) && $method === 'PUT') {
  $user = requireAuth();
  $id = $m[1];
  $dto = getJsonBody();
  if (empty($dto['status'])) jsonError('Статус обязателен');
  $stmt = getDB()->prepare("UPDATE `Order` SET status = ? WHERE id = ?");
  $stmt->execute([$dto['status'], $id]);
  jsonResponse(['success' => true]);
}

if (preg_match('#^/orders/([^/]+)$#', $uri, $m) && $method === 'GET') {
  $user = requireAuth();
  $id = $m[1];
  $stmt = getDB()->prepare("SELECT * FROM `Order` WHERE id = ?");
  $stmt->execute([$id]);
  $order = $stmt->fetch();
  if (!$order) jsonError('Заказ не найден', 404);
  $s = getDB()->prepare("SELECT * FROM OrderItem WHERE orderId = ?");
  $s->execute([$id]);
  $order['items'] = $s->fetchAll();
  jsonResponse($order);
}

if ($uri === '/orders' && $method === 'POST') {
  $dto = getJsonBody();
  $id = cuid();
  $orderNum = generateOrderNumber();
  $user = getAuthUser();
  $userId = $user ? $user['id'] : null;
  $stmt = getDB()->prepare("INSERT INTO `Order` (id, orderNumber, total, subtotal, deliveryCost, promoCode, discount, customerName, customerPhone, customerEmail, city, street, house, apartment, comment, contactMethod, userId) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
  $stmt->execute([$id, $orderNum, $dto['total'] ?? 0, $dto['subtotal'] ?? 0, $dto['deliveryCost'] ?? null, $dto['promoCode'] ?? null, $dto['discount'] ?? null, $dto['customerName'], $dto['customerPhone'], $dto['customerEmail'] ?? null, $dto['city'] ?? null, $dto['street'] ?? null, $dto['house'] ?? null, $dto['apartment'] ?? null, $dto['comment'] ?? null, $dto['contactMethod'] ?? null, $userId]);
  if (!empty($dto['items'])) {
    $s = getDB()->prepare("INSERT INTO OrderItem (id, orderId, productId, name, price, quantity, image) VALUES (?,?,?,?,?,?,?)");
    foreach ($dto['items'] as $item) {
      $s->execute([cuid(), $id, $item['id'], $item['name'], $item['price'], $item['quantity'] ?? 1, $item['image'] ?? null]);
    }
  }
  $stmt = getDB()->prepare("SELECT * FROM `Order` WHERE id = ?");
  $stmt->execute([$id]);
  $order = $stmt->fetch();
  $s = getDB()->prepare("SELECT * FROM OrderItem WHERE orderId = ?");
  $s->execute([$id]);
  $order['items'] = $s->fetchAll();
  jsonResponse($order, 201);
}

// ─── SERVICES ──────────────────────────────────────────────────────────
if ($uri === '/services' && $method === 'GET') {
  $stmt = getDB()->query("SELECT * FROM Service ORDER BY `order` ASC");
  jsonResponse($stmt->fetchAll());
}

if (preg_match('#^/services/([^/]+)$#', $uri, $m) && $method === 'GET') {
  $slug = $m[1];
  $stmt = getDB()->prepare("SELECT * FROM Service WHERE slug = ?");
  $stmt->execute([$slug]);
  $svc = $stmt->fetch();
  if (!$svc) jsonError('Услуга не найдена', 404);
  jsonResponse($svc);
}

if ($uri === '/services' && $method === 'POST') {
  $user = requireAuth();
  $dto = getJsonBody();
  $id = cuid();
  $slug = $dto['slug'] ?? slugify($dto['name'] . '-' . substr(bin2hex(random_bytes(4)), 0, 8));
  $stmt = getDB()->prepare("INSERT INTO Service (id, name, slug, description, price, category, `order`, image) VALUES (?,?,?,?,?,?,?,?)");
  $stmt->execute([$id, $dto['name'], $slug, $dto['description'] ?? null, $dto['price'] ?? null, $dto['category'] ?? null, $dto['order'] ?? 0, $dto['image'] ?? null]);
  $stmt = getDB()->prepare("SELECT * FROM Service WHERE id = ?");
  $stmt->execute([$id]);
  jsonResponse($stmt->fetch(), 201);
}

if (preg_match('#^/services/([^/]+)$#', $uri, $m) && $method === 'PUT') {
  $user = requireAuth();
  $id = $m[1];
  $dto = getJsonBody();
  $fields = []; $params = [];
  foreach (['name','slug','description','price','category','order','image'] as $f) {
    if (isset($dto[$f])) { $fields[] = "`$f` = ?"; $params[] = $dto[$f]; }
  }
  if (empty($fields)) jsonError('Нет данных для обновления');
  $params[] = $id;
  $stmt = getDB()->prepare("UPDATE Service SET " . implode(', ', $fields) . " WHERE id = ?");
  $stmt->execute($params);
  jsonResponse(['success' => true]);
}

if (preg_match('#^/services/([^/]+)$#', $uri, $m) && $method === 'DELETE') {
  $user = requireAuth();
  $stmt = getDB()->prepare("DELETE FROM Service WHERE id = ?");
  $stmt->execute([$m[1]]);
  jsonResponse(['success' => true]);
}

// ─── BLOG ──────────────────────────────────────────────────────────────
if ($uri === '/blog' && $method === 'GET') {
  $page = max(1, (int)($_GET['page'] ?? 1));
  $limit = min(50, max(1, (int)($_GET['limit'] ?? 10)));
  $offset = ($page - 1) * $limit;
  $where = "published = 1";
  $params = [];
  if (!empty($_GET['category'])) { $where .= " AND category = ?"; $params[] = $_GET['category']; }
  $stmt = getDB()->prepare("SELECT COUNT(*) FROM BlogPost WHERE $where");
  $stmt->execute($params);
  $total = (int)$stmt->fetchColumn();
  $stmt = getDB()->prepare("SELECT * FROM BlogPost WHERE $where ORDER BY createdAt DESC LIMIT $limit OFFSET $offset");
  $stmt->execute($params);
  jsonResponse([
    'items' => $stmt->fetchAll(), 'total' => $total,
    'page' => $page, 'pages' => max(1, (int)ceil($total / $limit))
  ]);
}

if (preg_match('#^/blog/([^/]+)$#', $uri, $m) && $method === 'GET') {
  $slug = $m[1];
  $stmt = getDB()->prepare("SELECT * FROM BlogPost WHERE slug = ? AND published = 1");
  $stmt->execute([$slug]);
  $post = $stmt->fetch();
  if (!$post) jsonError('Запись не найдена', 404);
  jsonResponse($post);
}

if ($uri === '/blog' && $method === 'POST') {
  $user = requireAuth();
  $dto = getJsonBody();
  $id = cuid();
  $slug = $dto['slug'] ?? slugify($dto['title'] . '-' . substr(bin2hex(random_bytes(4)), 0, 8));
  $stmt = getDB()->prepare("INSERT INTO BlogPost (id, title, slug, excerpt, content, image, category, published, seoTitle, seoDesc) VALUES (?,?,?,?,?,?,?,?,?,?)");
  $stmt->execute([$id, $dto['title'], $slug, $dto['excerpt'] ?? null, $dto['content'] ?? null, $dto['image'] ?? null, $dto['category'] ?? null, $dto['published'] ?? false, $dto['seoTitle'] ?? null, $dto['seoDesc'] ?? null]);
  $stmt = getDB()->prepare("SELECT * FROM BlogPost WHERE id = ?");
  $stmt->execute([$id]);
  jsonResponse($stmt->fetch(), 201);
}

if (preg_match('#^/blog/([^/]+)$#', $uri, $m) && $method === 'PUT') {
  $user = requireAuth();
  $id = $m[1];
  $dto = getJsonBody();
  $fields = []; $params = [];
  foreach (['title','slug','excerpt','content','image','category','published','seoTitle','seoDesc'] as $f) {
    if (isset($dto[$f])) { $fields[] = "`$f` = ?"; $params[] = $dto[$f]; }
  }
  if (empty($fields)) jsonError('Нет данных для обновления');
  $params[] = $id;
  $stmt = getDB()->prepare("UPDATE BlogPost SET " . implode(', ', $fields) . " WHERE id = ?");
  $stmt->execute($params);
  jsonResponse(['success' => true]);
}

if (preg_match('#^/blog/([^/]+)$#', $uri, $m) && $method === 'DELETE') {
  $user = requireAuth();
  $stmt = getDB()->prepare("DELETE FROM BlogPost WHERE id = ?");
  $stmt->execute([$m[1]]);
  jsonResponse(['success' => true]);
}

// ─── CONTACTS ──────────────────────────────────────────────────────────
if ($uri === '/contacts' && $method === 'POST') {
  $dto = getJsonBody();
  $id = cuid();
  $stmt = getDB()->prepare("INSERT INTO ContactRequest (id, name, phone, email, message, source) VALUES (?,?,?,?,?,?)");
  $stmt->execute([$id, $dto['name'], $dto['phone'], $dto['email'] ?? null, $dto['message'] ?? null, $dto['source'] ?? 'site']);
  jsonResponse(['success' => true], 201);
}

if ($uri === '/contacts' && $method === 'GET') {
  $user = requireAuth();
  $stmt = getDB()->query("SELECT * FROM ContactRequest ORDER BY createdAt DESC");
  jsonResponse($stmt->fetchAll());
}

// ─── PAGE META ─────────────────────────────────────────────────────────
if ($uri === '/page-meta' && $method === 'GET') {
  $stmt = getDB()->query("SELECT * FROM PageMeta");
  jsonResponse($stmt->fetchAll());
}

if (preg_match('#^/page-meta/([^/]+)$#', $uri, $m) && $method === 'GET') {
  $page = $m[1];
  $stmt = getDB()->prepare("SELECT * FROM PageMeta WHERE page = ?");
  $stmt->execute([$page]);
  $meta = $stmt->fetch();
  if (!$meta) jsonError('Страница не найдена', 404);
  jsonResponse($meta);
}

if (preg_match('#^/page-meta/([^/]+)$#', $uri, $m) && $method === 'PUT') {
  $user = requireAuth();
  $page = $m[1];
  $dto = getJsonBody();
  $stmt = getDB()->prepare("INSERT INTO PageMeta (id, page, title, `desc`, ogImage) VALUES (?,?,?,?,?) ON DUPLICATE KEY UPDATE title = VALUES(title), `desc` = VALUES(`desc`), ogImage = VALUES(ogImage)");
  $stmt->execute([cuid(), $page, $dto['title'] ?? null, $dto['desc'] ?? null, $dto['ogImage'] ?? null]);
  $stmt = getDB()->prepare("SELECT * FROM PageMeta WHERE page = ?");
  $stmt->execute([$page]);
  jsonResponse($stmt->fetch());
}

// ─── UPLOAD ────────────────────────────────────────────────────────────
if ($uri === '/upload' && $method === 'POST') {
  $user = requireAuth();
  jsonResponse(handleUpload());
}

// ─── 404 ───────────────────────────────────────────────────────────────
jsonError('Not Found: ' . $method . ' ' . $uri, 404);

// ─── FORMAT HELPERS ────────────────────────────────────────────────────
function formatProduct(array $p): array {
  $p['images'] = json_decode($p['images'] ?? '[]', true) ?: [];
  $p['specs'] = json_decode($p['specs'] ?? 'null', true);
  $p['inStock'] = (bool)$p['inStock'];
  $p['isHit'] = (bool)$p['isHit'];
  $p['isNew'] = (bool)$p['isNew'];
  $p['price'] = (float)$p['price'];
  $p['oldPrice'] = $p['oldPrice'] !== null ? (float)$p['oldPrice'] : null;
  $p['installment'] = $p['installment'] !== null ? (float)$p['installment'] : null;
  $p['installationPrice'] = $p['installationPrice'] !== null ? (float)$p['installationPrice'] : null;
  return $p;
}
