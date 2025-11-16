<?php
require 'auth.php';
require 'db.php';
header('Content-Type: application/json');
if ($role === 'admin' && isset($_GET['all'])) {
    $stmt = $pdo->query('SELECT a.*, u.username FROM appointments a JOIN users u ON a.user_id = u.id ORDER BY a.created_at DESC');
    $appointments = $stmt->fetchAll();
    echo json_encode($appointments);
    exit;
}
$stmt = $pdo->prepare('SELECT * FROM appointments WHERE user_id = ? ORDER BY created_at DESC');
$stmt->execute([$user_id]);
$appointments = $stmt->fetchAll();
echo json_encode($appointments);
