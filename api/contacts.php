<?php
require_once __DIR__ . '/db.php';

function handleContacts(): void {
    $method = $_SERVER['REQUEST_METHOD'];
    $parts = array_values(array_filter(explode('/', parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH))));

    // GET /contacts — list (admin)
    if ($method === 'GET') {
        authMiddleware();
        $requests = DB::fetchAll("SELECT * FROM contact_requests ORDER BY created_at DESC");
        echo json_encode($requests);
        return;
    }

    // POST /contacts — submit (public)
    if ($method === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);

        if (empty($data['name']) || empty($data['phone'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Имя и телефон обязательны']);
            return;
        }

        DB::insert('contact_requests', [
            'id' => DB::uuid(),
            'name' => $data['name'],
            'phone' => $data['phone'],
            'email' => $data['email'] ?? null,
            'message' => $data['message'] ?? null,
            'source' => $data['source'] ?? 'site',
        ]);

        echo json_encode(['success' => true]);
        return;
    }

    // DELETE /contacts/:id (admin)
    if ($method === 'DELETE' && isset($parts[2])) {
        authMiddleware();
        DB::delete('contact_requests', 'id = ?', [$parts[2]]);
        echo json_encode(['success' => true]);
        return;
    }
}
