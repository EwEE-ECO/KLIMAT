<?php
require_once __DIR__ . '/db.php';

function handleCategories(): void {
    $method = $_SERVER['REQUEST_METHOD'];
    $parts = array_values(array_filter(explode('/', parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH))));

    if ($method === 'GET' && !isset($parts[2])) {
        $categories = DB::fetchAll("SELECT * FROM categories ORDER BY sort_order ASC");
        echo json_encode($categories);
        return;
    }

    if ($method === 'GET' && isset($parts[2])) {
        $cat = DB::fetch("SELECT * FROM categories WHERE id = ? OR slug = ?", [$parts[2], $parts[2]]);
        echo json_encode($cat ?: ['error' => 'Не найдено']);
        return;
    }

    if ($method === 'POST') {
        authMiddleware();
        $data = json_decode(file_get_contents('php://input'), true);
        $id = DB::uuid();
        DB::insert('categories', [
            'id' => $id,
            'name' => $data['name'],
            'slug' => $data['slug'] ?? strtolower(trim(preg_replace('/[^a-zA-Z0-9-]+/', '-', $data['name']), '-')),
            'description' => $data['description'] ?? null,
            'image' => $data['image'] ?? null,
            'parent_id' => $data['parent_id'] ?? null,
            'sort_order' => $data['sort_order'] ?? 0,
        ]);
        echo json_encode(['id' => $id, 'success' => true]);
        return;
    }

    if ($method === 'PUT' && isset($parts[2])) {
        authMiddleware();
        $data = json_decode(file_get_contents('php://input'), true);
        $fields = ['name','slug','description','image','parent_id','sort_order'];
        $update = [];
        foreach ($fields as $f) {
            if (array_key_exists($f, $data)) $update[$f] = $data[$f];
        }
        DB::update('categories', $update, 'id = ?', [$parts[2]]);
        echo json_encode(['success' => true]);
        return;
    }

    if ($method === 'DELETE' && isset($parts[2])) {
        authMiddleware();
        DB::delete('categories', 'id = ?', [$parts[2]]);
        DB::update('products', ['category_id' => null], 'category_id = ?', [$parts[2]]);
        echo json_encode(['success' => true]);
        return;
    }
}
