<?php
session_start();

// Check if user is authenticated
if (!isset($_SESSION['user_id']) || !isset($_SESSION['role'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Authentication required']);
    exit;
}

// Check session timeout (24 hours)
$sessionTimeout = 24 * 60 * 60; // 24 hours in seconds
if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity']) > $sessionTimeout) {
    session_destroy();
    http_response_code(401);
    echo json_encode(['error' => 'Session expired']);
    exit;
}

// Update last activity time
$_SESSION['last_activity'] = time();

// Set global variables for authenticated user
$user_id = $_SESSION['user_id'];
$role = $_SESSION['role'];
$username = $_SESSION['username'] ?? '';
?>