<?php
require_once __DIR__ . '/db.php';

function handleProducts(): void {
    $method = $_SERVER['REQUEST_METHOD'];
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $path = rtrim(str_replace('/api', '', $path), '/');
    $parts = array_values(array_filter(explode('/', $path)));

    // GET /products — list with filters
    if ($method === 'GET' && $parts[0] === 'products' && !isset($parts[1])) {
        $page = max(1, (int)($_GET['page'] ?? 1));
        $limit = min(50, max(1, (int)($_GET['limit'] ?? ITEMS_PER_PAGE)));
        $offset = ($page - 1) * $limit;
        $where = ['1=1'];
        $params = [];

        if (!empty($_GET['category'])) {
            $where[] = 'p.category_id = ?';
            $params[] = $_GET['category'];
        }
        if (!empty($_GET['brand'])) {
            $where[] = 'p.brand = ?';
            $params[] = $_GET['brand'];
        }
        if (!empty($_GET['type'])) {
            $where[] = 'p.type = ?';
            $params[] = $_GET['type'];
        }
        if (!empty($_GET['search'])) {
            $where[] = '(p.name LIKE ? OR p.brand LIKE ? OR p.article LIKE ?)';
            $s = '%' . $_GET['search'] . '%';
            $params = array_merge($params, [$s, $s, $s]);
        }
        if (!empty($_GET['hit'])) {
            $where[] = 'p.is_hit = 1';
        }
        if (!empty($_GET['in_stock'])) {
            $where[] = 'p.in_stock = 1';
        }

        $whereClause = implode(' AND ', $where);
        $total = DB::fetch("SELECT COUNT(*) as cnt FROM products p WHERE $whereClause", $params)['cnt'];

        $sort = $_GET['sort'] ?? 'created_at';
        $order = strtoupper($_GET['order'] ?? 'DESC');
        $allowedSort = ['created_at', 'price', 'name', 'rating'];
        if (!in_array($sort, $allowedSort)) $sort = 'created_at';
        if (!in_array($order, ['ASC', 'DESC'])) $order = 'DESC';

        $products = DB::fetchAll(
            "SELECT p.*, c.name as category_name, c.slug as category_slug
             FROM products p LEFT JOIN categories c ON p.category_id = c.id
             WHERE $whereClause ORDER BY p.$sort $order LIMIT $limit OFFSET $offset",
            $params
        );

        foreach ($products as &$p) {
            $p['images'] = json_decode($p['images'] ?? '[]', true) ?: [];
            $p['specs'] = json_decode($p['specs'] ?? '{}', true) ?: [];
            $p['price'] = (float)$p['price'];
            $p['old_price'] = $p['old_price'] ? (float)$p['old_price'] : null;
        }

        echo json_encode([
            'items' => $products,
            'total' => (int)$total,
            'page' => $page,
            'pages' => max(1, ceil($total / $limit)),
        ]);
        return;
    }

    // GET /products/:slug — single product
    if ($method === 'GET' && $parts[0] === 'products' && isset($parts[1])) {
        $slug = $parts[1];
        $product = DB::fetch(
            "SELECT p.*, c.name as category_name, c.slug as category_slug
             FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.slug = ?",
            [$slug]
        );
        if (!$product) {
            http_response_code(404);
            echo json_encode(['error' => 'Товар не найден']);
            return;
        }
        $product['images'] = json_decode($product['images'] ?? '[]', true) ?: [];
        $product['specs'] = json_decode($product['specs'] ?? '{}', true) ?: [];
        $product['price'] = (float)$product['price'];
        $product['old_price'] = $product['old_price'] ? (float)$product['old_price'] : null;

        echo json_encode($product);
        return;
    }

    // POST /products — create (admin)
    if ($method === 'POST' && $parts[0] === 'products') {
        authMiddleware();
        $data = json_decode(file_get_contents('php://input'), true);
        $id = DB::uuid();
        DB::insert('products', [
            'id' => $id,
            'name' => $data['name'],
            'slug' => $data['slug'] ?? strtolower(trim(preg_replace('/[^a-zA-Z0-9-]+/', '-', $data['name']), '-')),
            'article' => $data['article'] ?? null,
            'description' => $data['description'] ?? null,
            'short_desc' => $data['short_desc'] ?? null,
            'price' => $data['price'],
            'old_price' => $data['old_price'] ?? null,
            'installment' => $data['installment'] ?? null,
            'in_stock' => $data['in_stock'] ?? 1,
            'is_hit' => $data['is_hit'] ?? 0,
            'is_new' => $data['is_new'] ?? 0,
            'specs' => json_encode($data['specs'] ?? '{}'),
            'images' => json_encode($data['images'] ?? '[]'),
            'brand' => $data['brand'] ?? null,
            'type' => $data['type'] ?? null,
            'power' => $data['power'] ?? null,
            'room_area' => $data['room_area'] ?? null,
            'warranty' => $data['warranty'] ?? null,
            'installation_price' => $data['installation_price'] ?? null,
            'category_id' => $data['category_id'],
        ]);
        echo json_encode(['id' => $id, 'success' => true]);
        return;
    }

    // PUT /products/:id — update (admin)
    if ($method === 'PUT' && $parts[0] === 'products' && isset($parts[1])) {
        authMiddleware();
        $data = json_decode(file_get_contents('php://input'), true);
        $fields = ['name','slug','article','description','short_desc','price','old_price','installment',
                    'in_stock','is_hit','is_new','brand','type','power','room_area','warranty',
                    'installation_price','category_id'];
        $update = [];
        foreach ($fields as $f) {
            if (array_key_exists($f, $data)) $update[$f] = $data[$f];
        }
        if (isset($data['specs'])) $update['specs'] = json_encode($data['specs']);
        if (isset($data['images'])) $update['images'] = json_encode($data['images']);

        DB::update('products', $update, 'id = ?', [$parts[1]]);
        echo json_encode(['success' => true]);
        return;
    }

    // DELETE /products/:id — delete (admin)
    if ($method === 'DELETE' && $parts[0] === 'products' && isset($parts[1])) {
        authMiddleware();
        DB::delete('products', 'id = ?', [$parts[1]]);
        echo json_encode(['success' => true]);
        return;
    }

    http_response_code(404);
    echo json_encode(['error' => 'Not Found']);
}
