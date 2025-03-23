document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.menu-toggle').addEventListener('click', function() {
        document.querySelector('.nav-links').classList.toggle('active');
    });
});

window.addEventListener('load', () => {
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        const percentage = progressBar.getAttribute('data-percentage');
        progressBar.style.width = `${percentage}%`;
    }

    // Carousel functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    let carouselInterval;

    // Initialize carousel
    function startCarousel() {
        carouselInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateCarousel();
        }, 5000); // Change slide every 5 seconds
    }

    // Update carousel to show current slide
    function updateCarousel() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Add click event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
            // Restart timer when manually changing slides
            clearInterval(carouselInterval);
            startCarousel();
        });
    });

    // Start carousel when page loads
    if (slides.length > 0) {
        startCarousel();
    }
});