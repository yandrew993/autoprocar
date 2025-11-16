<?php
require 'auth.php';
require 'db.php';
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['service'], $data['vehicle'], $data['date'], $data['phone'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing fields']);
    exit;
}
$stmt = $pdo->prepare('INSERT INTO appointments (user_id, service, vehicle, date, phone, status) VALUES (?, ?, ?, ?, ?, "pending")');
$stmt->execute([$user_id, $data['service'], $data['vehicle'], $data['date'], $data['phone']]);
echo json_encode(['success' => true]);
