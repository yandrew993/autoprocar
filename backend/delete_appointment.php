<?php
require 'auth.php';
require 'db.php';
header('Content-Type: application/json');
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
