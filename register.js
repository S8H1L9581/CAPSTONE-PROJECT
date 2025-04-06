// Modified JavaScript to handle authentication check for explore links
const sliderImgs = ["img1.png", "img2.png", "img3.png", "img4.png", "img5.png", "img6.png"];
const sliderImage = document.querySelector('.background-image');
const sliderGrids = document.querySelectorAll('.grid-item');
let currentImage = 0;




const names = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const form = document.getElementById('form');
const name_error = document.getElementById('name_error');
const email_error = document.getElementById('email_error');
const pass_error = document.getElementById('pass_error');

const email_check = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form from submitting
    let valid = true;

    // Name validation (Should not be empty)
    if (names.value.trim() === '') {
        name_error.innerHTML = "Name is required";
        valid = false;
    } else {
        name_error.innerHTML = "";
    }

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

    // If all fields are valid, redirect to welcome.html
    if (valid) {
        window.location.href = "main.html";
    }
});

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