<?php
// KvadroAir API Config
define('DB_HOST', 'localhost');
define('DB_NAME', 'kvadroair');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

define('SITE_URL', 'https://kvadroair.ru');
define('API_URL', SITE_URL . '/api');
define('UPLOAD_DIR', __DIR__ . '/uploads');

define('TOKEN_EXPIRY_DAYS', 30);
define('ITEMS_PER_PAGE', 15);

// CORS
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
