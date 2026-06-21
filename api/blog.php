<?php
require_once __DIR__ . '/db.php';

function handleBlog(): void {
    $method = $_SERVER['REQUEST_METHOD'];
    $parts = array_values(array_filter(explode('/', parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH))));

    if ($method === 'GET' && !isset($parts[2])) {
        $posts = DB::fetchAll(
            "SELECT id, title, slug, excerpt, image, category, published, created_at, updated_at
             FROM blog_posts ORDER BY created_at DESC"
        );
        echo json_encode($posts);
        return;
    }

    if ($method === 'GET' && isset($parts[2])) {
        $post = DB::fetch(
            "SELECT * FROM blog_posts WHERE (slug = ? OR id = ?) AND published = 1",
            [$parts[2], $parts[2]]
        );
        echo json_encode($post ?: ['error' => 'Не найдено']);
        return;
    }

    if ($method === 'POST') {
        authMiddleware();
        $data = json_decode(file_get_contents('php://input'), true);
        $id = DB::uuid();
        DB::insert('blog_posts', [
            'id' => $id,
            'title' => $data['title'],
            'slug' => $data['slug'] ?? strtolower(trim(preg_replace('/[^a-zA-Z0-9-]+/', '-', $data['title']), '-')),
            'excerpt' => $data['excerpt'] ?? null,
            'content' => $data['content'] ?? null,
            'image' => $data['image'] ?? null,
            'category' => $data['category'] ?? 'Советы',
            'published' => $data['published'] ?? 1,
            'seo_title' => $data['seo_title'] ?? null,
            'seo_desc' => $data['seo_desc'] ?? null,
        ]);
        echo json_encode(['id' => $id, 'success' => true]);
        return;
    }

    if ($method === 'PUT' && isset($parts[2])) {
        authMiddleware();
        $data = json_decode(file_get_contents('php://input'), true);
        $fields = ['title','slug','excerpt','content','image','category','published','seo_title','seo_desc'];
        $update = [];
        foreach ($fields as $f) {
            if (array_key_exists($f, $data)) $update[$f] = $data[$f];
        }
        DB::update('blog_posts', $update, 'id = ?', [$parts[2]]);
        echo json_encode(['success' => true]);
        return;
    }

    if ($method === 'DELETE' && isset($parts[2])) {
        authMiddleware();
        DB::delete('blog_posts', 'id = ?', [$parts[2]]);
        echo json_encode(['success' => true]);
        return;
    }
}
