<?php
require_once __DIR__ . '/config.php';

function handleUpload(): void {
    authMiddleware();

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        return;
    }

    if (!isset($_FILES['file'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Файл не загружен']);
        return;
    }

    $file = $_FILES['file'];
    $allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

    if (!in_array($file['type'], $allowed) && !in_array($ext, ['jpg', 'jpeg', 'png', 'webp', 'svg'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Недопустимый формат файла']);
        return;
    }

    if ($file['size'] > 5 * 1024 * 1024) {
        http_response_code(400);
        echo json_encode(['error' => 'Файл слишком большой (макс 5MB)']);
        return;
    }

    if (!is_dir(UPLOAD_DIR)) {
        mkdir(UPLOAD_DIR, 0755, true);
    }

    $filename = time() . '_' . bin2hex(random_bytes(8)) . '.' . $ext;
    $dest = UPLOAD_DIR . '/' . $filename;

    if (!move_uploaded_file($file['tmp_name'], $dest)) {
        http_response_code(500);
        echo json_encode(['error' => 'Ошибка сохранения файла']);
        return;
    }

    echo json_encode([
        'success' => true,
        'url' => SITE_URL . '/api/uploads/' . $filename,
        'filename' => $filename,
    ]);
}
