<?php
require_once __DIR__ . '/db.php';

function authMiddleware(): array {
    $headers = getallheaders();
    $token = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    $token = str_replace('Bearer ', '', $token);

    if (!$token) {
        http_response_code(401);
        echo json_encode(['error' => 'Требуется авторизация']);
        exit;
    }

    $user = DB::fetch(
        "SELECT u.* FROM users u JOIN tokens t ON u.id = t.user_id WHERE t.token = ? AND t.expires_at > NOW()",
        [$token]
    );

    if (!$user) {
        http_response_code(401);
        echo json_encode(['error' => 'Токен недействителен или истёк']);
        exit;
    }

    return $user;
}

function handleAuth(): void {
    $method = $_SERVER['REQUEST_METHOD'];
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $path = rtrim(str_replace('/api', '', $path), '/');

    if ($path === '/auth/login' && $method === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        $email = trim($data['email'] ?? '');
        $password = $data['password'] ?? '';

        $user = DB::fetch("SELECT * FROM users WHERE email = ?", [$email]);
        if (!$user || !password_verify($password, $user['password'])) {
            http_response_code(401);
            echo json_encode(['error' => 'Неверный email или пароль']);
            return;
        }

        $token = bin2hex(random_bytes(32));
        DB::insert('tokens', [
            'id' => DB::uuid(),
            'user_id' => $user['id'],
            'token' => $token,
            'expires_at' => date('Y-m-d H:i:s', strtotime('+' . TOKEN_EXPIRY_DAYS . ' days')),
        ]);

        echo json_encode([
            'token' => $token,
            'user' => [
                'id' => $user['id'],
                'email' => $user['email'],
                'name' => $user['name'],
                'role' => $user['role'],
            ]
        ]);
        return;
    }

    if ($path === '/auth/me' && $method === 'GET') {
        $user = authMiddleware();
        echo json_encode([
            'id' => $user['id'],
            'email' => $user['email'],
            'name' => $user['name'],
            'role' => $user['role'],
        ]);
        return;
    }

    if ($path === '/auth/logout' && $method === 'POST') {
        $headers = getallheaders();
        $token = str_replace('Bearer ', '', $headers['Authorization'] ?? $headers['authorization'] ?? '');
        if ($token) {
            DB::delete("tokens", "token = ?", [$token]);
        }
        echo json_encode(['success' => true]);
        return;
    }

    http_response_code(404);
    echo json_encode(['error' => 'Not Found']);
}
