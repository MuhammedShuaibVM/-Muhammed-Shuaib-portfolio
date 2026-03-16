// ==========================================
// Navigation & Mobile Menu
// ==========================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navbar = document.getElementById('navbar');
const navItems = document.querySelectorAll('.nav-links li a');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change icon between bars and times
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// ==========================================
// Scroll Effects
// ==========================================

// Add shadow/background to navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active Link Highlighting
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// ==========================================
// Scroll Reveal Animations
// ==========================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-element');
            // Optional: Unobserve after animating if you want it to trigger only once
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.hidden-element');
hiddenElements.forEach((el) => observer.observe(el));

// ==========================================
// Authentication State Management
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const authSection = document.getElementById('authSection');
    const loggedInWelcome = document.getElementById('loggedInWelcome');
    const userNameDisplay = document.getElementById('userNameDisplay');
    
    // Check session storage
    const storedUser = sessionStorage.getItem('portfolioUser');
    
    if (storedUser) {
        try {
            const userData = JSON.parse(storedUser);
            if (userData.isLoggedIn) {
                // Update Auth Section (Navbar)
                authSection.innerHTML = `
                    <div class="user-profile">
                        <div class="user-avatar">${userData.name.charAt(0)}</div>
                        <span class="user-name" style="display: none;">${userData.name}</span>
                        <button id="logoutBtn" class="btn btn-outline btn-sm logout-btn" title="Logout">
                            <i class="fas fa-sign-out-alt"></i>
                        </button>
                    </div>
                `;
                
                // Show personalized welcome message in Hero
                if (loggedInWelcome && userNameDisplay) {
                    userNameDisplay.textContent = userData.name;
                    loggedInWelcome.style.display = 'block';
                }
                
                // Add logout event listener
                const logoutBtn = document.getElementById('logoutBtn');
                if (logoutBtn) {
                    logoutBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        sessionStorage.removeItem('portfolioUser');
                        window.location.reload();
                    });
                }
            }
        } catch (e) {
            console.error("Error parsing user data:", e);
            sessionStorage.removeItem('portfolioUser'); // Clear corrupted data
        }
    }
});

// ==========================================
// Contact Form Submission
// ==========================================
let submitted = false;

function showSuccessPopup() {
    const modal = document.getElementById('successModal');
    const form = document.querySelector('.contact-form');
    
    // Show modal
    modal.classList.add('show');
    
    // Reset form
    form.reset();
    submitted = false; // Reset the flag
    
    // Handle modal close
    const closeBtn = modal.querySelector('.close-btn');
    const closeIcon = modal.querySelector('.close-modal');
    
    const closeModal = () => {
        modal.classList.remove('show');
    };
    
    closeBtn.addEventListener('click', closeModal);
    closeIcon.addEventListener('click', closeModal);
    
    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}
