// Admin credentials 
const ADMIN_CREDENTIALS = {
    username: "John_Paul",
    password: "#0111469688Jp"
};

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('adminLoggedIn') === 'true';
}

// Clear login form
function clearLoginForm() {
    document.getElementById('adminUsername').value = '';
    document.getElementById('adminPassword').value = '';
    document.getElementById('loginError').style.display = 'none';
}

// Image slideshow functionality
function initSlideshow() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (n + totalSlides) % totalSlides;
        slides[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Set minimum date for booking form
    document.getElementById('date').min = new Date().toISOString().split('T')[0];
    
    // Set a default date (tomorrow)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('date').value = tomorrow.toISOString().split('T')[0];
    
    // Initialize admin panel
    initAdminPanel();
    
    // Initialize slideshow
    initSlideshow();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handling
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        id: Date.now(), // Unique ID
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        vehicle: document.getElementById('vehicle').value,
        service: document.getElementById('service').value,
        date: document.getElementById('date').value,
        description: document.getElementById('description').value,
        timestamp: new Date().toLocaleString(),
        status: 'pending'
    };
    
    // Validate required fields
    if (!formData.name || !formData.phone || !formData.vehicle || !formData.service || !formData.date) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Get existing appointments or create empty array
    const existingAppointments = JSON.parse(localStorage.getItem('autocare_appointments')) || [];
    
    // Add new appointment
    existingAppointments.push(formData);
    
    // Save back to localStorage
    localStorage.setItem('autocare_appointments', JSON.stringify(existingAppointments));
    
    // Show success message
    showSuccessMessage();
    
    // Reset form
    this.reset();
    
    // Set default date again
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('date').value = tomorrow.toISOString().split('T')[0];
    
    // Refresh admin panel if open and user is logged in
    if (isLoggedIn()) {
        refreshAppointmentsTable();
    }
});

// Sticky navigation
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 54, 93, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#1a365d';
        navbar.style.backdropFilter = 'none';
    }
});

// Success message function
function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';
    
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
}

// Admin Panel Functions
function initAdminPanel() {
    const adminToggle = document.getElementById('adminToggle');
    const adminModal = document.getElementById('adminModal');
    const closeAdmin = document.getElementById('closeAdmin');
    const closeAdmin2 = document.getElementById('closeAdmin2');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const refreshAppointmentsBtn = document.getElementById('refreshAppointments');
    const clearAllAppointmentsBtn = document.getElementById('clearAllAppointments');
    
    adminToggle.addEventListener('click', () => {
        adminModal.style.display = 'block';
        // Show login section by default and clear form
        showLoginSection();
        clearLoginForm();
    });
    
    closeAdmin.addEventListener('click', () => {
        adminModal.style.display = 'none';
        // Clear login form when closing modal
        clearLoginForm();
    });
    
    closeAdmin2.addEventListener('click', () => {
        adminModal.style.display = 'none';
        // Clear login form when closing modal
        clearLoginForm();
    });
    
    loginBtn.addEventListener('click', () => {
        const username = document.getElementById('adminUsername').value;
        const password = document.getElementById('adminPassword').value;
        
        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            // Successful login
            localStorage.setItem('adminLoggedIn', 'true');
            showAdminSection();
            refreshAppointmentsTable();
        } else {
            // Failed login
            document.getElementById('loginError').style.display = 'block';
        }
    });
    
    // Allow login with Enter key
    document.getElementById('adminPassword').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loginBtn.click();
        }
    });
    
    logoutBtn.addEventListener('click', () => {
        localStorage.setItem('adminLoggedIn', 'false');
        showLoginSection();
        // Clear login form on logout
        clearLoginForm();
    });
    
    refreshAppointmentsBtn.addEventListener('click', () => {
        refreshAppointmentsTable();
    });
    
    clearAllAppointmentsBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete ALL appointments? This cannot be undone.')) {
            localStorage.removeItem('autocare_appointments');
            refreshAppointmentsTable();
        }
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === adminModal) {
            adminModal.style.display = 'none';
            // Clear login form when clicking outside modal
            clearLoginForm();
        }
    });

    // Clear form when pressing Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && adminModal.style.display === 'block') {
            adminModal.style.display = 'none';
            clearLoginForm();
        }
    });
}

function showLoginSection() {
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('adminSection').style.display = 'none';
}

function showAdminSection() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('adminSection').style.display = 'block';
}

function refreshAppointmentsTable() {
    if (!isLoggedIn()) {
        showLoginSection();
        return;
    }
    
    const appointments = JSON.parse(localStorage.getItem('autocare_appointments')) || [];
    const tableBody = document.getElementById('appointmentsTableBody');
    const totalAppointments = document.getElementById('totalAppointments');
    
    // Update total count
    totalAppointments.textContent = appointments.length;
    
    // Clear table
    tableBody.innerHTML = '';
    
    if (appointments.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">No appointments found.</td></tr>';
        return;
    }
    
    // Sort appointments by date (newest first)
    appointments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    // Add appointments to table
    appointments.forEach(apt => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${apt.date}</td>
            <td>${apt.name}</td>
            <td>${apt.phone}</td>
            <td>${apt.service}</td>
            <td>${apt.vehicle}</td>
            <td>
                <button class="delete-btn" onclick="deleteAppointment(${apt.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function deleteAppointment(id) {
    if (!isLoggedIn()) {
        alert('Please login first.');
        return;
    }
    
    let appointments = JSON.parse(localStorage.getItem('autocare_appointments')) || [];
    appointments = appointments.filter(apt => apt.id !== id);
    localStorage.setItem('autocare_appointments', JSON.stringify(appointments));
    refreshAppointmentsTable();
}

// Make functions available globally
window.refreshAppointmentsTable = refreshAppointmentsTable;
window.deleteAppointment = deleteAppointment;