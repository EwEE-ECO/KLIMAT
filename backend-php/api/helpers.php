<?php
require_once __DIR__ . '/config.php';

function jsonResponse(mixed $data, int $status = 200): void {
  http_response_code($status);
  header('Content-Type: application/json; charset=utf-8');
  echo json_encode($data, JSON_UNESCAPED_UNICODE);
  exit;
}

function jsonError(string $message, int $status = 400): void {
  jsonResponse(['error' => $message, 'statusCode' => $status], $status);
}

function getJsonBody(): array {
  $raw = file_get_contents('php://input');
  return json_decode($raw, true) ?: [];
}

function base64urlEncode(string $data): string {
  return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64urlDecode(string $data): string {
  return base64_decode(strtr($data, '-_', '+/'));
}

function jwtEncode(array $payload): string {
  $header = base64urlEncode(json_encode(['typ' => 'JWT', 'alg' => 'HS256']));
  $payload['iat'] = $payload['iat'] ?? time();
  $payload['exp'] = $payload['exp'] ?? time() + JWT_EXPIRY;
  $payloadEncoded = base64urlEncode(json_encode($payload));
  $signature = base64urlEncode(
    hash_hmac('sha256', "$header.$payloadEncoded", JWT_SECRET, true)
  );
  return "$header.$payloadEncoded.$signature";
}

function jwtDecode(string $token): ?array {
  $parts = explode('.', $token);
  if (count($parts) !== 3) return null;
  [$header, $payload, $signature] = $parts;
  $expectedSig = base64urlEncode(
    hash_hmac('sha256', "$header.$payload", JWT_SECRET, true)
  );
  if (!hash_equals($expectedSig, $signature)) return null;
  $data = json_decode(base64urlDecode($payload), true);
  if (!$data || !isset($data['exp']) || $data['exp'] < time()) return null;
  return $data;
}

function requireAuth(): array {
  $auth = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
  if (!preg_match('/^Bearer\s+(.+)$/i', $auth, $m)) {
    jsonError('Токен недействителен', 401);
  }
  $payload = jwtDecode($m[1]);
  if (!$payload) jsonError('Токен недействителен', 401);

  $stmt = getDB()->prepare("SELECT id, email, name, role FROM User WHERE id = ?");
  $stmt->execute([$payload['sub']]);
  $user = $stmt->fetch();
  if (!$user) jsonError('Токен недействителен', 401);
  return $user;
}

function getAuthUser(): ?array {
  $auth = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
  if (!preg_match('/^Bearer\s+(.+)$/i', $auth, $m)) return null;
  $payload = jwtDecode($m[1]);
  if (!$payload) return null;
  $stmt = getDB()->prepare("SELECT id, email, name, role FROM User WHERE id = ?");
  $stmt->execute([$payload['sub']]);
  return $stmt->fetch() ?: null;
}

function cuid(): string {
  $chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  $cuid = 'c' . substr(str_shuffle($chars), 0, 24);
  return 'c' . bin2hex(random_bytes(12));
}

function slugify(string $text): string {
  $text = mb_strtolower($text, 'UTF-8');
  $text = str_replace(
    ['а','б','в','г','д','е','ё','ж','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я',' '],
    ['a','b','v','g','d','e','yo','zh','z','i','y','k','l','m','n','o','p','r','s','t','u','f','kh','ts','ch','sh','shch','','y','','e','yu','ya','-'],
    $text
  );
  $text = preg_replace('/[^a-z0-9-]/', '', $text);
  $text = preg_replace('/-+/', '-', $text);
  $text = trim($text, '-');
  return $text;
}

function generateOrderNumber(): string {
  $ts = base_convert(time(), 10, 36);
  $rand = substr(str_shuffle('abcdefghijklmnopqrstuvwxyz0123456789'), 0, 4);
  return "KV-$ts-$rand";
}

function handleUpload(): array {
  if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    jsonError('Файл не загружен', 400);
  }
  $file = $_FILES['file'];
  if ($file['size'] > MAX_UPLOAD_SIZE) jsonError('Файл слишком большой', 400);
  if (!is_dir(UPLOAD_DIR)) mkdir(UPLOAD_DIR, 0755, true);
  $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
  $filename = time() . '-' . random_int(1, 999999999) . ($ext ? '.' . $ext : '');
  move_uploaded_file($file['tmp_name'], UPLOAD_DIR . $filename);
  return ['url' => '/uploads/' . $filename, 'filename' => $filename];
}
