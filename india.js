// Modified JavaScript to handle authentication check for explore links
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
