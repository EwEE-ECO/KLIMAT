<?php
require_once __DIR__ . '/config.php';

// Route based on URL path
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = rtrim(str_replace('/api', '', $path), '/');
$base = explode('/', trim($path, '/'))[0];

try {
    switch ($base) {
        case 'auth':
            require __DIR__ . '/auth.php';
            handleAuth();
            break;

        case 'products':
            require __DIR__ . '/products.php';
            handleProducts();
            break;

        case 'categories':
            require __DIR__ . '/categories.php';
            handleCategories();
            break;

        case 'orders':
            require __DIR__ . '/orders.php';
            handleOrders();
            break;

        case 'blog':
            require __DIR__ . '/blog.php';
            handleBlog();
            break;

        case 'contacts':
            require __DIR__ . '/contacts.php';
            handleContacts();
            break;

        case 'upload':
            require __DIR__ . '/upload.php';
            handleUpload();
            break;

        case 'uploads':
            $file = substr($path, strlen('/uploads/'));
            $filePath = __DIR__ . '/uploads/' . basename($file);
            if ($file && file_exists($filePath)) {
                $mime = mime_content_type($filePath);
                header('Content-Type: ' . $mime);
                readfile($filePath);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'File not found']);
            }
            break;

        default:
            http_response_code(404);
            echo json_encode(['error' => 'API endpoint not found', 'path' => $path]);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
