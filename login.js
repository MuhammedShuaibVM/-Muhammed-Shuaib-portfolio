document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMsg = document.getElementById('errorMessage');
    const togglePassword = document.getElementById('togglePassword');

    // Expected Credentials
    const EXPECTED_EMAIL = 'Shuaibmuhammed12345@gmail.com';
    const USER_NAME = 'Muhammed Shuaib';

    // Password Visibility Toggle
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.classList.toggle('fa-eye');
        togglePassword.classList.toggle('fa-eye-slash');
    });

    // Handle Login Submit
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput.value.trim().toLowerCase();
        
        // Since we allow any password for demo, we just check email
        if (email === EXPECTED_EMAIL.toLowerCase()) {
            // Success
            errorMsg.style.display = 'none';
            
            // Store user info in session storage
            const userData = {
                name: USER_NAME,
                email: EXPECTED_EMAIL,
                isLoggedIn: true
            };
            sessionStorage.setItem('portfolioUser', JSON.stringify(userData));
            
            // Redirect to home
            window.location.href = 'index.html';
        } else {
            // Failure
            errorMsg.style.display = 'block';
            errorMsg.textContent = 'Invalid email address. Please use the demo credentials provided below.';
            
            // Shake animation for error
            const loginBox = document.querySelector('.login-box');
            loginBox.classList.add('shake');
            setTimeout(() => {
                loginBox.classList.remove('shake');
            }, 500);
        }
    });

    // Check if already logged in
    const storedUser = sessionStorage.getItem('portfolioUser');
    if (storedUser) {
        window.location.href = 'index.html';
    }
});

// Add shake animation CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .shake {
        animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
    }
    @keyframes shake {
        10%, 90% { transform: translate3d(-1px, 0, 0); }
        20%, 80% { transform: translate3d(2px, 0, 0); }
        30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
        40%, 60% { transform: translate3d(4px, 0, 0); }
    }
`;
document.head.appendChild(style);
