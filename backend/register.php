<?php
require 'db.php';
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['username'], $data['email'], $data['password'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing fields']);
    exit;
}
$username = trim($data['username']);
$email = trim($data['email']);
$password = $data['password'];
$hash = password_hash($password, PASSWORD_DEFAULT);
try {
    $stmt = $pdo->prepare('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)');
    $stmt->execute([$username, $email, $hash]);
    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    http_response_code(409);
    echo json_encode(['error' => 'Username or email already exists']);
}
