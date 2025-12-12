<?php
header("Access-Control-Allow-Origin: https://autoprocar.com");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require 'auth.php';
require 'db.php';
$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['service'], $data['vehicle'], $data['date'], $data['phone'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing fields']);
    exit;
}
$stmt = $pdo->prepare('INSERT INTO appointments (user_id, service, vehicle, date, phone, status) VALUES (?, ?, ?, ?, ?, "pending")');
$stmt->execute([$user_id, $data['service'], $data['vehicle'], $data['date'], $data['phone']]);
echo json_encode(['success' => true]);
