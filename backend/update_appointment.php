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
