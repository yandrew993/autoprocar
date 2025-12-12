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
$id = $_GET['id'] ?? null;
if (!$id) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing id']);
    exit;
}
if ($role === 'admin') {
    $stmt = $pdo->prepare('DELETE FROM appointments WHERE id = ?');
    $stmt->execute([$id]);
    echo json_encode(['success' => true]);
    exit;
}
// Only allow user to delete their own appointment
$stmt = $pdo->prepare('DELETE FROM appointments WHERE id = ? AND user_id = ?');
$stmt->execute([$id, $user_id]);
echo json_encode(['success' => true]);
