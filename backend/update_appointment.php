<?php
require 'auth.php';
require 'db.php';
header('Content-Type: application/json');
if ($role !== 'admin') {
    http_response_code(403);
    echo json_encode(['error' => 'Forbidden']);
    exit;
}
$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['id'], $data['status'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing fields']);
    exit;
}
$stmt = $pdo->prepare('UPDATE appointments SET status = ? WHERE id = ?');
$stmt->execute([$data['status'], $data['id']]);
echo json_encode(['success' => true]);
