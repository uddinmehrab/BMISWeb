// Main initialization function
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initProgressBar();
    highlightCurrentPage();
});

// Initialize mobile navigation menu
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            document.querySelector('.nav-links').classList.toggle('active');
        });
    }
}

// Initialize progress bar
function initProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        // Use requestAnimationFrame for smoother animation
        requestAnimationFrame(() => {
            const percentage = progressBar.getAttribute('data-percentage');
            progressBar.style.width = `${percentage}%`;
        });
    }
}

// Highlight current page in navigation
function highlightCurrentPage() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Check if current page ends with the link's href or if both are home pages
        if (currentPage.endsWith(linkPath) || 
            (currentPage.endsWith('/') && linkPath === 'index.html') ||
            (currentPage === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Initialize carousel when page is fully loaded
window.addEventListener('load', () => {
    initCarousel();
});

// Initialize carousel functionality
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    
    // Only initialize if carousel elements exist
    if (slides.length > 0 && dots.length > 0) {
        let currentSlide = 0;
        let carouselInterval;

        // Add click event listeners to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateCarousel(slides, dots, currentSlide);
                resetCarouselTimer();
            });
        });

        // Start the carousel
        startCarousel();

        // Start automatic carousel rotation
        function startCarousel() {
            carouselInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % slides.length;
                updateCarousel(slides, dots, currentSlide);
            }, 5000); // Change slide every 5 seconds
        }

        // Reset carousel timer when manually changing slides
        function resetCarouselTimer() {
            clearInterval(carouselInterval);
            startCarousel();
        }
    }
}

// Update carousel to show current slide
function updateCarousel(slides, dots, currentSlide) {
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}