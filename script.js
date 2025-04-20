// Main initialization function
document.addEventListener('DOMContentLoaded', function() {
    // Load components in parallel with Promise.all for better performance
    Promise.all([
        loadPartial('nav-placeholder','/components/nav.html'),
        loadPartial('footer-placeholder','/components/footer.html')
    ]).then(() => {
        initMobileMenu();
        highlightCurrentPage();
    });
    
    // Initialize other components
    initProgressBar();
});

// Fetch and inject partial HTML content with caching
function loadPartial(placeholderId, url) {
    return fetch(url, { cache: 'no-cache' })
      .then(res => res.text())
      .then(html => {
          const element = document.getElementById(placeholderId);
          if (element) {
              element.innerHTML = html;
          }
      })
      .catch(err => {
          console.error(`Error loading partial from ${url}:`, err);
      });
}

// Initialize mobile navigation menu
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            document.querySelector('.nav-links').classList.toggle('active');
        });
    }
}

// Initialize progress bar with requestAnimationFrame for better performance
function initProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        // Use requestAnimationFrame for smoother animation and better performance
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

// Initialize carousel with performance optimizations
window.addEventListener('load', () => {
    // Defer non-critical initialization to after page load
    setTimeout(initCarousel, 0);
});

// Initialize carousel functionality with optimized event handling
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    
    // Only initialize if carousel elements exist
    if (slides.length > 0 && dots.length > 0) {
        let currentSlide = 0;
        let carouselInterval;

        // Use event delegation for better performance
        const dotsContainer = document.querySelector('.carousel-dots');
        if (dotsContainer) {
            dotsContainer.addEventListener('click', function(e) {
                if (e.target.classList.contains('dot')) {
                    // Get the index from the data-slide attribute or the position in the dots NodeList
                    const slideIndex = e.target.getAttribute('data-slide') || 
                                      Array.from(dots).indexOf(e.target);
                    if (slideIndex !== null && slideIndex !== -1) {
                        currentSlide = parseInt(slideIndex);
                        updateCarousel(slides, dots, currentSlide);
                        resetCarouselTimer();
                    }
                }
            });
        }

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

// Update carousel to show current slide with optimized DOM operations
function updateCarousel(slides, dots, currentSlide) {
    // Use classList instead of setting class directly for better performance
    for (let i = 0; i < slides.length; i++) {
        if (i === currentSlide) {
            slides[i].classList.add('active');
        } else {
            slides[i].classList.remove('active');
        }
    }
    
    for (let i = 0; i < dots.length; i++) {
        if (i === currentSlide) {
            dots[i].classList.add('active');
        } else {
            dots[i].classList.remove('active');
        }
    }
}