<?php
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_NAME', getenv('DB_NAME') ?: 'U3553565_BDKVADRO');
define('DB_USER', getenv('DB_USER') ?: 'U3553565_OPEN2');
define('DB_PASS', getenv('DB_PASS') ?: 'split.popov1!123');
define('JWT_SECRET', getenv('JWT_SECRET') ?: 'kvadroair-jwt-secret-2024-super-secret-key');
define('JWT_EXPIRY', 86400); // 24 hours
define('UPLOAD_DIR', __DIR__ . '/../uploads/');
define('MAX_UPLOAD_SIZE', 10 * 1024 * 1024); // 10 MB
