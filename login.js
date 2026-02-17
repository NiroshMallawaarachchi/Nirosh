
// DOM Elements
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const resetForm = document.getElementById('reset-form');

const loginError = document.getElementById('login-error');
const registerError = document.getElementById('register-error');
const resetError = document.getElementById('reset-error');
const resetSuccess = document.getElementById('reset-success');

// Navigation
function showSection(sectionId) {
    // Hide all sections
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('forgot-password-section').style.display = 'none';

    // Show target section
    document.getElementById(sectionId + '-section').style.display = 'block';

    // Clear errors
    loginError.style.display = 'none';
    registerError.style.display = 'none';
    resetError.style.display = 'none';
    resetSuccess.style.display = 'none';
}

// Redirect if already logged in
if (localStorage.getItem('isLoggedIn') === 'true') {
    window.location.href = 'index.html';
}

// Helper: Get Users
function getUsers() {
    const users = localStorage.getItem('lmsUsers');
    return users ? JSON.parse(users) : [];
}

// Helper: Save User
function saveUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('lmsUsers', JSON.stringify(users));
}

// 1. Login Logic
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

    // Check Admin (Hardcoded)
    if (username === 'nirosh' && password === '1234') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify({ username: 'nirosh', role: 'admin' }));
        window.location.href = 'index.html';
        return;
    }

    // Check Registered Users
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify({ username: user.username, role: 'student' }));
        window.location.href = 'index.html';
    } else {
        loginError.style.display = 'block';
        loginError.textContent = "Invalid username or password";
        setTimeout(() => loginError.style.display = 'none', 3000);
    }
});

// 2. Register Logic
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('reg-username').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value.trim();
    const confirmPassword = document.getElementById('reg-confirm-password').value.trim();

    // Validation
    if (password !== confirmPassword) {
        registerError.textContent = "Passwords do not match";
        registerError.style.display = 'block';
        return;
    }

    // Check if user exists
    const users = getUsers();
    if (username === 'nirosh' || users.some(u => u.username === username)) {
        registerError.textContent = "Username already exists";
        registerError.style.display = 'block';
        return;
    }

    // Create User
    const newUser = {
        username: username,
        email: email,
        password: password
    };

    saveUser(newUser);

    alert("Registration Successful! Please login.");
    showSection('login');
});

// 3. Reset Password Logic (Simulated)
resetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('reset-username').value.trim();
    const newPassword = document.getElementById('reset-new-password').value.trim();

    // Check Admin
    if (username === 'nirosh') {
        resetError.textContent = "Cannot reset admin password here.";
        resetError.style.display = 'block';
        return;
    }

    // Check Users
    const users = getUsers();
    const userIndex = users.findIndex(u => u.username === username);

    if (userIndex !== -1) {
        // Update Password
        users[userIndex].password = newPassword;
        localStorage.setItem('lmsUsers', JSON.stringify(users));

        resetSuccess.style.display = 'block';
        resetError.style.display = 'none';

        setTimeout(() => {
            alert("Password updated successfully. Please login.");
            showSection('login');
        }, 1500);
    } else {
        resetError.textContent = "User not found";
        resetError.style.display = 'block';
    }
});
