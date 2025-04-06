// User database
const users = {
    "user": { password: "user@123", redirect: "index.html" },
};

// Function to handle login with loading animation
function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    document.querySelector('.login-btn').disabled = true;
    document.getElementById('loading').style.display = 'block';
    
    setTimeout(() => {
        if (users[email] && users[email].password === password) {
            // Set login status before redirecting
            localStorage.setItem('userLoggedIn', 'true');
            window.location.href = users[email].redirect;
        } else {
            alert('Invalid Email or Password');
            document.querySelector('.login-btn').disabled = false;
            document.getElementById('loading').style.display = 'none';
        }
    }, 2000);
}

// Toggle password visibility
function togglePassword() {
    const passwordField = document.getElementById('password');
    const toggleButton = document.querySelector('.toggle-password');
    if (passwordField.type === "password") {
        passwordField.type = "text";
        toggleButton.textContent = "Hide";
    } else {
        passwordField.type = "password";
        toggleButton.textContent = "Show";
    }
}

// Function to check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('userLoggedIn') === 'true' || 
           sessionStorage.getItem('userLoggedIn') === 'true';
}

// Function to redirect to login page
function redirectToLogin() {
    if (!window.location.href.includes('login.html')) {
        window.location.href = 'login.html';
    }
}

// Slider images and components
const sliderImgs = ["img1.png", "img2.png", "img3.png", "img4.png", "img5.png", "img6.png"];
const sliderImage = document.querySelector('.background-image');
const sliderGrids = document.querySelectorAll('.grid-item');
let currentImage = 0;

// Slider image change function
const changeSliderImage = () => {
    sliderGrids.forEach((gridItem, index) => {
        setTimeout(() => {
            gridItem.classList.remove('hide');

            setTimeout(() => {
                if (index === sliderGrids.length - 1) {
                    currentImage = (currentImage >= sliderImgs.length - 1) ? 0 : currentImage + 1;
                    sliderImage.src = `${sliderImgs[currentImage]}`;

                    sliderGrids.forEach((item, i) => {
                        setTimeout(() => {
                            item.classList.add('hide');
                        }, i * 100);
                    });
                }
            }, 100);
        }, index * 100);
    });
};

// Auto-change slider every 5 seconds
setInterval(changeSliderImage, 5000);

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 188) {
            navbar.classList.add('bg');
        } else {
            navbar.classList.remove('bg');
        }
    });
}

// Function to handle restricted sections based on authentication
function handleRestrictedSections() {
    const restrictedElements = document.querySelectorAll('.restricted-content');
    
    restrictedElements.forEach(element => {
        element.addEventListener('click', function(e) {
            if (!isLoggedIn()) {
                e.preventDefault();
                redirectToLogin();
            }
        });
    });
}

// Check login status when page loads and redirect if needed
document.addEventListener('DOMContentLoaded', function() {
    // If on main page, check for login
    if (!window.location.href.includes('login.html')) {
        if (!isLoggedIn()) {
            redirectToLogin();
        }
    }
    
    // Initialize form validation if on login page
    const form = document.getElementById('form');
    if (form) {
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const email_error = document.getElementById('email_error');
        const pass_error = document.getElementById('pass_error');
        const email_check = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent form from submitting
            let valid = true;

            // Email validation (Should match email format)
            if (!email.value.match(email_check)) {
                email_error.innerHTML = "Enter a valid email";
                valid = false;
            } else {
                email_error.innerHTML = "";
            }

            // Password validation (At least 6 characters)
            if (password.value.length < 6) {
                pass_error.innerHTML = "Password must be at least 6 characters";
                valid = false;
            } else {
                pass_error.innerHTML = "";
            }

            // If all fields are valid, set login status and redirect
            if (valid) {
                localStorage.setItem('userLoggedIn', 'true');
                window.location.href = "index.html";
            }
        });
    }
    
    handleRestrictedSections();
});

// AOS (Animate on Scroll) initialization
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        once: true
    });
}
