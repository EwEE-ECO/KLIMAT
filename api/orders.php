<?php
require_once __DIR__ . '/db.php';

function handleOrders(): void {
    $method = $_SERVER['REQUEST_METHOD'];
    $parts = array_values(array_filter(explode('/', parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH))));

    // GET /orders — list (admin)
    if ($method === 'GET' && !isset($parts[2])) {
        authMiddleware();
        $orders = DB::fetchAll(
            "SELECT o.*, COUNT(oi.id) as items_count
             FROM orders o LEFT JOIN order_items oi ON o.id = oi.order_id
             GROUP BY o.id ORDER BY o.created_at DESC"
        );
        echo json_encode($orders);
        return;
    }

    // GET /orders/:id — single (admin)
    if ($method === 'GET' && isset($parts[2])) {
        authMiddleware();
        $order = DB::fetch("SELECT * FROM orders WHERE id = ?", [$parts[2]]);
        if ($order) {
            $order['items'] = DB::fetchAll("SELECT * FROM order_items WHERE order_id = ?", [$parts[2]]);
        }
        echo json_encode($order ?: ['error' => 'Не найдено']);
        return;
    }

    // POST /orders — create (public)
    if ($method === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);

        if (empty($data['customer_name']) || empty($data['customer_phone'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Имя и телефон обязательны']);
            return;
        }

        $id = DB::uuid();
        $orderNumber = 'KA-' . date('Ymd') . '-' . strtoupper(substr(bin2hex(random_bytes(3)), 0, 6));
        $subtotal = 0;
        $items = $data['items'] ?? [];

        foreach ($items as $item) {
            $subtotal += ($item['price'] ?? 0) * ($item['quantity'] ?? 1);
        }

        DB::insert('orders', [
            'id' => $id,
            'order_number' => $orderNumber,
            'status' => 'NEW',
            'total' => $subtotal,
            'subtotal' => $subtotal,
            'customer_name' => $data['customer_name'],
            'customer_phone' => $data['customer_phone'],
            'customer_email' => $data['customer_email'] ?? null,
            'city' => $data['city'] ?? null,
            'street' => $data['street'] ?? null,
            'house' => $data['house'] ?? null,
            'apartment' => $data['apartment'] ?? null,
            'comment' => $data['comment'] ?? null,
            'contact_method' => $data['contact_method'] ?? 'call',
        ]);

        foreach ($items as $item) {
            DB::insert('order_items', [
                'id' => DB::uuid(),
                'order_id' => $id,
                'product_id' => $item['id'] ?? '',
                'name' => $item['name'] ?? '',
                'price' => $item['price'] ?? 0,
                'quantity' => $item['quantity'] ?? 1,
                'image' => $item['image'] ?? null,
            ]);
        }

        echo json_encode([
            'success' => true,
            'order_id' => $id,
            'order_number' => $orderNumber,
        ]);
        return;
    }

    // PUT /orders/:id — update status (admin)
    if ($method === 'PUT' && isset($parts[2])) {
        authMiddleware();
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['status'])) {
            DB::update('orders', ['status' => $data['status']], 'id = ?', [$parts[2]]);
        }
        echo json_encode(['success' => true]);
        return;
    }

    // DELETE /orders/:id (admin)
    if ($method === 'DELETE' && isset($parts[2])) {
        authMiddleware();
        DB::delete('orders', 'id = ?', [$parts[2]]);
        echo json_encode(['success' => true]);
        return;
    }
}
