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

session_start();

// Check if user is logged in and session is valid
if (isset($_SESSION['user_id']) && isset($_SESSION['username']) && isset($_SESSION['role'])) {
    // Optional: Check session timeout (e.g., 24 hours)
    $sessionTimeout = 24 * 60 * 60; // 24 hours in seconds
    if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity']) > $sessionTimeout) {
        // Session expired
        session_destroy();
        echo json_encode([
            'success' => true,
            'loggedIn' => false,
            'message' => 'Session expired'
        ]);
        exit();
    }
    
    // Update last activity time
    $_SESSION['last_activity'] = time();
    
    echo json_encode([
        'success' => true,
        'loggedIn' => true,
        'role' => $_SESSION['role'],
        'username' => $_SESSION['username']
    ]);
} else {
    echo json_encode([
        'success' => true,
        'loggedIn' => false,
        'message' => 'No active session'
    ]);
}
?>
