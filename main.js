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

window.addEventListener('scroll', () => {
    if (window.scrollY >= 188) {
        navbar.classList.add('bg');
    } else {
        navbar.classList.remove('bg');
    }
});

// AOS (Animate on Scroll) initialization
AOS.init({
    duration: 1000,
    once: true
});

// Routing Logic for Tour Cards
function handleRestrictedSections() {
    // Select all tour card links
    const tourCardLinks = document.querySelectorAll('.tour-card a');
    
    tourCardLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior
            
            // Get the destination page from data attribute
            const destinationPage = this.getAttribute('data-destination');
            
            // Store the destination for post-login routing
            localStorage.setItem('destinationPage', destinationPage);
            
            // Redirect to login page
            window.location.href = 'login.html';
        });
    });
}

// Check for destination page after login
function checkDestinationRedirect() {
    const destinationPage = localStorage.getItem('destinationPage');
    
    if (destinationPage) {
        // Remove the stored destination
        localStorage.removeItem('destinationPage');
        
        // Redirect to the original destination
        window.location.href = destinationPage;
    }
}

// Initialize routing checks when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    handleRestrictedSections();
    checkDestinationRedirect();
});